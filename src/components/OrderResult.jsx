import React from "react";
import { useHistory } from "react-router-dom";  // useHistory hook

import "./OrderResult.css";  
import "./Header.css";  

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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <p className="form-subtitle">TEBRİKLER!</p>
                <p className="form-subtitle">SİPARİŞİNİZ ALINDI!</p>
               
            </form>
        </div>
    );
}