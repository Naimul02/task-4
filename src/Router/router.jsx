import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";



const router = createBrowserRouter([
    {
      path: "/",
      element : <Main></Main>,
      children : [
        {
          path : '/',
          element : <Home></Home>
        },
        {
          path : '/login',
          element : <Login></Login>
        },
        {
          path : '/register',
          element : <Signup></Signup>

        }
      ]
    },
  ]);

  export default router