import React from "react";
import { useHistory } from "react-router-dom";  // useHistory hook
import Footer from "./Footer";
import "./OrderResult.css";

export default function OrderResult() {
    const history = useHistory();  // useHistory hook

    const handleSubmit = (event) => {
        event.preventDefault();
        // Form gönderme işlemi yapılabilir
        console.log("Form submitted");

        // Butona tıkladığında 'PizzaOrderForm' sayfasına yönlendir
        history.push("/PizzaOrderForm");  // History.push ile yönlendir
    };

    return (
        <div className="OrderResult">
        <div className="form-container">
            
                <p className="form-subtitle6">lezzetin yolda</p>
                <p className="form-subtitle">SİPARİŞ ALINDI!</p>
                
                </div>
                <Footer />
        </div>
    );

};