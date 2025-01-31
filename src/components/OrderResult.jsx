import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import "./OrderResult.css";

export default function OrderResult() {
 const location = useLocation();
const orderDetails = location.state?.orderDetails;

    return (
        <div className="OrderResult">
        <div className="form-container">
            
                <p className="form-subtitle6">lezzetin yolda</p>
                <p className="form-subtitle7">SİPARİŞ ALINDI!</p>
                
                {orderDetails && (
          <div className="order-summary">
            
            <h3 className="name"><strong> {orderDetails.isim}</strong></h3>
            <p className="size">Boyut:<strong>{orderDetails.boyut}</strong></p>
            <p className="hamur">Hamur:<strong> {orderDetails.hamur}</strong></p>
            <p className="malzeme">Malzemeler:<strong> {orderDetails.malzemeler.join(", ")}</strong></p>
            <p className="aded">Sipariş Adedi:<strong> {orderDetails.adet}</strong></p>
            <div className="toplam">
            <p className="toplams"><strong>Sipariş Toplamı</strong></p>
            <p className="toplam">Toplam:<strong> {orderDetails.toplamTutar}₺</strong></p>
          </div>
          </div>
        )}
        
                </div>
                <Footer />
        </div>
    );

};