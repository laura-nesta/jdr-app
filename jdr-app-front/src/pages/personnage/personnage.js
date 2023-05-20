import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../component/navbar/navbar";
import * as fromTodosActions from "../../actions/userAction";

function Personnage(props) {
  const userConnected = props.user.user;
  const nbPerso = parseInt(userConnected.nbPerso);

  const renderCard = () => {
    console.log(nbPerso);
    const cards = []; // Tableau pour stocker les cartes

    for (var i = 0; i < nbPerso; i++) {
      cards.push(
        <div className="card add">
          <p className="gradient-text text-plus">+</p>
        </div>
      );
    }

    return cards; // Renvoyer le tableau de cartes
  };

  return (
    <>
      <div className="global-container compte">
        <Navbar />
        <div className="main-container compte">
          <div class="info compte">
            <h1> Personnages </h1>
          </div>
          <div class="partie-container">{renderCard()}</div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  // createUser: () => dispatch(createUser()),
  getAllUsers: () => dispatch(fromTodosActions.getAllUsers()),
  // addUser: () => dispatch(addUser()),
  // getTodos: () => dispatch(fromTodosActions.getTodo()),
  createUser: (pseudo, email, password) =>
    dispatch(fromTodosActions.createUser(pseudo, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Personnage);
