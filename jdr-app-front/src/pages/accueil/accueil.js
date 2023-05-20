import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import {
//   getAllUsers,
//   addUser,
//   createUser,
//   getPosts,
// } from "../../actions/userAction";
import * as fromTodosActions from "../../actions/userAction";
import "./accueil.css";
import Navbar from "../../component/navbar/navbar";

function Accueil(props) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // props.getAllUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pseudo || !email || !password) {
      // Afficher un message d'erreur ou empêcher l'envoi du formulaire
      return;
    }
    console.log(
      "pseudo : " + pseudo + " mail : " + email + " mdp : " + password
    );
    props.createUser(pseudo, email, password);
    setPseudo("");
    setEmail("");
    setPassword("");
  };

  const user = props.users.user;

  return (
    <>
      <div className="global-container accueil">
        <Navbar></Navbar>
        <div className="titre-accueil">
          <h1>Bonjour {user?.pseudo} !</h1>
        </div>
        <div className="presentation-accueil">
          <p>Bienvenue sur "insérer le nom de l'app ici"!</p>
          <p>
            Ici tu va pouvoir stocker et gérer toutes les infos sur tes JDR.
          </p>
          <p>
            En tant que joueur, tu peux rentrer toutes les infos de ton
            personnage. Et les mettres à jours pour suivre sa progression.
          </p>
          <p>
            En tant que MJ, tu vas pouvoir stocker toutes les infos sur tes
            parties. Le JDR en cours, le nombre de joueur et toutes les infos
            utiles pour suivre l'évolution de la partie.
          </p>
        </div>
        <div className="navigation button">
          <button
            className="lien text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            href="/"
            onClick={() => {
              window.location.href = "/partie";
            }}
          >
            Voir mes parties
          </button>
          <button
            className="lien text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            href="/"
            onClick={() => {
              window.location.href = "/personnage";
            }}
          >
            Voir mes Personnages
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  // createUser: () => dispatch(createUser()),
  getAllUsers: () => dispatch(fromTodosActions.getAllUsers()),
  // addUser: () => dispatch(addUser()),
  // getTodos: () => dispatch(fromTodosActions.getTodo()),
  createUser: (pseudo, email, password) =>
    dispatch(fromTodosActions.createUser(pseudo, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);
