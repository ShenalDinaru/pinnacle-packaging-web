
/*BACKGROUND IMAGE SLIDER*/

const background = document.querySelector(".background");

const images = [
    "Assets/Backgrounds/bg2.jpg",
    "Assets/Backgrounds/bg3.jpg",
    "Assets/Backgrounds/bg6.jpg",
    "Assets/Backgrounds/bg8.jpg"
];

let current = 0;
const transitionTime = 5500;

function changeBackground() {

    if (!background) return;

    background.style.opacity = "0";

    setTimeout(() => {

        background.style.backgroundImage = `url(${images[current]})`;

        background.style.opacity = "1";

        current++;

        if (current >= images.length) {
            current = 0;
        }

    }, 700);

}

changeBackground();

setInterval(changeBackground, transitionTime);


/*SCROLL REVEAL ANIMATION*/

const revealElements = document.querySelectorAll(

    ".companySection, \
     .timelineSection, \
     .missionSection, \
     .whySection, \
     .qualitySection, \
     .ctaSection"

);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach((section) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(70px)";
    section.style.transition = "all .9s ease";

    observer.observe(section);

});


/*ACTIVE NAVIGATION LINK*/

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {

    if (link.href === window.location.href) {

        link.style.color = "#148C86";
        link.style.fontWeight = "700";

    }

});


/*BUTTON HOVER EFFECT*/


const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transition = ".3s";
        button.style.transform = "translateY(-4px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});


/*CERTIFICATE SLIDER*/

const sliderTrack = document.querySelector(".sliderTrack");
const slides = document.querySelectorAll(".certSlide");
const prevButton = document.querySelector(".sliderArrow.prev");
const nextButton = document.querySelector(".sliderArrow.next");

if (sliderTrack && slides.length > 0) {

    let currentSlide = 0;

    function showSlide(index) {

        currentSlide = (index + slides.length) % slides.length;
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    }

    prevButton?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

}


/*PAGE LOADED*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

document.body.style.opacity = "0";
document.body.style.transition = "opacity .7s ease";