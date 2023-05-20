import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as fromUserActions from "../../actions/userAction";
import "./connexion.css";

function Connexion(props) {
  const isConnected = props.users.userConnected;
  const user = props.users.user;
  const error = props.users.error;

  const [credential, setCredential] = useState({
    pseudo: "",
    password: "",
  });

  return (
    <>
      <div className="global-container">
        <div className="main-container">
          <div className="formulaire">
            <h2 className="titre-formulaire">Connexion</h2>
            <div className="mb-4 champ-form">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pseudo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pseudo"
                type="text"
                name="pseudo"
                placeholder="pseudo"
                onChange={(el) =>
                  setCredential((prevState) => ({
                    ...prevState,
                    pseudo: el.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4 champ-form">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mot de Passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="**********"
                onChange={(el) =>
                  setCredential((prevState) => ({
                    ...prevState,
                    password: el.target.value,
                  }))
                }
              />
            </div>
            <div className="error connexion">{error?.message}</div>
            <div className="button connexion">
              <button
                className="connexion text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={async () => {
                  await props.loginUser(credential.pseudo, credential.password);
                  console.log("user connecté : " + user);
                  console.log("user connecté pseudo: " + user?.pseudo);
                  console.log("est connecté : " + isConnected);
                  console.log("erreur: " + error?.message);
                }}
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
        <div className="lien inscription">
          <a className="lien inscription" href="/inscrption">
            créer un compte
          </a>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.userReducer,
  userConnected: state.userConnected,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(fromUserActions.getAllUsers()),
  getUser: (pseudo) => dispatch(fromUserActions.getUser(pseudo)),
  loginUser: (pseudo, password) =>
    dispatch(fromUserActions.loginUser(pseudo, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
