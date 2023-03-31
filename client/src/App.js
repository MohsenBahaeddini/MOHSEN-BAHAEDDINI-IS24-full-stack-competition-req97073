import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./components/Home";
import Globalstyles from "./styles/Globalstyles";

const App = () => {
  return (
    <Router>
      <Globalstyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
