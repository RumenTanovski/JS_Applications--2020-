import {
    registerUser,
    login,
    logout,
} from './models/user.js';

import {
    create,
    getAll
} from './models/events.js';



const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', function (ctx) {
        setHeader(ctx);
        getAll()
            .then(res => {
                console.log(res.docs[0].data());
                const events = res.docs.map(x => x = {
                    ...x.data(),
                    id: x.id
                });
                console.log(events);
                ctx.loadPartials(commonPartial).partial('./view/home.hbs');
            });

    });


    this.get('#/profile', function (ctx) {
        ctx.loadPartials(commonPartial).partial('./view/user/profile.hbs');
    });

    this.get('#/register', function (ctx) {
        ctx.loadPartials(commonPartial).partial('./view/user/register.hbs');
    });

    this.post('#/register', function (ctx) {
        const {
            username,
            password,
            rePassword
        } = ctx.params;
        if (password !== rePassword) {
            throw new Error('Password do not match!');
        }
        registerUser(username, password)
            .then(res => {
                saveUserInfo(res.user.email);
                ctx.redirect('#/home');
            })
            .catch(e => console.log(e));
    });

    this.get('#/login', function (ctx) {
        ctx.loadPartials(commonPartial).partial('./view/user/login.hbs');
    });

    this.post('#/login', function (ctx) {
        const {
            username,
            password
        } = ctx.params;
        login(username, password)
            .then(res => {
                saveUserInfo(res.user.email);
                console.log(res.user.email);
                ctx.redirect('#/home');
            }).catch(e => console.log(e));
    });

    this.get('#/logout', function (ctx) {
        sessionStorage.clear();
        console.log(ctx.isAuth);
        logout()
            .then(() => {
                ctx.redirect('#/login');
            }).catch(e => console.log(e));
    });

    this.get('#/create', function (ctx) {
        ctx.loadPartials(commonPartial).partial('./view/events/create.hbs');
    });

    this.post('#/create', function (ctx) {
        const {
            name,
            dateTime,
            description,
            imageURL
        } = ctx.params;
        create({
                name,
                dateTime,
                description,
                imageURL
            })
            .then(res => {
                console.log(res);
                ctx.redirect('#/home');
            }).catch(e => console.log(e));
    });



    function saveUserInfo(userInfo) {
        sessionStorage.setItem('user', userInfo);
    }

    function setHeader(ctx) {
        ctx.isAuth = sessionStorage.getItem('user');
        ctx.user = sessionStorage.getItem('user');
    }

    const commonPartial = {
        header: './view/common/header.hbs',
        footer: './view/common/footer.hbs'
    };

});
app.run('#/home');