(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ed8b7a4"],{4458:function(e,t,i){"use strict";var s=i("c427");class a{getAll(e={}){return s["a"].get("/clients",{params:e})}get(e){return s["a"].get("/clients/id/"+e)}create(e){return s["a"].post("/clients",e)}update(e,t){return s["a"].put("/clients/id/"+e,t)}delete(e){return s["a"].delete("/clients/id/"+e)}findByName(e){return s["a"].get("/clients/name?name="+e)}fetchClientId(e){return s["a"].get("/clients/byperson/"+e)}}t["a"]=new a},"7a21":function(e,t,i){},c427:function(e,t,i){"use strict";var s=i("cee4");t["a"]=s["a"].create({baseURL:"http://eebackend.azurewebsites.net:8080/api",headers:{"Content-type":"application/json"}})},d19b:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"client"},[t("h2",{staticClass:"page-title"},[e._v("Client Profile")]),t("div",{staticClass:"button-container"},[t("button",{staticClass:"back-button",on:{click:function(t){e.editing?e.editing=!e.editing:e.goBack()}}},[e._v("Back")]),e.editing?e._e():t("button",{staticClass:"edit-button",on:{click:e.startEditing}},[e._v("Edit")])]),e.editing?e._e():t("section",[t("section",{staticClass:"profile-section"},[t("h3",[e._v("Person Details")]),e.person?t("div",{staticClass:"profile-details"},[t("p",[t("strong",[e._v("First Name:")]),e._v(" "+e._s(e.person.firstname))]),t("p",[t("strong",[e._v("Last Name:")]),e._v(" "+e._s(e.person.lastname))])]):t("div",{staticClass:"loading"},[t("p",[e._v("Loading person details...")])])]),t("section",{staticClass:"profile-section"},[t("h3",[e._v("Health Records")]),e.person?t("div",e._l(e.healthRecords,(function(i){return t("div",{key:i.id,staticClass:"health-record"},[t("p",[t("strong",[e._v("Health Record ID:")]),e._v(" "+e._s(i.id))]),t("p",[t("strong",[e._v("Description:")]),e._v(" "+e._s(i.description))]),t("p",[t("strong",[e._v("Severity:")]),e._v(" "+e._s(i.severity.description))])])})),0):t("div",[t("p",[e._v("Loading person details...")])])]),t("section",{staticClass:"profile-section"},[t("h3",[e._v("Custom Fields")]),e.person&&e.filteredCustomFields.length>0?t("div",e._l(e.filteredCustomFields,(function(i){return t("div",{key:i.field_name,staticClass:"custom-field"},[t("p",[t("strong",[e._v(e._s(i.field_name)+":")]),e._v(" "+e._s(i.field_value))])])})),0):t("div",[t("p",[e._v("No custom fields available.")])])]),e._m(0),e._m(1)]),e.editing?t("section",{staticClass:"edit-section"},[t("h3",[e._v("Edit Client Details")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.updateClient.apply(null,arguments)}}},[t("div",{staticClass:"form-group profile-details"},[t("label",{attrs:{for:"firstName"}},[e._v("First Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.editableClient.firstname,expression:"editableClient.firstname"}],staticClass:"form-control",attrs:{type:"text",id:"firstName",placeholder:e.person.firstname},domProps:{value:e.editableClient.firstname},on:{input:function(t){t.target.composing||e.$set(e.editableClient,"firstname",t.target.value)}}})]),t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"lastName"}},[e._v("Last Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.editableClient.lastname,expression:"editableClient.lastname"}],staticClass:"form-control",attrs:{type:"text",id:"lastName",placeholder:e.person.lastname},domProps:{value:e.editableClient.lastname},on:{input:function(t){t.target.composing||e.$set(e.editableClient,"lastname",t.target.value)}}})]),e.editableHealthRecords.length?t("div",[t("h4",[e._v("Health Record")]),e._l(e.editableHealthRecords,(function(i,s){return t("div",{key:s},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"description"}},[e._v("Description")]),t("input",{directives:[{name:"model",rawName:"v-model",value:i.description,expression:"record.description"}],staticClass:"form-control",attrs:{type:"text",id:"description"},domProps:{value:i.description},on:{input:function(t){t.target.composing||e.$set(i,"description",t.target.value)}}})]),t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"severity"}},[e._v("Severity")]),t("select",{directives:[{name:"model",rawName:"v-model",value:i.severityid,expression:"record.severityid"}],staticClass:"form-control",attrs:{id:"severity"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(i,"severityid",t.target.multiple?s:s[0])}}},e._l(e.severities,(function(i){return t("option",{key:i.id,domProps:{value:i.id}},[e._v(" "+e._s(i.description)+" ")])})),0)])])}))],2):e._e(),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit")])])]):e._e()])},a=[function(){var e=this,t=e._self._c;return t("section",[t("h3",[e._v("Trip History")])])},function(){var e=this,t=e._self._c;return t("section",[t("h3",[e._v("Training Details")])])}],n=i("4458"),r=i("c427");class l{fetchSeverities(){return r["a"].get("/clients/severities")}}var o=new l,c={name:"Client",props:["id"],data(){return{editing:!1,client:null,person:null,healthRecords:[],trainingDetails:[],editableClient:null,editableHealthRecords:[],severities:[]}},methods:{startEditing(){this.editing=!0,this.editableClient=JSON.parse(JSON.stringify(this.client)),this.editableHealthRecords=JSON.parse(JSON.stringify(this.client.person.personhealth)),this.fetchSeverities()},goBack(){this.$router.go(-1)},fetchSeverities(){o.fetchSeverities().then(e=>{this.severities=e.data}).catch(e=>{console.log(e)})},fetchClientData(){n["a"].get(this.id).then(e=>{console.log(e),this.client=e.data,this.person=e.data.person,this.customFields=e.data.person.customFields,this.healthRecords=e.data.person.personhealth}).catch(e=>{console.error(e)})},updateClient(){const e={client:this.editableClient,healthRecords:this.editableHealthRecords};n["a"].update(this.editableClient.clientid,e).then(e=>{this.client=e.data.client,this.person=e.data.person,this.healthRecords=e.data.person.personhealth,this.editing=!1}).catch(e=>{console.log(e)})}},created(){this.fetchClientData()},computed:{filteredCustomFields(){return this.customFields.filter(e=>{const t=e.field_value;return t&&"{}"!==t&&(!Array.isArray(t)||t.length>0)})}}},d=c,p=(i("deff"),i("2877")),u=Object(p["a"])(d,s,a,!1,null,"9624d44c",null);t["default"]=u.exports},deff:function(e,t,i){"use strict";i("7a21")}}]);
//# sourceMappingURL=chunk-4ed8b7a4.721d0a5b.js.map