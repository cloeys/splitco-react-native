import * as Storage from '../storage/TokenStorage';

const BASE_URL = "http://splitcoapi-dev.eu-central-1.elasticbeanstalk.com/api";

createHeaders = () => {
    return Storage.getAuthToken()
        .then(res => {
            return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + res };
        });
}

getUser = () => {
    return createHeaders()
        .then(headers => {
            return fetch(BASE_URL + '/user', {
                method: 'GET',
                headers: headers
            })
        })
        .then(res => {
            return res.json();
        })
}

getGroups = () => {
    return createHeaders()
        .then(headers => {
            return fetch(BASE_URL + '/group', {
                method: 'GET',
                headers: headers
            })
        })
        .then(res => {
            return res.json();
        })
}

getGroup = (id) => {
    return createHeaders()
        .then(headers => {
            return fetch(BASE_URL + '/group/' + id, {
                method: 'GET',
                headers: headers
            })
        })
        .then(res => {
            return res.json();
        })
}

getCostsOfGroup = (groupId) => {
    return createHeaders()
        .then(headers => {
            return fetch(BASE_URL + '/cost/group/' + groupId, {
                method: 'GET',
                headers: headers
            })
        })
        .then(res => {
            return res.json();
        })
}

export { 
    getUser,
    getGroups,
    getGroup,
    getCostsOfGroup
 };