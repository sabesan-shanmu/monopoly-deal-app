import 'axios'
import {config} from '../common/config'


async const getGames = () =>{

    return axios({
        method: 'GET',
        url: '/games',
        baseUrl:config.apiUri,
        timeout:config.apiTimeout,
      });

}