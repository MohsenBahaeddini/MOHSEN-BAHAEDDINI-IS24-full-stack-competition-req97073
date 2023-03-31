import styled from "styled-components";
import { useTable } from "react-table";
import { useState } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";

const ProductsTable = ({ products, columns, handleAddClick }) => {
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
        setErrorMessageDev(
          `No product found for Developer '${searchTermDev}' !`
        );
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
          `No product found for Scrum Master '${searchTermSM}' !`
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
      <Controllers>
        <AddButton onClick={handleAddClick}>
          <FaPlusCircle />
          Add Product
        </AddButton>
        <div>
          <SearchBar>
            <SearchInput
              type="text"
              value={searchTermSM}
              onChange={(e) => setSearchTermSM(e.target.value)}
              placeholder="Scrum Master Name"
            />
            <SearchIcon />
            <SearchButton onClick={() => handleSearchSM()}>Search</SearchButton>
            {searchTermSM && (
              <ClearButton onClick={handleClearSearchSM}>Clear</ClearButton>
            )}
          </SearchBar>
          {errorMessageSM && <ErrorMsg>{errorMessageSM}</ErrorMsg>}
        </div>
        <div>
          <SearchBar>
            <SearchInput
              type="text"
              value={searchTermDev}
              onChange={(e) => setSearchTermDev(e.target.value)}
              placeholder="Developer Name"
            />
            <SearchIcon />
            <SearchButton onClick={() => handleSearchDev()}>
              Search
            </SearchButton>
            {searchTermDev && (
              <ClearButton onClick={handleClearSearchDev}>Clear</ClearButton>
            )}
          </SearchBar>
          {errorMessageDev && <ErrorMsg>{errorMessageDev}</ErrorMsg>}
        </div>
      </Controllers>

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

const SearchBar = styled.div`
  position: relative;
`;

const ErrorMsg = styled.div`
  background-color: #e86e00;
  padding: 5px;
  margin: 5px 0;
  color: white;
  text-align: center;
`;
const SearchInput = styled.input`
  padding: 0.35rem 1rem;
  padding-left: 32px;
  vertical-align: middle;
  border: 2px solid #005f91;
  border-radius: 2px 0px 0px 2px;
  outline: none;
  font-size: 18px;
  :focus {
    border: 2px solid #424656;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: grey;
`;

const SearchButton = styled.button`
  background-color: #005f91;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 0px 2px 2px 0px;
  padding: 0.5rem 1rem;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
`;

const ClearButton = styled.button`
  background-color: #e86e00;
  color: white;
  outline: none;
  font-size: 18px;
  border: none;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  vertical-align: middle;
  cursor: pointer;
`;
const Controllers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
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
  font-size: 18px;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 17px;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #424656;
    color: white;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tbody tr:nth-child(odd) {
    background-color: white;
  }
  tbody tr:last-child {
    background-color: #424656;
    color: white;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 16px;

//   input {
//     height: 32px;
//     padding: 4px 8px;
//     font-size: 16px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     margin-right: 8px;
//   }

//   button {
//     height: 32px;
//     font-size: 16px;
//     background-color: #008000;
//     color: #fff;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     padding: 0 16px;
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: #005700;
//     }
//   }
// `;

export default ProductsTable;
