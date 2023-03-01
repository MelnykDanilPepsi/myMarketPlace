const registrationButton = document.querySelector('#registrationBtn'),
    form = document.querySelector('#registrationForm'),
    checkAgree = document.querySelector('#CheckAgree'),
    fileInput = document.querySelector('#fileInput'),
    userPhoto = document.querySelector('#userPhoto'),
    reader = new FileReader(),
    repeatPassword = document.querySelector('#passwordRepeat');


reader.onloadend = ()=>{
    userPhoto.src = reader.result;
}

form.addEventListener('input', async (event)=>{

    if(event.target.getAttribute('type') === 'radio' || event.target.getAttribute('type') === 'checkbox' ||
    event.target.getAttribute('type') === 'file'){
        return
    }

    const target = event.target, targetId = target.id;

    if(targetId === 'UserName'){
        toggleValidClass(target, await validateUsername(target))
        return;
    }
    if(targetId === 'Email'){
        toggleValidClass(target, await  validateEmail(target));
        return;
    }
    if(targetId === 'password'){
        toggleValidClass(target, validatePassword(target));
        return;
    }
    if(targetId === 'passwordRepeat'){
        toggleValidClass(target, validateRepeatPassword(target))
        return;
    }

    toggleValidClass(target,checkInput(target))
})
form.addEventListener('change', (event) =>{
    if(event.target.getAttribute('type') === 'radio' || event.target.getAttribute('type') === 'checkbox' ||
        event.target.getAttribute('type') === 'file'){
        return
    }

    checkOnValidate();
})
form.addEventListener('submit', ()=>{


})

checkAgree.addEventListener('change', checkOnValidate)
fileInput.addEventListener('change', ()=>{
    const file = fileInput.files[0];

    if(file){
        console.log(file)
    reader.readAsDataURL(file);
    return;
    }
    userPhoto.src = "";

})




async function validateUsername(target){
    if(target.value.length === 0) return 0;
    if(/^\S*$/.test(target.value)){
        target.nextSibling.nextSibling.innerHTML = 'This username is busy';
        return await validateDB(target.value,'lowerUsername');
    }
    target.nextSibling.nextSibling.innerHTML = 'Invalid characters'
    return false;

}
async function validateEmail(target)
{
    if(target.value.length === 0) return 0;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(target.value))
    {
        target.nextSibling.nextSibling.innerHTML = 'This email is busy';
        return await validateDB(target.value,'email');
    }
    target.nextSibling.nextSibling.innerHTML = 'Invalid characters';
    return false
}

function clearValidation(elem){
    if(elem.classList.contains('is-invalid')) {
        elem.classList.remove('is-invalid')
        return;
    }
    if(elem.classList.contains('is-valid')){
        elem.classList.remove('is-valid')
    }
}
function validateRepeatPassword(target){
    if(target.value.length === 0){
        return 0;
    }

    if(target.value === document.querySelector('#password').value){
        return true
    }
    return false;
}
function checkInput(target){

    if(target.value.length === 0){
        return 0;
    }
    if(/^^[a-zA-Z]{1,10}$/.test(target.value)) {
        return  true
    }
    return false;
}
function validatePassword(target) {

    toggleValidClass(repeatPassword ,validateRepeatPassword(repeatPassword))
    if(target.value.length === 0) return 0;
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(target.value)){
        return true;
    }
    return false;


}
function toggleValidClass(elem,flag){
    if(flag === 0){
        clearValidation(elem);
        return;
    }
    if(flag === true){
        if(elem.classList.contains('is-valid')){
            return;
        }
        if(elem.classList.contains('is-invalid')) {
            elem.classList.remove('is-invalid')
        }
        elem.classList.add('is-valid');
        return
    }
    if(elem.classList.contains('is-invalid')) return;

    if(elem.classList.contains('is-valid')){
        elem.classList.remove('is-valid')
    }
    elem.classList.add('is-invalid');
}


function disableRegistrationButton(){
    if(registrationButton.getAttribute('disabled') === true){
        return;
    }
    registrationButton.setAttribute('disabled','true');
}
function enableRegistrationButton(){
    registrationButton.removeAttribute('disabled');
}
function checkOnValidate(){
    if(checkAgree.checked === false){
        disableRegistrationButton();
        return;
    }
    if(document.querySelectorAll('.is-valid').length === 6){
        enableRegistrationButton();
        return;
    }
    disableRegistrationButton();

}
