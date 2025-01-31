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
                <p className="form-subtitle">SİPARİŞ ALINDI!</p>
                
                {orderDetails && (
          <div className="order-summary">
            <h3>Sipariş Özeti</h3>
            <p><strong>Adı:</strong> {orderDetails.isim}</p>
            <p><strong>Boyut:</strong> {orderDetails.boyut}</p>
            <p><strong>Hamur:</strong> {orderDetails.hamur}</p>
            <p><strong>Malzemeler:</strong> {orderDetails.malzemeler.join(", ")}</p>
            <p><strong>Sipariş Adedi:</strong> {orderDetails.adet}</p>
            <p><strong>Toplam Tutar:</strong> {orderDetails.toplamTutar}₺</p>
          </div>
        )}
        
                </div>
                <Footer />
        </div>
    );

};