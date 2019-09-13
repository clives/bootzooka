import * as ActionTypes from '../ActionTypes/ActionTypes';

export const updateIsLoadingAuthInfo = (isLoadingAuthInfo) => ({
    type: ActionTypes.UPDATE_ISLOADINGAUTHINFO,
    payload: isLoadingAuthInfo
});

export const setApiKey = (apikey, user) => ({
    type: ActionTypes.SET_APIKEY,
    payload: { 'user' :user, 'apikey': apikey}
});

export const resetUserLoginInfo = () => ({
    type: ActionTypes.RESET_USERINFO
});

export const getCurrentUser = (apikey) => ({
    type: ActionTypes.GET_CURRENTUSER,
    payload: { 'apikey': apikey}
});

export const getVersion = () => ({
    type: ActionTypes.GET_VERSION
});

export const registerUser = (login, email, password) => ({
    type: ActionTypes.REGISTER_USER,
    payload: { 'login': login, 'email': email, 'password': password}
});

export const clearNotifications = () => ({
    type: ActionTypes.CLEAR_NOTIFICATIONS
});

export const notifySuccess = () => ({
           type: ActionTypes.NOTIFY_SUCCESS
});

export const notifyError = () => ({
           type: ActionTypes.NOTIFY_ERROR
});

export const userLogin = (loginOrEmail, password) => ({
           type: ActionTypes.USER_LOGIN,
           payload: { 'loginOrEmail': loginOrEmail, 'password': password}
});

export const userLogout = () => ({
           type: ActionTypes.USER_LOGOUT
});

export const userLoggedout = () => ({
           type: ActionTypes.USER_LOGGEDOUT
});

export const redirectMainPage = () => ({
    type: ActionTypes.REDIRECT_MAINPAGE
})
