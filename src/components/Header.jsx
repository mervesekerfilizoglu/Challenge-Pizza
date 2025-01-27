import "./Header.css";

export default function Header() {
    return (
        <header>
            <img src="images/iteration-1-images/logo.svg" alt="" className="logo" />
            <nav>
                <a href="">Ana Sayfa</a>
                <a href="/PizzaOrderForm">Sipariş Oluştur</a>
            </nav>
        </header>
    );
}
