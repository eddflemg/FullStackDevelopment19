(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=(t(20),t(2)),l=t(14),s=t(3),i=t.n(s),m="/api/persons",f=function(){return i.a.get(m).then((function(e){return e.data}))},h=function(e){return i.a.post(m,e).then((function(e){return e.data}))},b=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},d=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},g=(t(38),function(e){var n=e.person,t=e.persons,a=e.setPersons;return r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{value:n.id,onClick:function(e){if(window.confirm("Delete ".concat(n.name))){var r=e.target.value;d(r).then((function(e){console.log(r),console.log(t.filter((function(e){return e.id!=r}))),a(t.filter((function(e){return e.id!=r}))),console.log(t)}))}}},"Delete"))}),v=function(e){var n=e.persons,t=e.newSearch,a=e.searching,c=(e.setSearch,e.setSearching,e.setPersons),o=a?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})):n;return r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),r.a.createElement("div",null,o.map((function(e){return r.a.createElement(g,{person:e,setPersons:c,persons:n,key:e.name})}))))},E=function(e){var n=e.numberChange,t=e.setErrorMessage,a=e.nameChange,c=e.persons,o=(e.note,e.setNote),u=e.newName,s=e.newNumber,i=e.setPersons,m=e.setNewName,f=e.setNewNumber;return r.a.createElement("div",null,r.a.createElement("h2",null,"add new contact"),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),c.some((function(e){return e.name===u}))){if(window.confirm("".concat(u," is already added to the phonebook. Should the number be replaced?"))){var n=c.find((function(e){return e.name===u})),a=Object(l.a)({},n,{number:s});console.log(a),console.log(a.id),b(a.id,a).then((function(e){i(c.filter((function(n){return n.name!==u?n:e}))),o("".concat(n.name," number is changed")),setTimeout((function(){o(null)}),5e3)})).catch((function(e){t("Person ".concat(n.name," was already removed from server")),setTimeout((function(){t(null)}),5e3)}))}}else{var r={name:u,number:s};h(r).then((function(e){i(c.concat(r)),m(""),f(""),o("".concat(r.name," is created")),setTimeout((function(){o(null)}),5e3)}))}m(""),f("")}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:u,onChange:a}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:s,onChange:n})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},p=function(e){var n=e.searchChange,t=e.newSearch,a=(e.searching,e.setSearching);return r.a.createElement("div",null,r.a.createElement("h2",null,"Search"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),a(!0)}},r.a.createElement("div",null,r.a.createElement("input",{value:t,onChange:n})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Search"))))},w=function(e){var n=e.message,t=e.note;return null===n&&null===t?null:null===n?r.a.createElement("div",{className:"note"},t):r.a.createElement("div",{className:"error"},n)},S=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),l=Object(u.a)(o,2),s=l[0],i=l[1],m=Object(a.useState)(""),h=Object(u.a)(m,2),b=h[0],d=h[1],g=Object(a.useState)(""),S=Object(u.a)(g,2),N=S[0],j=S[1],O=Object(a.useState)(null),C=Object(u.a)(O,2),k=C[0],P=C[1],y=Object(a.useState)(null),D=Object(u.a)(y,2),T=D[0],J=D[1],L=Object(a.useState)(!1),M=Object(u.a)(L,2),x=M[0],B=M[1];return Object(a.useEffect)((function(){f().then((function(e){return c(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(w,{message:k,note:T}),r.a.createElement(p,{searchChange:function(e){console.log(e.target.value),j(e.target.value)},newSearch:N,setSearching:B,searching:x}),r.a.createElement(E,{setErrorMessage:P,setNote:J,note:T,nameChange:function(e){i(e.target.value)},numberChange:function(e){d(e.target.value)},persons:t,newName:s,newNumber:b,setNewNumber:d,setPersons:c,setNewName:i}),r.a.createElement(v,{persons:t,setPersons:c,setSearching:B,setSearch:j,newSearch:N,searching:x}))};o.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fc7a38f1.chunk.js.map