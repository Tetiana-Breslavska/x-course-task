import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import MyRoutes from "./routes/MyRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      <MyRoutes />
    </HashRouter>
  </StrictMode >
);
