import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import Footer from "./Footer";
import './PizzaOrderForm.css';

const PizzaOrderForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [toppings, setToppings] = useState([]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sizeError, setSizeError] = useState("");
  const [crustError, setCrustError] = useState("");
  const [toppingError, setToppingError] = useState("");
  const [formError, setFormError] = useState("");
  const [totalCost, setTotalCost] = useState("");

  const history = useHistory();

  const toppingOptions = [
    "Pepperoni", "Tavuk Izgara", "Mısır", "Sarımsak", "Ananas", "Sosis", "Soğan", "Sucuk", "Biber", "Kabak", "Kanada Jambonu", "Domates", "Jalapeno", "Kasap Sucuk",
  ];

  const calculateTotal = () => {
    const basePrice = 85.5;
    const toppingPrice = 5;
    const toppingsCost = toppings.length * toppingPrice;
    const totalCost = (basePrice + toppingsCost) * quantity;
    return totalCost;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !size || !crust || toppings.length < 4) {
      alert("Lütfen tüm gerekli alanları doldurun.");
      return;
    }

    setIsSubmitting(true);

    const orderData = { 
      isim: name,
      boyut: size,
      hamur: crust,
      malzemeler: toppings,
      not: note,
      adet: quantity,
      toplamTutar: calculateTotal(),
    };

    try {
      const response = await axios.post("https://reqres.in/api/pizza", orderData, { 
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      alert("Sipariş başarıyla gönderildi!");

      history.push("/OrderResult", { orderDetails: result }); // Veriyi OrderResult sayfasına gönder

    } catch (error) {
      console.error("Sipariş gönderiminde hata:", error);
      alert("Sipariş gönderilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-subtitle">Position Absolute Acı Pizza</h2>
        <p className="form-price">85.50₺</p>
        <div className="form-group">
          <label className="form-label">İsim *</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınızı giriniz"
            required
            minLength="3"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Boyut Seç *</label>
            <div className="form-options">
              {["Küçük", "Orta", "Büyük"].map((option) => (
                <label key={option} className="form-option">
                  <input
                    type="radio"
                    name="size"
                    value={option}
                    checked={size === option}
                    onChange={() => setSize(option)}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Hamur Seç *</label>
            <select
              className="form-select"
              value={crust}
              onChange={(e) => setCrust(e.target.value)}
              required
            >
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın">Kalın</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Ek Malzemeler</label>
          <div className="form-toppings">
            {toppingOptions.map((topping) => (
              <label key={topping} className="form-option">
                <input
                  type="checkbox"
                  checked={toppings.includes(topping)}
                  onChange={() => setToppings((prevToppings) =>
                    prevToppings.includes(topping)
                      ? prevToppings.filter((item) => item !== topping)
                      : [...prevToppings, topping]
                  )}
                />
                <span>{topping}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-group form-quantity">
          <button
            type="button"
            className="quantity-button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            type="button"
            className="quantity-button"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
        <div className="form-group">
          <p className="form-total">
            Sipariş Toplamı: <span>{calculateTotal().toFixed(2)}₺</span>
          </p>
        </div>
        <button
          type="submit"
          className="form-submit"
          disabled={isSubmitting || !name || !size || !crust || toppings.length < 4}
        >
          Sipariş Ver
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default PizzaOrderForm;