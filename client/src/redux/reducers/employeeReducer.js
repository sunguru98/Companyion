const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: JSON.parse(localStorage.getItem('accessToken')) || null,
  userLoading: false,
  errors: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      localStorage.setItem('user', JSON.stringify(payload));
      return {
        ...state,
        user: payload
      };
    case 'SET_ACCESS_TOKEN':
      localStorage.setItem('accessToken', JSON.stringify(payload));
      return {
        ...state,
        accessToken: payload
      };
    case 'CLEAR_USER':
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return { user: null, accessToken: null };
    case 'SET_USER_LOADING':
      return { ...state, userLoading: payload };
    case 'SET_USER_ERRORS':
      return {
        ...state,
        errors: payload
      };
    case 'CLEAR_USER_ERRORS':
      return { ...state, errors: null };
    case 'RESET_USER_STATE':
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return {
        errors: null,
        accessToken: null,
        user: null,
        userLoading: false
      };
    default:
      return state;
  }
};
