
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');


//Show Input Sucess
function showSucess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//Show Input Error
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Check email is valid
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSucess(input);
    }
    else{
        showError(input, 'Email is not valid');
    }
}

//Check password
function checkPasswords(input){
    if(input.value.length < 8){
        showError(input, `${getFieldName(input)} must be at least 8 characters`);
    }

    //Mayusculas
    if(!(/[A-Z]/.test(input.value))) {
        showError(input, `${getFieldName(input)} must have at least one capital letter`);
    }
    
    //Signos
    const signos = /[`~!@#\$%\^&*()_+\-=\{\}\|[\]\\:\;"'<>,.?/]/;
    if(!signos.test(input.value)){
        showError(input, `${getFieldName(input)} must have at least one special sign`);
    }
    
    //Minusculas
    if(!(/[a-z]/.test(input.value))) {
        showError(input, `${getFieldName(input)} must have at least one lowercase`);
    }
    
    //Cifras
    if (!/\d/.test(input.value)) {
        showError(input, `${getFieldName(input)} must have at least one digit`);
    }
}

//Check password and password2
function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match');
    }
}


//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSucess(input);
        }
    });
}


//Chec Age
function checkAge(input,min,max){
    if (isNaN(input.value)) {
        showError(input, `${getFieldName(input)} must be a valid number`); 
    }
    else if(input.value < min || input.value > max){
        showError(input, `${getFieldName(input)} must be between ${min} and ${max}`);
    }
}

//Check input length
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
    else{
        showSucess(input);
    }
}

//GetfieldName
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username,email,password,password2,age]);

    checkLength(username,3,15);
    checkPasswords(password);

    checkEmail(email);

    checkPasswordsMatch(password,password2);

    checkAge(age,0,1000);

})

