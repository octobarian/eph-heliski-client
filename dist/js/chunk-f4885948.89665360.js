(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f4885948"],{"21bb":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"guide-dashboard"},[t("div",{staticClass:"header d-flex justify-content-between align-items-center p-3 mb-3"},[t("h1",[e._v("Guide Dashboard")]),t("div",{staticClass:"date-selector"},[t("label",{staticClass:"form-label me-2",attrs:{for:"selectedDate"}},[e._v("Selected Date:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedDate,expression:"selectedDate"}],staticClass:"form-control form-control-lg",attrs:{type:"date",id:"selectedDate"},domProps:{value:e.selectedDate},on:{change:e.fetchTripsForGuide,input:function(t){t.target.composing||(e.selectedDate=t.target.value)}}})])]),e.trips?t("div",{staticClass:"content"},e._l(e.trips,(function(s,a){return t("div",{key:s.tripid,staticClass:"row trip-row mb-4"},[t("div",{staticClass:"col-md-6"},[t("TripCardView",{staticClass:"trip-card-view",attrs:{tripData:s,tripNumber:a+1}})],1),t("div",{staticClass:"col-md-6"},[t("div",{staticClass:"passenger-info-box p-3"},[t("h2",[e._v("Your Riders")]),e.beacons&&e.beacons.length?t("div",{staticClass:"passengers d-flex justify-content-start flex-wrap"},e._l(s.reservationPersons,(function(s){return t("PassengerCard",{key:s.reservationid,staticClass:"me-3",attrs:{passenger:e.formatPassengerData(s.person,s.tripclientid),activityname:s.activityName,beacons:e.beacons},on:{"beacon-change":e.handleBeaconAssignment}})})),1):e._e()])])])})),0):t("div",{staticClass:"content"},[e._m(0)])])},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"row trip-row mb-4"},[t("h2",[e._v("You have no assigned trips on this day")])])}],n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"trip-card card"},[t("div",{staticClass:"card-header"},[t("h2",[e._v("Trip #"+e._s(e.tripNumber))]),t("p",[e._v("Trip ID: "+e._s(e.tripData.tripid))])]),t("div",{staticClass:"card-body"},[t("div",{staticClass:"guide-section"},[t("label",[e._v("Guides:")]),t("div",{staticClass:"selected-guides"},e._l(e.tripData.guides,(function(s){return t("span",{key:s.personid,staticClass:"guide-tag"},[e._v(" "+e._s(s.firstname)+" "+e._s(s.lastname)+" ")])})),0)]),t("div",{staticClass:"pilot-helicopter"},[t("p",[t("strong",[e._v("Pilot:")]),e._v(" "+e._s(e.tripData.pilot.firstname)+" "+e._s(e.tripData.pilot.lastname))]),t("p",[t("strong",[e._v("Helicopter:")]),e._v(" "+e._s(e.tripData.helicopter.model)+" ("+e._s(e.tripData.helicopter.callsign)+")")])]),t("div",{staticClass:"reservations-section"},[t("h5",{staticClass:"card-title"},[e._v("Reservations")]),t("div",{staticClass:"selected-reservations"},e._l(e.tripData.reservationPersons,(function(s){return t("span",{key:s.reservationid,staticClass:"reservation-tag"},[e._v(" "+e._s(s.person.firstname)+" "+e._s(s.person.lastname)+" - "+e._s(s.person.weight)+" kg ")])})),0)]),t("div",{staticClass:"notes-section"},[t("label",[e._v("Notes:")]),t("p",[e._v(e._s(e.noteContent))])])])])},r=[],o=s("93e8"),c={props:{tripData:{type:Object,required:!0},tripNumber:{type:Number,required:!0}},data(){return{noteContent:""}},methods:{fetchNote(){o["a"].getTripNote(this.tripData.tripid).then(e=>{this.noteContent=e.data.text}).catch(e=>{console.error("Error fetching note:",e)})}},mounted(){this.fetchNote()}},d=c,l=(s("a5dd"),s("2877")),p=Object(l["a"])(d,n,r,!1,null,"0a9b0b61",null),u=p.exports,h=function(){var e=this,t=e._self._c;return t("div",{ref:"cardContainer",staticClass:"passenger-card"},[t("h3",{ref:"passengerName",staticClass:"passenger-name"},[e._v(e._s(e.passenger.name))]),t("div",{staticClass:"activity-label"},[t("label",[e._v("Activity:")]),t("div",{staticClass:"activity-box"},[e._v(e._s(e.activityname))])]),t("p",[t("strong",[e._v("Weight:")]),e._v(" "+e._s(e.passenger.weight)+" kg")]),e.passenger.additionalData?t("div",{staticClass:"additional-data"}):e._e(),t("div",{staticClass:"trip-client-id"},[e._v(" Trip Client ID: "+e._s(e.passenger.tripclientid)+" ")]),t("label",{staticClass:"beacon-label",attrs:{for:"dropdownMenuButton"}},[e._v("Beacon #")]),t("div",{staticClass:"dropdown"},[t("button",{staticClass:"btn btn-secondary dropdown-toggle",attrs:{type:"button",id:"dropdownMenuButton","data-bs-toggle":"dropdown","aria-expanded":"false"}},[e._v(" "+e._s(e.selectedBeaconNumber||"Select Beacon")+" ")]),t("ul",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},e._l(e.beacons,(function(s){return t("li",{key:s.beaconid},[t("a",{staticClass:"dropdown-item",class:{"text-danger":s.tripclientid,"text-dark":!s.tripclientid},attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.handleBeaconChange(s.beaconid,s.beaconnumber)}}},[e._v(" "+e._s(s.beaconnumber)+" "+e._s(s.tripclientid?"Assigned":"")+" ")])])})),0)])])},f=[],v={props:{passenger:Object,activityname:String,beacons:Array},data(){return{selectedBeacon:null,selectedBeaconNumber:""}},watch:{beacons:{handler(e){const t=e.find(e=>e.tripclientid===this.passenger.tripclientid);t&&(this.selectedBeacon=t.beaconid,this.selectedBeaconNumber=t.beaconnumber)},deep:!0}},methods:{handleBeaconChange(e,t){this.selectedBeacon=e,this.selectedBeaconNumber=t,this.$emit("beacon-change",{beaconId:e,tripClientId:this.passenger.tripclientid})},resizeFont(){const e=this.$refs.passengerName,t=this.$refs.cardContainer.offsetWidth,s=this.passenger.name.length;if(s<=20){let s=20;e.style.fontSize=s+"px",e.style.whiteSpace="nowrap";while(e.scrollWidth>t&&s>8)s-=1,e.style.fontSize=s+"px"}else e.style.whiteSpace="normal",e.style.fontSize="initial"}},mounted(){this.resizeFont(),window.addEventListener("resize",this.resizeFont)},beforeDestroy(){window.removeEventListener("resize",this.resizeFont)},created(){const e=this.beacons.find(e=>e.tripclientid===this.passenger.tripclientid);e&&(this.selectedBeacon=e.beaconid,this.selectedBeaconNumber=e.beaconnumber)}},g=v,b=(s("7c9b"),Object(l["a"])(g,h,f,!1,null,"c630ccc6",null)),m=b.exports,_=s("298b"),C=s("023f"),w=s("1891"),y={components:{TripCardView:u,PassengerCard:m},data(){return{guideEmail:"",selectedDate:(new Date).toISOString().split("T")[0],trips:[],beacons:[]}},created(){this.fetchStaffId(),this.fetchTripsForGuide(),this.fetchAllBeacons()},methods:{fetchStaffId(){this.guideEmail=sessionStorage.getItem("email"),this.guideEmail&&_["a"].findByEmail(this.guideEmail).then(e=>{const t=e.data.staffid;sessionStorage.setItem("staffId",t)}).catch(e=>{console.error("Error fetching staff ID:",e)})},fetchTripsForGuide(){const e=sessionStorage.getItem("staffId");C["a"].findByGuideAndDate(e,this.selectedDate).then(e=>{this.trips=e.data,console.log(this.trips)}).catch(e=>{console.error("Error fetching trips for guide:",e)})},formatPassengerData(e,t){return{name:e.firstname+" "+e.lastname,activity:e.activityName,weight:e.weight,additionalData:e.additionalData,tripclientid:t}},fetchAllBeacons(){w["a"].getAllBeacons().then(e=>{this.beacons=e.data}).catch(e=>{console.error("Error fetching beacons:",e)})},handleBeaconAssignment({beaconId:e,tripClientId:t}){const s=this.beacons.find(t=>t.beaconid===e);s&&s.tripclientid&&s.tripclientid!==t?confirm("This beacon is already assigned to another passenger. Do you want to reassign it?")&&w["a"].unlinkBeaconFromTrip(e).then(()=>{w["a"].assignBeaconToTripClient(e,t)}):w["a"].assignBeaconToTripClient(e,t)}}},D=y,B=(s("d63c"),Object(l["a"])(D,a,i,!1,null,"68b04716",null));t["default"]=B.exports},"44cd":function(e,t,s){},"46f9":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"default"},["guide"==e.role?t("GreetingGuide"):"office"==e.role?t("GreetingOffice"):t("div",[e._v("You Have No Role, Contact your system administrator to ensure you have the proper access to mechski")])],1)},i=[],n=s("21bb"),r=s("2b8d"),o={name:"Default",components:{GreetingGuide:n["default"],GreetingOffice:r["default"]},data(){return{role:"office"}},mounted(){this.role=sessionStorage.getItem("role"),this.role="office"}},c=o,d=s("2877"),l=Object(d["a"])(c,a,i,!1,null,null,null);t["default"]=l.exports},"7c9b":function(e,t,s){"use strict";s("a300")},a00c:function(e,t,s){},a300:function(e,t,s){},a5dd:function(e,t,s){"use strict";s("44cd")},d63c:function(e,t,s){"use strict";s("a00c")}}]);
//# sourceMappingURL=chunk-f4885948.89665360.js.map