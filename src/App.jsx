import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // Router, Route ve Switch'i import ediyoruz


import PizzaOrderForm from "./components/PizzaOrderForm";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import './App.css'
import OrderResult from "./components/OrderResult";

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

      
  )
}

export default App
