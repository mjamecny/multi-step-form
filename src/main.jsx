import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { MultiStepProvider } from "./contexts/MultiStepContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MultiStepProvider>
      <App />
    </MultiStepProvider>
  </React.StrictMode>
)
