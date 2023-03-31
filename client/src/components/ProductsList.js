import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import LoadingIndicator from "./LoadingIndicator";

import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductsTable from "./ProductsTable";

const ProductsList = () => {
  const [productsListStatus, setProductsListStatus] = useState("loading");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (productId) => {
    const productToEdit = products.find(
      (product) => product.productId === productId
    );
    setEditingProduct(productToEdit);
    setIsEditModalOpen(true);
  };

  const updateProductList = () => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.text())
      .then((text) => {
        const data = JSON.parse(text);
        setProducts(data);

        setProductsListStatus("idle");
      });
  };

  useEffect(() => {
    setProductsListStatus("loading");
    updateProductList();
  }, []);

  const handleProductUpdate = (updatedProduct) => {
    fetch(
      `http://localhost:5000/api/update-product/${updatedProduct.productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = products.map((product) => {
          if (product.productId === updatedProduct.productId) {
            return data;
          }
          return product;
        });
        setProducts(updatedProducts, updateProductList());
        setIsEditModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const columns = [
    { Header: "Product Number", accessor: "productId" },
    { Header: "Product Name ", accessor: "productName" },
    { Header: "Product Owner", accessor: "productOwnerName" },
    { Header: "Scrum Master", accessor: "scrumMasterName" },
    { Header: "Developers", accessor: "developers" },
    { Header: "Start Date", accessor: "startDate" },
    { Header: "Methodology", accessor: "methodology" },
    {
      Header: "",
      accessor: "edit",
      Cell: ({ row }) => (
        <EditButton onClick={() => handleEditClick(row.original.productId)}>
          <EditIcon />
        </EditButton>
      ),
    },
  ];

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
    <Container>
      <Header>
        <Title>IMB PRODUCTS</Title>
        <Description>
          A list of web applications developed by pplications Developed by the
          BC Government Ministry of Citizens' Services Information Management
          Branch (IMB)
        </Description>
      </Header>
      {productsListStatus === "loading" && <LoadingIndicator />}

      {productsListStatus === "idle" && (
        <>
          {/* <AddButton onClick={handleAddClick}>Add Product</AddButton> */}
          <ProductsTable
            products={products}
            handleEditClick={handleEditClick}
            columns={columns}
            handleAddClick={handleAddClick}
          />
        </>
      )}
      {isEditModalOpen && (
        <Modal>
          <ModalContent>
            <EditProduct
              product={editingProduct}
              onUpdateProduct={handleProductUpdate}
              setIsEditModalOpen={setIsEditModalOpen}
            />
            <CloseButton onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </CloseButton>
          </ModalContent>
        </Modal>
      )}

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
              Cancel
            </CloseButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 50px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 50px 0;
  padding: 50px;
  background-color: #bfcaff;
  border-radius: 2px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;
const Description = styled.p`
  font-size: 18px;
  padding-top: 10px;
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
  z-index: 110;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  background-color: #e86e00;
  margin-top: 2px;
  color: white;
  outline: none;
  font-size: 18px;
  border: none;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  vertical-align: middle;
  cursor: pointer;
`;

const EditIcon = styled(FaEdit)`
  font-size: 24px;
  color: #005f91;
`;
const EditButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  color: #333;
`;
export default ProductsList;
