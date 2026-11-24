/**
 * Правка карты: взять блок мышью и поставить, где нужно.
 *
 * Этот файл подключается только на 127.0.0.1 (см. конец course.js), и на
 * сайт не попадает вовсе. Он ничего не рисует: двигает блоки в тех же
 * данных, из которых нарисована карта, и просит её перерисоваться. Что
 * видно во время правки, то и будет на сайте.
 *
 * Записывает сервер из этого репозитория: npm start или npm run map-edit —
 * оба принимают PUT на maps/course.json. Если открыть карту как файл с
 * диска или с чужого сервера, кнопка сохранения честно скажет, что писать
 * некуда.
 *
 * Положение блока — это угол, и необязательное смещение от своей
 * окружности. Со Shift смещение не трогается, и блок едет по окружности.
 */
(function () {
  const map = window.courseMap;
  if (!map) return;

  const controls = document.querySelector(".controls");
  const container = document.getElementById("canvas-container");
  if (!controls || !container) return;

  let editing = false;
  let dragging = null;
  let moved = false;
  let dirty = false;
  const history = [];

  // ------------------------------------------------------------- кнопки
  const button = (text, onclick) => {
    const element = document.createElement("button");
    element.textContent = text;
    element.onclick = onclick;
    controls.insertBefore(element, controls.firstChild);
    return element;
  };

  const said = document.createElement("span");
  said.style.cssText = "margin-left:12px;font-size:13px;color:#94A3B8;align-self:center";
  controls.appendChild(said);

  const say = (text, how) => {
    said.textContent = text || "";
    said.style.color = how === "плохо" ? "#F87171" : how === "важно" ? "#F59E0B" : "#94A3B8";
  };

  const publishButton = button("Выложить", () => publish());
  const undoButton = button("Отменить (Ctrl+Z)", () => undo());
  const saveButton = button("Сохранить (Ctrl+S)", () => store());
  const editButton = button("Редактировать", () => toggle());

  const hidden = [saveButton, undoButton, publishButton];
  hidden.forEach(element => { element.style.display = "none"; });

  const refresh = () => {
    saveButton.disabled = !dirty;
    undoButton.disabled = !history.length;
    publishButton.disabled = dirty;
    publishButton.title = dirty ? "Сначала сохрани" : "Закоммитить карту и запушить — дальше деплой сам";
  };

  const enter = () => {
    editing = true;
    editButton.textContent = "Закончить правку";
    editButton.classList.add("active");
    hidden.forEach(element => { element.style.display = ""; });
    container.style.cursor = "crosshair";
    say("тяни блок мышью · Shift — по окружности");
    refresh();
  };

  const leave = () => {
    editing = false;
    editButton.textContent = "Редактировать";
    editButton.classList.remove("active");
    hidden.forEach(element => { element.style.display = "none"; });
    container.style.cursor = "";
    say("");
    refresh();
  };

  /**
   * Прежде чем дать двигать блоки — убедиться, что их есть куда записать.
   *
   * Проверка — запись того, что уже лежит: байт в байт то же самое, файл
   * не меняется, а ответ говорит всё. Без неё сервер, не умеющий писать
   * (npm start, запущенный до того, как обработчик появился), выясняется
   * только после того, как блоки расставлены, — и расставлены зря.
   */
  const toggle = () => {
    if (editing) {
      if (dirty && !confirm("Правка не сохранена. Выйти и потерять её?")) return;
      if (dirty) undoAll();
      leave();
      return;
    }

    say("проверяю, можно ли сохранять…");
    write()
      .then(() => { enter(); })
      .catch(error => say("правка не включена — сохранять некуда: " + error.message, "плохо"));
  };

  // --------------------------------------------------------------- данные
  /** Адрес вида branch:1:3 — в узел данных и в поля, которыми он поставлен. */
  const resolve = (at) => {
    const [kind, ...rest] = at.split(":");
    const i = rest.map(Number);
    const rings = map.rings;
    const orbit = map.outerOrbit;

    if (kind === "ring") return { node: rings[i[0]], angle: "headerAngle", offset: "headerOffset", base: rings[i[0]].r };
    if (kind === "branch") return { node: rings[i[0]].branches[i[1]], angle: "angle", offset: "rOffset", base: rings[i[0]].r };
    if (kind === "item") return { node: rings[i[0]].branches[i[1]].items[i[2]], angle: "angle", offset: "rOffset", base: rings[i[0]].r };
    if (kind === "sat") return { node: orbit.satellites[i[0]], angle: "angle", offset: "rOffset", base: orbit.r };
    if (kind === "satitem") return { node: orbit.satellites[i[0]].items[i[1]], angle: "angle", offset: "rOffset", base: orbit.r };
    return null;
  };

  const snapshot = () => JSON.stringify({ rings: map.rings, outerOrbit: map.outerOrbit });

  /** Содержимое, а не сами массивы: наружу отдан геттер. */
  const restore = (text) => {
    const was = JSON.parse(text);
    map.rings.forEach((ring, i) => Object.assign(ring, was.rings[i]));
    map.outerOrbit.satellites.forEach((sat, i) => Object.assign(sat, was.outerOrbit.satellites[i]));
    map.render();
  };

  const undo = () => {
    if (!history.length) return;
    restore(history.pop());
    dirty = history.length > 0;
    refresh();
    say(history.length ? "шаг назад" : "вернулись к тому, что было", "важно");
  };

  /** Выйти, потеряв несохранённое, — значит вернуть то, что на диске. */
  const undoAll = () => {
    if (!history.length) return;
    restore(history[0]);
    history.length = 0;
    dirty = false;
    refresh();
  };

  // ------------------------------------------------------------ мышь
  /** Экранная точка — в координаты рисунка, где живут CX и CY. */
  const inDrawing = (event) => {
    const viewport = document.getElementById("viewport");
    const point = new DOMPoint(event.clientX, event.clientY)
      .matrixTransform(viewport.getScreenCTM().inverse());
    return point;
  };

  // На погружении: иначе карта начнёт панорамироваться, а отпускание кнопки
  // свернёт ветку, по которой кликнули.
  document.addEventListener("pointerdown", (event) => {
    if (!editing) return;
    const group = event.target.closest("[data-at]");
    if (!group) return;

    const spot = resolve(group.dataset.at);
    if (!spot) return;

    event.stopPropagation();
    event.preventDefault();

    dragging = spot;
    moved = false;
    history.push(snapshot());
    if (history.length > 50) history.shift();
  }, true);

  document.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    event.stopPropagation();

    const point = inDrawing(event);
    const dx = point.x - map.CX;
    const dy = point.y - map.CY;

    // 0° — вверх, дальше по часовой: ровно как в polar().
    let angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    if (angle > 180) angle -= 360;

    const { node, angle: angleField, offset: offsetField, base } = dragging;
    node[angleField] = Math.round(angle * 10) / 10;

    if (!event.shiftKey) {
      const offset = Math.round(Math.hypot(dx, dy) - base);
      if (offset) node[offsetField] = offset;
      else delete node[offsetField];
    }

    moved = true;
    dirty = true;
    refresh();
    say(`${node.title} — угол ${node[angleField]}°` +
      (node[offsetField] ? `, смещение ${node[offsetField]}` : ", на окружности"), "важно");
    map.render();
  }, true);

  const release = () => {
    if (!dragging) return;
    dragging = null;
    say("не сохранено — Ctrl+S", "важно");
  };
  document.addEventListener("pointerup", release, true);
  document.addEventListener("pointercancel", release, true);

  // Клик, которым заканчивается перетаскивание, свернул бы ветку.
  document.addEventListener("click", (event) => {
    if (!moved) return;
    moved = false;
    if (event.target.closest("[data-at]")) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, true);

  // ------------------------------------------------------------ запись
  /**
   * Почему не записалось — словами, а не кодом ответа.
   *
   * 405 значит, что сервер отдал страницу, но про запись не знает. Чаще
   * всего это npm start, запущенный до того, как обработчик появился:
   * процесс держит в памяти прежний live-server.js и ничего не знает о
   * новом. Сказать «405» в такой ситуации — всё равно что промолчать.
   */
  const why = (status, text) => {
    if (status === 405 || status === 501) {
      return "сервер не умеет сохранять. Если это npm start — перезапусти его: " +
        "обработчик записи появляется только при старте";
    }
    if (status === 404) return "адрес не найден: карта открыта не с локального сервера";
    return text || ("ответ " + status);
  };

  /** Записать карту как есть. Всё, что знает о сервере, — здесь. */
  const write = () => {
    const whole = map.data || {};
    return fetch("course.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _: whole._,
        titles: whole.titles,
        rings: map.rings,
        outerOrbit: map.outerOrbit
      }, null, 2)
    })
      .then(response => response.text()
        .catch(() => "")
        .then(text => {
          if (!response.ok) throw new Error(why(response.status, text));
          // Сервер, который на PUT просто отдаёт тот же файл, ответит 200 и
          // содержимым карты — и правка будет считаться сохранённой, не
          // будучи сохранённой. Записавший отвечает "ok" и ничем иным.
          if (text.trim() !== "ok") throw new Error("сервер ответил, но не записал");
        }));
  };

  const store = () => {
    if (!dirty) return;
    say("сохраняю…");

    write()
      .then(() => {
        dirty = false;
        history.length = 0;
        refresh();
        say("сохранено в course.json");
      })
      .catch(error => say("НЕ СОХРАНИЛОСЬ: " + error.message, "плохо"));
  };

  /**
   * Выложить: коммит одного файла и пуш, дальше деплой сам.
   *
   * Карта лежит в репозитории, а не на сервере, — у неё есть история, и
   * «вернуть как было во вторник» это git. Но набирать ради этого три
   * команды незачем: кнопка делает ровно то же, и только с картой.
   *
   * На сайте правка появляется не сразу: сборка и выкладывание — минута-две.
   */
  const publish = () => {
    if (dirty) { say("сначала сохрани", "важно"); return; }

    say("выкладываю…");
    publishButton.disabled = true;

    fetch("publish", { method: "POST" })
      .then(response => response.text()
        .catch(() => "")
        .then(text => {
          if (!response.ok) throw new Error(text || ("ответ " + response.status));
          return text;
        }))
      .then(text => {
        refresh();
        say(text.startsWith("ok")
          ? `выложено (${text.slice(3)}) — на сайте через минуту-две`
          : text);
      })
      .catch(error => {
        refresh();
        say("не выложилось: " + error.message, "плохо");
      });
  };

  document.addEventListener("keydown", (event) => {
    if (!editing || !(event.ctrlKey || event.metaKey)) return;
    if (event.key === "s") { event.preventDefault(); store(); }
    if (event.key === "z") { event.preventDefault(); undo(); }
  });

  window.addEventListener("beforeunload", (event) => {
    if (dirty) event.preventDefault();
  });

  refresh();
})();
