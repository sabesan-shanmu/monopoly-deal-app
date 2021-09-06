import jwt_decode from 'jwt-decode'

export const getDecodedPlayer = (data) =>{
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;

    const accessTokenPayload = jwt_decode(accessToken);
    const refreshTokenPayload = jwt_decode(refreshToken);

    return {
        playerName:accessTokenPayload.identity.playerName,
        playerId:accessTokenPayload.identity.playerId,
        imageId:accessTokenPayload.identity.imageId,
        gamePassCode:accessTokenPayload.identity.gamePassCode,
        playerGameOrder:accessTokenPayload.identity.playerGameOrder,
        voteStatusId:accessTokenPayload.identity.voteStatusId,
        numberOfCardsOnHand:accessTokenPayload.identity.numberOfCardsOnHand,
        accessTokenExpirationInSeconds:accessTokenPayload.exp,
        refreshTokenExpirationInSeconds:refreshTokenPayload.exp,
        accessToken:accessToken,
        refreshToken:refreshToken
    }
}