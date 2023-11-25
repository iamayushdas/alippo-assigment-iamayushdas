import React from "react";
import { TextInputProps } from "../../../types/types";

const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange }) => (
  <label>
    {label}:
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  </label>
);

export default TextInput;
