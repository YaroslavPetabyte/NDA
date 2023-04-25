// Gallery

lightGallery(document.querySelector('.wrapper__gallery'));


// Feedback Block

var swiper = new Swiper(".slider-content", {
    slidesPerView: 3,
    centeredSlides: false,
    spaceBetween: 25,
    grabCursor: true,
    fade: true,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        920: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        }
    }
});


// VIDEO + VIDEO INTRO

function parseMediaURL(video) {
  // let regexp = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i;
  let regexp = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i;
  let url = video.dataset.src
  let match = url.match(regexp);

  return match[1];
}

function addPreview() {
  const videos = document.querySelectorAll('.video');

  videos.forEach(function(video) {
    video.setAttribute('style', `background: center / cover no-repeat url('https://i.ytimg.com/vi/${parseMediaURL(video)}/maxresdefault.jpg`)
  })
}

addPreview();

window.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.video');

  videos.forEach(function(video) {
      video.addEventListener('click', function() {
          if(video.classList.contains('ready')) {
              return
          }
          video.classList.add('ready')
          video.insertAdjacentHTML('afterbegin', '<iframe src="https://www.youtube.com/embed/'+ parseMediaURL(video) +'?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="z-index: 1;" allowfullscreen></iframe>');
      });
  });

});




// .header__wrapper (change color)

const headerWrapper = document.querySelector('.header__wrapper');

document.addEventListener('scroll', () => {
    const scrollTopDocument = Math.round(document.documentElement.scrollTop / 10);

    headerWrapper.style.background = `linear-gradient(0.25turn, rgb(239, 137, 220), rgb(246, 157, ${(scrollTopDocument + 60)}), rgb(149, 100, 245))`;
});




// header__navigation

const headerNav = document.querySelector('.header__navigation');
let selectedBTN;

headerNav.addEventListener('click', function(e) {

  let btn = e.target.closest('button');
  if (!btn) return;
  if (!headerNav.contains(btn)) return;

  // highlight(btn); // підсвідка включеної кнопки (включити за потреби)
  moveOnTheSite(btn);
  burger.classList.toggle('burger_active');
  headerNavigation.classList.toggle('burger_active');
});

function highlight(btn) {
  if (selectedBTN) {
    selectedBTN.classList.remove('highlight');
  }
  selectedBTN = btn;
  selectedBTN.classList.add('highlight');
};

function moveOnTheSite(selectBlock) {
  const blocks = document.querySelectorAll('.block');
  const nameSelectBlock = selectBlock.name;
  const headerHeight = parseInt(getComputedStyle(headerWrapper).height);
  blocks.forEach(block => {
    if(block.id === nameSelectBlock) {
      const offsetElem = block.offsetTop;
      const offsetElemSpecified = offsetElem - headerHeight;
      scrollToBlock(offsetElemSpecified);
    };
  });
}

function scrollToBlock(scroll) {
  window.scrollTo({
    top: scroll,
    behavior: 'smooth'
  });
}
