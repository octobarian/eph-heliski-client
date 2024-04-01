(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad7b8110"],{1891:function(e,t,a){"use strict";var i=a("c427");class l{getAllBeacons(){return i["a"].get("/equipment/beacon")}getBeacon(e){return i["a"].get("/equipment/beacon/"+e)}createBeacon(e){return i["a"].post("/equipment/beacon",e)}deleteBeacon(e){return i["a"].delete("/equipment/beacon/"+e)}deactivateBeacon(e){return i["a"].put("/equipment/beacon/deactivate/"+e)}reactivateBeacon(e){return i["a"].put("/equipment/beacon/activate/"+e)}unlinkBeaconFromTrip(e){return i["a"].put("/equipment/beacon/unlink/"+e)}assignBeaconToTripClient(e,t){return i["a"].put("/equipment/beacon/assign/"+e,{tripClientId:t})}createHelicopter(e){return i["a"].post("/equipment/helicopter",e)}getHelicopters(){return i["a"].get("/equipment/helicopter")}deleteHelicopter(e){return i["a"].delete("/equipment/helicopter/"+e)}editHelicopter(e,t){return i["a"].put("/equipment/helicopter/"+e,t)}}t["a"]=new l},"23eb":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"helicopter-list"},[t("h1",[e._v("Helicopter List")]),t("button",{staticClass:"btn btn-primary",attrs:{"data-bs-toggle":"modal","data-bs-target":"#createHelicopterModal"}},[e._v("Create Helicopter")]),t("table",{staticClass:"table"},[e._m(0),t("tbody",e._l(e.helicopters,(function(a){return t("tr",{key:a.helicopterid},[t("td",[e._v(e._s(a.helicopterid))]),t("td",[e._v(e._s(a.model))]),t("td",[e._v(e._s(a.callsign))]),t("td",[e._v(e._s(a.fuelamounttotal))]),t("td",[e._v(e._s(a.weight))]),t("td",[e._v(e._s(a.maxweight))]),t("td",{staticClass:"action-buttons"},[t("button",{staticClass:"btn btn-warning",on:{click:function(t){return e.prepareEditHelicopter(a)}}},[e._v("Edit")]),t("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.deleteHelicopter(a.helicopterid)}}},[e._v("Delete")])])])})),0)]),t("div",{staticClass:"modal fade",attrs:{id:"createHelicopterModal",tabindex:"-1","aria-labelledby":"createHelicopterModalLabel","aria-hidden":"true"}},[t("div",{staticClass:"modal-dialog"},[t("div",{staticClass:"modal-content"},[e._m(1),t("div",{staticClass:"modal-body"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.createHelicopter.apply(null,arguments)}}},[t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"model"}},[e._v("Model")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newHelicopter.model,expression:"newHelicopter.model"}],staticClass:"form-control",attrs:{type:"text",id:"model",required:""},domProps:{value:e.newHelicopter.model},on:{input:function(t){t.target.composing||e.$set(e.newHelicopter,"model",t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"callsign"}},[e._v("Call Sign")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newHelicopter.callsign,expression:"newHelicopter.callsign"}],staticClass:"form-control",attrs:{type:"text",id:"callsign",required:""},domProps:{value:e.newHelicopter.callsign},on:{input:function(t){t.target.composing||e.$set(e.newHelicopter,"callsign",t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"fuelamounttotal"}},[e._v("Fuel Amount Total")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newHelicopter.fuelamounttotal,expression:"newHelicopter.fuelamounttotal"}],staticClass:"form-control",attrs:{type:"number",id:"fuelamounttotal",required:""},domProps:{value:e.newHelicopter.fuelamounttotal},on:{input:function(t){t.target.composing||e.$set(e.newHelicopter,"fuelamounttotal",t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"weight"}},[e._v("Weight")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newHelicopter.weight,expression:"newHelicopter.weight"}],staticClass:"form-control",attrs:{type:"number",id:"weight",required:""},domProps:{value:e.newHelicopter.weight},on:{input:function(t){t.target.composing||e.$set(e.newHelicopter,"weight",t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"maxweight"}},[e._v("Max Weight")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newHelicopter.maxweight,expression:"newHelicopter.maxweight"}],staticClass:"form-control",attrs:{type:"number",id:"maxweight",required:""},domProps:{value:e.newHelicopter.maxweight},on:{input:function(t){t.target.composing||e.$set(e.newHelicopter,"maxweight",t.target.value)}}})]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Create")])])])])]),t("div",{staticClass:"modal fade",attrs:{id:"editHelicopterModal",tabindex:"-1","aria-labelledby":"editHelicopterModalLabel","aria-hidden":"true"}},[t("div",{staticClass:"modal-dialog"},[t("div",{staticClass:"modal-content"},[e._m(2),t("div",{staticClass:"modal-body"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.updateHelicopter.apply(null,arguments)}}},[t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"editModel"}},[e._v("Model")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.editHelicopterData.model,expression:"editHelicopterData.model"}],staticClass:"form-control",attrs:{type:"text",id:"editModel",required:""},domProps:{value:e.editHelicopterData.model},on:{input:function(t){t.target.composing||e.$set(e.editHelicopterData,"model",t.target.value)}}})]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Update")])])])])])])])])},l=[function(){var e=this,t=e._self._c;return t("thead",[t("tr",[t("th",[e._v("#")]),t("th",[e._v("Model")]),t("th",[e._v("Call Sign")]),t("th",[e._v("Fuel Amount Total")]),t("th",[e._v("Weight")]),t("th",[e._v("Max Weight")]),t("th",[e._v("Actions")])])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title",attrs:{id:"createHelicopterModalLabel"}},[e._v("Create New Helicopter")]),t("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"}})])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title",attrs:{id:"editHelicopterModalLabel"}},[e._v("Edit Helicopter")]),t("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"}})])}],o=a("1891"),r={data(){return{helicopters:[],newHelicopter:{model:"",callsign:"",fuelamounttotal:0,weight:0,maxweight:0},editHelicopterData:{model:"zzz",callsign:"zzz",fuelamounttotal:0,weight:0,maxweight:0}}},methods:{fetchHelicopters(){o["a"].getHelicopters().then(e=>{this.helicopters=e.data}).catch(e=>{console.error("Error fetching helicopters:",e)})},createHelicopter(){o["a"].createHelicopter(this.newHelicopter).then(()=>{this.fetchHelicopters(),this.$bvModal.hide("createHelicopterModal"),this.$bvModal.close("createHelicopterModal")}).catch(e=>{console.error("Error creating helicopter:",e)})},openEditHelicopterModal(){this.editHelicopterData={model:"",callsign:"",fuelamounttotal:0,weight:0,maxweight:0},this.$bvModal.show("editHelicopterModal")},editHelicopter(e){this.openEditHelicopterModal,this.editHelicopterData={...e},this.$bvModal.show("editHelicopterModal")},updateHelicopter(){o["a"].editHelicopter(this.editHelicopterData.helicopterid,this.editHelicopterData).then(()=>{this.fetchHelicopters(),this.$bvModal.hide("editHelicopterModal")}).catch(e=>{console.error("Error updating helicopter:",e)})},deleteHelicopter(e){confirm("Are you sure you want to delete this helicopter? This action cannot be undone.")&&o["a"].deleteHelicopter(e).then(()=>{alert("Helicopter deleted successfully."),this.fetchHelicopters()}).catch(e=>{console.error("Error deleting helicopter:",e),alert("An error occurred while trying to delete the helicopter.")})},openCreateModal(){this.newHelicopter={model:"",callsign:"",fuelamounttotal:0,weight:0,maxweight:0},this.$bvModal.show("createHelicopterModal")}},created(){this.fetchHelicopters()}},s=r,c=(a("821c"),a("2877")),n=Object(c["a"])(s,i,l,!1,null,"563cbfd4",null);t["default"]=n.exports},"34bc":function(e,t,a){},"821c":function(e,t,a){"use strict";a("34bc")},c427:function(e,t,a){"use strict";var i=a("cee4");t["a"]=i["a"].create({baseURL:"https://eebackend.azurewebsites.net:/api",headers:{"Content-type":"application/json"}})}}]);
//# sourceMappingURL=chunk-ad7b8110.bf8ea748.js.map