import React from "react";
import { useHistory } from "react-router-dom";  // useHistory hook
import "./MainPage.css";

import Baslik from "./Baslik";
import Lezzetler from "./Lezzetler";
import AnaLezzet from "./AnaLezzet";
import Pizzalar from "./Pizzalar";
import Reklam from "./Reklam";
import Footer from "./Footer";

export default function MainPage() {
    const history = useHistory();  // useHistory hook'u ile history nesnesini al

    const handleClick = () => {

        // Butona tıkladığında 'PizzaOrderForm' sayfasına yönlendir
        history.push("/PizzaOrderForm");  // History.push ile yönlendir
    };

    return (
        <div className="MainPage">
            <div className="form-container">
                <p className="form-subtitle">KOD ACIKTIRIR</p>
                <p className="form-subtitle">PİZZA, DOYURUR</p>
                <button onClick={handleClick} className="form-submit">
                    ACIKTIM
                </button>
            </div>
            <AnaLezzet />
            <Reklam />
            <Baslik />
            <Lezzetler />
            <Pizzalar />
            <Footer />
        </div>

    );
};

