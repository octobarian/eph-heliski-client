(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72997cb2"],{"14d9":function(t,e,r){"use strict";var a=r("23e7"),i=r("7b0b"),n=r("07fa"),o=r("3a34"),u=r("3511"),s=r("d039"),l=s((function(){return 4294967297!==[].push.call({length:4294967296},1)})),c=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}},d=l||!c();a({target:"Array",proto:!0,arity:1,forced:d},{push:function(t){var e=i(this),r=n(e),a=arguments.length;u(r+a);for(var s=0;s<a;s++)e[r]=arguments[s],r++;return o(e,r),r}})},3511:function(t,e,r){"use strict";var a=TypeError,i=9007199254740991;t.exports=function(t){if(t>i)throw a("Maximum allowed index exceeded");return t}},"3a34":function(t,e,r){"use strict";var a=r("83ab"),i=r("e8b5"),n=TypeError,o=Object.getOwnPropertyDescriptor,u=a&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=u?function(t,e){if(i(t)&&!o(t,"length").writable)throw new n("Cannot set read only .length");return t.length=e}:function(t,e){return t.length=e}},"7a79":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t._self._c;return t.currentTutorial?e("div",{staticClass:"edit-form"},[e("h4",[t._v("Tutorial")]),e("form",[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"title"}},[t._v("Title")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.currentTutorial.title,expression:"currentTutorial.title"}],staticClass:"form-control",attrs:{type:"text",id:"title"},domProps:{value:t.currentTutorial.title},on:{input:function(e){e.target.composing||t.$set(t.currentTutorial,"title",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.currentTutorial.description,expression:"currentTutorial.description"}],staticClass:"form-control",attrs:{type:"text",id:"description"},domProps:{value:t.currentTutorial.description},on:{input:function(e){e.target.composing||t.$set(t.currentTutorial,"description",e.target.value)}}})]),e("div",{staticClass:"form-group"},[t._m(0),t._v(" "+t._s(t.currentTutorial.published?"Published":"Pending")+" ")])]),t.currentTutorial.published?e("button",{staticClass:"badge badge-primary mr-2",on:{click:function(e){return t.updatePublished(!1)}}},[t._v(" UnPublish ")]):e("button",{staticClass:"badge badge-primary mr-2",on:{click:function(e){return t.updatePublished(!0)}}},[t._v(" Publish ")]),e("button",{staticClass:"badge badge-danger mr-2",on:{click:t.deleteTutorial}},[t._v(" Delete ")]),e("button",{staticClass:"badge badge-success",attrs:{type:"submit"},on:{click:t.updateTutorial}},[t._v(" Update ")]),e("p",[t._v(t._s(t.message))])]):e("div",[e("br"),e("p",[t._v("Please click on a Tutorial...")])])},i=[function(){var t=this,e=t._self._c;return e("label",[e("strong",[t._v("Status:")])])}],n=(r("14d9"),r("f652")),o={name:"tutorial",data(){return{currentTutorial:null,message:""}},methods:{getTutorial(t){n["a"].get(t).then(t=>{this.currentTutorial=t.data,console.log(t.data)}).catch(t=>{console.log(t)})},updatePublished(t){var e={id:this.currentTutorial.id,title:this.currentTutorial.title,description:this.currentTutorial.description,published:t};n["a"].update(this.currentTutorial.id,e).then(e=>{this.currentTutorial.published=t,console.log(e.data)}).catch(t=>{console.log(t)})},updateTutorial(){n["a"].update(this.currentTutorial.id,this.currentTutorial).then(t=>{console.log(t.data),this.message="The tutorial was updated successfully!"}).catch(t=>{console.log(t)})},deleteTutorial(){n["a"].delete(this.currentTutorial.id).then(t=>{console.log(t.data),this.$router.push({name:"tutorials"})}).catch(t=>{console.log(t)})}},mounted(){this.message="",this.getTutorial(this.$route.params.id)}},u=o,s=(r("99f5"),r("2877")),l=Object(s["a"])(u,a,i,!1,null,null,null);e["default"]=l.exports},"99f5":function(t,e,r){"use strict";r("a00a")},a00a:function(t,e,r){},c427:function(t,e,r){"use strict";var a=r("cee4");e["a"]=a["a"].create({baseURL:"http://eebackend.azurewebsites.net:8080/api",headers:{"Content-type":"application/json"}})},e8b5:function(t,e,r){"use strict";var a=r("c6b6");t.exports=Array.isArray||function(t){return"Array"===a(t)}},f652:function(t,e,r){"use strict";var a=r("c427");class i{getAll(){return a["a"].get("/tutorials")}get(t){return a["a"].get("/tutorials/"+t)}create(t){return a["a"].post("/tutorials",t)}update(t,e){return a["a"].put("/tutorials/"+t,e)}delete(t){return a["a"].delete("/tutorials/"+t)}deleteAll(){return a["a"].delete("/tutorials")}findByTitle(t){return a["a"].get("/tutorials?title="+t)}}e["a"]=new i}}]);
//# sourceMappingURL=chunk-72997cb2.bce513d3.js.map