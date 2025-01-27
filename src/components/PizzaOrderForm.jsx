import React, { useState } from "react";
import axios from "axios";
import "./PizzaOrderForm.css";
import "./Header.css";
import { useHistory } from "react-router-dom";  // useHistory hook'unu import ediyoruz

const PizzaOrderForm = () => {
  const [name, setName] = useState(""); // İsim alanı için state
  const [size, setSize] = useState("");//Pizza boyu
  const [crust, setCrust] = useState("");//Hamur türü
  const [toppings, setToppings] = useState([]);//Seçilen malzeme dizisi
  const [note, setNote] = useState("");//Kullanıcıdan gelen sipariş notu
  const [quantity, setQuantity] = useState(1);//Sipariş  adedi
  const [isSubmitting, setIsSubmitting] = useState(false); // Form gönderimi sırasında butonun devre dışı olsun.

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
    "Sucuk",
  ];
//Malzeme seçim fonksiyonu
const handleToppingChange = (topping) => {
    if (toppings.includes(topping)) {
      const updatedToppings = toppings.filter((t) => t !== topping);
      if (updatedToppings.length >= 4) {
        setToppings(updatedToppings); // Malzeme zaten seçilmişse, diziden kaldır ve minimum 4 malz olacak
      } else {
        alert("En az 4 malzeme seçmelisiniz.");
      }
    } else {
      if (toppings.length < 10) {
        setToppings([...toppings, topping]); // Maksimum 10 malzeme olacak şekilde kontrol
      } else {
        alert("En fazla 10 malzeme seçebilirsiniz.");
      }
    }
  };
//Toplam Fiyat Hesaplama
  const calculateTotal = () => {
    const basePrice = 85.5;//pizza fiyatı
    const toppingPrice = 5;//malz ek ücretleri
    const toppingsCost = toppings.length * toppingPrice;//seçilen malz toplam maliyet
    return (basePrice + toppingsCost) * quantity;//ödenecek fiyat
  };
//Form Göndermek için Fonksiyon

  const handleSubmit = async (e) => {
    e.preventDefault();//sayfa yenilenmesin


    if (!name || !size || !crust || toppings.length === 0) {//Bütün alanlar doldurulmuş mu?
      alert("Lütfen tüm gerekli alanları doldurun.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {//sipariş objesi
      isim: name,
      boyut: size,
      hamur: crust,
      malzemeler: toppings,
      not: note,
      adet: quantity,
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


          history.push("/OrderResult");// History.push ile yönlendir



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
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir..Küçük bir pizzaya bazen pizzetta denir.
        </p>



        <div className="form-group">
          <label className="form-label">İsim *</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınızı giriniz"
            required
            minLength="3"  // Min 3 karakter 
          />
        </div>



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



        <div className="form-group">
          <label className="form-label">
            Ek Malzemeler (5₺/malzeme, min4, max 10)
          </label>
          <div className="form-toppings">
            {toppingOptions.map((topping) => (
              <label key={topping} className="form-option">
                <input
                  type="checkbox"
                  checked={toppings.includes(topping)}
                  onChange={() => handleToppingChange(topping)}
                />
                <span>{topping}</span>
              </label>
            ))}
          </div>
        </div>



        <div className="form-group">
          <label className="form-label">Sipariş Notu</label>
          <textarea
            className="form-textarea"
            placeholder="Siparişe eklemek istediğiniz bir not var mı?"
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
          disabled={isSubmitting}
        >
          Sipariş Ver
        </button>
      </form>
    </div>
  );
};

export default PizzaOrderForm;
