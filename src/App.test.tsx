import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./components/Table";
import Modal from "./components/Modal";

const mockData:any = {
  name: 'John Doe',
  age: 25,
  city: 'New York',
  pinCode: '12345',
};

const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();

describe("Table", () => {
  it("should render a table with the provided data", () => {
    const data: any = [
      { name: "John", age: 25, city: "New York", pinCode: "12345" },
      { name: "Jane", age: 30, city: "Los Angeles", pinCode: "67890" },
    ];
    const onDataChange = jest.fn();
    render(<Table data={data} onDataChange={onDataChange} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    expect(screen.getByText("67890")).toBeInTheDocument();
  });

  it("should display the correct number of rows and columns", () => {
    const data: any = [
      { name: "John", age: 25, city: "New York", pinCode: "12345" },
      { name: "Jane", age: 30, city: "Los Angeles", pinCode: "67890" },
    ];
    const onDataChange = jest.fn();
    render(<Table data={data} onDataChange={onDataChange} />);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getAllByRole("columnheader")).toHaveLength(6);
  });

  it("should display the correct data in each cell", () => {
    const data: any = [
      { name: "John", age: 25, city: "New York", pinCode: "12345" },
      { name: "Jane", age: 30, city: "Los Angeles", pinCode: "67890" },
    ];
    const onDataChange = jest.fn();
    render(<Table data={data} onDataChange={onDataChange} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    expect(screen.getByText("67890")).toBeInTheDocument();
  });
  it("should handle empty data array", () => {
    const data: any = [];
    const onDataChange = jest.fn();

    render(<Table data={data} onDataChange={onDataChange} />);
    expect(screen.queryAllByRole("row")).toHaveLength(1);
  });

  it("should handle missing name or pinCode fields", () => {
    const data: any = [
      { age: 25, city: "New York" },
      { name: "Jane", age: 30, city: "Los Angeles" },
    ];
    const onDataChange = jest.fn();

    render(<Table data={data} onDataChange={onDataChange} />);

    const dashElements = screen.queryAllByText("-");
    const janeElement = screen.getByText("Jane");

    expect(dashElements).toHaveLength(3);
    expect(janeElement).toBeInTheDocument();
  });

  it("should handle non-numeric age field", () => {
    const data: any = [
      { name: "John", age: "twenty-five", city: "New York", pinCode: "12345" },
      { name: "Jane", age: 30, city: "Los Angeles", pinCode: "67890" },
    ];
    const onDataChange = jest.fn();

    render(<Table data={data} onDataChange={onDataChange} />);

    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
});

describe('Modal Component', () => {
  it('renders Edit Modal', () => {
    render(<Modal type="edit" data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />);
    expect(screen.getByText('Edit Entry')).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockData.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(String(mockData.age))).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockData.city)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockData.pinCode)).toBeInTheDocument();
  });

  it('renders Delete Modal', () => {
    render(<Modal type="delete" data={{ ...mockData, index: 0 }} onSave={mockOnSave} onCancel={mockOnCancel} />);
    expect(screen.getByText('Delete Entry - Row 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  it('calls onCancel when Cancel button is clicked', () => {
    render(<Modal type="edit" data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Confirm button is clicked in Delete Modal', () => {
    render(<Modal type="delete" data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with data when Confirm button is clicked in Delete Modal', () => {
    render(<Modal type="delete" data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnSave).toHaveBeenCalledWith(mockData);
  });
});
