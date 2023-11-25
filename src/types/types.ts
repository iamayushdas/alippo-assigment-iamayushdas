export type DataRow = {
  index:number,
  name: string | null;
  age: number;
  city: string;
  pinCode: string | null;
};

export type TableProps = {
  data: DataRow[];
  onDataChange: (updatedData: any[]) => void;
};

export type EditContentProps = {
  editedData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type UseDataFetchingResult = {
  data: any[];
  loading: boolean;
  error: string | null;
  updateData: (updatedData: any[]) => void;
};

export type ModalProps = {
  type: "edit" | "delete";
  data: DataRow;
  onSave: (editedData?: any) => void;
  onCancel: () => void;
};

export type TextInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
