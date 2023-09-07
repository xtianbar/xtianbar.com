let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 200) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#6b7280 ${scrollValue}%, #212121 ${scrollValue}%)`;
};    
  
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

// FORM TO GOOGLE SHEETS
const scriptURL = 'https://script.google.com/macros/s/AKfycbwYONFhoXAPI8jNsF3Wdab2N8xWxTlIH8jGyVOhXC3GpQYVRvAbjanNCbTAvhYgZMlq/exec'
const form = document.forms['talk-to-me']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      form.reset()
      console.log('Success!', response)
    })
    .catch(error => console.error('Error!', error.message))
})