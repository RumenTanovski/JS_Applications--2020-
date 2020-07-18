const appId = '0011E999-3DB7-B1A6-FF08-11B50D39C100';
const apiKey = 'A3B2DEEB-7652-46A5-B669-1A30F32C6B64';

function host(endpoints) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoints}`;
}

export async function getStudents() {
    const response = await fetch(host('students'));
    const data = await response.json();
    data.sort((a, b) => a.IDNumber - b.IDNumber);
    return data;
}

export async function createStudent(student) {
    console.log(typeof student);
    console.log(host('students'));
    const response = await fetch(host('students'), {
        method: 'POST',
        body: JSON.stringify(student),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();
    return data;
}

export async function deleteStudent(id) {
    const response = await fetch(host('students/' + id), {
        method: 'DELETE'
    });

    const data = await response.json();
    return data;
}

export async function isStudentExists(id) {
    const response = await fetch(host('students' + `/${id}`));
    const data = await response.json();
    return data;
}