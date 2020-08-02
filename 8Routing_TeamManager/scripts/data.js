const appId = '0011E999-3DB7-B1A6-FF08-11B50D39C100';
const apiKey = 'A3B2DEEB-7652-46A5-B669-1A30F32C6B64';

function host(endpoints) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoints}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT:'users/logout',
    TEAMS: 'data/teams'
};


export async function createCustomer(customer) {
    const response = await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}

export async function login(user) {
    return (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })).json();
}

export async function logout(token) {
    return await fetch(host(endpoints.LOGOUT), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
}