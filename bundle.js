(()=>{"use strict";let e=JSON.parse(localStorage.getItem("project-list"),(function(e,t){return"due-date"==e?new Date(t):t}))||[{name:"default",cardList:[]}],t=JSON.parse(localStorage.getItem("current-project-index"));function n(){localStorage.setItem("project-list",JSON.stringify(e))}function i(e){return e==t}function d(e){t=e,localStorage.setItem("current-project-index",JSON.stringify(t))}class a extends Error{constructor(e){super(e)}}function l(){if(null===t)throw new a("Please, create or select a project");return e[t]}function r(e){return l().cardList[e]}function c(e,t,i){r(e)[t]=i,n()}class s{constructor(e,t){this.editorElem=e,this.editedCardLiElem=t}handleEvent(e){let t=e.target.dataset.action;t&&(e.preventDefault(),this[t](e))}editField(e){let t=e.target.closest("label");t.classList.add("on-edit");let n=t.querySelector("[name]");n.disabled=!1,this.input=n,this.inputLabel=t}cancelEditField(){this.input[u(this.input)]=r(this.editorElem.dataset.editingIndex)[this.input.name],this.disableField()}saveEditField(){c(this.editorElem.dataset.editingIndex,this.input.name,this.input[u(this.input)]),this.disableField(),o(this.editorElem,this.editedCardLiElem)}disableField(){this.inputLabel.classList.remove("on-edit"),this.input.disabled=!0}}function o(e,t){e.dispatchEvent(new CustomEvent("card-change",{detail:{cardLiElem:e[t]}}))}function u(e){return e.matches('[type="date"]')?"valueAsDate":e.matches('[type="checkbox"]')?"checked":"value"}let p=Symbol("edited-card"),m=document.querySelector("ul.todo-list"),h=document.querySelector("aside > ul");function v(){f();for(let e=0;e<l().cardList.length;++e)L(r(e),e)}function f(){m.innerHTML=""}function E(e){let t=e.firstElementChild.dataset.index,n=r(t);e.firstElementChild.outerHTML=y(n,t)}function L(e,t){let n=document.createElement("li");n.innerHTML=y(e,t),m.append(n)}function y(e,t){return`\n              <div\n\t\t                class="todo-preview-card"\n                data-priority="${e.priority}"\n  \t\t    data-status="${e["is-completed"]?"completed":new Date>e["due-date"]?"failed":""}"\n  \t\tdata-index="${t}"\n              >\n                <h2 class="title">\n\t\t\t\t\t    ${e.title}\n                </h2>\n\n                <div class="description-short">\n\t\t\t\t\t    ${e.description}\n                </div>\n\n                <time class="due-date">${e["due-date"].toLocaleString("en-US")}\n\t                </time>\n\n                <div class="action-buttons-wrapper" title="mark as complete">\n\t\t                <button><img /></button>\n\t\t\t\t              </div>\n              </div>\n\t\t`}function g(){h.innerHTML="";for(let n=0;n<e.length;++n)h.insertAdjacentHTML("beforeend",(t=e[n],`\n          <li data-index='${n}' data-selected="${i(n)?"true":"false"}">\n            <div class="project">\n              <h2 class="heading">\n\t\t\t${t.name}\n              </h2>\n            </div>\n            <button class="delete-button"><img /></button>\n          </li>\n\t`));var t}!function(){try{g(),v()}catch(e){e instanceof a&&alert(e.message)}let m=document.querySelector("form.editor");!function(e){let t=e.querySelector("button.hide"),i=e.querySelector("input.add-card");t.addEventListener("click",(e=>{e.preventDefault(),r()})),i.addEventListener("click",(t=>{if(!e.checkValidity())return;var i,d,a,c;t.preventDefault(),i=e.title.value,d=e["due-date"].value,a=e.priority.value,c=e.description.value,l().cardList.push(function(e,t,n,i){return{id:crypto.randomUUID(),title:e,"due-date":new Date(t),priority:n,"is-completed":!1,description:i}}(i,d,a,c)),n();let s=new CustomEvent("new-card");e.dispatchEvent(s),r()}));let d=e.querySelector('[name="is-completed"]');d.addEventListener("change",(t=>{c(e.dataset.editingIndex,d.name,d.checked),o(e,p)}));let a=e.querySelectorAll("label ul");for(const t of a)t.addEventListener("click",new s(e,p));function r(){document.body.className="";let t=getComputedStyle(e);setTimeout((()=>e.classList.remove("new")),1e3*(parseFloat(t.transitionDelay)+parseFloat(t.transitionDuration))),e.querySelectorAll("[name]").forEach((e=>{e[u(e)]=null,e.disabled=!1}))}e.querySelector("input.confirm").addEventListener("click",(e=>{e.preventDefault(),r()})),e.querySelector("input.delete-todo").addEventListener("click",(t=>{t.preventDefault(),e.dispatchEvent(new CustomEvent("card-delete",{detail:{cardElemToBeDeleted:e[p]}})),r()}))}(m);let h=document.querySelector("button.add-card"),L=document.body;h.addEventListener("click",(()=>{null!==t?(L.classList.add("popup-shown"),m.classList.add("new")):alert("Please, select a project or create one")})),m.addEventListener("new-card",(()=>{v()})),m.addEventListener("card-change",(e=>{E(e.detail.cardLiElem)})),m.addEventListener("card-delete",(e=>{var t;t=e.detail.cardElemToBeDeleted.firstElementChild.dataset.index,l().cardList.splice(t,1),n(),v()})),document.querySelector("ul.todo-list").addEventListener("click",(e=>{let t=e.target,n=t.closest(".todo-preview-card")?.parentElement;if(n){if(t instanceof HTMLButtonElement)return c(n.firstElementChild.dataset.index,"is-completed",!0),void E(n);L.classList.add("popup-shown"),function(e,t){let n=e.querySelectorAll("[name]"),i=r(t.firstElementChild.dataset.index);e.dataset.editingIndex=t.firstElementChild.dataset.index,e[p]=t;for(const e of n){let t=i[e.name];e[u(e)]=t,"checkbox"!=e.type&&(e.disabled=!0)}}(m,n)}}));let y=document.querySelector("aside");var S;(S=y).querySelector("button.expand").addEventListener("click",(()=>{S.classList.toggle("hidden-on-mobile")})),S.querySelector("aside > form").addEventListener("submit",(e=>{let t=e.target["add-project-name"];if(!t.checkValidity())return;e.preventDefault();let n=t.value;t.value="",S.dispatchEvent(new CustomEvent("add-project",{detail:{projectName:n}}))})),S.querySelector("aside > ul").addEventListener("click",(e=>{let t=e.target,n=t.closest("li");if(!n)return;let i="true"==n.dataset.selected;S.dispatchEvent(new CustomEvent(t.matches("img")?"delete-project":"change-project",{detail:{projectIndex:+n.dataset.index,isSelected:i}}))})),y.addEventListener("add-project",(i=>{var a;a=i.detail.projectName,e.push({name:a,cardList:[]}),d(t?e.length-1:0),n(),g(),v()})),y.addEventListener("change-project",(e=>{d(e.detail.projectIndex),g(),v()})),y.addEventListener("delete-project",(a=>{var l;l=a.detail.projectIndex,e.splice(l,1),i(l)?d(null):t>l&&d(t-1),n(),g(),a.detail.isSelected&&f()}))}()})();