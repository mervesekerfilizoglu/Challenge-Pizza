import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // Router, Route ve Switch'i import ediyoruz
import Header from "./components/Header";
import PizzaOrderForm from "./components/PizzaOrderForm";
import OrderResult from "./components/OrderResult";
import MainPage from "./components/MainPage";
import './App.css';

function App() {

  return (
    <Router>
      <Header/>
        <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/PizzaOrderForm" component={PizzaOrderForm}/>
        <Route path="/OrderResult" component={OrderResult} />
      </Switch>
      </Router>   
  );
}

export default App;
