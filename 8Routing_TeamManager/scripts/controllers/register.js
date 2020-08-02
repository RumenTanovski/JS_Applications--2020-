import * as api from '../data.js';

export default async function register(context) {
    context.partials = {
        header: await context.load('./templates/common/header.hbs'),
        footer: await context.load('./templates/common/footer.hbs'),
        registerForm: await context.load('./templates/register/registerForm.hbs')
    };
    await context.partial('./templates/register/registerPage.hbs');
};


export async function registerPost() {

    if (this.params.password !== this.params.repeatPassword) {
        alert('Password don\' t match ');
        return;
    }

    try {
        const customer = {name:this.params.username, password:this.params.password};
        const result = await api.createCustomer(customer);
        if (result.hasOwnProperty('errData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('#/login');

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}