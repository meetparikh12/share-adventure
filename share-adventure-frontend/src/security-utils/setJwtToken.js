import axios from 'axios';

const setJwtToken = token => {
    if(token) {
        axios.defaults.headers.post['Authorization'] = 'Bearer ' +token;
    } else {
        delete axios.defaults.headers.post['Authorization'];
    }
}

export default setJwtToken;