import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import {
  Hero,
  Contact,
  Destinations,
  Gallery,
  AllDestinations,
  Services,
  Testimonials,
  AdminTrekForm,
  SignInForm,
  SignUpForm,
  DestinationDetails,
  BookingForm,
  AdminPanel,
  EditTrekForm,
  checkUserAuthLoader,
  checkAdminAuthLoader,
  Unauthorized,
  AdminBookings,
  Profile,
  TermsAndConditions,
  PrivacyPolicy,
  ScrollToTop,
} from "./components";

import { Provider } from "react-redux";
import { store } from "./App/store.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignUpForm />,
  },
  {
    path: "signin",
    element: <SignInForm />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    loader: checkAdminAuthLoader,
  },
  {
    path: "/addTrek",
    element: <AdminTrekForm />,
    loader: checkAdminAuthLoader,
  },
  {
    path: "/editTrek",
    element: <EditTrekForm />,
    loader: checkAdminAuthLoader,
  },
  {
    path: "/admin/bookings",
    element: <AdminBookings />,
    loader: checkAdminAuthLoader,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <>
            <Hero />
            <Destinations />
            <Services />
            <Gallery />
            <Testimonials />
          </>
        ),
      },
      {
        path: "destinations",
        element: <AllDestinations />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "destinationdetails",
        element: <DestinationDetails />,
      },
      {
        path: "booking",
        element: <BookingForm />,
        loader: checkUserAuthLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: checkUserAuthLoader,
      },
    ],
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer theme="dark" />
    <RouterProvider router={router} />
  </Provider>
);

// structure            {
//         path : 'booking',
//         element : <BookingForm/>,
//         loader : checkUserAuthLoader,
//       },
