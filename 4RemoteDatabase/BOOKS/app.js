import el from './dom.js';
import * as api from './data.js';

window.addEventListener('load', () => {
    document.querySelector('#loadBooks').addEventListener('click', displayBooks);

    const tableBooks = document.querySelector('table tbody');
    const submitBtn = document.querySelector('form button');

    submitBtn.addEventListener('click', createBookObject);

    const input = {
        title: document.querySelector('#title'),
        author: document.querySelector('#author'),
        isbn: document.querySelector('#isbn')
    };

    async function createBookObject(e) {
        e.preventDefault();

        if (!validateInput(input)) {
            alert('All fields are required');
            return;
        }

        const book = {
            title: input.title.value,
            author: input.author.value,
            isbn: input.isbn.value
        };

        try {
            // Object.entries(input).forEach(([k, v]) => v.disabled = true);
            // submitBtn.disabled = true;
            toggleInput(false, ...Object.values(input), submitBtn);
            const created = await api.createBook(book);
            tableBooks.appendChild(createBookElement(created));
            Object.entries(input).forEach(([k, v]) => v.value = '');
        } catch (err) {
            alert(err);
            console.error(err);
        } finally {
            toggleInput(true, ...Object.values(input), submitBtn);
        }

    }

    function toggleInput(active, ...list) {
        list.forEach(e => e.disabled = !active);
    }

    function validateInput(input) {
        let valid = true;
        Object.entries(input).forEach(([k, v]) => {
            if (v.value.length === 0) {
                v.className = 'inputError';
                valid = false;

            } else {
                v.removeAttribute('class');
            }
        });

        return valid;
    }

    //Display books
    async function displayBooks() {
        tableBooks.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        const books = await api.getBooks();
        tableBooks.innerHTML = '';
        books.forEach(book => tableBooks.appendChild(createBookElement(book)));
    }

    //Creates HTML element and append it
    function createBookElement(book) {
        let editBtn = el('button', 'Edit');
        editBtn.addEventListener('click', editBook);

        let deleteBtn = el('button', 'Delete');
        deleteBtn.addEventListener('click', deleteBook);

        let newBook = el('tr', [
            el('td', book.title),
            el('td', book.author),
            el('td', book.isbn),
            el('td', [
                editBtn,
                deleteBtn
            ]),
        ]);

        return newBook;

        function editBook() {
            const confirmBtn = el('button', "Save");
            const cancelBtn = el('button', "Cancel");

            cancelBtn.addEventListener('click', () => {
                tableBooks.replaceChild(newBook, editor);
            });

            confirmBtn.addEventListener('click', async () => {
                if (!validateInput(edit)) {
                    alert('All fields are required!');
                    return;
                }

                const edited = {
                    objectId: book.objectId,
                    title: edit.title.value,
                    author: edit.author.value,
                    isbn: edit.isbn.value
                };

                try {
                    toggleInput(false, ...Object.values(edit), confirmBtn, cancelBtn);
                    const result = await api.updateBook(edited);
                    tableBooks.replaceChild(createBookElement(result), editor);
                } catch (err) {
                    alert(err);
                    console.error(err);
                    toggleInput(true, ...Object.values(edit), confirmBtn, cancelBtn);
                }

            });

            const edit = {
                title: el('input', null, { type: 'text', value: book.title }),
                author: el('input', null, { type: 'text', value: book.author }),
                isbn: el('input', null, { type: 'text', value: book.isbn }),
            };
            
            const editor = el('tr', [
                el('td', edit.title),
                el('td', edit.author),
                el('td', edit.isbn),
                el('td', [
                    confirmBtn,
                    cancelBtn
                ]),
            ]);

            tableBooks.replaceChild(editor, newBook);
        }

        async function deleteBook() {
            try {
                await api.deleteBook(book.objectId);
                newBook.remove();
            } catch (err) {
                alert(err);
                console.error(err);
            }
        }
    }
});

