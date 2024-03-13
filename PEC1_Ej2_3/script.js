

const container = document.querySelector('.container');
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.ocupied');
const moneda = document.getElementById('moneda');

const options = document.querySelectorAll('#movie option');
const optionValues = [];
options.forEach(function(option) {
    var value = option.value;
    optionValues.push(value);
});

const currencySelect = document.getElementById('currency');



populateUI();
let priceTicket = +movieSelect.value;
let exchange = 1;


//Save selected movie index and price
function setMovie(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    const priceTotal = (selectedSeatsCount * priceTicket * exchange).toFixed(2);
    total.innerText = `${priceTotal}`;
    moneda.innerText = `${currencySelect.value}`;


    setMovie(movieSelect.selectedIndex, movieSelect.value);

}

//Funcion para la api de conversion de monedas
async function changeMoney(base, target){
    const respose = await fetch(`https://open.exchangerate-api.com/v6/latest/${base}`);
    const data = await respose.json();
    exchange = data.rates[target];

    //Array que se va a utilizar para almacenar el precio de las entradas segun el tipo de moneda seleccionado
    //El forEach para calcular el precio correspondiente a cada peliculaq
    const priceEntradas = [];
    options.forEach(function(option) {
        var value = (option.value * exchange).toFixed(2);
        priceEntradas.push(value);
    });

    //Bucle que recorre todas las opciones del menu de las peliculas. Para cada una eliminará la última palabra
        //que esta será el precio junto con la moneda y se actualiza el texto del nombre de la película con el nuevo valor del precio
        //calculado junto con el tipo de moneda
    for (let i = 0; i < options.length; i++) {
        let text = options[i].textContent;
        let lastSpaceIndex = text.lastIndexOf(" ");
        let newText = text.substring(0, lastSpaceIndex); 
        console.log(newText);
        options[i].innerText = newText + " " + `(${priceEntradas[i]}` + `${target})`;
    }

    updateSelectedCount();
}

//Cuando se cambia la moneda
currencySelect.addEventListener('change', e => {
    const base = 'USD';
    const target = currencySelect.value;
    changeMoney(base,target);

  
    
})

//Get data from localstorage and populate ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {
    priceTicket = +e.target.value;
    setMovie(e.target.selectedIndex,e.target.value);
    updateSelectedCount();

});
//Seat Click Event
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('ocupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

updateSelectedCount();
