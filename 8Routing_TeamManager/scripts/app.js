/* global $, Sammy*/
import home from './controllers/home.js';
import about from './controllers/about.js';
import register, {registerPost} from './controllers/register.js';
import login from './controllers/login.js';
import catalog from './controllers/catalog.js';
import details from './controllers/details.js';


$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        //this === Sammy.Application

        this.userData = {
            loggedIn: true,
            hasTeam: true,
            username: undefined,
            userId: undefined,
            teamId: undefined
        };

        
        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/about', about);

        this.get('#/register', register );
        this.post('#/register', (ctx) => {registerPost.call(ctx);});
        

        this.get('#/login', login);

        this.get('#/catalog', catalog);
        this.get('#/catalog/:id', details);

    });

    app.run();
});