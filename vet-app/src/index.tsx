import App from "app";
import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";

import * as atatus from 'atatus-spa';
atatus.config('e8a71f9dca1a4c2ea77ed063d35b4890').install();

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

// ReactDOM.render(<App />, document.getElementById('root'));
atatus.notify(new Error('Test Atatus Setup'));