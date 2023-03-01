
const userChoose = localStorage.getItem('userChoose'), userContactData = localStorage.getItem(userChoose);
    sendBtn = document.querySelector('.send'), confirmBtn = document.querySelector('.confirm'),
    showTime = document.querySelector('#show-timer'), info = document.querySelector('.information'),
        inputV = document.querySelector('.input-verification');

    let lastClass;

class Timer{
    constructor(minutes,seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
        let interval, finish;
    }
    tick(){
        this.showTimer(showTime)
        this.seconds--;

        if(this.seconds === 0){
            if(this.minutes === 0){
                sendBtn.removeAttribute('disabled');
                this.finish = true;
                localStorage.removeItem('finish');

                showTime.innerHTML = '';
                clearInterval(this.interval)
                return this.finish;
            }
            //continue
            this.minutes--;
            this.seconds = 60;
            this.finish = false;
            return this.finish;
        }

    }
    startTimer(){
        this.interval = setInterval(this.tick.bind(this), 1000);
        if(this.minutes === 0 && this.seconds === 0){
            this.setTime(0,30);
        }
    }
    showTimer(element){
        if(this.minutes > 0){
            element.innerHTML = this.minutes + ':' + this.seconds;
        }
        element.innerHTML = this.seconds;
    }
    setTime(min, sec){
        this.minutes = min;
        this.seconds = sec;
    }
}

const timer = new Timer(0,30);

    if(localStorage.getItem('finish') === 'false'){
        start();
        info.innerHTML = 'We send code confirmation code to ' + userContactData;

    }

document.querySelector('.title').innerText = `Confirm your ${userChoose}`;

sendBtn.addEventListener('click', async (typeOfChoose)=>{
    try{
        start();
        if(userChoose === 'email'){
           const flag = await sendToEmail()
            if(flag){
                info.innerHTML = 'We send code confirmation code to ' + userContactData;

            }
        }
    }
    catch (e) {
        console.log(e);
    }

})
inputV.addEventListener('input', ()=>{
    if(inputV.value.length === 6){
        confirmBtn.removeAttribute('disabled');
        return;
    }
    confirmBtn.setAttribute('disabled','true')
})
confirmBtn.addEventListener('click', async()=>{
    const flag = await checkCode(inputV.value);
    console.log(flag);
    if(!flag){
        setInvalidClass(inputV);
        return;
    }
})

async function sendToEmail(){
    const subject = 'IMarketPlace';
    const text = '<div style="max-width: 400px; padding: 0px 20px; text-align: center; margin:auto;" >' +
        '<h1 style="color: cadetblue; margin-bottom: 25px; border-bottom: 1px solid black">iMarketPlace</h1>' +
        '<div style="text-align: center;">' +
        '<p style="font-size: 16px; margin-bottom: 25pxS">A registration attempt has been made to your email address, if this is your email, please use the code below</p>' +
       '</div> </div>'


    const flag = await fetch('/auth/sendRegistrationMail',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userContactData,subject, text})
    })
        .then(res => res.json())
        .then(data =>  data.message)
        .catch(e => console.log(e));
    return flag;
}
function sendToPhone(){
}
async function checkCode(code){
    const flag = await fetch('/auth/CheckCode', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code})
    })
        .then(res => res.json())
        .then(data => data.flag)
        .catch(e => {console.log(e)});
    return flag;
}
function setInvalidClass(elem){
    if(lastClass !== ''){
        elem.classList.remove(lastClass);
    }
    elem.classList.add('is-invalid')
    lastClass = 'is-invalid';
    info.innerHTML = 'Incorrect code';
}

function start(){
    sendBtn.setAttribute('disabled','true');
    timer.startTimer();
    localStorage.setItem('finish','false');
}


