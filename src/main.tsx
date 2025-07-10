import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./assets/shimmer.css";
import "./styles.css";
import { logger } from "./lib/logger";

// Initialize logger and log startup
logger.initialize().then(() => {
  console.log("Claudia application starting up");
  console.info("Logger initialized successfully");
}).catch(error => {
  console.error("Failed to initialize logger:", error);
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
