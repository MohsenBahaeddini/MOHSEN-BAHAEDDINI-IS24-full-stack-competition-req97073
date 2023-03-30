import { useState } from "react";
import styled from "styled-components";

const EditProduct = ({ product, onUpdateProduct, setIsEditModalOpen }) => {
  const [formData, setFormData] = useState({
    productName: product.productName,
    scrumMasterName: product.scrumMasterName,
    productOwnerName: product.productOwnerName,
    developers: product.developers,
    startDate: product.startDate,
    methodology: product.methodology,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      typeof formData.developers === "string" &&
      formData.developers.split(",").length > 5
    ) {
      setErrorMessage("Please enter a maximum of 5 developers.");
      return;
    }
    onUpdateProduct({ ...product, ...formData });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          Product Name:
          <Input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Scrum Master Name:
          <Input
            type="text"
            name="scrumMasterName"
            value={formData.scrumMasterName}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Product Owner Name:
          <Input
            type="text"
            name="productOwnerName"
            value={formData.productOwnerName}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Developers (Maximum 5):
          <Input
            type="text"
            name="developers"
            value={formData.developers}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Methodology:
          <select
            name="methodology"
            value={formData.methodology}
            onChange={handleChange}
          >
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </Label>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">Save</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
`;
export default EditProduct;
