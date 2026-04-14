import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
App.use(express.static(path.join(__dirname, "dist")));
createRoot(document.getElementById('root')).render(<BrowserRouter>
    <App />
  </BrowserRouter>)