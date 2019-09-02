
export default function counter(state = {apiKey: null, isLoggedIn: false, user: null, isLoadingAuthInfo: true}, action) {
  switch (action.type) {
        case 'RESET_USERINFO':
          return { ...state, apiKey: null, isLoggedIn: false, user: null }
        case 'UPDATE_ISLOADINGAUTHINFO':
          return { ...state, isLoadingAuthInfo: action.payload }
        case 'SET_APIKEY':
          return { ...state, apiKey: action.payload.apiKey, user: action.payload.user, isLoggedIn: true, isLoadingAuthInfo: false}
    default:
      return state
  }
}
