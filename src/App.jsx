import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // Router, Route ve Switch'i import ediyoruz


import PizzaOrderForm from "./components/PizzaOrderForm";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import './App.css'
import OrderResult from "./components/OrderResult";
import Footer from "./components/Footer";
import Lezzetler from "./components/Lezzetler";
import AnaLezzet from "./components/AnaLezzet";
import Pizzalar from "./components/Pizzalar";
import Reklam from "./components/Reklam";

function App() {

  return (
    <Router>
      <Header/>

        <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/PizzaOrderForm" component={PizzaOrderForm}/>
        <Route path="/OrderResult" component={OrderResult} />
     
      </Switch>
      <Footer />
      <Lezzetler /> 
      <AnaLezzet /> 
      <Pizzalar/>
      <Reklam />

      </Router>
      

      
  )
}

export default App
