(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69de0a37"],{"0496":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"submit-form"},[t.submitted?e("div",[e("h4",[t._v("You submitted successfully!")]),e("button",{staticClass:"btn btn-success",on:{click:t.newTutorial}},[t._v("Add")])]):e("div",[e("div",[t._v("Add New Package")]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"title"}},[t._v("Title")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tutorial.title,expression:"tutorial.title"}],staticClass:"form-control",attrs:{type:"text",id:"title",required:"",name:"title"},domProps:{value:t.tutorial.title},on:{input:function(e){e.target.composing||t.$set(t.tutorial,"title",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tutorial.description,expression:"tutorial.description"}],staticClass:"form-control",attrs:{id:"description",required:"",name:"description"},domProps:{value:t.tutorial.description},on:{input:function(e){e.target.composing||t.$set(t.tutorial,"description",e.target.value)}}})]),e("button",{staticClass:"btn btn-success",on:{click:t.saveTutorial}},[t._v("Submit")])])])},s=[],r=i("f652"),o={name:"add-tutorial",data(){return{tutorial:{id:null,title:"",description:"",published:!1},submitted:!1}},methods:{saveTutorial(){var t={title:this.tutorial.title,description:this.tutorial.description};r["a"].create(t).then(t=>{this.tutorial.id=t.data.id,console.log(t.data),this.submitted=!0}).catch(t=>{console.log(t)})},newTutorial(){this.submitted=!1,this.tutorial={}}}},l=o,u=(i("d68d"),i("2877")),n=Object(u["a"])(l,a,s,!1,null,null,null);e["default"]=n.exports},bd79:function(t,e,i){},c427:function(t,e,i){"use strict";var a=i("cee4");e["a"]=a["a"].create({baseURL:"http://eebackend.azurewebsites.net:8080/api",headers:{"Content-type":"application/json"}})},d68d:function(t,e,i){"use strict";i("bd79")},f652:function(t,e,i){"use strict";var a=i("c427");class s{getAll(){return a["a"].get("/tutorials")}get(t){return a["a"].get("/tutorials/"+t)}create(t){return a["a"].post("/tutorials",t)}update(t,e){return a["a"].put("/tutorials/"+t,e)}delete(t){return a["a"].delete("/tutorials/"+t)}deleteAll(){return a["a"].delete("/tutorials")}findByTitle(t){return a["a"].get("/tutorials?title="+t)}}e["a"]=new s}}]);
//# sourceMappingURL=chunk-69de0a37.a263dd6d.js.map