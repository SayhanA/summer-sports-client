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
                element: <InstructorClasses />
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
        ]
    }
])

export default router;