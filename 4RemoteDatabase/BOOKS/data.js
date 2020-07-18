//Important:
//ENTER:
const appId = '0011E999-3DB7-B1A6-FF08-11B50D39C100';
const apiKey = 'A3B2DEEB-7652-46A5-B669-1A30F32C6B64';

function host(endpoints) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoints}`;
}

export async function getBooks() {
    const response = await fetch(host('books'))
    const data = await response.json();
    return data;
}

export async function createBook(book) {
    const response = await fetch(host('books'), {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}

export async function updateBook(book) {
    const bookId = book.objectId;
    const response = await fetch(host('books/' + bookId), {
        method: 'put',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const response = await fetch(host('books/' + id), {
        method: 'DELETE'
    });

    const data = await response.json();
    return data;
}