import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bulma/css/bulma.min.css";
import "./styles.css";
import App from './App.jsx'
import { DataProvider } from "./context/DataContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>
);
