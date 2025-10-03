import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
    return (  //we cannot use elements outside the RouterProvider thats why we cannot add NavBar outside
        <>
        <NavBar />
        <Outlet />          
        </>
      ) //outlet - represent what the page currently displayed
}