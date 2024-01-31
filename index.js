const adviceID = document.querySelector('.id');
const adviceMessage = document.querySelector('.advice');
const btn = document.getElementsByTagName('button')[0];

adviceMethod('https://api.adviceslip.com/advice');

async function adviceMethod(file) {
    const response = await fetch(file);
    const text = await response.json();
    
    adviceID.innerText += `ADVICE #${text.slip.id}`;
    adviceMessage.innerHTML = `"${text.slip.advice}"`;
}

btn.addEventListener('click', () => {
    window.location.reload();
});