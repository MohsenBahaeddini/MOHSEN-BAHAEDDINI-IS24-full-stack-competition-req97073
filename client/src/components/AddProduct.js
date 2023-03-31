import { useState } from "react";
import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

// AddProduct component to add a new product to a list of products. It receives onAddProduct, setProducts, setIsModalOpen, products as props from ProductList component
const AddProduct = ({
  onAddProduct,
  setProducts,
  setIsModalOpen,
  products,
}) => {
  // Define state variables
  const [productName, setProductName] = useState("");
  const [scrumMaster, setScrumMaster] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [startDate, setStartDate] = useState("");
  const [methodology, setMethodology] = useState("");
  const [developerNames, setDeveloperNames] = useState([""]);


  // This function is called when the user clicks on the "Add Developer" button. It checks if the current number of developer names is less than 5, and adds an empty input field for a new developer name
  const addDeveloperNameInput = () => {
    setDeveloperNames((prevNames) => {
      if (prevNames.length >= 5) {
        return prevNames;
      }
      return [...prevNames, ""];
    });
  };

  // When the user types in a developer name input field, it updates the state of the developer names array with the new input value
  const handleDeveloperNameChange = (index, event) => {
    const { value } = event.target;
    setDeveloperNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  /**
   ** HandleSubmit sends a POST request to the server with the form data in the request body, when the user submits the form */
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (
      productName &&
      scrumMaster &&
      productOwner &&
      developerNames &&
      startDate &&
      methodology
    ) {
      const formattedDate = new Date(startDate)
        .toLocaleDateString()
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$1/$2");

      fetch("http://localhost:5000/api/new-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          productName: productName,
          scrumMasterName: scrumMaster,
          productOwnerName: productOwner,
          developers: developerNames,
          startDate: formattedDate,
          methodology: methodology,
        }),
      })
        .then((response) => response.text())
        .then((text) => {
          const data = JSON.parse(text);
          if (data) {
            onAddProduct(data);
            setProductName("");
            setScrumMaster("");
            setProductOwner("");
            setDeveloperNames([""]);
            setStartDate("");
            setMethodology("");
            setProducts([...products, data]);
            setIsModalOpen(false);
          }
        });
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Form>
        <InputGroup>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="productOwner">Product Owner</label>
          <input
            id="productOwner"
            value={productOwner}
            onChange={(event) => setProductOwner(event.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="scrumMaster">Scrum Master</label>
          <input
            id="scrumMaster"
            value={scrumMaster}
            onChange={(event) => setScrumMaster(event.target.value)}
            required
          />
        </InputGroup>
      </Form>
      <Form>
        <FormDeveloper>
          {developerNames.map((name, index) => (
            <InputGroup key={index}>
              <label htmlFor={`developer${index}`}>Developer {index + 1}</label>
              <input
                id={`developer${index}`}
                name={`developer${index}`}
                value={name}
                onChange={(event) => handleDeveloperNameChange(index, event)}
                required
              />
            </InputGroup>
          ))}
          {developerNames.length < 5 && (
            <AddButton type="button" onClick={addDeveloperNameInput}>
              <FaPlusCircle />
              Add Developer
            </AddButton>
          )}
        </FormDeveloper>
        <InputGroup>
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="methodology">Methodology</label>
          <select
            id="methodology"
            name="methodology"
            onChange={(event) => setMethodology(event.target.value)}
            required
          >
            <option value="">Select a methodology</option>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </InputGroup>
      </Form>

      <SaveButton type="submit">Save</SaveButton>
    </FormWrapper>
  );
};
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
const FormWrapper = styled.form`
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
const FormDeveloper = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  svg {
    margin-right: 0.5rem;
  }
`;

export default AddProduct;
