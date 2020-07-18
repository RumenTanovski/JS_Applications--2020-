
import * as data from './data.js';
import createElement from './dom.js';

const weatherSymbols = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    'Degrees': '&#176;'
};

window.addEventListener('load', () => {
    const elements = {
        getLocation() { return document.getElementById('location'); },
        getWeatherButton() { return document.getElementById('submit'); },
        getForecastSection() { return document.getElementById('forecast'); },
        currentConditions() { return document.getElementById('current'); },
        upcomingConditions() { return document.getElementById('upcoming'); }
    };

    const initialCurrentDivState = elements.currentConditions().cloneNode(true);
    const initialUpcomingDivState = elements.upcomingConditions().cloneNode(true);

    elements.getWeatherButton().addEventListener('click', onGetWeather);

    async function onGetWeather() {
        elements.currentConditions().innerHTML = initialCurrentDivState.innerHTML;
        elements.upcomingConditions().innerHTML = initialUpcomingDivState.innerHTML;

        const inputLocation = elements.getLocation().value;

        let code = '';

        try {
            code = await data.getCode(inputLocation);
        } catch (error) {
            elements.getLocation().value = '';
            elements.currentConditions().innerHTML += 'Error';
            elements.upcomingConditions().innerHTML += 'Error';
            elements.getForecastSection().style.display = 'block';

            return;
        }

        const todayForecastData = data.getToday(code);
        const upcomingForecastData = data.getUpcoming(code);

        const [todayForecast, upcomingForecast] = [await todayForecastData, await upcomingForecastData];

        const { forecast: { condition, high, low }, name } = todayForecast;

        renderTodayForecast(condition, high, low, name);
        renderUpcomingForecast(upcomingForecast);
    }

    function renderTodayForecast(condition, high, low, name) {
        const spanSymbol = createElement('span', '', {
            className: 'condition symbol'
        });
        spanSymbol.innerHTML = weatherSymbols[condition];

        const spanTemperature = createElement('span', '', {
            className: 'forecast-data'
        });
        spanTemperature.innerHTML = `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`;

        const todayElement = createElement('div', [
            spanSymbol,
            createElement('span', [
                createElement('span', name, {
                    className: 'forecast-data'
                }),
                spanTemperature,
                createElement('span', condition, {
                    className: 'forecast-data'
                })
            ], {
                className: 'condition'
            })
        ], {
            className: 'forecasts'
        });

        elements.currentConditions().appendChild(todayElement);
    }

    function renderUpcomingForecast(upcoming) {
        const { forecast } = upcoming;

        const container = document.createElement('div');
        container.setAttribute('class', 'forecast-info');

        forecast.forEach(span => {
            const spanSymbol = createElement('span', '', {
                className: 'symbol'
            });
            spanSymbol.innerHTML = weatherSymbols[span.condition];

            const spanTemperature = createElement('span', '', {
                className: 'forecast-data'
            });
            spanTemperature.innerHTML = `${span.low}${weatherSymbols.Degrees}/${span.high}${weatherSymbols.Degrees}`;

            const result = createElement('span', [
                spanSymbol,
                spanTemperature,
                createElement('span', span.condition, {
                    className: 'forecast-data'
                })
            ], {
                className: 'upcoming'
            });

            container.appendChild(result);
        });

        elements.upcomingConditions().appendChild(container);

        elements.getForecastSection().style.display = 'block';
        elements.getLocation().value = '';
    }
});