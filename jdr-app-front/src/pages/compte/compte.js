import { useState } from "react";
import "./compte.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../component/navbar/navbar";
import { logoutUser } from "../../actions/userAction";

function Compte(props) {
  const userConnected = props.user.user;
  return (
    <>
      <div className="global-container compte">
        <Navbar />
        <div className="main-container compte">
          <div class="info compte">
            <p>Pseudo: {userConnected?.pseudo}</p>
            <p>Email: {userConnected?.email}</p>
            <p>Password: {userConnected?.password}</p>
            <p>Profil: {userConnected?.profil}</p>
            <p>nombre de partie: {userConnected?.nbPartie}</p>
            <p>nombre de personnages: {userConnected?.nbPerso}</p>
            <button
              className="deconnexion text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              href="/"
              onClick={() => {
                props.logoutUser();
                window.location.href = "/";
              }}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Compte);
