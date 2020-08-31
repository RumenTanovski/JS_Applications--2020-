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
} from './models/shoes.js';




const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");
    
    this.get('#/home', function (ctx) {
        
        setHeader(ctx);
        
        getAll()
        .then(res => {
            
            const shoes = res.docs.map(x => x = {
                ...x.data(),
                id: x.id
            });
            console.log(shoes);
            ctx.shoes = shoes;
            
            
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
        ctx.loadPartials(commonPartial).partial('./view/shoes/create.hbs');
    });

    this.post('#/add', function (ctx) {
        let {
            title,
            price,
            imageUrl,
            description,
            brand
        } = ctx.params;

        const creator = sessionStorage.getItem('user');
        const kupili= [''];
// TO DOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!
// price ,00
price = Number(price).toFixed(2);
        create({
            title,
            price,
            imageUrl,
            description,
            brand,
            creator,
            kupili
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
                const shoe = {
                    ...res.data(),
                    id: res.id
                };
                console.log(shoe);
                ctx.isCreator = shoe.creator === sessionStorage.getItem('user');  
                const numKupli= shoe.kupili.length;
                
                ctx.numKupli = numKupli;
                ctx.shoe = shoe;
                
                ctx.isKupil = shoe.kupili.find(c => c == ctx.user);

                ctx.loadPartials(commonPartial).partial('./view/shoes/details.hbs');
            }).catch(e => console.log(e));
    });

    this.get('#/edit/:id', function (ctx) {

        const id = ctx.params.id;
        get(id)
            .then(res => {
                const shoes = {
                    ...res.data(),
                    id: res.id
                };

                ctx.shoes = shoes;
                ctx.loadPartials(commonPartial).partial('./view/shoes/edit.hbs');
            }).catch(e => console.log(e));
    });

    this.post('#/edit/:id', function (ctx) {
        const {
            title,
            price,
            imageUrl,
            description,
            brand,
            creator,
            kupili
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

    this.get('#/buy/:id', function (ctx) {
        
        const id = ctx.params.id;
        get(id)
            .then(res => {
                const shoe = res.data();
                const kupili = shoe.kupili.push(ctx.user);
                

                update(id, {kupili})
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