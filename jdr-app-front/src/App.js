import "./App.css";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import Accueil from "./pages/accueil/accueil";
import Connexion from "./pages/connexion/connexion";
import * as fromUserActions from "./actions/userAction";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      {/* si on est connecté, on est sur la page d'acceuil, sinon sur la page de connection*/}
      {props.users.userConnected ? (
        <Accueil></Accueil>
      ) : (
        <Connexion></Connexion>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.userReducer,
  userConnected: state.userConnected,
});

const mapDispatchToProps = (dispatch) => ({
  // getAllUsers: () => dispatch(fromUserActions.getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
