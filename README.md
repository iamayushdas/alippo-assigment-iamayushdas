# ALIPPO-ASSIGNMENT

## Deployed URL


## Folder Structure

```plaintext
src/
|-- components/
|   |-- Modal/
|   |   |-- Modal.tsx
|   |-- Table/
|       |-- Table.tsx
|-- hooks/
|   |-- useDataFetch.ts
|-- shared/
|   |-- Modal.css
|   |-- Table.css
|-- ui/
|   |-- components/
|       |-- TextInput.tsx
|-- types/
|   |-- types.ts
|-- App.tsx
|-- index.tsx
|-- README.md
```

## Components

- **Modal:** Modal-related components.
  - **Modal.tsx:** Modal component for editing or deleting entries.
- **Table:** Table-related components.
  - **Table.tsx:** Table component for displaying data.

## Hooks

- **useDataFetch.ts:** Hook for handling data fetching logic.

## Shared

- Shared styles and CSS files.

## UI

- Reusable UI components.
  - **components:** UI component files.
    - **TextInput.tsx:** Reusable text input component.

## Types

- TypeScript type definitions.
  - **types.ts:** Defines types used throughout the project.

## Application

- **App.tsx:** Main application component.
- **index.tsx:** Entry point for rendering the application.

## Documentation

- **README.md:** Project documentation.

## Unit tests

- **Test cases:** Test cases added.

## Important Notes

- **Data Fetching:** The `useDataFetch` hook is responsible for fetching data. It includes logic to handle loading, errors, and updating the data array.

- **Folder Structure:** Components, hooks, and other project files are organized in a modular structure to enhance readability and maintainability.

- **CSS:** Shared styles are stored in the `shared` folder. Each component may have its own styles if necessary.

- **UI Components:** Reusable UI components are placed in the `ui` folder. For example, the `TextInput` component can be used in different parts of the application.

- **Test Casess:** Added test cases for Modal and Table component
