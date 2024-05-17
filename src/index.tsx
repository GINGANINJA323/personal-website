import React from "react";
import { createRoot } from "react-dom/client";
import App from './app';

const domNode = document.getElementById('root');

if (!domNode) throw new Error('Failed to get root element.');

const root = createRoot(domNode);

root.render(<App />);