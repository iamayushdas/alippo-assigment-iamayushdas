import React from "react";
import "../shared/Modal.css";
import { EditContentProps, ModalProps } from "../types/types";
import TextInput from "./ui/components/TextInput";

const EditContent: React.FC<EditContentProps> = ({
  editedData,
  handleChange,
}) => (
  <div className="edit__content__container">
    <TextInput
      label="Name"
      name="name"
      value={editedData.name ?? ""}
      onChange={handleChange}
    />
    <TextInput
      label="Age"
      name="age"
      value={String(editedData.age)}
      onChange={handleChange}
    />
    <TextInput
      label="City"
      name="city"
      value={editedData.city}
      onChange={handleChange}
    />
    <TextInput
      label="Pin Code"
      name="pinCode"
      value={editedData.pinCode ?? ""}
      onChange={handleChange}
    />
  </div>
);

const DeleteContent: React.FC = () => (
  <>
    <p>Are you sure you want to delete?</p>
  </>
);

const Modal: React.FC<ModalProps> = ({ type, data, onSave, onCancel }) => {
  const [editedData, setEditedData] = React.useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>
            {type === "edit"
              ? "Edit Entry"
              : `Delete Entry - Row ${data.index + 1}`}
          </h2>
          <button onClick={onCancel} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-content">
          {type === "edit" ? (
            <EditContent editedData={editedData} handleChange={handleChange} />
          ) : (
            <DeleteContent />
          )}
          <div className="modal-actions">
            <button className="cancel btn" onClick={onCancel}>
              Cancel
            </button>
            <button
              className={`action btn ${type === "edit" ? "save" : "delete"}`}
              onClick={handleSave}
            >
              {type === "edit" ? "Save" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
