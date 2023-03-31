import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Globalstyles from "./styles/Globalstyles";

const App = () => {
  return (
    <Router>
      <Globalstyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/product/:id" element={<ProductDetails />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
