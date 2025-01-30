import { useHistory } from "react-router-dom";  // useHistory hook
import "./Reklam.css";

export default function Reklam () {  

     const history = useHistory();  // useHistory hook'u ile history nesnesini al
    
        const handleClick = () => {
           
            // Butona tıkladığında 'PizzaOrderForm' sayfasına yönlendir
            history.push("/PizzaOrderForm");  // History.push ile yönlendir
        };
    



    return (
        <div className="menu-container">
            {/* Lezzetus Bölümü */}
            <div className="lezzetus">
                <p className="form-subtitle">Özel</p>
                <p className="form-subtitle">Lezzetus</p>
                <p className="form-subtitle">Position:Absolute Acı Burger</p>
                <button onClick={handleClick}  className="button">SİPARİŞ VER</button>
            </div>
            <div className="alt">
            {/* Hackathlon Bölümü */}
            <div className="hackathlon">
                <p className="form-subtitle">Hackathlon</p>
                <p className="form-subtitle">Burger Menü</p>
                <button onClick={handleClick}  className="button">SİPARİŞ VER</button>
            </div>

              {/* Kurye bölümü */}
              <div className="kurye">
                <p className="form-subtitle">Kurye</p>
                <p className="form-subtitle">Çooooooook</p>
                <p className="form-subtitle">hızlı</p>             
                  <p className="form-subtitle">npm gibi kurye </p>
                  <button onClick={handleClick}  className="button">SİPARİŞ VER</button>
            </div>
            </div>
        </div>
    );
}