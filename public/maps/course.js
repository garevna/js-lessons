const svgNS = "http://www.w3.org/2000/svg";
const viewport = document.getElementById("viewport");

const CX = 1220, CY = 1100;
const state = {}; // Состояние свёрнутости колец и веток
let showSatellites = true;

/**
 * Настройки вида — всё, что раньше было числами внутри кода отрисовки.
 *
 * Радиусы колец и углы веток здесь НЕ задаются: это расположение, оно
 * принадлежит самой схеме и лежит рядом с её данными (r, angle). Здесь
 * только толщина, прозрачность, пунктир и размеры — то, что меняют, когда
 * смотрят на рисунок и хотят, чтобы линия была заметнее или спокойнее.
 *
 * Менять можно прямо в браузере: look.ring.width = 8; render()
 */
const look = {
  ring: {
    width: 5,              // толщина вложенных колец
    collapsedWidth: 5,     // та же толщина у свёрнутого кольца
    dash: "6,6",           // пунктир свёрнутого (у развёрнутого линия сплошная)
    opacity: 0.85,
    collapsedOpacity: 0.45,
    headerWidth: 2,        // рамка подписи кольца
    branchWidth: 1.3,      // рамка блока ветки
    lineWidth: 1.6,        // линия от кольца к ветке
    lineOpacity: 0.65
  },
  orbit: {
    width: 1.5,            // внешняя орбита спутников — она пунктирная
    dash: "8,8",
    opacity: 0.35,
    headerWidth: 2,
    itemWidth: 1.4,
    lineWidth: 1.6,
    lineOpacity: 0.65
  },
  core: {
    r: 86,                 // внешний круг ядра
    inner: 74,             // внутренний
    width: 3
  }
};

/**
 * Координаты по углу (в градусах, 0 = верх, по часовой) и радиусу.
 *
 * Всё на карте стоит именно так — угол и радиус, а не x и y. Радиус у
 * ветки, спутника и подписи кольца берётся от их окружности, и к нему
 * прибавляется rOffset (у подписи кольца — headerOffset), если он задан:
 * обычно его нет, и блок сидит ровно на окружности, но перетащить его
 * наружу или внутрь можно, и редактор записывает тогда это число.
 *
 * Каждая группа, которую можно двигать, помечена data-at — адресом в
 * данных вида branch:1:3. Рисунку он не нужен; по нему редактор узнаёт,
 * какому узлу course.json соответствует то, что тянут мышью.
 */
function polar(angleDeg, radius) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return {
    x: Math.round(CX + radius * Math.cos(rad)),
    y: Math.round(CY + radius * Math.sin(rad))
  };
}

// 4 КОНЦЕНТРИЧЕСКИХ УРОВНЯ ("МАТРЁШКА": изнутри наружу)
/**
 * Что на карте и где оно стоит — в course.json, рядом.
 *
 * Данные лежали здесь же, восемьюстами строками литерала посреди кода
 * отрисовки. Пока их правили руками, это было не важно; редактор
 * (npm run map-edit) пишет файл, а переписывать за ним кусок HTML —
 * занятие, которое однажды испортит соседнюю строку.
 */
let rings = [];
let outerOrbit = { r: 1030, satellites: [] };
let titles = {};
let mapData = null;   // всё прочитанное целиком — его же записывает правка

/**
 * Язык читателя — тот же, на котором он читает курс.
 *
 * Карта открыта во фрейме внутри приложения, с того же адреса, так что
 * localStorage у них общий, и спрашивать у приложения нечего: ответ лежит
 * там, куда его кладёт переключатель языка. Карту, открытую отдельной
 * страницей, это тоже касается — в том же браузере ответ тот же.
 */
const LANGS = ["ru", "ua", "eng"];

const speaking = (() => {
  try {
    const kept = localStorage.getItem("lang");
    return LANGS.includes(kept) ? kept : "ru";
  } catch {
    // Страница, открытая файлом с диска, или браузер с запретом на хранение.
    return "ru";
  }
})();

/** Поле — это либо одна строка для всех, либо три языка. */
const speak = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[speaking] || value.ru || value.eng || "";
};

/** Слова самой страницы: заголовок, кнопки, легенда. */
const WORDS = {
  ru: {
    title: "Ментальная карта курса JavaScript",
    collapse: "Свернуть всё",
    expand: "Развернуть всё",
    orbitOn: "Внешний контур: ВКЛ",
    orbitOff: "Внешний контур: ВЫКЛ",
    centre: "Центрировать",
    core: "Курс JavaScript",
    orbit: "Внешний контур",
    legend: [
      "Кольцо 1 (Ядро): Основы",
      "Кольцо 2: Прототипное наследование",
      "Кольцо 3: Функциональщина",
      "Кольцо 4: Асинхронщина",
      "Орбита 5: Инженерия, Web APIs и Паттерны"
    ]
  },
  ua: {
    title: "Ментальна карта курсу JavaScript",
    collapse: "Згорнути все",
    expand: "Розгорнути все",
    orbitOn: "Зовнішній контур: УВІМК",
    orbitOff: "Зовнішній контур: ВИМК",
    centre: "Центрувати",
    core: "Курс JavaScript",
    orbit: "Зовнішній контур",
    legend: [
      "Кільце 1 (Ядро): Основи",
      "Кільце 2: Прототипне успадкування",
      "Кільце 3: Функціональщина",
      "Кільце 4: Асинхронщина",
      "Орбіта 5: Інженерія, Web APIs і Патерни"
    ]
  },
  eng: {
    title: "The JavaScript course as a mind map",
    collapse: "Collapse all",
    expand: "Expand all",
    orbitOn: "Outer ring: ON",
    orbitOff: "Outer ring: OFF",
    centre: "Centre it",
    core: "JavaScript course",
    orbit: "Outer ring",
    legend: [
      "Ring 1 (the core): the basics",
      "Ring 2: prototypal inheritance",
      "Ring 3: functional stuff",
      "Ring 4: asynchronous stuff",
      "Orbit 5: engineering, Web APIs and patterns"
    ]
  }
};

const words = WORDS[speaking] || WORDS.ru;
// ВНЕШНЯЯ ОРБИТА 5 (Спутники: Инженерия, Web APIs, Паттерны)

function createEl(tag, attrs = {}) {
  const el = document.createElementNS(svgNS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function render() {
  viewport.innerHTML = "";

  // 1. Отрисовка концентрических кругов ("Матрёшка") от внешнего к внутреннему, чтобы заливки наслаивались мягко
  const ringsDesc = [...rings].reverse();
  ringsDesc.forEach(ring => {
    const rCollapsed = !!state[ring.id];
    const gRing = createEl("g");

    // Фоновый круг уровня
    gRing.appendChild(createEl("circle", {
      cx: CX, cy: CY, r: ring.r,
      fill: ring.fill,
      stroke: ring.color,
      "stroke-width": rCollapsed ? look.ring.collapsedWidth : look.ring.width,
      "stroke-dasharray": rCollapsed ? look.ring.dash : "none",
      opacity: rCollapsed ? look.ring.collapsedOpacity : look.ring.opacity
    }));

    viewport.appendChild(gRing);
  });

  // 2. Внешняя орбита 5 (Спутники)
  if (showSatellites) {
    const satLayer = createEl("g");
    satLayer.appendChild(createEl("circle", {
      cx: CX, cy: CY, r: outerOrbit.r,
      fill: "none", stroke: "#D97706", "stroke-width": look.orbit.width, "stroke-dasharray": look.orbit.dash, opacity: look.orbit.opacity
    }));

    outerOrbit.satellites.forEach((sat, si) => {
      // Спутник без тем — сама тема: открывает урок, а не сворачивается.
      const leaf = !sat.items || !sat.items.length;
      const sCollapsed = !leaf && !!state[sat.id];
      const pos = polar(sat.angle, outerOrbit.r + (sat.rOffset || 0));

      if (!sCollapsed && !leaf) {
        sat.items.forEach((it, ii) => {
          const ipos = polar(it.angle, outerOrbit.r + it.rOffset);
          satLayer.appendChild(createEl("line", {
            x1: pos.x, y1: pos.y, x2: ipos.x, y2: ipos.y,
            stroke: sat.color, "stroke-width": look.orbit.lineWidth, opacity: look.orbit.lineOpacity
          }));

          const ig = createEl("g", { class: "node-group", "data-at": `satitem:${si}:${ii}` });
          ig.appendChild(createEl("rect", {
            x: ipos.x - it.w / 2, y: ipos.y - 14, width: it.w, height: 28, rx: 14,
            fill: "#1E293B", stroke: sat.color, "stroke-width": look.orbit.itemWidth
          }));
          const itxt = createEl("text", {
            x: ipos.x, y: ipos.y, fill: "#FDE68A", "font-size": 11.5, "font-weight": 500,
            "text-anchor": "middle", "dominant-baseline": "central"
          });
          itxt.textContent = speak(it.title);
          ig.appendChild(itxt);
          ig.onclick = (e) => {
            e.stopPropagation();
            showPanel(speak(sat.title), speak(it.title), speak(it.desc), sat.color, it.refs);
          };
          satLayer.appendChild(ig);
        });
      }

      const sg = createEl("g", { class: "node-group", "data-at": `sat:${si}` });
      sg.appendChild(createEl("rect", {
        x: pos.x - sat.w / 2, y: pos.y - 18, width: sat.w, height: 36, rx: 18,
        fill: "#78350F", stroke: "#F59E0B", "stroke-width": look.orbit.headerWidth, filter: "url(#glow)"
      }));
      const stxt = createEl("text", {
        x: pos.x, y: pos.y, fill: "#FEF3C7", "font-size": 13, "font-weight": 700,
        "text-anchor": "middle", "dominant-baseline": "central"
      });
      stxt.textContent = leaf ? speak(sat.title) : `${speak(sat.title)} ${sCollapsed ? "+" : "−"}`;
      sg.appendChild(stxt);
      sg.onclick = (e) => {
        e.stopPropagation();
        if (leaf) {
          showPanel(words.orbit, speak(sat.title), speak(sat.desc), sat.color, sat.refs);
          return;
        }
        state[sat.id] = !state[sat.id];
        render();
      };
      sg.oncontextmenu = (e) => {
        if (leaf || !sat.refs) return;
        e.preventDefault();
        showPanel(words.orbit, speak(sat.title), speak(sat.desc), sat.color, sat.refs);
      };
      satLayer.appendChild(sg);
    });

    viewport.appendChild(satLayer);
  }

  // 3. Ветки и заголовки колец
  rings.forEach((ring, ri) => {
    const rCollapsed = !!state[ring.id];
    const layer = createEl("g");

    if (!rCollapsed) {
      ring.branches.forEach((br, bi) => {
        // Ветка без потомков — сама тема, а не папка: она открывает урок.
        // Знак +/− на ней не нужен, потому что сворачивать нечего.
        const leaf = !br.items || !br.items.length;
        const bCollapsed = !leaf && !!state[br.id];
        const bPos = polar(br.angle, ring.r + (br.rOffset || 0));

        if (!bCollapsed && !leaf) {
          br.items.forEach((item, ii) => {
            const iPos = polar(item.angle, ring.r + item.rOffset);
            layer.appendChild(createEl("line", {
              x1: bPos.x, y1: bPos.y, x2: iPos.x, y2: iPos.y,
              stroke: ring.color, "stroke-width": look.ring.lineWidth, opacity: look.ring.lineOpacity
            }));

            const g3 = createEl("g", { class: "node-group", "data-at": `item:${ri}:${bi}:${ii}` });
            g3.appendChild(createEl("rect", {
              x: iPos.x - item.w / 2, y: iPos.y - 13, width: item.w, height: 26, rx: 13,
              fill: "#1E293B", stroke: ring.color, "stroke-width": look.ring.branchWidth
            }));
            const t3 = createEl("text", {
              x: iPos.x, y: iPos.y, fill: "#E2E8F0", "font-size": 11.5, "font-weight": 500,
              "text-anchor": "middle", "dominant-baseline": "central"
            });
            t3.textContent = speak(item.title);
            g3.appendChild(t3);
            g3.onclick = (e) => {
              e.stopPropagation();
              showPanel(`${speak(ring.title)} → ${speak(br.title)}`, speak(item.title), speak(item.desc), ring.color, item.refs);
            };
            layer.appendChild(g3);
          });
        }

        // Узел ветки на окружности
        const g2 = createEl("g", { class: "node-group", "data-at": `branch:${ri}:${bi}` });
        g2.appendChild(createEl("rect", {
          x: bPos.x - br.w / 2, y: bPos.y - 16, width: br.w, height: 32, rx: 16,
          fill: "#0F172A", stroke: ring.color, "stroke-width": look.ring.headerWidth
        }));
        const t2 = createEl("text", {
          x: bPos.x, y: bPos.y, fill: "#FFFFFF", "font-size": 12.5, "font-weight": 600,
          "text-anchor": "middle", "dominant-baseline": "central"
        });
        t2.textContent = leaf
          ? (br.map ? `${speak(br.title)} ⌁` : speak(br.title))
          : `${speak(br.title)} ${bCollapsed ? "+" : "−"}`;
        g2.appendChild(t2);
        g2.onclick = (e) => {
          e.stopPropagation();
          // У темы бывает своя подробная схема урока. Рисует её приложение,
          // в котором эта карта открыта во фрейме, — ему и сообщаем. Если
          // фрейма нет (карту открыли отдельной страницей), открывать нечем,
          // и остаётся карточка со ссылками.
          if (leaf && br.map && window.parent !== window) {
            window.parent.postMessage({ courseMap: "lesson-map", page: br.map }, "*");
            return;
          }
          if (leaf) {
            showPanel(speak(ring.title), speak(br.title), speak(br.desc), ring.color, br.refs);
            return;
          }
          state[br.id] = !state[br.id];
          render();
        };
        // Где клик занят — сворачиванием или схемой урока — до списка уроков
        // ведёт правая кнопка, как у подписи кольца.
        g2.oncontextmenu = (e) => {
          if (!br.refs || (leaf && !br.map)) return;
          e.preventDefault();
          showPanel(speak(ring.title), speak(br.title), speak(br.desc), ring.color, br.refs);
        };
        layer.appendChild(g2);
      });
    }

    // Заголовок самого кольца (сверху на окружности)
    const hPos = polar(ring.headerAngle, ring.r + (ring.headerOffset || 0));
    const hw = speak(ring.title).length * 8.2 + 44;
    const gHeader = createEl("g", { class: "ring-header", "data-at": `ring:${ri}` });
    gHeader.appendChild(createEl("rect", {
      x: hPos.x - hw / 2, y: hPos.y - 19, width: hw, height: 38, rx: 19,
      fill: ring.color, filter: "url(#glow)"
    }));
    const tHeader = createEl("text", {
      x: hPos.x, y: hPos.y, fill: "#FFFFFF", "font-size": 14, "font-weight": 700,
      "text-anchor": "middle", "dominant-baseline": "central"
    });
    tHeader.textContent = `${speak(ring.title)} ${rCollapsed ? "+" : "−"}`;
    gHeader.appendChild(tHeader);
    gHeader.onclick = (e) => {
      e.stopPropagation();
      state[ring.id] = !state[ring.id];
      render();
    };
    gHeader.oncontextmenu = (e) => {
      e.preventDefault();
      showPanel(speak(ring.level), speak(ring.title), speak(ring.desc), ring.color, ring.refs);
    };
    layer.appendChild(gHeader);

    viewport.appendChild(layer);
  });

  // 5. Центральное ядро
  const centerG = createEl("g");
  centerG.appendChild(createEl("circle", { cx: CX, cy: CY, r: look.core.r, fill: "#0F172A", stroke: "#38BDF8", "stroke-width": look.core.width, filter: "url(#glow)" }));
  centerG.appendChild(createEl("circle", { cx: CX, cy: CY, r: look.core.inner, fill: "#1E293B" }));
  
  const icon = createEl("text", { x: CX, y: CY - 15, fill: "#38BDF8", "font-family": "monospace", "font-size": 22, "font-weight": 700, "text-anchor": "middle" });
  icon.textContent = "{ JS }";
  centerG.appendChild(icon);

  const title = createEl("text", { x: CX, y: CY + 16, fill: "#FFFFFF", "font-size": 16, "font-weight": 700, "text-anchor": "middle" });
  title.textContent = words.core;
  centerG.appendChild(title);

  viewport.appendChild(centerG);

  fitBoxes();
  syncToggleAll();
}

/**
 * Расширить блок, если подпись в него не влезла.
 *
 * Ширины в course.json подобраны руками под русский текст. «Память и
 * среда» — четырнадцать букв, Memory and environment — двадцать две, и в
 * ту же рамку они не помещаются: подпись вылезает за края с обеих сторон.
 *
 * Поэтому рамка здесь не меняется, пока текст в неё влезает, — расставленное
 * руками остаётся как расставлено, — и растёт ровно настолько, насколько
 * нужно, когда язык оказался длиннее. Делается это после отрисовки, потому
 * что длину текста знает только сам браузер, и только когда текст уже на
 * странице.
 */
function fitBoxes() {
  const padding = 26;

  for (const group of viewport.querySelectorAll("[data-at], .ring-header")) {
    const rect = group.querySelector("rect");
    const text = group.querySelector("text");
    if (!rect || !text) continue;

    const needed = Math.ceil(text.getComputedTextLength() + padding);
    const width = Number(rect.getAttribute("width"));
    if (!(needed > width)) continue;

    rect.setAttribute("x", Number(text.getAttribute("x")) - needed / 2);
    rect.setAttribute("width", needed);
  }
}

function showPanel(tag, title, desc, color, refs = []) {
  const panel = document.getElementById("info-panel");
  const tagEl = document.getElementById("panel-tag");
  tagEl.textContent = tag;
  tagEl.style.background = color;
  tagEl.style.color = "#FFFFFF";
  document.getElementById("panel-title").textContent = title;
  document.getElementById("panel-desc").textContent = desc;

  const refsBox = document.getElementById("panel-refs");
  refsBox.innerHTML = "";
  if (refs && refs.length > 0) {
    refs.forEach(r => {
      const a = document.createElement("a");
      a.className = "ref-link";
      // Урок открывается по ?имя, а не по #имя: #-адрес приводил на
      // стартовую страницу. И адрес относительный — карта живёт и на
      // garevna.github.io/js-lessons/, и на js-lessons.pp.ua.
      //
      // Ссылка бывает и на раздел урока: page#Anchor. До якоря приложение
      // доезжает само, когда страница отрисована (page-component).
      a.href = `../?${r}`;

      // _top, а не _blank: карта открыта во фрейме внутри приложения и
      // служит для навигации по нему. Новая вкладка на каждый переход —
      // это не навигация, это коллекция вкладок. Когда карту открыли
      // отдельной страницей, _top — она сама.
      a.target = "_top";

      // Имя файла урока студенту ни о чём не говорит: подписи берутся из
      // меню курса и лежат в course.json. Чего там нет — то имя файла.
      a.textContent = speak(titles[r]) || r.split("#")[0];
      refsBox.appendChild(a);
    });
    refsBox.style.display = "flex";
  } else {
    refsBox.style.display = "none";
  }

  panel.style.display = "block";
}
function closePanel() { document.getElementById("info-panel").style.display = "none"; }

/**
 * Одна кнопка вместо двух: что она сделает, видно по надписи.
 *
 * Их было две — «Развернуть всё» и «Свернуть все уровни», — и одна из них
 * всегда была бесполезной: когда всё развёрнуто, разворачивать нечего.
 */
const anythingCollapsed = () => Object.keys(state).some(key => state[key]);

function toggleAll() {
  if (anythingCollapsed()) Object.keys(state).forEach(key => delete state[key]);
  else {
    rings.forEach(ring => { state[ring.id] = true; });
    outerOrbit.satellites.forEach(sat => { state[sat.id] = true; });
  }
  render();
}

/** Надпись на ней — после каждой отрисовки: сворачивают и поодиночке. */
function syncToggleAll() {
  const button = document.getElementById("btn-all");
  if (button) button.textContent = anythingCollapsed() ? words.expand : words.collapse;
}

function toggleSatellites() {
  showSatellites = !showSatellites;
  const btn = document.getElementById("btn-satellites");
  btn.textContent = showSatellites ? words.orbitOn : words.orbitOff;
  btn.classList.toggle("active-sat", showSatellites);
  render();
}

let scale = 0.54, panX = 180, panY = 15, isDragging = false, startX, startY;
const container = document.getElementById("canvas-container");

function updateTransform() {
  viewport.setAttribute("transform", `translate(${panX}, ${panY}) scale(${scale})`);
}
function resetView() { scale = 0.54; panX = 180; panY = 15; updateTransform(); }

container.addEventListener("mousedown", e => { isDragging = true; startX = e.clientX - panX; startY = e.clientY - panY; });
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  updateTransform();
});
window.addEventListener("mouseup", () => isDragging = false);
container.addEventListener("wheel", e => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1.1 : 0.9;
  scale = Math.min(Math.max(0.3, scale * delta), 2.5);
  updateTransform();
}, { passive: false });

/**
 * Правка карты — только на своей машине, и только там она вообще есть.
 *
 * Двигать блоки имеет смысл там, где есть куда записать результат: сервер
 * из этого репозитория (npm start или npm run map-edit) принимает PUT на
 * course.json, а сайт, разумеется, нет. Поэтому и кнопка «Редактировать»,
 * и весь код правки живут в отдельном файле, который подключается только
 * здесь: читателю он не отдаётся вовсе, а не прячется от него.
 *
 * Всё остальное в этом файле объявлено через const и let — они живут в
 * области видимости скрипта и снаружи не видны, так что нужное правке
 * названо явно. Геттеры, а не ссылки: rings и outerOrbit заменяются
 * целиком, когда приходит course.json.
 */
const local = ["127.0.0.1", "localhost", "::1"].includes(location.hostname);

if (local) {
  window.courseMap = {
    CX,
    CY,
    polar,
    render,
    get rings () { return rings; },
    get outerOrbit () { return outerOrbit; },
    get data () { return mapData; }
  };

  const editor = document.createElement("script");
  editor.src = "course-edit.js";
  document.body.appendChild(editor);
}

/** Подписи самой страницы — на языке читателя, до первой отрисовки. */
function dress() {
  document.title = words.title;
  document.getElementById("map-title").textContent = words.title;
  document.getElementById("btn-centre").textContent = words.centre;
  document.getElementById("btn-satellites").textContent = showSatellites ? words.orbitOn : words.orbitOff;

  const legend = document.querySelectorAll("#legend .legend-item span:last-child");
  words.legend.forEach((line, i) => { if (legend[i]) legend[i].textContent = line; });

  document.documentElement.lang = speaking === "eng" ? "en" : speaking === "ua" ? "uk" : "ru";
}

dress();
updateTransform();

// Данные приходят из course.json, а не живут в коде: их пишет правка
// (кнопка «Редактировать» локально), и рисунок читает тот же файл.
fetch("course.json")
  .then(response => response.json())
  .then(data => {
    mapData = data;
    rings = data.rings;
    outerOrbit = data.outerOrbit;
    titles = data.titles || {};
    render();
    window.dispatchEvent(new Event("course-map-ready"));
  })
  .catch(error => console.error("course.json не прочитан:", error));
