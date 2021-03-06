const transition = (() => {
  //
  // Variables
  //
  const menu_links = document.querySelectorAll('.menu__link');
  const overlay = document.querySelector('.overlay');
  let is_clicked = false;


  //
  // Methods
  //
  function preloadHeroImgs() {
    const hero_imgs = [
      'https://res.cloudinary.com/pamcy/image/upload/v1546913211/coding/xmas_01.jpg', 'https://res.cloudinary.com/pamcy/image/upload/v1546913211/coding/xmas_02.jpg', 'https://res.cloudinary.com/pamcy/image/upload/v1546913211/coding/xmas_03.jpg',
    ];

    hero_imgs.forEach((hero_img) => {
      const new_img = new Image();
      new_img.src = hero_img;
    });
  }

  function addTransition() {
    overlay.classList.remove('shrink');
    overlay.classList.add('grow');
  }

  function removeTransition() {
    const hero_body = document.querySelector('.hero__body');

    overlay.classList.remove('grow');
    overlay.classList.add('shrink');
    hero_body.classList.add('is-showing');
  }

  function setTransitionEndTimer() {
    const seconds = 1000;
    const timer = setInterval(() => {
      // Only if the content have loaded
      if (is_clicked === false) {
        removeTransition();
        clearInterval(timer);
      }
    }, seconds);
  }

  function fetchPageURL(url) {
    return fetch(url)
      .then(response => response.text());
  }

  function loadContent(url) {
    const main_section = document.querySelector('.main-content');
    const old_hero_content = document.querySelector('.hero');

    fetchPageURL(url)
      .then((data) => {
        // Pass the data in a new <div>
        const div = document.createElement('div');
        div.innerHTML = data;

        // Append the new <div> content
        const new_hero_content = div.querySelector('.hero');
        main_section.appendChild(new_hero_content);

        // Remove the old content
        old_hero_content.parentNode.removeChild(old_hero_content);

        // Change the window tile
        document.title = div.getElementsByTagName('title')[0].textContent;

        is_clicked = false;
      });
  }

  function transitionController(url) {
    is_clicked = true;

    addTransition();
    loadContent(url);
    setTransitionEndTimer();
  }

  function init() {
    const hero_body = document.querySelector('.hero__body');

    preloadHeroImgs();
    hero_body.classList.add('is-showing');
  }


  //
  // Inits & Event Listeners
  //
  init();

  menu_links.forEach(link => link.addEventListener('click', (e) => {
    e.preventDefault();

    if (is_clicked) return;

    const href = e.currentTarget.href;

    transitionController(href);
    window.history.pushState(null, null, href);
  }));

  window.addEventListener('popstate', () => {
    transitionController(window.location.href);
  });
})();
