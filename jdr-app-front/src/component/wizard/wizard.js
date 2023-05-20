import "./wizard.css";
import { useState } from "react";
import { connect } from "react-redux";
import * as fromUserActions from "../../actions/userAction";

function Wizard(props) {
  const [formulaire, setFormulaire] = useState({
    profil: "",
    jeuxListe: [],
    nbPartie: "",
    nbPerso: "",
    pseudo: "",
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const [ddSelected, setDdSelected] = useState(false);
  const [whSelected, setWhSelected] = useState(false);
  const [ctSelected, setCtSelected] = useState(false);
  const [autreSelected, setAutreSelected] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormulaire((prevState) => ({ ...prevState, [name]: value }));
  };

  const ajouterJeu = (jeu) => {
    setFormulaire((prevState) => ({
      ...prevState,
      jeuxListe: [...prevState.jeuxListe, jeu],
    }));
  };

  const supprimerJeu = (jeuASupprimer) => {
    setFormulaire((prevState) => ({
      ...prevState,
      jeuxListe: prevState.jeuxListe.filter((jeu) => jeu !== jeuASupprimer),
    }));
  };

  const handleClickJeu = (jeu, state, setState) => {
    if (!state) {
      ajouterJeu(jeu);
    } else {
      supprimerJeu(jeu);
    }
    setState(!state);
  };

  const valideFormulaire = () => {
    if (!formulaire.pseudo || !formulaire.email || !formulaire.password) {
      // Afficher un message d'erreur ou empêcher l'envoi du formulaire
      return;
    }
    const userData = {
      pseudo: formulaire.pseudo,
      email: formulaire.email,
      password: formulaire.password,
      profil: formulaire.profil,
      jeuxListe: formulaire.jeuxListe,
      nbPartie: formulaire.nbPartie,
      nbPerso: formulaire.nbPerso,
    };
    props.createCompleteUser(userData);
    setIsSubmitted(true);
  };

  function stepComponent() {
    switch (step) {
      case 1:
        return (
          <div class="step-one step">
            <h2 class="step title">Etape 1</h2>
            <p> Choisir un type de profil</p>
            <div class="choix-profil choix">
              <button
                className={`button image profil ${
                  formulaire.profil === "MJ" ? "is-selected" : ""
                } `}
                onClick={() => setFormulaire({ ...formulaire, profil: "MJ" })}
              >
                MJ
                <img
                  src={require("../../assets/icones/icone-MJ.png")}
                  alt="mj"
                />
              </button>

              <button
                className={`button image profil ${
                  formulaire.profil === "Joueur" ? "is-selected" : ""
                } `}
                onClick={() =>
                  setFormulaire({ ...formulaire, profil: "Joueur" })
                }
              >
                Joueur
                <img
                  src={require("../../assets/icones/icone-Joueur.png")}
                  alt="mj"
                />
              </button>

              <button
                className={`button image profil ${
                  formulaire.profil === "MJ et Joueur" ? "is-selected" : ""
                } `}
                onClick={() =>
                  setFormulaire({ ...formulaire, profil: "MJ et Joueur" })
                }
              >
                MJ et Joueur
                <img
                  src={require("../../assets/icones/icone-MJouJoueur.png")}
                  alt="mj"
                />
              </button>
            </div>
            <div class="navigation">
              <div class="suivant">
                <button
                  className={`${
                    formulaire.profil === ""
                      ? "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 opacity-50 cursor-not-allowed"
                      : "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  }`}
                  onClick={() => {
                    if (formulaire.profil !== "") {
                      setStep(2);
                    }
                  }}
                >
                  suivant
                </button>
              </div>
            </div>
            <div class="lien connexion">
              <a class="lien connexion" href="/">
                J'ai déjà un compte
              </a>
            </div>
          </div>
        );

      case 2:
        return (
          <div class="step-two step">
            <h2 class="step title">Etape 2</h2>
            <p> Choisir mes Jeux de rôles</p>
            <div class="choix-jeux choix">
              <button
                className={`button choix jeux ${
                  ddSelected ? "is-selected" : ""
                } `}
                onClick={() =>
                  handleClickJeu("Donjons & Dragons", ddSelected, setDdSelected)
                }
              >
                Donjons & Dragons
              </button>
              <button
                className={`button choix jeux ${
                  whSelected ? "is-selected" : ""
                } `}
                onClick={() =>
                  handleClickJeu("Warhammer", whSelected, setWhSelected)
                }
              >
                Warhammer
              </button>
              <button
                className={`button choix jeux ${
                  ctSelected ? "is-selected" : ""
                } `}
                onClick={() =>
                  handleClickJeu("Ctuhulu", ctSelected, setCtSelected)
                }
              >
                Ctuhulu
              </button>
              <button
                className={`button choix jeux ${
                  autreSelected ? "is-selected" : ""
                } `}
                onClick={() =>
                  handleClickJeu("Autres", autreSelected, setAutreSelected)
                }
              >
                Autres
              </button>
            </div>

            <div class="navigation">
              <div class="precedent">
                <button
                  class="text-gray-800 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => setStep(1)}
                >
                  précédent
                </button>
              </div>

              <div class="suivant">
                <button
                  className={`${
                    formulaire.jeuxListe.length === 0
                      ? "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 opacity-50 cursor-not-allowed"
                      : "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  }`}
                  onClick={() => {
                    if (formulaire.jeuxListe.length !== 0) {
                      setStep(3);
                    }
                  }}
                >
                  suivant
                </button>
              </div>
            </div>
            <div class="lien connexion">
              <a class="lien connexion" href="/">
                J'ai déjà un compte
              </a>
            </div>
          </div>
        );

      case 3:
        return (
          <div class="step-three">
            <h2 class="step title">Etape 3</h2>
            {formulaire.profil.includes("MJ") && (
              <>
                <p>Nombres maximums de parties :</p>
                <div class="choix-partie choix">
                  <button
                    class={`button choix jeux ${
                      formulaire.nbPartie === "5" ? "is-selected" : ""
                    } `}
                    onClick={() =>
                      setFormulaire({ ...formulaire, nbPartie: "5" })
                    }
                  >
                    1 - 5 Parties <br />
                    gratuit
                  </button>
                  <button
                    class={`button choix jeux ${
                      formulaire.nbPartie === "10" ? "is-selected" : ""
                    } `}
                    onClick={() =>
                      setFormulaire({ ...formulaire, nbPartie: "10" })
                    }
                  >
                    6 - 10 Parties <br />
                    5.99€ / mois
                  </button>
                  <button
                    class={`button choix jeux ${
                      formulaire.nbPartie === "20" ? "is-selected" : ""
                    } `}
                    onClick={() =>
                      setFormulaire({ ...formulaire, nbPartie: "20" })
                    }
                  >
                    11 - 20 Parties <br />
                    9.99€ / mois
                  </button>
                </div>
              </>
            )}
            {formulaire.profil.includes("Joueur") && (
              <>
                <p> Nombres maximums de personnages :</p>
                <div class="choix-personnage choix">
                  <button
                    class={`button choix jeux ${
                      formulaire.nbPerso === "5" ? "is-selected" : ""
                    } `}
                    onClick={() =>
                      setFormulaire({ ...formulaire, nbPerso: "5" })
                    }
                  >
                    1 - 5 Parties <br />
                    gratuit
                  </button>
                  <button
                    class={`button choix jeux ${
                      formulaire.nbPerso === "10" ? "is-selected" : ""
                    } `}
                    onClick={() =>
                      setFormulaire({ ...formulaire, nbPerso: "10" })
                    }
                  >
                    6 - 10 Parties <br />
                    5.99€ / mois
                  </button>
                  <button
                    class={`button choix jeux ${
                      formulaire.nbPerso === "20" ? "is-selected" : ""
                    } `}
                    onClick={() =>
                      setFormulaire({ ...formulaire, nbPerso: "20" })
                    }
                  >
                    11 - 20 Parties <br />
                    9.99€ / mois
                  </button>
                </div>
              </>
            )}
            <div class="navigation">
              <div class="precedent">
                <button
                  class="text-gray-800 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => setStep(2)}
                >
                  précédent
                </button>
              </div>

              <div class="suivant">
                <button
                  className={`${
                    !(formulaire.nbPartie !== "" || formulaire.nbPerso !== "")
                      ? "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 opacity-50 cursor-not-allowed"
                      : "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  }`}
                  onClick={() => {
                    if (
                      formulaire.nbPartie !== "" ||
                      formulaire.nbPerso !== ""
                    ) {
                      setStep(4);
                    }
                  }}
                >
                  suivant
                </button>
              </div>
            </div>
            <div class="lien connexion">
              <a class="lien connexion" href="/">
                J'ai déjà un compte
              </a>
            </div>
          </div>
        );

      case 4:
        return (
          <div class="step-one">
            <h2 class="step title">Etape 4</h2>
            <div class="choix-identifiants choix">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="Pseudo"
                >
                  Pseudo *
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="pseudo"
                  type="text"
                  name="pseudo"
                  placeholder="pseudo"
                  onChange={handleChange}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="Email"
                >
                  Email *
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="Password"
                >
                  Mot de Passe *
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  name="password"
                  placeholder="******************"
                  onChange={handleChange}
                ></input>
              </div>
            </div>

            <div class="navigation">
              <div class="precedent">
                <button
                  class="text-gray-800 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => setStep(3)}
                >
                  précédent
                </button>
              </div>

              <div class="suivant">
                <button
                  className={`${
                    !(
                      formulaire.password !== "" &&
                      formulaire.email !== "" &&
                      formulaire.pseudo !== ""
                    )
                      ? "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 opacity-50 cursor-not-allowed"
                      : "suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  }`}
                  onClick={() => {
                    if (
                      formulaire.password !== "" &&
                      formulaire.email !== "" &&
                      formulaire.pseudo !== ""
                    ) {
                      setStep(5);
                    }
                  }}
                >
                  suivant
                </button>
              </div>
            </div>
            <div class="lien connexion">
              <a class="lien connexion" href="/">
                J'ai déjà un compte
              </a>
            </div>
          </div>
        );

      case 5:
        return (
          <div class="step-one">
            <h2 class="step title">Etape 5</h2>
            <h1>Récapitulatif de vos informations </h1>
            <p>pseudo : {formulaire.pseudo}</p>
            <p>mail : {formulaire.email}</p>
            <p>mot de passe : {formulaire.password}</p>
            <p>nbPartie : {formulaire.nbPartie}</p>
            <p>nbPerso : {formulaire.nbPerso}</p>
            <p>profil : {formulaire.profil}</p>
            <p>jeux : {formulaire.jeuxListe}</p>
            <div class="navigation">
              <div class="precedent">
                <button
                  class="text-gray-800 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => setStep(4)}
                >
                  précédent
                </button>
              </div>

              <div class="suivant">
                <button
                  className="suivant text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => valideFormulaire()}
                >
                  Valider
                </button>
              </div>
            </div>
            <div class="lien connexion">
              <a class="lien connexion" href="/">
                J'ai déjà un compte
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div class="main-container-wizard">
        <div class="side-bar">
          <img
            class="logo"
            src="https://cdn-icons-png.flaticon.com/512/2619/2619057.png"
            alt="logo"
          ></img>

          <div class="step-bar">
            <div class="steper">
              <div class={step === 1 ? "active" : ""}>1</div>
              <div class="gradient-text">Profil</div>
              <div class={step === 2 ? "active" : ""}>2</div>
              <div class="gradient-text">Jeux</div>
              <div class={step === 3 ? "active" : ""}>3</div>
              <div class="gradient-text">Formule</div>
              <div class={step === 4 ? "active" : ""}>4</div>
              <div class="gradient-text">Compte</div>
              <div class={step === 5 ? "active" : ""}>5</div>
              <div class="gradient-text">Finalisation</div>
            </div>
          </div>
        </div>
        <div class="formulaire-wizard">
          <div class="form-container">
            {isSubmitted ? (
              <>
                <p>Formulaire validé !</p>
                <div className="connexion-wizard">
                  <button
                    className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => {
                      props.loginUser(formulaire.pseudo, formulaire.password);
                      window.location.href = "/";
                    }}
                  >
                    Se connecter
                  </button>
                </div>
              </>
            ) : (
              stepComponent()
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  createCompleteUser: (userData) =>
    dispatch(fromUserActions.createCompleteUser(userData)),
  loginUser: (pseudo, password) =>
    dispatch(fromUserActions.loginUser(pseudo, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
