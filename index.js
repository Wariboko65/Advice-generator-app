{
  const adviceMessage = document.getElementById("advice");
  const adviceId = document.getElementById("id");
  const button = document.getElementById("btn");
  let interval;
  
  function typewriter(text, element, speed = 50) {
    clearInterval(interval);
    let i = 0;
    interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }
  
  function deleteText(element, speed = 20, callback) {
    clearInterval(interval);
    interval = setInterval(() => {
      if (element.textContent.length > 0) {
        element.textContent = element.textContent.slice(0, -1);
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  }
  
  async function adviceGenerator() {
    const api = axios.create({
      baseURL: "https://api.adviceslip.com"
    });
    
    try {
      const response = await api.get("/advice");
      const data = response.data;
      
      await new Promise(function(resolve) {
        deleteText(adviceMessage, 50, resolve);
      });
      //typewriter(`Loading...`, adviceMessage, 40);
      adviceId.textContent = `ADVICE #${data.slip.id}`;
      typewriter(`"${data.slip.advice}"`, adviceMessage, 80);
    } catch(err) {
      await new Promise(function(resolve) {
        deleteText(adviceMessage, 50, resolve);
      });
      typewriter("Failed to load " + err, adviceMessage, 80);
    }
  }
  
  adviceGenerator();
  button.addEventListener("click", adviceGenerator);
}