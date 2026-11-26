/**
 * Рисует public/images/lessons/microtasks-jump-the-queue.svg — анимацию к
 * разделу Microtask урока Event Loop: пока тяжёлые таски ждут в своей
 * очереди, микротаски один за другим проскакивают в Call Stack.
 *
 * Почему SVG, а не гифка. В <img> анимация играет одинаково, но SVG весит
 * 18 килобайт вместо двухсот, остаётся чётким на любом экране и правится
 * текстом: поменять скорость, цвета или число микротасков — это строчка
 * здесь, а не перерисовка всех кадров.
 *
 * Почему генератор, а не сам файл руками. Вся анимация держится на
 * процентах внутри @keyframes, а проценты эти — время, делённое на длину
 * цикла. Расписание ниже задано в секундах, по-человечески; проценты из
 * него считаются сами. Сводить их руками для девяти участников, у каждого
 * из которых свой выезд, своя работа и свои сдвиги по очереди, — дело
 * безнадёжное: одна правка времени ломает весь столбец чисел.
 *
 *     npm run animation
 *
 * После правок стоит посмотреть, что получилось, — страница урока или сам
 * файл, открытый в браузере.
 */
const fs = require('fs')
const path = require('path')

const CYCLE = 12 // секунд на полный круг

// Кто когда уезжает в стек. at — момент выезда, work — сколько работает
// в стеке. Порядок важен: в очереди стоят в том же порядке, что и здесь.
const tasks = [
  { at: 0.2, work: 1.6 },
  { at: 5.2, work: 1.6 },
  { at: 9.4, work: 1.3 }
]

const micros = [
  { at: 2.9, work: 0.25 },
  { at: 3.7, work: 0.25 },
  { at: 4.5, work: 0.25 },
  { at: 8.1, work: 0.25 },
  { at: 8.6, work: 0.25 },
  { at: 9.1, work: 0.25 }
]

// travel — сколько едет до стека, leave — сколько уходит из него,
// slot — шаг между соседями в очереди, first — где стоит первый,
// lane — высота дорожки, size — сторона квадрата.
const TASK = { travel: 0.6, leave: 0.5, slot: 118, first: 520, lane: 234, size: 84 }
const MICRO = { travel: 0.28, leave: 0.22, slot: 60, first: 520, lane: 120, size: 46 }

// Внутри стека оба садятся на дно: таск едет туда по прямой, микротаск
// ныряет со своей дорожки вниз.
const STACK = { x: 158, taskY: 234, microY: 272 }

const pct = time => `${((time / CYCLE) * 100).toFixed(3)}%`

/**
 * Кадры для одного участника: стоит в очереди, сдвигается вперёд, когда
 * уезжает тот, кто был перед ним, потом едет в стек, работает, уходит
 * вверх и невидимым возвращается на своё место к началу круга.
 */
function keyframes (name, index, all, look, inStackY) {
  const steps = []
  const slotX = place => look.first + place * look.slot
  const at = time => Math.max(0, Math.min(CYCLE, time))

  let place = index
  steps.push([0, `translate(${slotX(place)}px, ${look.lane}px)`, 1])

  for (let ahead = 0; ahead < index; ahead++) {
    const when = all[ahead].at
    steps.push([at(when), `translate(${slotX(place)}px, ${look.lane}px)`, 1])
    place--
    steps.push([at(when + 0.3), `translate(${slotX(place)}px, ${look.lane}px)`, 1])
  }

  const me = all[index]
  steps.push([at(me.at), `translate(${slotX(0)}px, ${look.lane}px)`, 1])
  steps.push([at(me.at + look.travel), `translate(${STACK.x}px, ${inStackY}px)`, 1])
  steps.push([at(me.at + look.travel + me.work), `translate(${STACK.x}px, ${inStackY}px)`, 1])
  steps.push([at(me.at + look.travel + me.work + look.leave), `translate(${STACK.x}px, ${inStackY - 120}px)`, 0])
  steps.push([at(me.at + look.travel + me.work + look.leave + 0.01), `translate(${slotX(index)}px, ${look.lane}px)`, 0])
  steps.push([CYCLE - 0.01, `translate(${slotX(index)}px, ${look.lane}px)`, 0])
  steps.push([CYCLE, `translate(${slotX(index)}px, ${look.lane}px)`, 1])

  const body = steps
    .map(([time, transform, opacity]) => `  ${pct(time)} { transform: ${transform}; opacity: ${opacity} }`)
    .join('\n')

  return `@keyframes ${name} {\n${body}\n}`
}

/** Покачивание, пока участник работает в стеке. */
function working (name, me, look) {
  const start = me.at + look.travel
  const end = start + me.work
  const frames = [[0, 0], [Math.max(0, start - 0.01), 0]]
  const beats = Math.max(2, Math.round(me.work / 0.18))
  for (let i = 1; i <= beats; i++) {
    frames.push([start + (me.work * i) / beats, i % 2 ? -4 : 0])
  }
  frames.push([end, 0], [CYCLE, 0])
  const body = frames
    .map(([time, dy]) => `  ${pct(Math.min(time, CYCLE))} { transform: translateY(${dy}px) }`)
    .join('\n')
  return `@keyframes ${name} {\n${body}\n}`
}

// ------------------------------------------------------------------ рисуем

/** Тяжёлый таск: сердитый, с каплей пота и тяжёлым низом. */
const taskFace = (w, colour, dark) => `
  <ellipse cx="${w / 2}" cy="${w + 7}" rx="${w * 0.42}" ry="5" fill="#000" opacity=".12"/>
  <rect width="${w}" height="${w}" rx="12" fill="url(#${colour})" stroke="${dark}" stroke-width="2.5"/>
  <rect x="6" y="${w - 16}" width="${w - 12}" height="8" rx="4" fill="${dark}" opacity=".25"/>
  <g fill="#3a2a10">
    <ellipse cx="${w * 0.32}" cy="${w * 0.42}" rx="4.5" ry="5.5"/>
    <ellipse cx="${w * 0.68}" cy="${w * 0.42}" rx="4.5" ry="5.5"/>
  </g>
  <path d="M ${w * 0.2} ${w * 0.3} L ${w * 0.42} ${w * 0.36}" stroke="#3a2a10" stroke-width="3" stroke-linecap="round"/>
  <path d="M ${w * 0.8} ${w * 0.3} L ${w * 0.58} ${w * 0.36}" stroke="#3a2a10" stroke-width="3" stroke-linecap="round"/>
  <path d="M ${w * 0.3} ${w * 0.72} Q ${w * 0.5} ${w * 0.58} ${w * 0.7} ${w * 0.72}" fill="none" stroke="#3a2a10" stroke-width="3" stroke-linecap="round"/>
  <path d="M ${w * 0.86} ${w * 0.12} q 5 9 0 12 q -5 -3 0 -12" fill="#9fd8f5" stroke="#5fa8d8" stroke-width="1.2"/>`

/** Микротаск: улыбается, за ним штрихи скорости. */
const microFace = (w, colour, dark) => `
  <ellipse cx="${w / 2}" cy="${w + 6}" rx="${w * 0.4}" ry="4" fill="#000" opacity=".12"/>
  <rect width="${w}" height="${w}" rx="10" fill="url(#${colour})" stroke="${dark}" stroke-width="2"/>
  <g fill="#063">
    <circle cx="${w * 0.33}" cy="${w * 0.4}" r="3.6"/>
    <circle cx="${w * 0.67}" cy="${w * 0.4}" r="3.6"/>
  </g>
  <path d="M ${w * 0.28} ${w * 0.6} Q ${w * 0.5} ${w * 0.82} ${w * 0.72} ${w * 0.6}" fill="none" stroke="#063" stroke-width="2.6" stroke-linecap="round"/>
  <g stroke="${dark}" stroke-width="2.4" stroke-linecap="round" opacity=".75">
    <path d="M ${w + 5} ${w * 0.3} h 12"/>
    <path d="M ${w + 5} ${w * 0.55} h 18"/>
    <path d="M ${w + 5} ${w * 0.8} h 9"/>
  </g>`

const taskColours = [['taskA', '#c05600'], ['taskB', '#b34700'], ['taskC', '#a33f00']]
const microColours = [['microA', '#067'], ['microB', '#067'], ['microC', '#067'], ['microA', '#067'], ['microB', '#067'], ['microC', '#067']]

const css = []
const shapes = []

tasks.forEach((me, index) => {
  css.push(keyframes(`taskRide${index}`, index, tasks, TASK, STACK.taskY))
  css.push(working(`taskWork${index}`, me, TASK))
  const [colour, dark] = taskColours[index]
  shapes.push(`
  <g class="rider" style="animation-name: taskRide${index}">
    <g style="animation: taskWork${index} ${CYCLE}s linear infinite">
      ${taskFace(TASK.size, colour, dark)}
    </g>
  </g>`)
})

micros.forEach((me, index) => {
  css.push(keyframes(`microRide${index}`, index, micros, MICRO, STACK.microY))
  const [colour, dark] = microColours[index]
  // Микротаски нетерпеливо подпрыгивают — вразнобой, чтобы очередь жила.
  shapes.push(`
  <g class="rider" style="animation-name: microRide${index}">
    <g style="animation: hop .9s ease-in-out infinite; animation-delay: -${(index * 0.17).toFixed(2)}s">
      ${microFace(MICRO.size, colour, dark)}
    </g>
  </g>`)
})

css.push(`@keyframes hop {
  0%, 100% { transform: translateY(0) }
  45% { transform: translateY(-5px) }
}`)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" width="900" height="400" role="img"
     aria-label="Microtasks slip into the call stack one after another while heavy tasks wait in the task queue">
  <title>Microtasks jump the queue</title>
  <defs>
    <linearGradient id="taskA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffc247"/><stop offset="1" stop-color="#f98a00"/>
    </linearGradient>
    <linearGradient id="taskB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffb14a"/><stop offset="1" stop-color="#f07400"/>
    </linearGradient>
    <linearGradient id="taskC" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffa14a"/><stop offset="1" stop-color="#e86a00"/>
    </linearGradient>
    <linearGradient id="microA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7fe3c0"/><stop offset="1" stop-color="#17b890"/>
    </linearGradient>
    <linearGradient id="microB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8be9d0"/><stop offset="1" stop-color="#12a884"/>
    </linearGradient>
    <linearGradient id="microC" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#76dfbb"/><stop offset="1" stop-color="#0f9c7c"/>
    </linearGradient>
  </defs>

  <style>
    text { font-family: Verdana, 'DejaVu Sans', sans-serif }
    .rider { animation-duration: ${CYCLE}s; animation-timing-function: cubic-bezier(.4, 0, .2, 1); animation-iteration-count: infinite }
    @media (prefers-reduced-motion: reduce) { .rider { animation: none } }
${css.join('\n')}
  </style>

  <rect width="900" height="400" rx="16" fill="#fbfdff"/>

  <!-- стек -->
  <rect x="118" y="70" width="196" height="260" rx="14" fill="#fff" stroke="#0799" stroke-width="3"/>
  <path d="M 128 322 H 304" stroke="#0796" stroke-width="6" stroke-linecap="round"/>
  <text x="216" y="50" text-anchor="middle" font-size="26" font-weight="bold" fill="#079">Call Stack</text>

  <!-- дорожки очередей, стрелки смотрят в стек -->
  <path d="M 880 143 H 346" stroke="#bfe6dd" stroke-width="3" stroke-dasharray="10 8"/>
  <path d="M 880 276 H 346" stroke="#ffd9a8" stroke-width="3" stroke-dasharray="10 8"/>
  <path d="M 348 143 l 22 -11 v 22 z" fill="#7fd0bb"/>
  <path d="M 348 276 l 22 -11 v 22 z" fill="#ffc681"/>
  <text x="878" y="98" text-anchor="end" font-size="21" font-weight="bold" fill="#0a8f72">microtask queue</text>
  <text x="878" y="372" text-anchor="end" font-size="21" font-weight="bold" fill="#d07000">task queue</text>
${shapes.join('\n')}
</svg>
`

const out = path.join(__dirname, '..', 'public', 'images', 'lessons', 'microtasks-jump-the-queue.svg')
fs.writeFileSync(out, svg, 'utf8')
console.log(`${path.relative(path.join(__dirname, '..'), out).split(path.sep).join('/')} — ${Math.round(Buffer.byteLength(svg) / 1024)} КБ`)
