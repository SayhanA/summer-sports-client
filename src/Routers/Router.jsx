import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import Instructors from "../Pages/Instructors/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes/Classes";
import ContactUs from "../Pages/ContactUs/ContactUs";

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
                path: "classes",
                element: <Classes />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
        ]
    }
])

export default router;