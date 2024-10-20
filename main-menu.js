(()=>{"use strict";function e(e,n){localStorage.setItem(e,n),window.dispatchEvent(Object.assign(new Event("storage"),{key:e,value:n}))}function n(){return window[Symbol.for("content.worker")]||(window[Symbol.for("content.worker")]=Object.assign(new Worker(`${location.origin}${location.pathname}content.worker.js`),{onerror:e=>console.error("! Content worker Error\n",e)})),window[Symbol.for("content.worker")]}class t extends HTMLElement{constructor(){super(),Object.assign(this,{worker:n(),active:this.ref===location.search.slice(1)}),addEventListener("storage",function(e){const{key:n,value:t}=e;"active-topic"===n&&this.ref!==t&&this.active&&this.deactivate()}.bind(this))}getClassName(){return"sub-level-item"+(this.active?"--active":"")+(this.translated?" translated":"")}activate(){this.active=!0,this.className=this.getClassName()}deactivate(){this.active=!1,this.className=this.getClassName()}switchActive(){const e=localStorage.getItem("active-topic");this.active=e===this.ref,this.className=this.getClassName()}connectedCallback(){this.switchActive();const{mainMenu:e,lesson:n,ref:t,title:i,translated:s}=this;Object.assign(this,{innerText:i,className:this.getClassName(),ref:t,translated:s,onclick:this.clickHandler.bind(this)})}clickHandler(n){e("active-topic",this.ref),e("active-lesson",this.lesson.ref),this.mainMenu.dispatchEvent(Object.assign(new Event("sublevel-item-clicked"),{sublevelItem:this}))}}customElements.define("main-menu-sublevel-item",t);class i extends HTMLElement{constructor(){super(),addEventListener("storage",this.storageEventCallback.bind(this))}connectedCallback(){this.active=localStorage.getItem("active-lesson")===this.ref,this.expanded=localStorage.getItem("expanded")===this.ref;const{mainMenu:e,title:n,ref:t,items:i}=this;if(!e)return console.warn("Error: mainMenu is not defined",this.mainMenu);this.innerHTML=((e,n)=>`\n<div id="${n}" class="lesson-menu-item">\n  ${e}\n</div>\n<ul id="${n||e}-sublevel" class="sub-level"></ul>\n`)(n,t),Object.assign(this,{clickableArea:Object.assign(this.querySelector(`#${t}`),{onclick:this.clickCallback.bind(this)}),subLevel:this.querySelector("ul.sub-level"),status:"not-expanded",submenuOptions:i.map((e=>{const{ref:n,title:t,translated:i}=e;return Object.assign(document.createElement("main-menu-sublevel-item"),{mainMenu:this.mainMenu,lesson:this,ref:n,title:t,translated:i})}))}),window.addEventListener("storage",this.storageEventCallback.bind(this)),this.active&&this.expand()}storageEventCallback(e){const{key:n,value:t}=e;"active-lesson"!==n?"expanded"===n&&this.expanded&&this.ref!==t&&this.collapse():this.ref===t?!this.active&&this.activate():this.active&&this.deactivate()}activate(){this.active=!0,this.stylize()}deactivate(){this.active=!0,this.stylize()}expand(){e("expanded",this.ref),this.expanded=!0;let n=0;for(const e of this.submenuOptions)setTimeout(function(){this.subLevel.appendChild(e),this.stylizeSubitem.call(e)}.bind(this),100*n++);this.stylize()}collapse(){if(!this.expanded||!this.subLevel.children.length)return;this.expanded=!1;let e=0;for(const n of this.submenuOptions)setTimeout(function(){this.subLevel.removeChild(n)}.bind(this),100*e++);this.stylize()}stylize(){this.clickableArea&&(this.clickableArea.className=this.active?"lesson-menu-item--active"+(this.expanded?"--expanded":""):"lesson-menu-item"+(this.expanded?"--expanded":""))}stylizeSubitem(){const e=localStorage.getItem("active-topic");this.active=this.ref===e}clickCallback(e){this.expanded=!this.expanded,this.expanded?this.expand():this.collapse(),location.search.slice(1)}closeCallback(e){e.target.icon.className="icon";let n=0;for(const t of e.target.querySelectorAll("li.sub-level-item"))setTimeout(function(){t.remove()}.bind(this),40*n++);this.textElement.className="lesson-menu-item",e.target.active=!1}}customElements.define("main-menu-item",i);class s extends HTMLElement{constructor(){super(),this.worker=n(),this.innerHTML='\n      <div class="search-wrapper">\n        <div id="search-component">\n          <input type="text" id="search-input" />\n          <input type="reset" id="search-reset" value="✖" />\n        </div>\n        <div id="search-button" class="search-icon"></div>\n      </div>\n    '}connectedCallback(){this.input=this.querySelector("#search-input"),this.reset=this.querySelector("#search-reset"),this.button=this.querySelector("#search-button"),this.mainMenu=document.querySelector("main-menu"),this.button.onclick=this.search.bind(this),this.reset.onclick=this.resetSearch.bind(this)}search(e){this.worker.postMessage({route:"search",param:this.input.value.toLowerCase()})}resetSearch(e){this.input.value="",this.worker.postMessage({route:"search",param:""})}}customElements.define("search-component",s);const a={page:"page/",lessons:"lessons/",help:"help/",icons:"icons/",images:"images/",sounds:"sounds/",illustrations:"images/lessons/",demo:"lessons/js",external:"external/",inside_the_page:"",externalIcons:"icons/",files:"files/",404:"page not found"};function o(e,n){return(n||document.body).appendChild(document.createElement(e))}const c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADuUlEQVR4Xu2ZT2tcZRjFf8975yaZJJMmmWAbJFWkroo7iYLuXLhwr4LgVvwEQqFYXFjwI7izWMStK7+BWMRNEMU/GAVJKnbSJJ1pJ3fe5wgSGDJ5aSYki/re+cFdzPZwnnPuuUNNmTBhwoQJEyZMmGAc8usXy2sEPsFY4HSEqSpeMWnW961T3fU/eQwC61bTVwZuLQxtd+c6G52Lf0iciCQB31TP37l54wZ+rgL88mX7c3femWo4ZyFsVvBInIbv/l7l5502JyFElAHcvH7722ucAw0OUdRKoxBryz3OgsVI2BpwGmbCFlsPFhmH7iBQub0NnK8ALggO7pyNC4GwDYixaTd7FCaijJMICLBnP353vX3t1p175+cAHT7O2QiGtwJhzxmXwsRKs8fd3hwnURbwyDEsvAJ8dW4C4EImJHFWqtUGoeVYZGzWW1vs9JuchGT8tTvNwnz/ox9fa7/FmJipL/S9T+98evVNDo6F4A+fLX1dBL1+ud3jSWenW7L3sOQ0uBtRhsFG/6Dz8ovv0Rs9AcNBzhPPYrP67zkt3X6DrfszL8yUyx9A58OjITgAb4A72dIsB5SFU0V7KdECMjnIyRuBoqaSLeAjNViuPM3U6jMQCvJAlL/t09/8PVGDDrKhAMVsi9mr62BGTpSX2rSK8jL8M1KDEQQoAkCYXRhaIyMMEZrzC8ccEB0zE+4CQCJTBGaPOYE4/J0rAh13AFBomAHumdpAgOu4ABpgXtTDASYT6TFUhwwALHECPtICcmV6AsJF2gEucCd7BxjpEzD3kRDMFE9/EgNpJAQzPQFLtUB0EQyGIah6haAiOEMHeAQ8TweQcgDAkTmsfFsA83QNhnDEAVmegSTcTckxFAD3/ENQDgkH+GEGCAC5Z7sFDCVOwDFZTRygRAvg4EMBcGUqAEo7IDoEA09sgXrUoECRoQCRfMcQpGvQi+Ecjsq3Bi0pgINThxMASaS/CTJ6AuSHAEfpORx1dA6757kGlWqBKMw0fBGKnmsIPmYNjtRglg5wgY+MoSQiXwdgSQGMI2TqAIE81tUB6RpMo1wzgNQ3wTTKUAC5pTMAYdiIAySyZEwHZHoCBjZWCOa7BdJ/jhpWDwcEpFo7QEiivhkgwE01fg+w9AcREwM3oxdLADp7sLNvmIlciA79AygU7x0TIBS6FRVe3a1mGgB72wMaPz1g6eI8OVEWg/vzjep6cgDdfv/CUhFZnsN3AR5WsrXn2iuLl5qzYWmuy/+cxZmDg6fe2Ng0w5kAAP8CwlWMoBY2dZkAAAAASUVORK5CYII=",r="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTIwLDE4SDRWOEgyME0yMCw2SDEyTDEwLDRINEMyLjg5LDQgMiw0Ljg5IDIsNlYxOEEyLDIgMCAwLDAgNCwyMEgyMEEyLDIgMCAwLDAgMjIsMThWOEMyMiw2Ljg5IDIxLjEsNiAyMCw2WiIgZmlsbD0iI2ZkNSIgLz4KPC9zdmc+Cg==";const h=`\n* {\n  box-sizing: border-box;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n\n#main-menu-shadow {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: #0008;\n  box-sizing: border-box;\n  display: none;\n}\n\n.main-menu-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 48px;\n  box-shadow: 2px 2px 4px #00000090;\n  z-index: 55;\n  background: url(${function(){const e=location.href.split("?")[0];return function(n,t,i){const s=i||localStorage.getItem("lang")||"eng";switch(n){case"files":return`${e}${n}/${i}.json`;case"404":return`${e}lessons/404.md`;case"help":return`${e}help/${t}.html`;case"page":return`${e}?${t.replace(".md","")}`;case"lessons":return`${e}lessons/${s}/${t}`;case"demo":return`${e}lessons/js/${t}`;default:return`${e}${a[n]||""}${t}`}}}()("images","stars-in-line.gif")}), var(--header-back-color);\n  background-size: contain, 100%;\n  background-repeat: repeat-x, no-repeat;\n  background-blend-mode: overlay;\n}\n\n.main-menu-wrapper:before {\n  content: "Client-side JS";\n  font-family: var(--welcome-win-font);\n  color: #def;\n  display: block;\n  padding: 8px 16px;\n  font-size: 30px;\n  mix-blend-mode: difference;\n  letter-spacing: 2;\n}\n\n#top-donate {\n  position: absolute;\n  top: 0;\n  right: 108px;\n  cursor: pointer;\n  z-index: 504;\n  transition: all .5s;\n}\n\n.go-to-home {\n  position:absolute;\n  top: 24px;\n  left: 12px;\n  display: inline-block;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: left center;\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMTI4IgogICBoZWlnaHQ9IjEyOCIKICAgaWQ9InN2ZzIiCiAgIHNvZGlwb2RpOnZlcnNpb249IjAuMzIiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuNDguMCByOTY1NCIKICAgdmVyc2lvbj0iMS4wIgogICBzb2RpcG9kaTpkb2NuYW1lPSJob21lX2FsdC5zdmciCiAgIGlua3NjYXBlOm91dHB1dF9leHRlbnNpb249Im9yZy5pbmtzY2FwZS5vdXRwdXQuc3ZnLmlua3NjYXBlIj4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMi44Mjg0MjcyIgogICAgIGlua3NjYXBlOmN4PSI2OS45NzE5NDciCiAgICAgaW5rc2NhcGU6Y3k9IjY2LjIwOTA5MSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iOTYyIgogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE3Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDYuNzgzMjgsLTU3MC42OTMzMikiPgogICAgPGcKICAgICAgIGlkPSJnMjk4NiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMzY4NjY3NDgsMCwwLDAuMzY4NjY3NDgsNy43NTUxNTM3LDQ1Ni43MTk0NCkiCiAgICAgICBzdHlsZT0iZmlsbDojZmEwO2ZpbGwtb3BhY2l0eToxIj4KICAgICAgPHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjY2NjY2NjY2NjY2MiCiAgICAgICAgIGlkPSJyZWN0MjM5MSIKICAgICAgICAgZD0ibSAzNzQuOTM3MzEsNDg1LjE1NjYxIDAsMCB6IG0gMCwwIC05NS40NDg5OCwtODQuNTMwMDUgLTk1LjUwMzk0LDg0LjU2NjY5IDAsMTIwLjg0MDk4IGMgMCwzLjEyMDgzIDIuNTIxODMsNS42MjQzNCA1LjY0MjY3LDUuNjI0MzQgbCA1OS42ODc2NywwIDAsLTUyLjk4MjQzIGMgMCwtMy4xMjA4NSAyLjUwMzUxLC01LjY0MjY2IDUuNjI0MzQsLTUuNjQyNjYgbCA0OS4wNDM1NiwwIGMgMy4xMjA4MSwwIDUuNjI0MzQsMi41MjE4MyA1LjYyNDM0LDUuNjQyNjYgbCAwLDUyLjk4MjQzIDU5LjcwNTk5LDAgYyAzLjEyMDgzLDAgNS42MjQzNiwtMi41MDM1IDUuNjI0MzUsLTUuNjI0MzQgbCAwLC0xMjAuODc3NjIgeiBtIC0xOTAuOTUyOTIsMC4wMzY2IDAsMCB6IgogICAgICAgICBzdHlsZT0iZmlsbDojMDliO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgogICAgICA8cGF0aAogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBpZD0icGF0aDIzOTkiCiAgICAgICAgIGQ9Im0gMjc4LjkzNDQ1LDM1NC4zNjY1IC0xMzUuNDUyNDEsMTE5LjkzNzMgMTQuMjY4MzYsMTYuMDk2OTIgMTIxLjczODE2LC0xMDcuODAyMjcgMTIxLjcxMDQ1LDEwNy44MDIyNyAxNC4yNDA2NSwtMTYuMDk2OTIgLTEzNS40MjQ3LC0xMTkuOTM3MyAtMC41MjY0LDAuNjA5NTIgLTAuNTU0MTEsLTAuNjA5NTIgeiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZhMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjYyIKICAgICAgICAgaWQ9InJlY3QyNDA0IgogICAgICAgICBkPSJtIDE4My45ODQzOSwzNzEuNjMxMDIgMzQuMzM3NTYsMCAtMC4yOTkyMiwyMC4zMzc2OSAtMzQuMDM4MzQsMzAuNzQ5ODkgMCwtNTEuMDg3NTggeiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZhMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=);\n  vertical-align: text-bottom;\n  width: auto;\n  height: 32px;\n  padding-left: 40px;\n  padding-top: 8px;\n  margin-left: 8px;\n}\n\n.home:hover {\n  color: #fa0;\n}\n\nhr {\n  margin: 16px 0;\n  height: 2px;\n  border: 0;\n  background: linear-gradient(to bottom, #fff 0%, #09b 58%);\n}\n\n.search-wrapper {\n  margin: 20px 0 0 28px;\n  color: #eee;\n}\n\n.search-icon, .icon, .icon-active {\n  display: inline-block;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center center;\n  vertical-align: middle;\n  margin: 8px;\n}\n\n.search-icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAALp0lEQVR4XuWYa2xdVXbHf2ufc6+vHcd2jJPwCCE8EmZwhkJ5FogmlJd4ZdSqvGkUqTOoQm2pmKrTqkOdfKimnWo6UBW1U1HG7RDBwMyUCa8hJHEghUIDJU3ikPcDJyEvJ35c+95zzt5r9V4jYhFbTa+HqB+6l9bZ6xxL9//Tf+195H3E+L8djv/vADGcPFYXomtlPu3MpEWwPj6m21aHt+eX+aXHSdfAmkX2iFwCIBiC4rDP6nXyxLzOUwiwerF0CCCAIyYiDxgJgYAiGKBL5i8+BWtg1Z1dCR2gROQoHCn//GjH9oUrbl9x5zuL9i8pvlJ/uJEIwZCON5NVd37BAF3PsIy8EFFP9r1Nlyy78vXvvVFa1b76xjXXr5rz2tCLT//g5q7bkicLvgBY3i3reuYLBFixQR8AocDgn73Z9Is3tv95279f8eIdD3/9zr+a/52rH5v34IJbv3n540fu7lz73Lx932khh2EPdG34ggDe6GEu1FP/wfttL61J3r74pTsuu3nXZe/P2nDaZreV3fGOts3nrb+m+y69b0Hboy9u7byBtZMQbO6qni8AYPlGZsBk9v/dVZfv+P4Vb93SeOXa6TtyfVmS+JLP0iRNs1Ja9mnCkTO23vbxwpvsrh/9UU9nI6AzVm78JQFeX2rt0Mj+x77z6Dd33HL31e+ftsdKaZKkWRpSytXURNOsQpD6spVLp23/7aFf+Z0nX9z+eDOg7SuWTnwb8vrt9rIwiX1/f+/vfXff1flpW6IsS8xbSqpVgIxMM/MWQoZJ8OLMDApsPucnr93+m1+6bxjF7rjllQm+CcMyR4Suu+fhtbuuqpu+yXwaNLOUEQDK5rWK4C2YBzNnAafeJbTvTG9666cXfMXNDdgyogk58PJi1+Fo4plW+5sF9876kDRklpBaqgmplp3X1BILITUF9SKRMydOxVRCzr3ReGDT3UuLKLrktsUTcEA6hIj+bw9cNG/RjA8kzTKqwoklIZXEUl8WX/XDaVDROifOZ+XyUHm4lHjViBmNb6WbO2cvGkY6qB3gpUUOJcfyx8/5t/ZdUTHLQkJq5UpWELQCIGXzIXEmlpecDAwc6e0fLKVOyJGLcpZvKF7XumL5nIU4eHXRbZ017gJ7JJDj0OM7r7zwwsn7stSnmmoyYnqZSkjZUi1JyFsuFA91r//ow56e0lBkkYuJNc5CljKn6LPuVwoo9gjUBPBCnkuEHLuebn145gFXUp+lVXGfhHJIrETiSwzHVk/p6KYP168/cshrA3l1nozMeR8kS4INz6nbsDrCsEteyNfUgtw8A/TYyt6brmnc5bOQaUoqaUhIKJFYIlkcSbJrW89eLw0xiFlQM+dClPPmTIkkic73Lx8YLrpGJTePlTU4YNcbjv41Z8xoy7liyKysmSY+kYp0yHyCr4/Kvev/Y+duJ5OcBeepIEpCZsFS552PggXVydmkwX1bchhyfU0OWDs4iu/nr5lS1MR79SQhsdSlmpI4n48P7dzaHawuF5v3oETmxMBQn4sCkrnYqZOsMerbP/Myg/baFuHZSo69e/ZOax7StBo+I7VyKFtKRX7vlg3d5uJY1MKnQSaZmtqnd1mIR+YQWvTgEcGws2tzoAWEpNfyUSlkPiOzJCTi8ZYWcvs3bduad05Eva9DTBSCAwtqRBJMHCoaRRAK1t3vAGupzQEUJSfOKPlUq5GErBr5wr5tH+2QnLmqvGiqogCiTj9NUa9QnQlmLogY1agJQPsESNuGh4ORaSVGDE1zce+ezVtzcSQaLAB401DlC1atqk/V4uAVCKhaYFaTJ0BfbS3oscsyWmZN6hukyYcUFR+yfJwWt2zN5V2I1CRYMCwfgsWAByAnImJqUSVFzESPxWeeEYDQU5MDoRsSpl/etOOI4DVUGAI4tm/xGjsn6XFiL5GUKVMAINVMUyADgoLZAJPOzTDorglAuhRP868VPj4QQtXWLGgud/STY/35XBAYDW9eChQoA5B35sCcEzVzaomGlunnphihqyaALWtAkdaZZ+zeldZZZhq5pLx3XxRLFFmQSMAcgDkIFiyupDmASNQAoM56teHL9XnFKr9YE0BHquuMhKkLdncdOc2ZWCRHD5eTKFYJUSRBqtYDRJU5jVyURtXKi6ukRO7T1J3RuTcYAVvXkdYEADxhlJn50IxtG9ScifeHel1eI3OjkYtxVOa6SsLxpyM1xAyE4vnnXzcMhCegRoD7Ow3I3BW/sfXVI2fWMTCYpsSAY0QkkiyqInwmmx+pJHKROY2rVRw2RrPviglY5dcmcDoOS1xHmbO/1XJjV/Gu+uFeYhHzLkKDqpmKZog4cQbgzcUiQVQkqnbD2QFLrrzo5hKGLoEJACxc/C+PiRvk1u/+9NG1C6dm+RjIqbpIVEwR74xIUQkGkYgYxE6IQlRH4j84/YY/CSiqDy6e4LnAFkBG9Ks3PvTG8xtm1DsxjSSnURRbjLNY8+ZsxPo41pGI45C3uB71XU0XLT6tLUVZmopM+HjeuVTuFyaz+2//6cXrLr64J2SZWSbeheCjICoe1NCcU5MoSOxwk2w4vNnc/u25Xx3GGOJfefcXA3fb4IQAoHOjtEML25772VNnn3ddMR7ILHhRvAVR1IITZ2q4yiwxdbZHN0z/ypK5l1blB9lBkZXshH5+Rof11AwAP+xhhtBItvHnf7Evuarx3IGonGBBgzOoAoiCszqrbrwNcXbV1d+aOq0qn+MAK/Ds4gh1lBnC32/P1gwAT29gLuRoZPMP17zuS7Pz5/jm1KUW1MzQHFDWXvvYDc2ec9dFtyoZxiBNTOVVXqLEVBrw9HGIZKH/Uc0A8NQz7gFDaEDCztc+Wnnwk0J/o2sKhSzyniE3LL61MHfWDbPnxZQBYzfLmcql7OBd2himvhIpR9hP+T7/XM0A8IM7459Y3iEUiEgGP9lW7Onv3T4oOqul9fS6WWec11AHJRQh6D+7PhooEajjtzjAOvqop4GMw1WE+/2zNQMA/OPIRyoDInJEOGKMgKKkGAYItuTri+sW53+/udXjWcBtDPEe/8UABepHEA5SqrpQOwDAPyyKHuGS47zY8VmwdTzxjU4AkCt5r4FWTucarmaId9nM0U8bQS8HRxtR64fK3+2kc0nh9GuZT7vMtBagzz6mm9UH3u4oMzoOOgp4PuEdlCu4FOimD6WOKSiHnhXsuRocqD0im0ITKcI0ruJSiqxnI30jLiQc4zDp3f6FU/itWP+wSKAe5RDvsJaILzGHJoYoEtFCG/nn5d5TCGBPJCuOYTTgOch7fAhcwIU0MUwRaKKNumflnlPWAgDXNXn+VJQhYCoXcxEltrCdAXLUkdHPMcr32POn7HO9Xj/45mGMSRiH+U82IsziPCZTpoSjiWbyP5Z7ThkA6PyBlb0o9QQOsY5NCGdxDo0UKSE00Ez8nNwywRaInNB3G78Rk+ZPQRhAmMZsZpGwlx30UyCHp58BvJwEQATMPif4WW3HawMYD8mtbPj1KcAgjlZmczaBPZUYIEeOhD7SB/3ScQFOkDQEGA+Dz+HY6B0GwKqG+S0YRRxTOJ+zCOxjD/3kEUoMvZV+FSAeV1yOXx0AMu51bNhoctPwcru+mQYGOUwg4yzaSAkMIBjROXACgAjwP+aYJyCjPrUIiAEcA8P4WmmZVlyYNILg8UxnCmUSiijsP2ENiIwRqQaj1eh8PBj7lxMa9eO6aydjDKFMYSbNlDjMQYrYH4e/HtOCMaJjZU8eDnDH776RPGXXNFJgiF4ypjGJmALDZN///OlYTlhU4w8ZpxpFZ1xnHkrXDqIUgH728glFUnjY/GgLRgFkXOMZrU9agYzBM56MvlZASTBi8vCnxb88Tm61LEJG8T7LVkzgGFMAkz6DKRwzAAw90/IaW7N+sED+IP9l36qHbDmLbTeMARizDT9f28k34QVsN2A0DTNjVKqeejv6v/yHRMYVGl94zCsIswkfzcaH4aTDjAmO/wZqn7kylHm1WQAAAABJRU5ErkJggg==);\n  width: 24px;\n  height: 24px;\n}\n\n#search-component {\n  display: inline-block;\n  padding: 4px 8px;\n  border-radius: 4px;\n  border: solid 1px #fa0;\n  background: transparent;\n}\n\n#search-input {\n  font-size: 1rem;\n  color: #eee;\n  background: transparent;\n  border: none;\n  outline: none;\n}\n\n#search-reset {\n  border: 0;\n  background: transparent;\n  color: #fa0;\n  cursor: pointer;\n}\n\n.lesson-menu-item, .lesson-menu-item--active, .lesson-menu-item--expanded, .lesson-menu-item--active--expanded {\n  font-size: 0.8rem;\n  font-weight: bold;\n  color: #09b;\n  cursor: pointer;\n  background-repeat: no-repeat;\n  background-position: left center;\n  border-left: solid 4px transparent;\n  box-sizing: border-box;\n}\n\n.lesson-menu-item {\n  padding: 8px 24px;\n  background-image: url(${r});\n  background-size: 16px;\n}\n\n.lesson-menu-item--active {\n  padding: 8px 28px;\n  color: #fff;\n  background-image: url(${c});\n  background-size: 16px;\n}\n\n.lesson-menu-item--expanded {\n  padding: 8px 28px;\n  color: #fa0;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTE5LDIwSDRDMi44OSwyMCAyLDE5LjEgMiwxOFY2QzIsNC44OSAyLjg5LDQgNCw0SDEwTDEyLDZIMTlBMiwyIDAgMCwxIDIxLDhIMjFMNCw4VjE4TDYuMTQsMTBIMjMuMjFMMjAuOTMsMTguNUMyMC43LDE5LjM3IDE5LjkyLDIwIDE5LDIwWiIgZmlsbD0iI2ZkNSIgLz4KPC9zdmc+Cg==);\n  background-size: 16px;\n}\n\n.lesson-menu-item--active--expanded {\n  padding: 8px 28px;\n  color: #fff;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTE5LDIwSDRDMi44OSwyMCAyLDE5LjEgMiwxOFY2QzIsNC44OSAyLjg5LDQgNCw0SDEwTDEyLDZIMTlBMiwyIDAgMCwxIDIxLDhIMjFMNCw4VjE4TDYuMTQsMTBIMjMuMjFMMjAuOTMsMTguNUMyMC43LDE5LjM3IDE5LjkyLDIwIDE5LDIwWiIgZmlsbD0iI2ZmZiIgLz4KPC9zdmc+Cg==);\n  background-size: 20px;\n}\n\n.lesson-menu-item:hover, .lesson-menu-item--active:hover {\n  background: #09b;\n  color: #000;\n  border-left: solid 4px #09b;\n  box-sizing: border-box;\n}\n\n.lesson-menu-item:hover {\n  background-image: url(${r});\n  background-size: 16px;\n  background-repeat: no-repeat;\n  background-position: left center;\n}\n\n.lesson-menu-item--active:hover {\n  background-image: url(${c});\n  background-size: 20px;\n  background-repeat: no-repeat;\n  background-position: left center;\n  color: #fff;\n}\n\n.sub-level-item:hover {\n  background: #09b;\n  color: #000;\n}\n\n.sub-level-item, .sub-level-item--active {\n  display: block;\n  font-size: 0.8rem;\n  font-weight: bold;\n  transition: color 0.3s ease;\n  padding: 8px;\n  cursor: pointer;\n  box-sizing: border-box;\n  animation: show-submenu-item 0.1s;\n}\n\n.sub-level-item {\n  color: #09b;\n}\n\n.sub-level-item--active {\n  color: #fff;\n  font-weight: normal;\n}\n\n.translated {\n  margin-left: -9px;\n}\n\n.translated:before {\n  content: '•';\n  color: #0f0;\n  font-size: 18px;\n  margin-right: 4px;\n}\n\n#menuToggle {\n  display: block;\n  position: absolute;\n  top: 12px;\n  right: 10px;\n  z-index: 1;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  cursor: pointer;\n}\n\n#menuToggle [type="checkbox"] {\n  display: block;\n  width: 70px;\n  height: 40px;\n  position: absolute;\n  top: -16px;\n  right: 0px;\n  cursor: pointer;\n  opacity: 0;\n  z-index: 55;\n  -webkit-touch-callout: none;\n}\n\n#menuToggle span {\n  display: inline-block;\n  box-shadow: 1px 1px 2px #00000090;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  margin-right: 4px;\n  position: relative;\n  border-radius: 0px;\n  z-index: 54;\n  transform-origin: 0px 0px;\n  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),\n              background-color 0.5s cubic-bezier(0.77,0.2,0.05,1.0),\n              opacity 0.55s ease;\n}\n\n#menuToggle span:nth-last-child(odd) {\n  background: #09b;\n}\n\n#menuToggle span:nth-last-child(even) {\n  background: #fa0;\n}\n\n#menuToggle span:first-child {\n\ttransform-origin: 0% 0%;\n}\n\n#menuToggle span:nth-last-child(2) {\n\ttransform-origin: 0% 100%;\n}\n\n#menuToggle [type="checkbox"]:checked ~ span {\n  opacity: 1;\n  width: 30px;\n  height: 5px;\n  transform: rotate(45deg) translate(50px, -68px);\n}\n\n#menuToggle [type="checkbox"]:checked ~ span:nth-last-child(3) {\n  opacity: 0;\n  transform: rotate(0deg) scale(0.2, 0.2);\n}\n\n#menuToggle [type="checkbox"]:checked ~ span:nth-last-child(2) {\n  transform: rotate(-45deg) translate(0px, 10px);\n  width: 30px;\n  height: 5px;\n}\n\n#menu {\n  position: absolute;\n  right: -10px;\n  top: 32px;\n  width: var(--main-menu-width);\n  height: 101vh;\n  overflow-y: auto;\n  margin-top: -40px;\n  padding: 40px 24px;\n  list-style-type: none;\n  -webkit-font-smoothing: antialiased;\n  transform-origin: 100% 100%;\n  transform: translate(100%, 0);\n  transition: all 0.5s ease-out;\n  z-index: 51;\n}\n\n#menuToggle [type="checkbox"]:checked ~ ul {\n  transform: translate(0, 0);\n}\n\n@media screen and (min-width: 1350px) {\n  .main-menu-wrapper:before { padding-left: 16px; }\n}\n\n@media screen and (max-width: 1320px) {\n  .main-menu-wrapper:before { padding-left: 20vw; }\n}\n@media screen and (max-width: 900px) {\n  .main-menu-wrapper:before { padding-left: 80px; }\n}\n\n@media screen and (max-width: 480px), screen and (max-height: 480px) {\n  .main-menu-wrapper:before { display: none; }\n  .main-menu-wrapper { background-size: cover, 100%; }\n}\n\n@keyframes show-submenu-item {\n  0%   {\n    position: absolute;\n    right: -100%;\n    opacity: 0;\n    font-size: 0;\n    width: 0;\n    height: 0;\n    padding: 0;\n  }\n  100% {\n    position: relative;\n    right: 0;\n    opacity: 1;\n    font-size: 0.8rem;\n    width: max-content;\n    padding: 0px 4px;\n    height: 1.5rem;\n  }\n}\n@keyframes hide-submenu-item {\n  0%   {\n    position: relative;\n    right: 0;\n    opacity: 1;\n    font-size: 0.8rem;\n    width: max-content;\n    padding: 0px 4px;\n    height: 1.5rem;\n  }\n  100% {\n    position: absolute;\n    right: -100%;\n    opacity: 0;\n    font-size: 0;\n    width: 0;\n    height: 0;\n    padding: 0;\n  }\n}\n\n@keyframes hide-submenu {\n  0%   { height: max-content;  }\n  100% { height: 0; }\n}\n@keyframes show-submenu {\n  0%   { height: 0;  }\n  10%  { height: 70vh; }\n  90%  { height: 70vh; }\n  100% { height: max-content; }\n}\n\n::-webkit-scrollbar {\n    width: 5px;\n    height: 5px;\n}\n\n::-webkit-scrollbar-track {\n    background: #079;\n    box-shadow: inset 0 0 1px #00000070;\n    border-radius: 1px;\n}\n\n::-webkit-scrollbar-thumb {\n    background: #f50;\n    border-radius: 1px;\n}\n\n::-webkit-scrollbar-thumb:hover {\n    background: #fa0;\n}\n`.replace(/(^\s+|\s+$)/gm,"").replace(/\s*{\s*/gm,"{").replace(/\s*}\s*/gm,"}").replace(/;\s*/gm,";").replace(/:\s*/gm,":").replace(/\s*>\s*/gm,">"),d=`\n<div id="main-menu-shadow"></div>\n\x3c!-- <graphic-header></graphic-header> --\x3e\n<svg-nav-panel></svg-nav-panel>\n\n<aside>\n  <div id="menuToggle">\n    <input type="checkbox" />\n    <span></span>\n    <span></span>\n    <span></span>\n    <ul id="menu">\n      <search-component></search-component>\n      <a id="go-to-home" href="${location.href.split("?")[0]}" class="go-to-home"></a>\n      <hr>\n    </ul>\n  </div>\n</aside>\n\n<donate-component size="48" id="top-donate" />\n`,l='\n<defs>\n  <filter id="shadow">\n    <feDropShadow dx="-8" dy="0.0" stdDeviation="5" flood-color="#0009" />\n  </filter>\n</defs>\n';class g extends HTMLElement{constructor(){super();const e=getComputedStyle(document.documentElement);this.shadow=this.attachShadow({mode:"closed"}),this.shadow.innerHTML="<svg><path /></svg>",o("style",this.shadow).textContent="\n      svg {\n        position: fixed;\n        right: 0;\n        top: 0;\n        height: 100vh;\n        width: 0;\n        box-sizing:border-box;\n      }\n    ",Object.assign(this,{svg:this.shadow.querySelector("svg"),status:"norm",maxWidth:parseInt(e.getPropertyValue("--main-menu-width")),minWidth:50,step:5,d:50}),this.addEventListener("expand",(function(e){this.path.dispatchEvent(new Event(e.type))})),this.addEventListener("close",(function(e){this.path.dispatchEvent(new Event(e.type))}))}get path(){return this.shadow.querySelector("svg > path")}get randomStep(){return Math.round(Math.random()*this.h*.3)}get randomWidth(){return Math.round(Math.random()*this.maxWidth*.4)}setListeners(){this.path.addEventListener("expand",this.movie.bind(this)),this.path.addEventListener("close",this.reverse.bind(this))}setStatic(e){this.svg.style.width=e?"100%":"0",this.status=e?"wide":"norm";const n=this.w-(e?this.maxWidth:this.minWidth);this.svg.innerHTML=l+`<path d="M${this.w} 0 L${n} 0 L${n} ${this.h} L${this.w} ${this.h} Z" style="filter:url(#shadow);" />`,this.setListeners(),this.rand1=this.randomStep,this.rand2=this.rand1+this.randomStep,this.offset=this.randomWidth}movie(){this.svg.style.width="100%",this.d+=this.step+1,this.createPath(this.w-this.minWidth-this.offset,this.w-this.minWidth-2*this.offset),this.d<this.maxWidth?requestAnimationFrame(this.movie.bind(this)):this.setStatic(!0)}reverse(){this.d-=this.step+1,this.createPath(this.w-this.minWidth-this.d,this.w-this.minWidth-this.d),this.d>0?requestAnimationFrame(this.reverse.bind(this)):this.setStatic(!1)}createPath(e,n){this.rand1+=4,this.rand2+=5;const[t,i,s,a]=[this.w-this.d+this.offset,this.rand1,this.w-this.d,this.rand2,this.w-this.minWidth-this.d];this.svg.innerHTML=l+`<path d="M${this.w} 0 L${e} 0 C${t} ${i} ${s} ${a} ${n} ${this.h} L${this.w} ${this.h} Z" />`}connectedCallback(){Object.assign(this,{w:window.innerWidth,h:window.innerHeight,offset:this.randomWidth}),this.rand1=this.randomStep,this.rand2=this.rand1+this.randomStep,this.svg.innerHTML=l+`<path d="M${this.w} 0 L${this.w-this.minWidth} 0 L${this.w-this.minWidth} ${this.h} L${this.w} ${this.h} Z" />`,this.setListeners(),window.addEventListener("resize",function(){this.setStatic("wide"===status)}.bind(this))}}customElements.define("svg-nav-panel",g);class m extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"closed"});Object.assign(this,{worker:n(),shadow:Object.assign(o("div",e),{className:"main-menu-wrapper"}),view:document.getElementsByTagName("page-element")[0],menuOptions:[],state:"close"}),o("style",e).textContent=h,this.addEventListener("sublevel-item-clicked",this.sublevelItemClickHandler.bind(this)),window.addEventListener("popstate",function(e){const n=location.search.slice(1);this.worker.postMessage({route:"lesson",param:n})}.bind(this))}getKeywords(e){Object.assign(this,{keywords:e})}getRefs(e){this.refs=e.flatMap((e=>e.items.map((n=>({[n.ref]:e.ref}))))).reduce(((e,n)=>Object.assign(e,n)),{})}getMainMenuData(e){this.menuOptions.forEach((e=>e.remove())),this.menuOptions=[],this.activeRef=localStorage.getItem("active-ref")||"",this.getRefs(e);const n=location.search.slice(1)||"";n&&this.refs[n];for(const n of e){const{ref:e,title:t,items:i}=n,s=Object.assign(document.createElement("main-menu-item"),{mainMenu:this,ref:e,title:t,items:i});this.menuOptions.push(s)}for(const e of this.menuOptions)this.menu.appendChild(e)}lessonClickHandler(e){}sublevelItemClickHandler(e){e.stopImmediatePropagation();const{sublevelItem:{ref:n}}=e;this.navigateTo(n)}connectedCallback(){this.shadow.innerHTML+=d;const[e,n,t,i,s,a,o]=["svg-nav-panel","#main-menu-shadow","#top-donate",'#menuToggle > input[type="checkbox"]',"#menu","#search-input","#go-to-home"].map((e=>this.shadow.querySelector(e)));Object.assign(this,{svg:e,backShadow:n,donate:t,checkbox:i,menu:s,searchInput:a,homeButton:o,pageMenu:document.getElementsByTagName("menu-component")[0]}),this.worker.addEventListener("message",this.workerMessageHandler.bind(this)),this.addEventListener("scroll",this.scrollHandler.bind(this)),this.checkbox.onclick=this.checkboxClickHandler.bind(this),this.homeButton.onclick=this.homeButtonClickHandler.bind(this),this.addEventListener("lesson-clicked",this.lessonClickHandler)}removeOption(e,n){return new Promise(function(t){setTimeout(function(){this.menu.removeChild(e),t(n)}.bind(this),20*n)}.bind(this))}hide(){this.state="close",this.backShadow.style.display="none",this.menu.style["transition-delay"]="0s",this.checkbox.checked=!1;const e=this.menuOptions.map(function(e,n){return new Promise(function(t){setTimeout(function(){this.menu.removeChild(e),t(n)}.bind(this),20*n)}.bind(this))}.bind(this));Promise.all(e).then(function(){this.menu.style.opacity="0",this.svg.dispatchEvent(new Event("close")),this.donate.style.right="108px"}.bind(this))}show(){this.state="expand",this.backShadow.style.display="block",this.svg.dispatchEvent(new Event("expand")),this.donate.style.right="387px",this.menu.style["transition-delay"]="1s",this.menuOptions.forEach(((e,n)=>setTimeout(function(){this.menu.appendChild(e)}.bind(this),20*n))),this.menu.style.opacity="1",this.checkbox.checked=!0;const e=this.menuOptions.find((e=>e.active));e&&setTimeout((()=>e.dispatchEvent(new Event("click"))))}scrollHandler(e){Object.assign(this.donate.style,{display:e.offset<=200?"none":"block"})}checkboxClickHandler(e){[this.pageMenu,this.donate].forEach((e=>e.dispatchEvent(new Event("main-menu-"+this.state)))),"close"===this.state?this.show():this.hide()}navigateTo(e="start-page"){this.checkbox.checked=!this.checkbox.checked,this.checkbox.dispatchEvent(new Event("click")),history.pushState(null,null,`${location.pathname}?${e}`),this.worker.postMessage({route:"lesson",param:e})}homeButtonClickHandler(e){e.stopImmediatePropagation(),this.navigateTo()}workerMessageHandler(e){const{route:n,response:t}=e.data;"main-menu"!==n&&"keywords"!==n||this["main-menu"===n?"getMainMenuData":"getKeywords"](t)}}customElements.define("main-menu-component",m)})();