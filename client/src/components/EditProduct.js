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
      <FormWrapper onSubmit={handleSubmit}>
        <Form>
          <Label>
            Product Name
            <Input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Product Owner Name
            <Input
              type="text"
              name="productOwnerName"
              value={formData.productOwnerName}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Scrum Master Name
            <Input
              type="text"
              name="scrumMasterName"
              value={formData.scrumMasterName}
              onChange={handleChange}
            />
          </Label>
        </Form>
        <Form>
          <FormDeveloper>
            <Label>
              Developers (Maximum 5, separated by comma*):
              <Input
                type="text"
                name="developers"
                value={formData.developers}
                onChange={handleChange}
              />
            </Label>
          </FormDeveloper>
          <Label>
            Methodology
            <select
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
            >
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </select>
          </Label>
        </Form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SaveButton type="submit">Save</SaveButton>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormDeveloper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  display: flex;

  gap: 1rem;

  & > * {
    margin-bottom: 0.5rem;
  }

  label {
    font-weight: bold;
  }

  input,
  select {
    padding: 0.5rem;
    border-radius: 2px;
    border: 1px solid #ccc;
    outline: none;
    border: 2px solid #005f91;
    font-size: 16px;
  }

  input:focus,
  select:focus {
    outline: none;
    /* border-radius: 2px; */
    border: 2px solid #424656;
  }

  button[type="submit"] {
    background-color: #005f91;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 0px 2px 2px 0px;
    padding: 0.5rem 1rem;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const SaveButton = styled.button`
  background-color: #424656;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
`;
export default EditProduct;
