import styled from "styled-components";
import { useTable } from "react-table";
import { useState } from "react";

const ProductsTable = ({ products, columns }) => {
  const [searchTermSM, setSearchTermSM] = useState("");
  const [filteredProductsSM, setFilteredProductsSM] = useState([]);
  const [isLoadingSM, setIsLoadingSM] = useState(false);
  const [errorMessageSM, setErrorMessageSM] = useState("");

  const [searchTermDev, setSearchTermDev] = useState("");
  const [filteredProductsDev, setFilteredProductsDev] = useState([]);
  const [isLoadingDev, setIsLoadingDev] = useState(false);
  const [errorMessageDev, setErrorMessageDev] = useState("");

  const handleSearchDev = async () => {
    setIsLoadingDev(true);
    if (!searchTermDev.length) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/developer/${searchTermDev}`
      );
      const data = await response.json();
      if (!data.filteredProducts) {
        setFilteredProductsDev([]);
        setErrorMessageDev(`No product found for Developer "${searchTermDev}"`);
      } else {
        setFilteredProductsDev(data.filteredProducts);
        setErrorMessageDev("");
      }
    } catch (error) {
      setErrorMessageDev(error.message);
    } finally {
      setIsLoadingDev(false);
    }
  };

  const handleSearchSM = async () => {
    setIsLoadingSM(true);
    if (!searchTermSM.length) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/scrum-master/${searchTermSM}`
      );
      const data = await response.json();
      if (!data.filteredProducts) {
        setFilteredProductsSM([]);
        setErrorMessageSM(
          `No product found for Scrum Master "${searchTermSM}"`
        );
      } else {
        setFilteredProductsSM(data.filteredProducts);
        setErrorMessageSM("");
      }
    } catch (error) {
      setErrorMessageSM(error.message);
    } finally {
      setIsLoadingSM(false);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredProductsSM.length
        ? filteredProductsSM
        : filteredProductsDev.length
        ? filteredProductsDev
        : products,
    });

  const totalProducts =
    filteredProductsSM.length || filteredProductsDev.length || products.length;

  const handleClearSearchSM = () => {
    setSearchTermSM("");
    setFilteredProductsSM([]);
    setErrorMessageSM("");
  };

  const handleClearSearchDev = () => {
    setSearchTermDev("");
    setFilteredProductsDev([]);
    setErrorMessageDev("");
  };

  return (
    <div>
      <SearchBar>
        <input
          type="text"
          value={searchTermSM}
          onChange={(e) => setSearchTermSM(e.target.value)}
          placeholder="Search Scrum Master Name..."
        />
        <button onClick={() => handleSearchSM()}>Search</button>
      </SearchBar>
      {searchTermSM && (
        <ClearButton onClick={handleClearSearchSM}>Clear Search</ClearButton>
      )}

      {errorMessageSM && <div>{errorMessageSM}</div>}

      <SearchBar>
        <input
          type="text"
          value={searchTermDev}
          onChange={(e) => setSearchTermDev(e.target.value)}
          placeholder="Search Developer Name..."
        />
        <button onClick={() => handleSearchDev()}>Search</button>
      </SearchBar>
      {searchTermDev && (
        <ClearButton onClick={handleClearSearchDev}>Clear Search</ClearButton>
      )}
      {errorMessageDev && <div>{errorMessageDev}</div>}

      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.column.id === "developers" &&
                    Array.isArray(cell.value) &&
                    cell.value.length > 1
                      ? cell.value.join(", ")
                      : cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={columns.length - 1}>Total Products</td>
            <td>{totalProducts}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  input {
    height: 32px;
    padding: 4px 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
  }

  button {
    height: 32px;
    font-size: 16px;
    background-color: #008000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #005700;
    }
  }
`;

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  color: #008000;
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
`;

export default ProductsTable;
