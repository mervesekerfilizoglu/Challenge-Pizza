import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // Router, Route ve Switch'i import ediyoruz
import './App.css';

import Header from "./components/Header";
import PizzaOrderForm from "./components/PizzaOrderForm";
import MainPage from "./components/MainPage";

import OrderResult from "./components/OrderResult";

import AnaLezzet from "./components/AnaLezzet";
import Reklam from "./components/Reklam";
import Baslik from "./components/Baslik";
import Lezzetler from "./components/Lezzetler";
import Pizzalar from "./components/Pizzalar";
import Footer from "./components/Footer";

function App() {

  return (
    <Router>
      <Header/>

        <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/PizzaOrderForm" component={PizzaOrderForm}/>
        <Route path="/OrderResult" component={OrderResult} />
      </Switch>
      <AnaLezzet />
      <Reklam />
      <Baslik/>
      <Lezzetler /> 
      <Pizzalar/>
      <Footer />
   
      </Router>
    
  );
}

export default App;
