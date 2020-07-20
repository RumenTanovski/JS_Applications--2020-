/* globals Handlebars */
window.addEventListener('load', () => {
    // зарежадане на темплейта
    const templateString = document.getElementById('main-template').innerHTML;
    console.log(templateString);

    //компилиране темплейта
    const templateFn= Handlebars.compile(templateString);
    Handlebars.registerPartial('town', document.getElementById('town-template').innerHTML);

    document.querySelector('#btnLoadTowns').addEventListener('click', renderTowns);
    const input = document.querySelector('#towns');
    const rootEl = document.querySelector('#root');

        function renderTowns(e){

            e.preventDefault();
            const towns =input.value.split(', ');
            input.value='';
            console.log(towns);

            //попълва темплейта с нашите данни
            const generateHTML= templateFn({towns});
            console.log(generateHTML);

            //туря го в DOM
            rootEl.innerHTML = generateHTML;
        }
} );