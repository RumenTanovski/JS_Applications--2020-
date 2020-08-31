import {
    registerUser,
    login,
    logout,
} from './models/user.js';

import {
    create,
    getAll,
    get,
    update,
    deletee
} from './models/movies.js';




const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', function (ctx) {

        setHeader(ctx);
        getAll()
            .then(res => {
                console.log(res.docs[0].data());
                const movies = res.docs.map(x => x = {
                    ...x.data(),
                    id: x.id
                });
                console.log(movies);
                ctx.movies = movies;
                ctx.loadPartials(commonPartial).partial('./view/home.hbs');
            });

    });




    this.get('#/register', function (ctx) {
        setHeader(ctx);
        ctx.loadPartials(commonPartial).partial('./view/user/register.hbs');
    });

    this.post('#/register', function (ctx) {
        const {
            email,
            password,
            repeatPassword
        } = ctx.params;
        if (password !== repeatPassword) {
            throw new Error('Password do not match!');
        }
        registerUser(email, password)
            .then(res => {
                saveUserInfo(res.user.email);
                ctx.redirect('#/home');
            })
            .catch(e => console.log(e));
    });

    this.get('#/login', function (ctx) {
        setHeader(ctx);
        ctx.loadPartials(commonPartial).partial('./view/user/login.hbs');
    });

    this.post('#/login', function (ctx) {
        const {
            email,
            password
        } = ctx.params;
        login(email, password)
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

    this.get('#/add', function (ctx) {
        ctx.loadPartials(commonPartial).partial('./view/movies/create.hbs');
    });

    this.post('#/add', function (ctx) {
        const {
            title,
            description,
            imageUrl
        } = ctx.params;

        const creator = sessionStorage.getItem('user');

        create({
                title,
                description,
                imageUrl,
                creator,
                like: 0,
                peopleLiked: []
            })
            .then(res => {
                console.log(res);
                ctx.redirect('#/home');
            }).catch(e => console.log(e));
    });

    this.get('#/details/:id', function (ctx) {
        setHeader(ctx);
        const id = ctx.params.id;
        get(id)
            .then(res => {
                const movie = {
                    ...res.data(),
                    id: res.id
                };
                console.log(movie);
                ctx.isCreator = movie.creator === sessionStorage.getItem('user');
                ctx.movie = movie;
                ctx.loadPartials(commonPartial).partial('./view/movies/details.hbs');
            }).catch(e => console.log(e));
    });

    this.get('#/edit/:id', function (ctx) {

        const id = ctx.params.id;
        get(id)
            .then(res => {
                const movie = {
                    ...res.data(),
                    id: res.id
                };

                ctx.movie = movie;
                ctx.loadPartials(commonPartial).partial('./view/movies/edit.hbs');
            }).catch(e => console.log(e));
    });

    this.post('#/edit/:id', function (ctx) {
        const {
            title,
            description,
            imageUrl
        } = ctx.params;
        const id = ctx.params.id;
        update(id, {
                title,
                description,
                imageUrl
            })
            .then(res => {
                ctx.redirect(`#/details/${id}`);
            }).catch(e => console.log(e));
    });

    this.get('#/delete/:id', function (ctx) {

        const id = ctx.params.id;
        deletee(id)
            .then(res => {
                ctx.redirect('#/home');
            }).catch(e => console.log(e));
    });

    this.get('#/like/:id', function (ctx) {
        
        const id = ctx.params.id;
        get(id)
            .then(res => {
                const movie = res.data();
                const like = movie.like + 1;
        
                const isLike = movie.like > 0;
                update(id, {like})
                    .then(res => {
                        ctx.redirect(`#/details/${id}`);
                    }).catch(e => console.log(e));
            }).catch(e => console.log(e));
    });


    function saveUserInfo(userInfo) {
        sessionStorage.setItem('user', userInfo);
    }

    function setHeader(ctx) {
        ctx.isAuth = sessionStorage.getItem('user') !== null;
        ctx.user = sessionStorage.getItem('user');
    }

    const commonPartial = {
        header: './view/common/header.hbs',
        footer: './view/common/footer.hbs',
    };

});
app.run('#/home');