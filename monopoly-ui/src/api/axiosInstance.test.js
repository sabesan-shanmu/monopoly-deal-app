import axiosInstance from './axiosInstance';
import {saveTokens,loadTokens,clearTokens,TOKENS_REFRESHED_EVENT} from '../common/tokenStorage';

// Unsigned JWT-shaped token: jwt-decode only reads the payload
const fakeToken = (identity, label) => {
    const encode = (obj) => btoa(JSON.stringify(obj)).replace(/=+$/, '');
    return `${encode({alg: 'HS256', typ: 'JWT'})}.${encode({identity, label, exp: 9999999999})}.signature`;
};

const identity = {playerId: 7, gamePassCode: 'game-abc'};
const oldAccess = fakeToken(identity, 'old-access');
const oldRefresh = fakeToken(identity, 'old-refresh');
const newAccess = fakeToken(identity, 'new-access');
const newRefresh = fakeToken(identity, 'new-refresh');

const expiredResponse = (config) => Promise.reject({
    config,
    response: {status: 401, data: {name: 'ExpiredTokenError'}, config}
});

let requests;
const fakeAdapter = (config) => {
    requests.push({url: config.url, auth: config.headers.Authorization});
    if(config.url.endsWith('/refresh/'))
        return Promise.resolve({status: 200, data: {accessToken: newAccess, refreshToken: newRefresh}, config, headers: {}});
    if(config.headers.Authorization === `Bearer ${oldAccess}`)
        return expiredResponse(config);
    return Promise.resolve({status: 200, data: {ok: true}, config, headers: {}});
};

beforeEach(() => {
    requests = [];
    axiosInstance.defaults.adapter = fakeAdapter;
    clearTokens();
    saveTokens(oldAccess, oldRefresh);
});

test('an expired access token is refreshed once and the call retried', async () => {
    const refreshed = jest.fn();
    window.addEventListener(TOKENS_REFRESHED_EVENT, refreshed);

    const headers = {Authorization: `Bearer ${oldAccess}`};
    const [first, second] = await Promise.all([
        axiosInstance.get('/api/games/game-abc/player-cards/', {headers}),
        axiosInstance.get('/api/games/game-abc/game-cards/', {headers}),
    ]);

    expect(first.data).toEqual({ok: true});
    expect(second.data).toEqual({ok: true});
    expect(requests.filter((r) => r.url.endsWith('/refresh/'))).toHaveLength(1);
    expect(requests.find((r) => r.url.endsWith('/refresh/')).auth).toBe(`Bearer ${oldRefresh}`);
    expect(loadTokens()).toEqual({accessToken: newAccess, refreshToken: newRefresh});
    expect(refreshed).toHaveBeenCalledTimes(1);
    window.removeEventListener(TOKENS_REFRESHED_EVENT, refreshed);
});

test('other errors are passed through untouched', async () => {
    axiosInstance.defaults.adapter = (config) => Promise.reject({config, response: {status: 400, data: {name: 'ValidationError'}}});
    await expect(axiosInstance.get('/api/games/')).rejects.toMatchObject({response: {status: 400}});
});

test('without stored tokens the original error is returned', async () => {
    clearTokens();
    await expect(axiosInstance.get('/api/x/', {headers: {Authorization: `Bearer ${oldAccess}`}}))
        .rejects.toMatchObject({response: {status: 401}});
});
