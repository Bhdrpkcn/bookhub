import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Body from "./components/body/Body";
import Footer from "./components/Footer";
import GreetModal from "./components/GreetModal";
import Header from "./components/header/Header";

function App() {
  const dispatch = useDispatch();

  const showGreetModal = useSelector((state) => state.greeting.showGreetModal);
  const userName = useSelector((state) => state.greeting.userName);

  const handleGreetModalClose = () => {
    dispatch({ type: "CLOSE_GREET_MODAL" });
  };

  return (
    <div className="App">
      <Header />
      {showGreetModal && !userName && (
        <GreetModal onClose={handleGreetModalClose} userName={userName} />
      )}
      {!showGreetModal && <Body />}
      <Footer />
    </div>
  );
}

export default App;
