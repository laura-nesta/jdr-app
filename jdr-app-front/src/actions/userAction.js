//Permet de créer un nouvel utilisateur
const getAllUserStarted = () => ({
  type: "GET_ALL_USER_STARTED",
});

const getAllUserFailed = (error) => ({
  type: "GET_ALL_USER_FAILED",
  payload: error,
});

const getAllUserSuccess = (users) => ({
  type: "GET_ALL_USER_SUCCESS",
  payload: users,
});

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch(getAllUserStarted());
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
      });

      const users = await response.json();
      dispatch(getAllUserSuccess(users));
    } catch (error) {
      dispatch(getAllUserFailed(error));
    }
  };
};

//Permet de créer un nouvel utilisateur
const getUserStarted = () => ({
  type: "GET_USER_STARTED",
});

const getUserFailed = (error) => ({
  type: "GET_USER_FAILED",
  payload: error,
});

const getUserSuccess = (user) => ({
  type: "GET_USER_SUCCESS",
  payload: user,
});

export const getUser = (pseudo) => {
  return async (dispatch) => {
    dispatch(getUserStarted());
    try {
      const response = await fetch("http://localhost:5000/user/" + pseudo, {
        method: "GET",
      });

      const users = await response.json();
      dispatch(getUserSuccess(users));
    } catch (error) {
      dispatch(getUserFailed(error));
    }
  };
};

//Permet de créer un nouvel utilisateur
const createUserStarted = () => ({
  type: "ADD_USER_STARTED",
});

const createUserFailed = (error) => ({
  type: "ADD_USER_FAILED",
  payload: error,
});

const createUserSuccess = (newUser) => ({
  type: "ADD_USER_SUCCESS",
  payload: newUser,
});

export const createUser = (pseudo, email, password) => {
  return async (dispatch) => {
    dispatch(createUserStarted());
    try {
      const newUserData = {
        pseudo: pseudo,
        email: email,
        password: password,
      };
      console.log("userData in function : " + newUserData);
      const bodyText = JSON.stringify(newUserData);
      console.log(bodyText);
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newUserData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();
      dispatch(createUserSuccess(newUser));
    } catch (error) {
      dispatch(createUserFailed(error));
    }
  };
};

//Permet de créer un nouvel utilisateur complet
const createCompleteUserStarted = () => ({
  type: "ADD_COMPLETE_USER_STARTED",
});

const createCompleteUserFailed = (error) => ({
  type: "ADD_COMPLETE_USER_FAILED",
  payload: error,
});

const createCompleteUserSuccess = (newUser) => ({
  type: "ADD_COMPLETE_USER_SUCCESS",
  payload: newUser,
});

export const createCompleteUser = (dataUser) => {
  return async (dispatch) => {
    dispatch(createCompleteUserStarted());
    try {
      console.log(dataUser);
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(dataUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();
      dispatch(createCompleteUserSuccess(newUser));
    } catch (error) {
      dispatch(createCompleteUserFailed(error));
    }
  };
};

const loginUserStarted = () => ({
  type: "LOGIN_USER_STARTED",
});

const loginUserFailed = (error) => ({
  type: "LOGIN_USER_FAILED",
  payload: error,
});

const loginUserSuccess = (newUser) => ({
  type: "LOGIN_USER_SUCCESS",
  payload: newUser,
});

export const loginUser = (pseudo, password) => {
  return async (dispatch) => {
    dispatch(loginUserStarted());
    try {
      const response = await fetch("http://localhost:5000/user/" + pseudo, {
        method: "GET",
      });
      console.log("params avec pseudo : " + pseudo + " avec mdp : " + password);
      const user = await response.json();
      const login = user.pseudo;
      const mdp = user.password;
      console.log(
        "userCredential in function : " +
          user +
          " avec pseudo : " +
          login +
          " avec mdp : " +
          mdp
      );
      if (mdp === password) {
        dispatch(loginUserSuccess(user));
      } else {
        throw new Error("Le mot de passe ne correspond pas");
      }
    } catch (error) {
      dispatch(loginUserFailed(error));
    }
  };
};

const logoutUserSuccess = () => ({
  type: "LOGOUT_USER_SUCCESS",
});

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutUserSuccess());
  };
};
