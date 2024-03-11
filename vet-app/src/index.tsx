import App from "app";
import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<HelmetProvider><App /></HelmetProvider>);
