
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');

const containerEl = document.getElementById('container');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

currencyEl_one.addEventListener('change',calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swapEl.addEventListener('click', () =>{
    const tempVal = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = tempVal;
    calculate();
});

function calculate(){

    //Comprobar que no ha introducido un número negativo
    if(amountEl_one.value < 0 || amountEl_two.value < 0){
        errorEl.textContent = "Error no se permiten números negativos";
        errorEl.style.display = "block";
        return; //Para que no relize la consulta a la API
    }

    //Mensajes de carga de la consulta a la API
    loadingEl.style.display = "block";
    containerEl.style.display = "none";
    errorEl.style.display = "none";


    //Se ha añadido la función de setTimeOut para que 
    //la llamada a la API tarde 0.5 segundo y así 
    //se pueda ver el mensaje de que esta cargando 
    //la consulta a la API
    setTimeout(() => {
        const currency_one = currencyEl_one.value;
        const currency_two = currencyEl_two.value;

        fetch("https://open.exchangerate-api.com/v6/latest").then(res=> res.json()).then(data=> {
            const rate = data.rates[currency_two]/data.rates[currency_one];
            rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * (rate)).toFixed(2);
    
            containerEl.style.display = "block";
            loadingEl.style.display = "none";
        }).catch(error => {
            errorEl.textContent = "Error al cargar la consulta a la API";
            errorEl.style.display = "block";
        });
    },500);
    
}

calculate();


