const btn = document.querySelector('#continue-btn'), check = document.querySelector('#privacy-terms'),
    input = document.querySelector('.numberOrEmail'),feedback = document.querySelector('.invalid-feedback');

let lastClass;
let inputType;
check.addEventListener('change', checkPrivacy);

input.addEventListener('input',async()=>{
    if(input.value.length === 0) {
        setFeedback('clear', '')
        return 0;
    }

    if(validateEmail()){
        if(await validateDB(input.value,'email')){
            setFeedback('is-valid', 'Wonderful!');
            checkPrivacy();
            inputType = 'email';
            return true;
        }
        btn.setAttribute('disabled','true')
        setFeedback('is-invalid', 'This email is busy.');

        return false;
    }
    if(validatePhone()){
        if(await validateDB(input.value,'phone')){
            setFeedback('is-valid', 'Wonderful!');
            checkPrivacy();
            inputType = 'phone';
            return true;
        }
        btn.setAttribute('disabled','true')
        setFeedback('is-invalid', 'This phone is busy.');
        return false;
    }
    setFeedback('is-invalid','Invalid characters.')
    btn.setAttribute('disabled','true')
    return false;
})


btn.addEventListener('click',()=>{

    localStorage.removeItem('userChoose');
    if(localStorage.getItem('email')){
        localStorage.removeItem('email');
    } else{
        localStorage.removeItem('phone');
    }


localStorage.setItem('userChoose', inputType);
localStorage.setItem(inputType, input.value);
})

function setFeedback(feedbackClass, message){

    if(lastClass !== ''){
        input.classList.remove(lastClass);
    }
    input.classList.add(feedbackClass);
    feedback.innerHTML = message;
    lastClass = feedbackClass;

}

 function validateEmail(){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)) return true;
    return false;
}

 function validatePhone(){
    if(/^\+?[0-9]{3}?[0-9]{3}?[0-9]{4,6}$/.test(input.value)) return true;
    return false
}

 function checkInput(){
    if(input.classList.contains('is-valid')){
        return true;
    }
    return false;
}

function checkPrivacy(){
    if(check.checked === true){
        if(checkInput() === true){
            btn.removeAttribute('disabled');
            return;
        }
    }
    btn.setAttribute('disabled', 'true')
}