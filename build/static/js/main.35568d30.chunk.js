(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),u=t.n(o),c=(t(20),t(14)),l=t(2),i=function(e){return a.a.createElement("div",null,a.a.createElement("input",{value:e.value,onChange:e.onChange}))},s=function(e){return a.a.createElement("form",{onSubmit:e.onSubmit},a.a.createElement("div",null,"name:"," ",a.a.createElement("input",{value:e.nameValue,onChange:e.nameOnChange})),a.a.createElement("div",null,"number:",a.a.createElement("input",{value:e.numberValue,onChange:e.numberOnChange})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},f=function(e){var n=e.entry,t=e.handleDeletePerson;return a.a.createElement("li",null,n.name," \u2013 ",n.number,a.a.createElement("button",{onClick:t},"Delete"))},m=function(e){return e.newSearch.length>0?e.persons.filter((function(n){return!0===n.name.toLowerCase().includes(e.newSearch.toLowerCase())})).map((function(n){return a.a.createElement(f,{key:n.id,entry:n,handleDeletePerson:function(){return e.handleDeletePersonOf(n.id)}})})):e.persons.map((function(n){return a.a.createElement(f,{key:n.id,entry:n,handleDeletePerson:function(){return e.handleDeletePersonOf(n.id)}})}))},h=function(e){var n=e.message,t=e.type;return null===n?null:a.a.createElement("div",{className:t},n)},b=t(3),d=t.n(b),p="/api/persons",O=function(){return d.a.get(p).then((function(e){return e.data}))},y=function(e){return d.a.post(p,e).then((function(e){return e.data}))},v=function(e,n){return d.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return d.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))};function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var w=function(){var e=Object(r.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(r.useState)(""),f=Object(l.a)(u,2),b=f[0],d=f[1],p=Object(r.useState)(""),w=Object(l.a)(p,2),j=w[0],k=w[1],C=Object(r.useState)(""),P=Object(l.a)(C,2),S=P[0],D=P[1],T=Object(r.useState)(null),L=Object(l.a)(T,2),V=L[0],J=L[1],N=Object(r.useState)(null),x=Object(l.a)(N,2),A=x[0],B=x[1];Object(r.useEffect)((function(){O().then((function(e){o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement(h,{message:V,type:A}),a.a.createElement("h2",null,"Phonebook"),a.a.createElement(i,{value:S,onChange:function(e){D(e.target.value)}}),a.a.createElement("h2",null,"Add new entry"),a.a.createElement(s,{onSubmit:function(e){if(e.preventDefault(),0===t.filter((function(e){return e.name.toLowerCase()===b.toLowerCase()})).length)y({name:b,number:j}).then((function(e){o(t.concat(e)),d(""),k(""),J("".concat(b," was added to the phonebook.")),B("success"),setTimeout((function(){J(null)}),5e3)}));else if(window.confirm("".concat(b," is already added to phonebook. Would you like to replace the old number with a new one?"))){var n=t.find((function(e){return e.name===b})),r=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(t,!0).forEach((function(n){Object(c.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},n,{number:j}),a=n.id;v(a,r).then((function(e){o(t.map((function(n){return n.id!==a?n:e}))),d(""),k(""),J("".concat(b,"'s number has been updated to ").concat(j,".")),B("success"),setTimeout((function(){J(null)}),5e3)})).catch((function(e){J("This entry has already been removed from the phonebook. Cannot edit the number."),B("error"),setTimeout((function(){J(null)}),5e3),o(t.filter((function(e){return e.id!==a})))}))}},nameValue:b,nameOnChange:function(e){d(e.target.value)},numberValue:j,numberOnChange:function(e){k(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(m,{newSearch:S,persons:t,handleDeletePersonOf:function(e){!function(e){window.confirm("Do you really want to delete this entry?")&&E(e).then((function(){o(t.filter((function(n){return n.id!==e}))),J("Entry has been removed from the phonebook."),B("success"),setTimeout((function(){J(null)}),5e3)})).catch((function(n){J("This entry has already been removed from the phonebook."),B("error"),setTimeout((function(){J(null)}),5e3),o(t.filter((function(n){return n.id!==e})))}))}(e)}}))};u.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.35568d30.chunk.js.map