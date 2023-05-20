import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Compte from "./pages/compte/compte";
import Inscription from "./pages/inscription/inscription";
import Partie from "./pages/partie/partie";
import Personnage from "./pages/personnage/personnage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store, { history } from "./store/index";
import { saveSate, clearState } from "./store/localStorage";

store.subscribe(() => {
  clearState();
  saveSate(store.getState());
});

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/compte" element={<Compte />} />
          <Route exact path="/inscrption" element={<Inscription />} />
          <Route exact path="/personnage" element={<Personnage />} />
          <Route exact path="/partie" element={<Partie />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
