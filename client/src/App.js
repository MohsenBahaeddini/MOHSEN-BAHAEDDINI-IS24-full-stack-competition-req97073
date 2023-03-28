import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
