import * as api from '../data.js';

export default async function () {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    };
    this.partial('./templates/login/loginPage.hbs');
};

export async function loginPost() {

    const user = {
        login: this.params.username,
        password: this.params.password
    };

    try {
        const result = await api.login(user);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.loggedIn = true;
        this.app.userData.username = result.name;
        localStorage.setItem('userToken', result['user-token']);
        
        this.redirect('#/home');

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}