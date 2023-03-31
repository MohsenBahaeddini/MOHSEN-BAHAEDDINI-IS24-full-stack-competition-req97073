import { useState } from "react";
import styled from "styled-components";


// EditProduct component which takes products and onUpdateProduct as props from ProductsList 
const EditProduct = ({ product, onUpdateProduct }) => {
  const [formData, setFormData] = useState({
    productName: product.productName,
    scrumMasterName: product.scrumMasterName,
    productOwnerName: product.productOwnerName,
    developers: product.developers,
    startDate: product.startDate,
    methodology: product.methodology,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Function to update the formData 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Function to handle change event for a developer's name input field
  const handleDeveloperChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newDevelopers = [...prevFormData.developers];
      if (newDevelopers[index] !== value) {
        newDevelopers[index] = value;
        return { ...prevFormData, developers: newDevelopers };
      } else {
        return prevFormData;
      }
    });
  };

  // Add a new field to add a new developer name
  const addDeveloper = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      developers: [...prevFormData.developers, ""],
    }));
  };

  // Function to handle removing a developer name 
  const removeDeveloper = (index, event) => {
    event.preventDefault();
    const newDevelopers = [...formData.developers];
    newDevelopers.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      developers: newDevelopers,
    }));
  };


  // Function to handle the submission of the form when the "Save" button is clicked.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.developers.length > 5 ||
      formData.developers.some((name) => name.trim() === "")
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
            {formData.developers.map((name, index) => (
              <Label key={index}>
                Developer {index + 1}
                <Input
                  type="text"
                  name={`developer${index}`}
                  value={name}
                  onChange={(event) => handleDeveloperChange(index, event)}
                />
                {formData.developers.length > 1 && (
                  <RemoveButton
                    onClick={(event) => removeDeveloper(index, event)}
                  >
                    Remove
                  </RemoveButton>
                )}
              </Label>
            ))}
            {formData.developers.length < 5 && (
              <AddButton type="button" onClick={addDeveloper}>
                Add Developer
              </AddButton>
            )}
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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005f91;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  font-size: 14px;
  margin-top: 2px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background-color: #e86e00;
  color: white;
  outline: none;
  font-size: 14px;
  border: none;
  border-radius: 2px;
  padding: 0.25rem 1rem;
  vertical-align: middle;
  cursor: pointer;
`;

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
