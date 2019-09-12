import * as ActionTypes from '../ActionTypes/ActionTypes';

export default function counter(state = {apiKey: null,isLoggedIn: false, notify_error: null, notify_info: null, isLoggedIn: false, user: null, isLoadingAuthInfo: true}, action) {
  switch (action.type) {
        case "tick":
          return {...state, tick: state.tick + 135}
        case ActionTypes.SET_CURRENTUSER:
           return { ...state, apiKey: null, isLoggedIn: false, user: action.payload.user }
        case ActionTypes.RESET_USERINFO:
          return { ...state, apiKey: null, isLoggedIn: false, user: null }
        case ActionTypes.UPDATE_ISLOADINGAUTHINFO:
          return { ...state, isLoadingAuthInfo: action.payload }
        case ActionTypes.SET_VERSION:
          return { ...state, buildDate: action.payload.buildDate, buildSha: action.payload.buildSha }
        case ActionTypes.SET_APIKEY:
          return { ...state, apiKey: action.payload.apiKey, user: action.payload.user, isLoggedIn: true, isLoadingAuthInfo: false}
        case ActionTypes.CLEAR_NOTIFICATIONS:
          return { ...state, notify_error:null, notify_info: null}
        case ActionTypes.NOTIFY_ERROR:
          console.info("NOTIFY_ERROR");
          return { ...state, notify_error: action.payload.error}
        case ActionTypes.NOTIFY_SUCCESS:
        console.info("NOTIFY_SUCCESS--");
          return { ...state, notify_success: action.payload.success}
        case ActionTypes.USER_LOGGEDIN:
          return { ...state, isLoggedIn: true, apiKey: action.payload.apiKey}
        case ActionTypes.USER_LOGGEDOUT:
          return { ...state, isLoggedIn: false, apiKey: null, user: null}
    default:
      return state
  }
}
