import Header from "./Header.jsx";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./Footer.jsx";

export default function Layout() {
    const location = useLocation()
    console.log(location)

    return (
        <div>
            <Header/>
            <Outlet/>
            {
                location.pathname !== '/pdf' &&
                <Footer/>
            }
        </div>
    )
}