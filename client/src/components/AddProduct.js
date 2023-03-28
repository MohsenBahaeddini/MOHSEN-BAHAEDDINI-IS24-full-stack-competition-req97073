import { useState } from "react";
import styled from "styled-components";

const AddProduct = ({
  onAddProduct,
  setProducts,
  setIsModalOpen,
  products,
}) => {
  const [productName, setProductName] = useState("");
  const [scrumMaster, setScrumMaster] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [startDate, setStartDate] = useState("");
  const [methodology, setMethodology] = useState("");
  const [developerNames, setDeveloperNames] = useState([""]);

  const addDeveloperNameInput = () => {
    setDeveloperNames((prevNames) => {
      if (prevNames.length >= 5) {
        return prevNames;
      }
      return [...prevNames, ""];
    });
  };

  const handleDeveloperNameChange = (index, event) => {
    const { value } = event.target;
    setDeveloperNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  /**
   ** hadnleSubmit will send the info to the server */
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
          startDate: startDate,
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
    <Form onSubmit={handleSubmit}>
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
        <label htmlFor="scrumMaster">Scrum Master</label>
        <input
          id="scrumMaster"
          value={scrumMaster}
          onChange={(event) => setScrumMaster(event.target.value)}
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
          Add Developer
        </AddButton>
      )}

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
      <button type="submit">Save</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  align-self: flex-start;
`;

export default AddProduct;
