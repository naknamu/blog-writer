import styled from "styled-components";

const BorderedTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #333;
    color: #fff;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f2f2f2;
  }
`;

const Table = ({ header, data }) => {
  return (
    <BorderedTable>
      <thead>
        <tr>
          <th>{header}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.title || item.name}</td>
          </tr>
        ))}
      </tbody>
    </BorderedTable>
  );
};

export default Table;
