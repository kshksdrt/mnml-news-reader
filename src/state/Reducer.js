export default function (state, action) {
  switch (action.type) {

    case 'SET_THEME':
      if (!['dark', 'light'].includes(action.payload)) return state;
      return {
        ...state,
        theme: action.payload
      };
  
    default:
      return state;
  }
}