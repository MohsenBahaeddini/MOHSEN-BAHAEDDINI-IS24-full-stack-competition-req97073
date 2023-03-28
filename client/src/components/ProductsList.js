import { useEffect, useState } from "react";
import styled from "styled-components";

import AddProduct from "./AddProduct";
import ProductsTable from "./ProductsTable";

const ProductsList = () => {
  const [productsListStatus, setProductsListStatus] = useState("loading");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProductsListStatus("loading");
    fetch("http://localhost:5000/api/products")
      .then((response) => response.text())
      .then((text) => {
        const data = JSON.parse(text);
        setProducts(data);
        setProductsListStatus("idle");
      });
  }, []);

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header>
        <h1>Products</h1>
        <AddButton onClick={handleAddClick}>Add</AddButton>
      </Header>
      {productsListStatus === "loading" && (
        <LoadingIndicator>Loading...</LoadingIndicator>
      )}
      {productsListStatus === "idle" && <ProductsTable products={products} />}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <AddProduct
              onAddProduct={handleAddProduct}
              setProducts={setProducts}
              setIsModalOpen={setIsModalOpen}
              products={products}
            />
            <CloseButton onClick={() => setIsModalOpen(false)}>
              Close
            </CloseButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    outline: none;
  }
`;

export default ProductsList;
