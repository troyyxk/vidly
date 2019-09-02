import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// can save a line
// const Table = ({ columns, sortColumn, onSort, data }) => {
const Table = props => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
