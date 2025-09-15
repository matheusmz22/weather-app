import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {GeolocationProvider} from "./context/GeolocationContext.jsx";
import {UnitsProvider} from "./context/UnitsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GeolocationProvider>
      <UnitsProvider>
        <App />
      </UnitsProvider>
    </GeolocationProvider>
  </StrictMode>
);
