import styled from "styled-components";
import { useTable } from "react-table";

const columns = [
  { Header: "Product Id", accessor: "productId" },
  { Header: "Product Name", accessor: "productName" },
  { Header: "Product Owner", accessor: "productOwnerName" },
  { Header: "Scrum Master", accessor: "scrumMasterName" },
  { Header: "Developers", accessor: "developers" },
  { Header: "Start Date", accessor: "startDate" },
  { Header: "Methodology", accessor: "methodology" },
];

const ProductsTable = ({ products }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: products,
    });

  // Calculate the total number of products
  const totalProducts = products.length;
  return (
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
                  cell.value &&
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

export default ProductsTable;
