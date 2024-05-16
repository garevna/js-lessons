const { createPath, minifier } = require('../helpers').default

const rawSource = `
.house, .home {
  background-image: url(${createPath('icons', 'home.png')});
}
.page-next {
  background-image: url(${createPath('icons', 'page-next.svg')});
}
.page-previous {
  background-image: url(${createPath('icons', 'page-previous.svg')});
}

.open-in-new {
  background-image: url(${createPath('icons', 'open-in-new.svg')});
}

.menu {
  background-image: url(${createPath('icons', 'table-of-contents-white.svg')});
}
.warn, .warning {
  background-image: url(${createPath('icons', 'warning.png')});
}
.cap, .coffee {
  background-image: url(${createPath('icons', 'coffee.png')});
}
.link {
  background-image: url(${createPath('icons', 'link.png')});
}
.link-ico {
  background-image: url(${createPath('icons', 'link-ico.png')});
}
.link-dark {
  background-image: url(${createPath('icons', 'link-dark.png')});
}
.link-grey {
  background-image: url(${createPath('icons', 'link-grey.png')});
}

.error, no-entry {
  background-image: url(${createPath('icons', 'no_entry.png')});
}
.pencil {
  background-image: url(${createPath('icons', 'pencil.png')});
}
.paper, .page_facing_up {
  background-image: url(${createPath('icons', 'page_facing_up.png')});
}
.file, .memo {
  background-image: url(${createPath('icons', 'memo.png')});
}
.dir, .folder, .open_file_folder {
  background-image: url(${createPath('icons', 'open_file_folder.png')});
}
.smile, .emotion, .wink {
  background-image: url(${createPath('icons', 'wink.png')});
}
.hw, .briefcase {
  background-image: url(${createPath('icons', 'briefcase.png')});
}
.study, .mortar_board {
  background-image: url(${createPath('icons', 'study.png')});
}
.require, .point_up {
  background-image: url(${createPath('icons', 'point.png')});
}
.good, .ok_hand {
  background-image: url(${createPath('icons', 'ok-hand.png')});
}
.exelent, .thumbsup {
  background-image: url(${createPath('icons', 'good-hand.png')});
}
.search, .mag {
  background-image: url(${createPath('icons', 'search.png')});
}
.art, .palette {
  background-image: url(${createPath('icons', 'art.png')});
}
.sand-watch, .hourglass {
  background-image: url(${createPath('icons', 'sand-watch.png')});
}
.green-ok, .white_check_mark {
  background-image: url(${createPath('icons', 'green-ok.png')});
}
.pin, .pushpin {
  background-image: url(${createPath('icons', 'pushpin.png')});
}
.pen {
  background-image: url(${createPath('icons', 'pen.png')});
}
.pencil {
  background-image: url(${createPath('icons', 'pencil.png')});
}
.mail, .envelope {
  background-image: url(${createPath('icons', 'envelope.png')});
}
.book {
  background-image: url(${createPath('icons', 'book.png')});
}
.books {
  background-image: url(${createPath('icons', 'books.png')});
}
.lock {
  background-image: url(${createPath('icons', 'lock.png')});
}
.unlock {
  background-image: url(${createPath('icons', 'unlock.png')});
}
.key {
  background-image: url(${createPath('icons', 'key.png')});
}
.trophy {
  background-image: url(${createPath('icons', 'trophy.png')});
}
.yes, .exclamation {
  background-image: url(${createPath('icons', 'exclamation.png')});
}
.question {
  background-image: url(${createPath('icons', 'question.png')});
  outline: 2px solid #d00;
  border: solid 4px transparent;
  border-radius: 50%;
  box-shadow: 3px 3px 5px #0007;
}
.ambulance {
  background-image: url(${createPath('icons', 'ambulance.png')});
}
.toilet {
  background-image: url(${createPath('icons', 'toilet.png')});
}
.octocat {
  background-image: url(${createPath('icons', 'octocat.png')});
}
.speach, .speech_balloon {
  background-image: url(${createPath('icons', 'speech_balloon.png')});
}
.star {
  background-image: url(${createPath('icons', 'star.png')});
}
.negation {
  background-image: url(${createPath('icons', 'not.png')});
}

.arrow-right {
  background-image: url(${createPath('icons', 'arrow_right.png')});
}

.db {
  background-image: url(${createPath('icons', 'db.png')});
}

.node {
  background-image: url(${createPath('icons', 'node.png')});
}

.npm {
  background-image: url(${createPath('icons', 'npm.png')});
}
.bash {
  background-image: url(${createPath('icons', 'bash.png')});
}
.youtube {
  background-image: url(${createPath('icons', 'youtube.png')});
  height: 32px;
}
.debug-button {
  background-image: url(${createPath('icons', 'debug-button.png')});
}
.debug-paused {
  background-image: url(${createPath('icons', 'debug-paused.png')});
}
.reload {
  background-image: url(${createPath('icons', 'reload.png')});
}
.git, .git-ver {
  background-image: url(${createPath('icons', 'git.png')});
}
.curl {
  background-image: url(${createPath('icons', 'curl.svg')});
}

.ico-20, .ico-25, .ico-30, .ico-35, .ico-40, .ico-50, .ico-70 {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  vertical-align: middle;
}
.ico-20 { width: 20px; height: 20px; margin: 4px 4px 8px; }
.ico-25 { width: 24px; height: 24px; margin: 8px 4px 12px; }
.ico-30 { width: 30px; height: 30px; margin: 16px 4px; }
.ico-35 { width: 36px; height: 36px; margin: 16px 4px; }
.ico-40 { width: 40px; height: 40px; margin: 16px 4px; }
.ico-50 { width: 48px; height: 48px; margin: 16px 4px; }
.ico-70 { width: 64px; height: 64px; margin: 16px 4px; }

.main-page {
  background-image: url(${createPath('images', 'js-cap.png')});
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  margin: 16px 4px;
  vertical-align: middle;
  width: 200px;
  height: 200px;
}

.slider-button {
  background-image: url(${createPath('icons', 'slider-5.gif')});
  margin-top: 16px;
}
.slider-button:hover {
  background-image: url(${createPath('icons', 'slider-2.gif')});
}

.icon {
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  border: solid 2px #fff;
  box-shadow: 2px 2px 2px #00000090;
  background-color: #057;
  background-image: var(--icon);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 55%;
  background-blend-mode: luminosity;
}

.atom {
  background-image: url(${createPath('icons', 'atom.png')});
}
.sublime {
  background-image: url(${createPath('icons', 'sublime.png')});
}
`

export const iconStyles = minifier(rawSource)
