import el from './dom.js';
import * as api from './data.js';

window.addEventListener('load', () => {
    const createBtn = document.querySelector('#createStudent');
    const loadStudents = document.querySelector('#loadStudents');
    let table = document.querySelector('tbody');
    loadStudents.addEventListener('click', loadAllStudents);

    createBtn.addEventListener('click', addStudent);

    const input = {
        FirstName: document.querySelector('#firstName'),
        LastName: document.querySelector('#lastName'),
        IDNumber: document.querySelector('#IDNumber'),
        FacultyNumber: document.querySelector('#facNumber'),
        Grade: document.querySelector('#grade')
    };

    //Creates a student
    async function addStudent(e) {
        e.preventDefault();
        const student = {
            IDNumber: Number(input.IDNumber.value),
            facNumber: input.FacultyNumber.value,
            grade: Number(input.Grade.value),
            firstName: input.FirstName.value,
            lastName: input.LastName.value
        };

        try {
            let students = await api.getStudents();
            let isFound = students.find(s => s.IDNumber === student.IDNumber);
            if (isFound !== undefined) {
                throw new Error(`Student with IDNumber: ${student.IDNumber} already exists!`);
            }
            const created = await api.createStudent(student);
            table.appendChild(createStudentElement(created));
        } catch (err) {
            alert(err);
            console.error(err);
        }

        input.IDNumber.value = '';
        input.FacultyNumber.value = '';
        input.Grade.value = '';
        input.FirstName.value = '';
        input.LastName.value = '';
    }

    //Loads All students
    async function loadAllStudents() {
        table.innerHTML = '<tr><td colspan="5" style="text-align: center">Loading...</td></tr>';
        const students = await api.getStudents();
        table.innerHTML = '';
        students.forEach(student => table.appendChild(createStudentElement(student)));
    }

    //Creates a HTML student element
    function createStudentElement(student) {
        let deleteBtn = el('button', 'Delete');
        deleteBtn.addEventListener('click', e => deleteStudent(e));

        let htmlEl = el('tr', [
            el('td', student.IDNumber),
            el('td', student.firstName),
            el('td', student.lastName),
            el('td', student.facNumber),
            el('td', student.grade),
            deleteBtn
        ]);
        return htmlEl;


        //Additional function delete
        async function deleteStudent(e) {

            try {
                await api.deleteStudent(student.objectId);
                e.target.parentElement.remove();
            } catch (err) {
                alert(err);
                console.error(err);
            }
        }
    }
});
