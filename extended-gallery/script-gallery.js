// // Gallery

lightGallery(document.querySelector('.wrapper__gallery'));



// .header__wrapper (change color)

const headerWrapper = document.querySelector('.header__wrapper');

document.addEventListener('scroll', () => {
    const scrollTopDocument = Math.round(document.documentElement.scrollTop / 10);

    headerWrapper.style.background = `linear-gradient(0.25turn, rgb(110, 115, 243), rgb(232, 105, ${(scrollTopDocument + 140)}), rgb(127, 98, 184))`;
});

