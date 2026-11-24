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

  const say = (text, warm) => {
    said.textContent = text || "";
    said.style.color = warm ? "#F59E0B" : "#94A3B8";
  };

  const undoButton = button("Отменить (Ctrl+Z)", () => undo());
  const saveButton = button("Сохранить (Ctrl+S)", () => store());
  const editButton = button("Редактировать", () => toggle());

  saveButton.style.display = undoButton.style.display = "none";

  const refresh = () => {
    saveButton.disabled = !dirty;
    undoButton.disabled = !history.length;
  };

  const toggle = () => {
    editing = !editing;
    editButton.textContent = editing ? "Закончить правку" : "Редактировать";
    editButton.classList.toggle("active", editing);
    saveButton.style.display = undoButton.style.display = editing ? "" : "none";
    container.style.cursor = editing ? "crosshair" : "";
    say(editing ? "тяни блок мышью · Shift — по окружности" : "");
    refresh();
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

  const undo = () => {
    if (!history.length) return;
    const was = JSON.parse(history.pop());
    // Содержимое, а не сами массивы: наружу отдан геттер.
    map.rings.forEach((ring, i) => Object.assign(ring, was.rings[i]));
    map.outerOrbit.satellites.forEach((sat, i) => Object.assign(sat, was.outerOrbit.satellites[i]));
    map.render();
    dirty = true;
    refresh();
    say(history.length ? "шаг назад" : "вернулись к началу", true);
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
      (node[offsetField] ? `, смещение ${node[offsetField]}` : ", на окружности"), true);
    map.render();
  }, true);

  const release = () => {
    if (!dragging) return;
    dragging = null;
    say("не сохранено", true);
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
  const store = () => {
    if (!dirty) return;
    say("сохраняю…");

    const whole = map.data || {};
    fetch("course.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _: whole._,
        titles: whole.titles,
        rings: map.rings,
        outerOrbit: map.outerOrbit
      }, null, 2)
    })
      .then(response => response.ok
        ? response.text()
        : response.text().then(text => Promise.reject(new Error(text || response.status))))
      .then(() => {
        dirty = false;
        history.length = 0;
        refresh();
        say("сохранено в course.json");
      })
      .catch(error => say("не сохранилось: " + error.message, true));
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
