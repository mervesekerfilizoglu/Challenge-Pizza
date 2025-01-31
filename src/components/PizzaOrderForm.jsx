import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";  // useHistory hook'unu import ediyoruz
import Footer from "./Footer";
import './PizzaOrderForm.css';

const PizzaOrderForm = () => {
  const [name, setName] = useState(""); // İsim alanı için state
  const [size, setSize] = useState(""); // Pizza boyu
  const [crust, setCrust] = useState(""); // Hamur türü
  const [toppings, setToppings] = useState([]); // Seçilen malzeme dizisi
  const [note, setNote] = useState(""); // Kullanıcıdan gelen sipariş notu
  const [quantity, setQuantity] = useState(1); // Sipariş adedi
  const [isSubmitting, setIsSubmitting] = useState(false); // Form gönderimi sırasında butonun devre dışı olması
  const [nameWarning, setNameWarning] = useState(""); // İsim uyarısı için state
  const [sizeError, setSizeError] = useState("");
  const [crustError, setCrustError] = useState("");
  const [toppingError, setToppingError] = useState("");
  const [formError, setFormError] = useState(""); // Genel form hatası
  const [formSuccess, setFormSuccess] = useState(""); // Başarı mesajı
  const [totalCost, setTotalCost] = useState("");

  const history = useHistory();

  const toppingOptions = [
    "Pepperoni",
    "Tavuk Izgara",
    "Mısır",
    "Sarımsak",
    "Ananas",
    "Sosis",
    "Soğan",
    "Sucuk",
    "Biber",
    "Kabak",
    "Kanada Jambonu",
    "Domates",
    "Jalapeno",
    "Kasap Sucuk",
  ];

  // Form geçerliliğini kontrol eden değişken
  const isFormValid = name.length >= 4 && size && crust && toppings.length >= 4;

  const handleSizeChange = (option) => {
    setSize(option);
    setSizeError("");
  };

  // Malzeme seçim fonksiyonu
  const handleToppingChange = (topping) => {
    const updatedToppings = toppings.includes(topping)
      ? toppings.filter((t) => t !== topping)
      : [...toppings, topping];

    setToppings(updatedToppings);

    if (updatedToppings.length < 4) {
      setToppingError('Lütfen en az 4 adet malzeme seçiniz.');
    }
    else if (updatedToppings.length > 10) {
      setToppingError('Lütfen en fazla 10 adet malzeme seçiniz.');
    }
    else {
      setToppingError('');
    }
  };

  // Toplam Fiyat Hesaplama
  const calculateTotal = () => {
    const basePrice = 85.5;
    const toppingPrice = 5;
    const toppingsCost = toppings.length * toppingPrice;
    const totalCost = (basePrice + toppingsCost) * quantity;
    return totalCost;  // ödenecek fiyat
  };

  // İsim değişikliği ve uyarı kontrolü
  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);

    // İsim uzunluğu kontrolü
    if (inputName.length < 4) {
      setNameWarning("Lütfen adınızı minimum 4 karakter olacak şekilde giriniz.");
    } else {
      setNameWarning("");
    }
  };

  // Form Göndermek için Fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // sayfa yenilenmesin

    // Size validation
    if (!size) {
      setSizeError("Lütfen pizza boyutu seçiniz.");
    }
    if (!crust) {
      setCrustError("Hamur alanı zorunludur.");
    }
    if (toppings.length < 4) {
      setToppingError("Lütfen en az 4 adet malzeme seçiniz.");
    }


    if (!name || !size || !crust || toppings.length === 0) {
      alert("Lütfen tüm gerekli alanları doldurun.");
      return;
    }

    setIsSubmitting(true);

    const orderData = { // sipariş objesi
      isim: name,
      boyut: size,
      hamur: crust,
      malzemeler: toppings,
      not: note,
      adet: quantity,
      toplamTutar: calculateTotal(),
    };

    try {
      const response = await axios.post("https://reqres.in/api/pizza", orderData, { // sipariş verilerini sunucuya gönder
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log("Sipariş Özeti:", result);
      alert("Sipariş başarıyla gönderildi!");


      //  setOrderDetails(orderData);



      history.push("/OrderResult"); // History.push ile yönlendir
    } catch (error) {
      console.error("Sipariş gönderiminde hata:", error);
      alert("Sipariş gönderilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false); // butonu etkinleştir
    }
  };

  return (

    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-subtitle">Position Absolute Acı Pizza</h2>
        <p className="form-price">85.50₺</p>
        <p className="description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <div className="form-group">
          <label className="form-label">İsim *</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={handleNameChange}
            placeholder="Adınızı giriniz"
            required
            minLength="3" // Min 3 karakter
            data-cy="ad-input"
          />
          {nameWarning && <p style={{ color: "red" }} data-cy="name-warning">{nameWarning}</p>}
          {/* Uyarı mesajı */}
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
                    onChange={() => handleSizeChange(option)}
                    required
                    data-cy="size-input"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {sizeError && <p style={{ color: "red" }} data-cy="size-error">{sizeError}</p>}
          </div>

          <div className="form-group2">
            <label className="form-label">Hamur Seç *</label>
            <select
              className="form-select"
              value={crust}
              onChange={(e) => setCrust(e.target.value)}
              required
              data-cy="hamur-input"
            >
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın">Kalın</option>
            </select>
          </div>
          {crustError && <p style={{ color: "red" }} data-cy="crust-error">{crustError}</p>} {/* Uyarı mesajı */}
        </div>


        <div className="form-group">
          <label className="form-label">
            Ek Malzemeler
            <p>(En fazla 10, en az 4 malzeme seçebilirsiniz.5₺)</p>
          </label>
          <div className="form-toppings">
            {toppingOptions.map((topping) => (
              <label key={topping} className="form-option">
                <input
                  type="checkbox"
                  checked={toppings.includes(topping)}
                  onChange={() => handleToppingChange(topping)}
                  data-cy="ekler-input"
                />
                <span>{topping}</span>
              </label>
            ))}
          </div>
          {toppingError && <p style={{ color: "red" }} data-cy="topping-error">{toppingError}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Sipariş Notu</label>
          <textarea
            className="form-textarea"
            placeholder="Siparişe eklemek istediğiniz bir not var mı?"
            data-cy="not-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
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
            data-cy="submit-button"
            disabled={!isFormValid}
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>


        <div className="form-row2">
          <div className="form-group">
            <p className="form-total">
              Sipariş Toplamı: <span>{calculateTotal().toFixed(2)}₺</span>
            </p>
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={isSubmitting || !isFormValid}
          >
            Sipariş Ver
          </button>
        </div>
        <Footer className="special-footer" />
      </form>

    </div>
  );

};

export default PizzaOrderForm;