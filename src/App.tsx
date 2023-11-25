import React, { useState } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";
import useDataFetching from "./hooks/useDataFetch";
import { DataRow } from "./types/types";

const App: React.FC = () => {
  const { data, loading, error, updateData } = useDataFetching();
  const [selectedRow, setSelectedRow] = useState<DataRow | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const handleSaveModal = (editedData?: any) => {
    if (modalType === "edit") {
      const updatedData = data.map((item) =>
        item === selectedRow ? { ...item, ...editedData } : item
      );
      updateData(updatedData);
    } else if (modalType === "delete") {
      const updatedData = data.filter((item) => item !== selectedRow);
      updateData(updatedData);
    }

    setSelectedRow(null);
    setModalType(null);
  };

  const handleCancelModal = () => {
    setSelectedRow(null);
    setModalType(null);
  };

  const handleDataChange = (updatedData: any[]) => {
    updateData(updatedData);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Table data={data} onDataChange={handleDataChange} />
          {selectedRow && modalType && (
            <Modal
              type={modalType}
              data={selectedRow}
              onSave={handleSaveModal}
              onCancel={handleCancelModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
