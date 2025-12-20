"use strict"

const animItems = document.querySelectorAll('._anim-items');
// по сути метка, к классам которые будут анимированны

if (animItems.length >0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (var i = 0; i < animItems.length; i++) {
			const anItem = animItems[i];
			const anItemHeight = anItem.offsetHeight;	
// offsetHeight — свойство в JavaScript, которое 
// возвращает высоту элемента в пикселях, включая
//  вертикальные отступы и границы.
			const anItemOffset = offset(anItem).top;  
//.top; - присвоили только его значение
			const animStart = 3;
// коэфф-нт определит когда начнется анимация относительно
// высоты объекта
			let anItemPoint = window.innerHeight - anItemHeight / animStart;

		if (anItemHeight > window.innerHeight) {
			anItemPoint = window.innerHeight - window.innerHeight / animStart;
		}

if ((pageYOffset > anItemOffset - anItemPoint)&&(pageYOffset < (anItemOffset + anItemHeight))) {
	    anItem.classList.add('_active');
	    }
	    else { 
	    	// if ( (anItemOffset+anItemHeight) < pageYOffset)
	    	anItem.classList.remove('_active');
	  			 }
		}
	}

function offset(el) {  
    var rect = el.getBoundingClientRect(),  
    ScrollLeft = window.pageXOffset || document.documentElement.scrollLeft,  
    ScrollTop = window.pageYOffset || document.documentElement.scrollTop;  
    return {  
        top: rect.top + ScrollTop,  
        left: rect.left + ScrollLeft  
    }    
// Функция offset(el) на JavaScript возвращает координаты 
// элемента относительно документа. Функция сначала получает 
// координаты объекта на странице с помощью метода getBoundingClientRect(). 
// Затем к этим координатам прибавляет значение скроллинга. 
}  
animOnScroll();
}


const arrowL = document.querySelector(".arrow-left");

const arrowR = document.querySelector(".arrow-right");

const slides = document.getElementsByClassName("slider-item");

const circles = document.querySelectorAll(".pagin-circle");

let currentSlideInd = 0;

// slides[currentSlideInd].classList.add("slider-anim");

function showSlide() {
slides[currentSlideInd].classList.add("flex-it");
circles[currentSlideInd].classList.add("it-act");
}

showSlide();

function hideSlide() {
// slides[currentSlideInd].classList.add("slider-anim-l");
slides[currentSlideInd].classList.remove("flex-it");
circles[currentSlideInd].classList.remove("it-act");
}

let j;

function nextSlide() {
hideSlide();
currentSlideInd++;
if(currentSlideInd > slides.length - 1){
currentSlideInd = 0;
}
slides[currentSlideInd].classList.remove("slider-anim-r");
slides[currentSlideInd].classList.add("slider-anim-l");
showSlide();
}

function prevSlide() {
 hideSlide();
currentSlideInd--;
if(currentSlideInd < 0){
	currentSlideInd = slides.length - 1;
}
slides[currentSlideInd].classList.remove("slider-anim-l");
slides[currentSlideInd].classList.add("slider-anim-r");
showSlide();
}

arrowL.addEventListener('click', prevSlide);
arrowR.addEventListener('click', nextSlide);


function changeSlide(indexSlide) {
hideSlide();
currentSlideInd = indexSlide;
showSlide();
}

circles.forEach((circle, index) => {
	circle.addEventListener('click', () => changeSlide(index));
});    /*переключение при нажатии на кружок
forEach не работает для массива, 
полученного с помощью document.getElementsByClassName()
поэтому через - querySelectorAll*/

// blog-slider //

const itemSc = document.querySelector(".blog-slider-articles");

itemSc.addEventListener('mouseover', () => {  
document.body.style.overflow = 'hidden';  // Prevent scrolling on hover  
 // document.getElementsByTagName('html')[0].style.webkitScrollbarWidth = "100%";

});  
itemSc.addEventListener('mouseout', () => {  
document.body.style.overflow = 'auto';  // Allow scrolling again on mouseout  
}); 

itemSc.addEventListener("wheel", function (e) {
if (e.deltaY > 0) {itemSc.scrollLeft += 100; }
else {itemSc.scrollLeft -= 100;}
});
// гор. скролл Можно даже сократить: (event) => event.currentTarget.scrollLeft += event.deltaY
// или так <div class= "container" onWheel= "this.scrollLeft+=event.deltaY>0?100:-100" >

let scrLeftSL, widthPart; 
const blCircles = document.querySelectorAll(".blog-circle");
const widthSl = itemSc.scrollWidth;
const widthWin = itemSc.offsetWidth;
const gapSL = (widthWin*parseInt(getComputedStyle(itemSc).getPropertyValue('gap'))*0.01); 
var last_scroll = 0, dirScrL;
//.style.gap не сработал
// alert(gapSL);

itemSc.addEventListener('scroll', function (e) {
itemSc.getBoundingClientRect();

// scrLeftSL = itemSc.scrollLeft + (widthWin*parseInt(gapSL)*0.01);
 // alert(scrLeftSL);
widthPart = widthSl/blCircles.length;

  if(itemSc.scrollLeft > last_scroll){
    dirScrL=true;
  }else{
    dirScrL=false;
  } //направление скролла
  last_scroll = itemSc.scrollLeft;


for (var i = 0; i < blCircles.length; i++) {
		
	if (itemSc.scrollLeft> widthPart*(i)*0.8) {
	blCircles[i].classList.add("it-act");

	blCircles.forEach(function(elem, index) {
	 if(index!=i){
    elem.classList.remove("it-act");}
	});

		if ( (itemSc.scrollLeft-widthPart*(i)) < 800
		&&itemSc.scrollLeft-widthPart*(i)> 80
		&&i!=2&&dirScrL) {
		itemSc.scrollTo({ left: widthPart*(i+1)+gapSL*0.5, top:0, behavior:'smooth' });
		return false; }

		if ( itemSc.scrollLeft-widthPart*(i+1)>-800
		&&itemSc.scrollLeft-widthPart*(i+1)<-80
		&&i!=2&&!dirScrL) {
		itemSc.scrollTo({ left: widthPart*(i), top:0, behavior:'smooth' });
		return false; }
	}

}

});


document.addEventListener('DOMContentLoaded', function () {

const form = document.getElementById('con-form');
form.addEventListener('submit', formSend);

async function formSend(e) {
    e.preventDefault(); 
    let error = formValidate(form);

	let formData = new FormData(form);

    if (error === 0) {

    let response = await fetch('sendmail.php', {
		method: 'POST',		
		body: formData
	});
		
    if (response.ok) {
	let result = await response.json();
        console.log(result.message);

    } else {
        alert("Ошибка.");
        //formData.classList.remove('_sending');
    }
    } else {
        alert("Заполните обязательные поля.");
    }
		
		

// //formData.classList.remove('_sending');

// //formData.classList.remove('_sending');

 }

function formValidate(form) {
	let error = 0;
	let formReq = document.querySelectorAll('._req');
	  // ._req - обязательные поля

	for (var i = 0; i < formReq.length; i++) {
		const inputF = formReq[i];
		formRemoveError(inputF); // вначале проверки убираем error

	if(inputF.classList.contains('contact-input-email')){
		if (emailTest(inputF)) {
			formAddError(inputF);
			error++;
		}
	}else{ 
		if (inputF.value === '') {
			formAddError(inputF);
			error++;
		}
	}
	}
return error;
}

function formAddError(inputF){
inputF.parentElement.classList.add("_error");
inputF.classList.add("_error");
}
function formRemoveError(inputF){
inputF.parentElement.classList.remove("_error");
inputF.classList.remove("_error");
}
//тест email '!' - если не прошел, возв. true
 function emailTest(inputF) {
return !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputF.value);
}

});

// section about

/*const lastImgRow = 4;
 // document.querySelectorAll('.about-img');
const style = document.createElement('style');
style.textContent = `
 .about-img:nth-child(${lastImgRow}n) {
     margin-right: 0;
   }
`;
document.head.appendChild(style);
динамическое добавление стилей*/

const imgAbout = document.querySelectorAll('.about-img');
const myDialog = document.getElementById('myDialog');
const contentAb = document.querySelector('.dialog-full'); 
var bgImFull; 
const ImgAbFull = document.querySelector('.full-about');
const subAbout = document.querySelector('.sub-about');

const onFullImg = imgAbout.forEach((item, index) => { 
	item.addEventListener('click', ()=>{
	window.myDialog.showModal();


	// bgImFull = this.style.backgroundImage;
	bgImFull = getComputedStyle(item).getPropertyValue('background-image');
 ImgAbFull.style.content = bgImFull;

subAbout.innerHTML = `Photo №${index+1}`;

myDialog.addEventListener('click', (event) => {
  if ((event.target !== contentAb) && (!contentAb.contains(event.target))) {
     myDialog.close();  
  }
}); 

    });
});

// menu 

const butMenu = document.querySelector('.header-menu');
const menuList = document.querySelector('.header-list');
const span1 = document.querySelector('.span-1');
const span2 = document.querySelector('.span-2');
const span3 = document.querySelector('.span-3');

butMenu.addEventListener('click', (event) => {
 menuList.classList.toggle("header-list-anim");

span1.classList.toggle("span-1-anim");
span2.classList.toggle("span-2-anim");
span3.classList.toggle("span-3-anim");
}); 

const liMenu = document.querySelectorAll('.header-list li');
const sect1= document.getElementsByClassName('section_about')[0];
const sect2 = document.getElementsByClassName('section_best')[0];
const sect3 = document.getElementsByClassName('section-slider')[0];
const sect4 = document.getElementsByClassName('section-blog')[0];
const sect5 = document.getElementsByClassName('section-contact')[0];
const sect6 = document.getElementsByClassName('section-about')[0];




liMenu.forEach((item, index) => {
	item.addEventListener('click', () => {


switch (index) {
	case 0:
	sect1.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	break;
	case 1:
	sect2.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	break;
	case 2:
	sect3.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	break;
	case 3:
	sect4.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	break;
	case 4:
	sect5.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	break;
	case 5:
	sect6.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
	break;
	default:
		// statements_def
		break;
}



	});
}); 