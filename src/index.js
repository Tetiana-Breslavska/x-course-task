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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

