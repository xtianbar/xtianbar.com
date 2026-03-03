let scrollProgress = document.getElementById("progress");

// Handle the click ONCE, outside the scroll function
scrollProgress.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // This is the magic line for the glide effect
  });
});

let calcScrollValue = () => {
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
    
  let scrollValue = Math.round((pos * 100) / calcHeight);

  // Show/Hide logic
  if (pos > 200) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  // Update the progress ring using your colors
  scrollProgress.style.background = `conic-gradient(#558AC8 ${scrollValue}%, #303030 ${scrollValue}%)`;
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

const menu = document.getElementById('navbar-default');
const button = document.getElementById('menu-toggle');
const hamburger = document.getElementById('hamburger');
const closeIcon = document.getElementById('close-icon');

// This single function handles all the logic
function handleMenu() {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        // CLOSE IT
        menu.classList.add('hidden');
        hamburger.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
    } else {
        // OPEN IT
        menu.classList.remove('hidden');
        hamburger.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
    }
}

// 1. Only one event listener for the button
button.onclick = (e) => {
    e.preventDefault(); // Prevents conflict with data-attributes
    handleMenu();
};

// 2. Only one event listener for the links
document.querySelectorAll('#navbar-default a').forEach(link => {
    link.onclick = () => {
        // Only close if we are actually on mobile (menu is visible)
        if (window.innerWidth < 768) { 
            menu.classList.add('hidden');
            hamburger.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
        }
    };
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // 1. Remove ALL active styles from every link
    navLinks.forEach(nav => {
        nav.classList.remove(
            'font-bold', 
            'underline', 
            'underline-offset-[0.425rem]', 
            'decoration-blu', 
            'decoration-2'
        );
    });
    
    // 2. Add ALL active styles to the one you just clicked
    this.classList.add(
        'font-bold', 
        'underline', 
        'underline-offset-[0.425rem]', 
        'decoration-blu', 
        'decoration-2'
    );
  });
});


// Select spans (Projects, About, Contact) AND the Nav Links
const sections = document.querySelectorAll('span[id]'); 
const navScrollLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const scrollPosition = window.scrollY;

  // 1. CHECK FOR HOME (Top of page)
  // If we are very close to the top (less than 100px), force 'home'
  if (scrollPosition < 100) {
    current = 'home';
  } 
  // 2. CHECK FOR CONTACT (Bottom of page)
  // If we have scrolled to the very bottom, force 'contact'
  else if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 50) {
    current = 'contact'; 
  } 
  // 3. CHECK THE REST (Middle sections)
  else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // We use a fixed offset (150px) instead of clientHeight
      // because 'span' tags often have 0 height, which breaks the math.
      if (scrollPosition >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
  }

  // Loop through links and apply styles
  navScrollLinks.forEach(link => {
    // Reset ALL links first
    link.classList.remove('underline', 'underline-offset-[0.425rem]', 'decoration-blu', 'decoration-2', 'text-blu', 'font-bold');
    link.classList.add('text-mostly-black'); 

    // Add active style ONLY to the match
    // We use .includes() because the href is usually "#home", but current is just "home"
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('underline', 'underline-offset-[0.425rem]', 'decoration-blu', 'decoration-2', 'text-blu', 'font-bold');
      link.classList.remove('text-mostly-black');
    }
  });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveLink);