import { createRoot } from "react-dom";
import App from './app.tsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);