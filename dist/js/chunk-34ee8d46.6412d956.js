(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34ee8d46"],{"14d9":function(t,e,a){"use strict";var s=a("23e7"),i=a("7b0b"),r=a("07fa"),n=a("3a34"),o=a("3511"),l=a("d039"),f=l((function(){return 4294967297!==[].push.call({length:4294967296},1)})),c=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}},d=f||!c();s({target:"Array",proto:!0,arity:1,forced:d},{push:function(t){var e=i(this),a=r(e),s=arguments.length;o(a+s);for(var l=0;l<s;l++)e[a]=arguments[l],a++;return n(e,a),a}})},"298b":function(t,e,a){"use strict";var s=a("c427");class i{getAll(){return s["a"].get("/staff")}get(t){return s["a"].get("/staff/id/"+t)}create(t){return s["a"].post("/staff",t)}update(t,e){return s["a"].put("/staff/id/"+t,e)}delete(t){return s["a"].delete("/staff/id/"+t)}findByName(t){return s["a"].get("/staff?name="+t)}findByEmail(t){return s["a"].get("/staff/email/"+t)}fetchJobs(){return s["a"].get("/staff/jobs")}}e["a"]=new i},3511:function(t,e,a){"use strict";var s=TypeError,i=9007199254740991;t.exports=function(t){if(t>i)throw s("Maximum allowed index exceeded");return t}},"35dd":function(t,e,a){},"3a34":function(t,e,a){"use strict";var s=a("83ab"),i=a("e8b5"),r=TypeError,n=Object.getOwnPropertyDescriptor,o=s&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=o?function(t,e){if(i(t)&&!n(t,"length").writable)throw new r("Cannot set read only .length");return t.length=e}:function(t,e){return t.length=e}},"9c00":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"staff"},[e("h2",{staticClass:"page-title"},[t._v("Staff Profile")]),e("div",{staticClass:"button-container"},[e("button",{staticClass:"back-button",on:{click:function(e){t.editing?t.editing=!t.editing:t.goBack()}}},[t._v("Back")]),t.editing?t._e():e("button",{staticClass:"edit-button",on:{click:t.startEditing}},[t._v("Edit")]),t.editing?e("button",{staticClass:"delete-button",on:{click:t.deleteStaff}},[t._v("Delete")]):t._e()]),t.editing?t._e():e("section",[e("section",{staticClass:"profile-section"},[e("h3",[t._v("Person Details")]),t.person?e("div",{staticClass:"profile-details"},[e("p",[e("strong",[t._v("First Name:")]),t._v(" "+t._s(t.person.firstname))]),e("p",[e("strong",[t._v("Last Name:")]),t._v(" "+t._s(t.person.lastname))])]):e("div",{staticClass:"loading"},[e("p",[t._v("Loading person details...")])])]),e("section",{staticClass:"profile-section"},[e("h3",[t._v("Job Details")]),t.staff?e("div",[e("p",[e("strong",[t._v("Job Title:")]),t._v(" "+t._s(t.staff.job?t.staff.job.jobtitle:"N/A"))])]):e("div",[e("p",[t._v("Loading job details...")])])])]),t.editing?e("section",{staticClass:"edit-section"},[e("h3",[t._v("Edit Staff Details")]),e("form",{on:{submit:function(e){return e.preventDefault(),t.updateStaff.apply(null,arguments)}}},[e("div",{staticClass:"form-group profile-details"},[e("label",{attrs:{for:"firstName"}},[t._v("First Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.editablePerson.firstname,expression:"editablePerson.firstname"}],staticClass:"form-control",attrs:{type:"text",id:"firstName"},domProps:{value:t.editablePerson.firstname},on:{input:function(e){e.target.composing||t.$set(t.editablePerson,"firstname",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"lastName"}},[t._v("Last Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.editablePerson.lastname,expression:"editablePerson.lastname"}],staticClass:"form-control",attrs:{type:"text",id:"lastName"},domProps:{value:t.editablePerson.lastname},on:{input:function(e){e.target.composing||t.$set(t.editablePerson,"lastname",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"jobTitle"}},[t._v("Job Title")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.editableStaff.jobid,expression:"editableStaff.jobid"}],staticClass:"form-control",attrs:{id:"jobTitle"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.editableStaff,"jobid",e.target.multiple?a:a[0])}}},t._l(t.jobs,(function(a){return e("option",{key:a.jobid,domProps:{value:a.jobid}},[t._v(" "+t._s(a.jobtitle)+" ")])})),0)]),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save Changes")])])]):t._e()])},i=[],r=(a("14d9"),a("298b")),n={name:"Staff",props:["id"],data(){return{editing:!1,staff:null,person:null,jobs:[],editableStaff:null,editablePerson:null}},methods:{startEditing(){this.editing=!0,this.editableStaff=JSON.parse(JSON.stringify(this.staff)),this.editablePerson=JSON.parse(JSON.stringify(this.person))},goBack(){this.$router.go(-1)},fetchStaffData(){r["a"].get(this.id).then(t=>{console.log(t),this.staff=t.data,this.person=t.data.person}).catch(t=>{console.error(t)})},updateStaff(){const t={staff:this.editableStaff,person:this.editablePerson};r["a"].update(this.editableStaff.staffid,t).then(()=>{this.staff={...this.staff,...this.editableStaff},this.person={...this.person,...this.editablePerson},this.editing=!1}).catch(t=>{console.error(t)})},deleteStaff(){confirm("Are you sure you want to delete this staff member?")&&r["a"].delete(this.staff.staffid).then(()=>{alert("Staff member deleted successfully."),this.$router.push("/stafflist")}).catch(t=>{console.error("Error deleting staff:",t),alert("Failed to delete staff member.")})},fetchJobs(){r["a"].fetchJobs().then(t=>{this.jobs=t.data}).catch(t=>{console.log(t)})}},created(){this.fetchStaffData(),this.fetchJobs()}},o=n,l=(a("9fe3"),a("2877")),f=Object(l["a"])(o,s,i,!1,null,"6453d6ad",null);e["default"]=f.exports},"9fe3":function(t,e,a){"use strict";a("35dd")},c427:function(t,e,a){"use strict";var s=a("cee4");e["a"]=s["a"].create({baseURL:"http://eebackend.azurewebsites.net:8080/api",headers:{"Content-type":"application/json"}})},e8b5:function(t,e,a){"use strict";var s=a("c6b6");t.exports=Array.isArray||function(t){return"Array"===s(t)}}}]);
//# sourceMappingURL=chunk-34ee8d46.6412d956.js.map