import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DataContextWrapper from "./context/dataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <DataContextWrapper>
    <App />
  </DataContextWrapper>
  // </React.StrictMode>
);
