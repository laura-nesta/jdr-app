const initialState = {
  users: [],
  userConnected: false,
  user: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USER_STARTED":
      return { ...state, loading: true };
    case "GET_ALL_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
      };
    case "GET_ALL_USER_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "GET_USER_STARTED":
      return { ...state, loading: true };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case "GET_USER_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "LOGIN_USER_STARTED":
      return { ...state, loading: true };
    case "LOGIN_USER_FAILED":
      return {
        ...state,
        loading: false,
        userConnected: false,
        error: action.payload,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        userConnected: true,
      };
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
        userConnected: false,
      };
    default:
      return state;
  }
};

export default userReducer;
