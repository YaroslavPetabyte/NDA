// FAQ Block

const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("activeAbout");
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}



// inputmask

const popUpPhone = document.querySelector('#popUpPhone');
const popUpProductNumber = document.querySelector('#popUpProductNumber');

let numberPhone = new Inputmask('+38(099)999-99-99');
let productNum = new Inputmask('Код товару: (999999)');

numberPhone.mask(popUpPhone);
productNum.mask(popUpProductNumber)



// Pop up

const makeAnOrder = document.querySelector('#makeAnOrder');
const popUpOrder = document.querySelector('#popUpOrder');
const popUpOrderClose = document.querySelector('#popUpOrderClose');
const popUpName = document.querySelector('.pop-up__name');



makeAnOrder.addEventListener('click', function() {
  popUpOrder.classList.add('pop-up--active');
  popUpName.focus()
});

popUpOrderClose.addEventListener('click', function() {
  popUpOrder.classList.remove('pop-up--active');
});

document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 ){ // код клавіші Escape
    popUpOrder.classList.remove('pop-up--active');
	}
});

document.addEventListener('mousedown', function(e) {
  const target = e.target

  if (!target.closest('.pop-up__container') && popUpOrder.classList.contains('pop-up--active')) {
    popUpOrder.classList.remove('pop-up--active');
  }
});




//(Код товару при загрузці зображення)

const galleryFool = document.querySelector('.wrapper__gallery');

galleryFool.addEventListener('click', function(e) {
  let a = e.target.closest('a');
  if (!a) return;
  if (!galleryFool.contains(a)) return;
  const numCodeProduct = a.href.slice(-10, -4);

  const newObj = document.querySelector('#lg-counter');
  newObj.insertAdjacentHTML('beforeend', `<span class="code-product">Код: <span class="code-product__number">${numCodeProduct}</span><button class="code-product__order">Замовити</button></span>`);

  orderProductInner(numCodeProduct);
  turnOver();

});

function turnOver() {
  const actions = document.querySelector('.lg-actions');
  const deleyCode = 800;

  actions.addEventListener('click', function(e) {

    setTimeout(() => {

      try {

        const current = document.querySelector('.lg-current');
        const currentSrcCode = current.children[0].children[0].currentSrc;
        const numCode = currentSrcCode.slice(-10, -4);

        const pieceOfCode = document.querySelector('.code-product__number');
        if(pieceOfCode.classList.contains("code-product__error")) {
          pieceOfCode.classList.remove("code-product__error");
        }

        orderProductInner(numCode);


        const btnOrder = document.querySelector('.code-product__order');
        if(btnOrder.style.display = 'none') {
          btnOrder.style.display = 'inline-block';
        }

        pieceOfCode.innerHTML = `${numCode}`;


      } catch (err) {
        console.log(err)
        const pieceOfCode = document.querySelector('.code-product__number');
        pieceOfCode.classList.add('code-product__error');
        pieceOfCode.innerHTML = "... не знайдено (уточніть у продавця)";

        const btnOrder = document.querySelector('.code-product__order');
        btnOrder.style.display = 'none';
      }

    }, deleyCode);


  });
}


function orderProductInner(codeOnProduct) {
  const btnOrder = document.querySelector('.code-product__order');
  btnOrder.addEventListener('click', function() {
    popUpOrder.classList.add('pop-up--active');
    const popUpProductNumber = document.querySelector('.pop-up__product-number');
    popUpProductNumber.value = codeOnProduct;
    popUpName.focus();
  });
}


// burger animation
const burger = document.querySelector('.burger');
const headerNavigation = document.querySelector('.header__navigation');
burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    headerNavigation.classList.toggle('burger_active');
});



// Scroll-up
const offset = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength / height);

  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
}

window.addEventListener('scroll', () => {
  updateDashoffset();

  if (getTop() > offset) {
    scrollUp.classList.add('scroll-up--active');
  } else {
    scrollUp.classList.remove('scroll-up--active');
  }
});

scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



