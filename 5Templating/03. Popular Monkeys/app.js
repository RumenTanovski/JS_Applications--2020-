/* globals Handlebars, monkeys */
window.addEventListener('load', async () => {
    const mainEl = document.querySelector('.monkeys');

    // init template, чакаме потока, чакаме превъщането му в текст
    const listString = await (await fetch('./list.hbs')).text();
    const listTemplate = Handlebars.compile(listString);    
    Handlebars.registerPartial('monkey', await(await fetch('./monkey.hbs')).text());

    // render Html, cats идва от window.cat на файла catSeeder.js
    // прави го глобална променлива, в случая
    const html= listTemplate({monkeys});
    mainEl.innerHTML = html;

    // set up interaction
    mainEl.addEventListener('click', onClick);
    function onClick(e){
        if (e.target.tagName !== 'BUTTON'){
            return;
        };
        const p = e.target.parentNode.querySelector('p');
        if (p.style.display == 'none'){
            e.target.textContent = 'Hide info';
            p.removeAttribute('style');
        }else {
            e.target.textContent = 'Info';
            p.style.display = 'none';
        }
    }    

});