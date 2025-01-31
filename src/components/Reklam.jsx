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
                <p className="form-subtitle5">Özel</p>
                <p className="form-subtitle5">Lezzetus</p>
                <p className="form-subtitle10">Position:Absolute Acı Burger</p>
                <button onClick={handleClick}  className="button1">SİPARİŞ VER</button>
            </div>
            <div className="alt">
            {/* Hackathlon Bölümü */}
            <div className="hackathlon">
                <p className="form-subtitle">Hackathlon</p>
                <p className="form-subtitle">Burger Menü</p>
                <button onClick={handleClick}  className="button1">SİPARİŞ VER</button>
            </div>

              {/* Kurye bölümü */}
              <div className="kurye">
                <p className="form-subtitle3">Çooooooook</p>
                <p className="form-subtitle4">hızlı</p>             
                  <p className="form-subtitle4">npm gibi kurye </p>
                  <button onClick={handleClick}  className="button1">SİPARİŞ VER</button>
            </div>
            </div>
        </div>
    );
};