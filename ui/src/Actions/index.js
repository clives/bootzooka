export const updateIsLoadingAuthInfo = (isLoadingAuthInfo) => ({
    type: 'UPDATE_ISLOADINGAUTHINFO',
    payload: isLoadingAuthInfo
});

export const setApiKey = (apikey, user) => ({
    type: 'SET_APIKEY',
    payload: { 'user' :user, 'apikey': apikey}
});

export const resetUserLoginInfo = () => ({
    type: 'RESET_USERINFO'
});

export const getCurrentUser = (apikey) => ({
    type: 'GET_CURRENTUSER',
    payload: { 'apikey': apikey}
});

export const getVersion = () => ({
    type: 'GET_VERSION'
});

