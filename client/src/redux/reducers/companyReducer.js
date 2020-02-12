const initialState = {
  companies: null,
  company: null,
  companyLoading: false,
  errors: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_COMPANY':
      return {
        ...state,
        company: { ...payload }
      };
    case 'SET_COMPANIES':
      return {
        ...state,
        companies: [...payload]
      };
    case 'SET_COMPANY_LOADING':
      return {
        ...state,
        companyLoading: payload
      };
    case 'SET_COMPANY_ERRORS':
      return {
        ...state,
        errors: payload
      };
    case 'CLEAR_COMPANY_ERRORS':
      return { ...state, errors: null };
    case 'CLEAR_COMPANY':
      return { ...state, company: null };
    case 'CLEAR_COMPANIES':
      return { ...state, companies: null };
    case 'RESET_COMPANY_STATE':
      return {
        company: null,
        companies: null,
        companyLoading: false,
        errors: null
      };
    default:
      return state;
  }
};
