import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="info">
            <h2 className="title">Teknolojik Yemekler</h2>
            <div className="contact-item">
              <FaMapMarkerAlt className="icon" />
              <p>341 Londonderry Road, İstanbul Türkiye</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="icon" />
              <p>aciktim@teknolojikyemekler.com</p>
            </div>
            <div className="contact-item">
              <FaPhone className="icon" />
              <p>(216) 123-4567</p>
            </div>
          </div>

          <div className="menu">
            <h3 className="title">HOT-Menu</h3>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>UseEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>

          <div className="instagram">
            <h3 className="title">Instagram</h3>
            <div className="instagram-grid">
              <img
                src="images\iteration-2-images\footer\insta\li-0.png"
                alt="Instagram 1"
              />
              <img
                src="images\iteration-2-images\footer\insta\li-1.png"
                alt="Instagram 2"
              />
              <img
                src="images\iteration-2-images\footer\insta\li-2.png"
                alt="Instagram 3"
              />
              <img
                src="images\iteration-2-images\footer\insta\li-3.png"
                alt="Instagram 4"
              />
              <img
                src="images\iteration-2-images\footer\insta\li-4.png"
                alt="Instagram 5"
              />
              <img
                src="images\iteration-2-images\footer\insta\li-5.png"
                alt="Instagram 6"
              />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Teknolojik Yemekler.</p>
        </div>
      </div>
    </footer>
  );
}