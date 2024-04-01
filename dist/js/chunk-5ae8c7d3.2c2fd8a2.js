(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ae8c7d3"],{4458:function(e,t,s){"use strict";var r=s("c427");class i{getAll(e={}){return r["a"].get("/clients",{params:e})}get(e){return r["a"].get("/clients/id/"+e)}create(e){return r["a"].post("/clients",e)}update(e,t){return r["a"].put("/clients/id/"+e,t)}delete(e){return r["a"].delete("/clients/id/"+e)}findByName(e){return r["a"].get("/clients/name?name="+e)}fetchClientId(e){return r["a"].get("/clients/byperson/"+e)}}t["a"]=new i},c427:function(e,t,s){"use strict";var r=s("cee4");t["a"]=r["a"].create({baseURL:"https://eebackend.azurewebsites.net:/api",headers:{"Content-type":"application/json"}})},db84:function(e,t,s){"use strict";var r=s("c427");class i{getAll(){return r["a"].get("/reservations")}search(e){return r["a"].get("/reservations/search?q="+e)}get(e){return r["a"].get("/reservations/id/"+e)}findByGroupCode(e){return r["a"].get("/reservations?groupCode="+e)}findByPersonId(e){return r["a"].get("/reservations?personId="+e)}findByDate(e){return r["a"].get("/reservations/unassigned/"+e)}}t["a"]=new i},e425:function(e,t,s){"use strict";s("f2d3")},e7a8:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"reservation"},[t("h2",{staticClass:"page-title"},[e._v("Reservation Details")]),t("div",{staticClass:"button-container"},[t("button",{staticClass:"back-button",on:{click:function(t){return e.goBack()}}},[e._v("Back")])]),e.reservation?t("section",[t("section",{staticClass:"profile-section"},[t("h3",[e._v("Reservation Information")]),t("div",{staticClass:"profile-details"},[t("p",[t("strong",[e._v("Group Code:")]),e._v(" "+e._s(e.reservation.groupcode))]),t("p",[t("strong",[e._v("Activity Date:")]),e._v(" "+e._s(e.reservation.activitydate))]),t("p",[t("strong",[e._v("Balance Owing:")]),e._v(" "+e._s(e.reservation.balanceowing))])])]),t("section",{staticClass:"profile-section"},[t("h3",[e._v("Guest Information")]),e.reservation.person?t("div",{staticClass:"profile-details"},[t("p",[t("strong",[e._v("First Name:")]),e._v(" "+e._s(e.reservation.person.firstname))]),t("p",[t("strong",[e._v("Last Name:")]),e._v(" "+e._s(e.reservation.person.lastname))]),t("p",[t("strong",[e._v("Email:")]),e._v(" "+e._s(e.reservation.person.email))]),t("p",[t("strong",[e._v("Mobile Phone:")]),e._v(" "+e._s(e.reservation.person.mobilephone))]),t("router-link",{staticClass:"btn btn-primary",attrs:{to:"/clients/"+e.clientId}},[e._v("View Guest")])],1):e._e()]),t("section",{staticClass:"profile-section"},[t("h3",[e._v("Reservation Details")]),e._l(e.reservation.details,(function(s){return t("div",{key:s.reservationdetailid,staticClass:"details"},[t("p",[t("strong",[e._v("Activity:")]),e._v(" "+e._s(s.activity))]),t("p",[t("strong",[e._v("Van Pickup:")]),e._v(" "+e._s(s.vanpickup?"Yes":"No"))]),t("p",[t("strong",[e._v("First Ski Trip of Year:")]),e._v(" "+e._s(s.firstskitripofyear?"Yes":"No"))]),t("p",[t("strong",[e._v("New Guest:")]),e._v(" "+e._s(s.newguest?"Yes":"No"))]),t("p",[t("strong",[e._v("Arriving to Revelstoke:")]),e._v(" "+e._s(s.arrivingtorevelstoke))]),t("p",[t("strong",[e._v("Additional Details:")]),e._v(" "+e._s(s.ad2))])])}))],2)]):t("div",[t("p",[e._v("Loading reservation details...")])])])},i=[],n=s("db84"),a=s("4458"),o={name:"Reservation",props:["id"],data(){return{reservation:null,reservationDetails:[],clientId:null}},methods:{goBack(){this.$router.go(-1)},fetchReservationData(){n["a"].get(this.id).then(e=>{this.reservation=e.data,this.reservationDetails=e.data.details,this.fetchClientId()}).catch(e=>{console.error(e)})},fetchClientId(){if(this.reservation&&this.reservation.person){const e=this.reservation.person.personid;a["a"].fetchClientId(e).then(e=>{this.clientId=e.data.clientid}).catch(e=>{console.error(e)})}}},created(){this.fetchReservationData()}},c=o,v=(s("e425"),s("2877")),l=Object(v["a"])(c,r,i,!1,null,"b2cac4a8",null);t["default"]=l.exports},f2d3:function(e,t,s){}}]);
//# sourceMappingURL=chunk-5ae8c7d3.2c2fd8a2.js.map