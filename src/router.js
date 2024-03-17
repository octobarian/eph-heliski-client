import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    //Login, and Dashboards
    {
      path: "/",
      name: "Default",
      component: () => import("./Default")
    },
    {
      path: "/main-office",
      name: "main-office",
      component: () => import("@/components/Greeting-Office")
    },
    {
      path: "/main-guide",
      name: "main-guide",
      component: () => import("@/components/Greeting-Guide")
    },
    //Equipment Routes
    {
      path: "/beaconlist",
      name: "beaconlist",
      component: () => import("@/components/Equipment/BeaconList.vue")
    },
    {
      path: "/helicopterlist",
      name: "helicopterlist",
      component: () => import("@/components/Equipment/HelicopterList.vue")
    },
    //Reservation Routes
    {
      path: "/reservationlist",
      name: "reservationlist",
      component: () => import("@/components/Reservations/ReservationList.vue")
    },
    {
      path: '/reservation/:id',
      name: 'reservation',
      component: () => import('@/components/Reservations/Reservation.vue'),
      props: true
    },
    //Reports Routes
    {
      path: "/generatereports",
      name: "generatereports",
      component: () => import("@/components/Reports/GenerateReports.vue")
    },

    //Trip Routes
    {
      path: "/trip",
      name: "trip",
      component: () => import("@/components/Trips/Trip")
    },

    //Tutorial CRUD Placeholder
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("@/components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("@/components/AddTutorial")
    },
    {
      path: "/tutorials-page",
      name: "tutorials-page",
      component: () => import("@/components/TutorialsPage")
    },
    {
      path: "/tutorials-list",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("@/components/TutorialsList")
    },

    //Zaui API
    {
      path: "/zaui",
      name: "zaui",
      component: () => import("@/components/Zaui")
    },
    {
      path: "/zauiinfo",
      name: "zauiinfo",
      component: () => import("@/components/Zaui/ZauiStatusInformation")
    },

    //Passenger Routes
    {
      path: "/passengers",
      name: "passengers",
      component: () => import("@/components/Passengers/Passengers")
    },
    {
      path: '/clients/:id',
      name: 'client',
      component: () => import('@/components/Passengers/Client.vue'),
      props: true
    },

    //Staff Routes
    {
      path: "/stafflist",
      name: "stafflist",
      component: () => import("@/components/Staff/StaffList.vue")
    },
    {
      path: '/staff/:id',
      name: 'staff',
      component: () => import('@/components/Staff/Staff.vue'),
      props: true
    },
  ]
});

export default router;