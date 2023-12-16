import React from "react";
import "./App.css";
import Body from "./components/body/Body";
import Footer from "./components/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
