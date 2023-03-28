import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [productStatus, setProductStatus] = useState("loading");
  const [product, serProduct] = useState({});

  const { id } = useParams();
  console.log("id :", id);
  useEffect(() => {
    setProductStatus("loading");
    fetch("http://localhost:5000/api/product/:id")
      .then((res) => console.log(res))
      .then((res) => res.json());
  }, []);
  return <>ProductDetails page</>;
};
export default ProductDetails;
