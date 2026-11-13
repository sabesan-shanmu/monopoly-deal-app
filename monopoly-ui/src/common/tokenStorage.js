// Keeps the player's JWTs in sessionStorage so a page reload stays logged in without relying on the
// API's session cookie (browsers that block third-party cookies never send it, since the UI and API
// are on different sites). sessionStorage is per tab, so two tabs can be two different players.
const STORAGE_KEY = 'monopoly-deal-tokens';

export const saveTokens = (accessToken, refreshToken) => {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({accessToken, refreshToken}));
    } catch (e) {
        // storage unavailable (e.g. blocked); login still works until the page is reloaded
    }
};

export const loadTokens = () => {
    try {
        const tokens = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
        return tokens && tokens.accessToken && tokens.refreshToken ? tokens : null;
    } catch (e) {
        return null;
    }
};

// Lets the API layer tell React that tokens were refreshed in the background (see axiosInstance)
export const TOKENS_REFRESHED_EVENT = 'monopoly-deal-tokens-refreshed';

export const notifyTokensRefreshed = (tokens) => {
    window.dispatchEvent(new CustomEvent(TOKENS_REFRESHED_EVENT, {detail: tokens}));
};

export const clearTokens = () => {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        // ignore
    }
};
