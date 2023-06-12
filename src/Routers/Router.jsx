import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import Instructors from "../Pages/Instructors/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes/Classes";
import ContactUs from "../Pages/ContactUs/ContactUs";
import InstructorClasses from "../Pages/Instructors/InstructorClasses/InstructorClasses";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SingUp/SingUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import PrivateRouter from "./PrivateRouter";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddClasses from "../Pages/Dashboard/AddClasses/AddClasses";
import AdminRouter from "./AdminRouter";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import InstructorRouter from "./InstructorRouter";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import InstructorHome from "../Pages/Dashboard/InstructorHome/InstructorHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import InstructorClass from "../Pages/Dashboard/InstructorClasses/InstructorClasses";
import Profile from "../Pages/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "instructors",
                element: <Instructors />
            },
            {
                path: "/instructor/:name",
                element: <PrivateRouter><InstructorClasses /></PrivateRouter>
            },
            {
                path: "classes",
                element: <Classes />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signUp",
                element: <SingUp />
            },
            {
                path: "profile",
                element: <Profile />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRouter><Dashboard /></PrivateRouter>,
        children: [
            {
                path: 'home',
                element: <UserHome />
            },
            {
                path: 'mycart',
                element: <MyCart />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'enrolledClasses',
                element: <EnrolledClasses />
            },
            {
                path: 'paymenthistory',
                element: <PaymentHistory />
            },

            // Admin Routes
            {
                path: 'adminhome',
                element: <AdminRouter><AdminHome /></AdminRouter>
            },
            {
                path: 'allusers',
                element: <AdminRouter><AllUsers /></AdminRouter>
            },
            
            {
                path: 'manageclasses',
                element: <AdminRouter><ManageClasses /></AdminRouter>
            },

            // Instructor Routers
            {
                path: 'instructorhome',
                element: <InstructorRouter><InstructorHome /></InstructorRouter>
            },
            {
                path: 'instructorhome',
                element: <InstructorRouter></InstructorRouter>
            },
            {
                path: 'instructorclasses',
                element: <InstructorRouter> <InstructorClass /> </InstructorRouter>
            },
            {
                path: 'addclasses',
                element: <InstructorRouter><AddClasses /></InstructorRouter>
            },
        ]
    }
])

export default router;