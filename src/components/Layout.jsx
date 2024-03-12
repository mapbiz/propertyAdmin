import Header from "./Header.jsx";
import {Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";

import { authMe } from "../api/api.js";
import { useEffect, useState } from "react";

export default function Layout() {
    const location = useLocation(),
    navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const handleAuth = async () => {
            try {
                const me = await authMe();

                if(me.status !== 200) {
                    console.log('test');

                    return navigate('/auth');
                }
            }
            catch(err) {
                navigate('/auth');
            };
        };

        handleAuth();
    }, []);

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