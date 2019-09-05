import * as ActionTypes from '../ActionTypes/ActionTypes';

export default function counter(state = {apiKey: null, notify_error: null, notify_info: null, isLoggedIn: false, user: null, isLoadingAuthInfo: true}, action) {
  switch (action.type) {
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
          return { ...state, notify_error: action.payload.error}
        case ActionTypes.NOTIFY_SUCCESS:
          return { ...state, notify_success: action.payload.success}
    default:
      return state
  }
}
