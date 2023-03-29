import { useState, useEffect } from "react";
import styled from "styled-components";

const EditProduct = ({ product, onUpdateProduct, setIsEditModalOpen }) => {
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "developers" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateProduct(formData);
    setIsEditModalOpen(false);
  };

  return (
    <>
      {formData && (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="productOwnerName">Product Owner:</label>
            <input
              type="text"
              id="productOwnerName"
              name="productOwnerName"
              value={formData.productOwnerName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="scrumMasterName">Scrum Master:</label>
            <input
              type="text"
              id="scrumMasterName"
              name="scrumMasterName"
              value={formData.scrumMasterName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="developers">Developers:</label>
            <input
              type="text"
              id="developers"
              name="developers"
              value={formData.developers.join(",")}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="methodology">Methodology:</label>
            <select
              id="methodology"
              name="methodology"
              value={formData.methodology}
              onChange={handleInputChange}
            >
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Button type="submit">Update Product</Button>
          </FormGroup>
        </Form>
      )}
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

export default EditProduct;
