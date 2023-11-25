import React, { useState } from "react";
import Modal from "./Modal";
import "../shared/Table.css";
import { TableProps } from "../types/types";

const Table: React.FC<TableProps> = ({ data, onDataChange }) => {
  const [selectedRowAndType, setSelectedRowAndType] = useState<{
    row: any | null;
    type: "edit" | "delete" | null;
  }>({ row: null, type: null });

  const handleEdit = (row: any) => {
    setSelectedRowAndType({ row, type: "edit" });
  };

  const handleDelete = (row: any, index: any) => {
    setSelectedRowAndType({ row, type: "delete" });
  };

  const handleSaveModal = (editedData?: any) => {
    if (selectedRowAndType.type === "edit") {
      const updatedData = data.map((item) =>
        item === selectedRowAndType.row ? { ...item, ...editedData } : item
      );
      onDataChange(updatedData);
    } else if (selectedRowAndType.type === "delete") {
      const updatedData = data.filter(
        (item) => item !== selectedRowAndType.row
      );
      onDataChange(updatedData);
    }
    setSelectedRowAndType({ row: null, type: null });
  };

  const handleCancelModal = () => {
    setSelectedRowAndType({ row: null, type: null });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.name ?? "-"}</td>
              <td>{typeof row.age === "number" ? row.age : "-"}</td>
              <td>{row.city}</td>
              <td>{row.pinCode ?? "-"}</td>
              <td>
                <button className="btn__edit" onClick={() => handleEdit(row)}>
                  Edit
                </button>
                <button
                  className="btn__dlt"
                  onClick={() => handleDelete(row, index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRowAndType.row && selectedRowAndType.type && (
        <Modal
          type={selectedRowAndType.type}
          data={selectedRowAndType.row}
          onSave={handleSaveModal}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
};

export default Table;
