const appId = '0011E999-3DB7-B1A6-FF08-11B50D39C100';
const apiKey = 'A3B2DEEB-7652-46A5-B669-1A30F32C6B64';

function host(endpoints) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoints}`;
}

export async function getCustomers() {
    const response = await fetch(host('Users'));
    const data = await response.json();
    return data;
}

export async function createCustomer(customer) {
    const response = await fetch(host('Users'), {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}
