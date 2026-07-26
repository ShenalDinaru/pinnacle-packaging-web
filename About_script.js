/*==================================================
            ABOUT PAGE JAVASCRIPT
==================================================*/

/*========================================
        BACKGROUND IMAGE SLIDER
========================================*/

const background = document.querySelector(".background");

const images = [
    "../Assets/Backgrounds/bg2.jpg",
    "../Assets/Backgrounds/bg3.jpg",
    "../Assets/Backgrounds/bg6.jpg",
    "../Assets/Backgrounds/bg8.jpg"
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


/*========================================
        SCROLL REVEAL ANIMATION
========================================*/

const revealElements = document.querySelectorAll(

    ".companySection, \
     .timelineSection, \
     .missionSection, \
     .whySection, \
     .qualitySection, \
     .aboutStats, \
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


/*========================================
        ACTIVE NAVIGATION LINK
========================================*/

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {

    if (link.href === window.location.href) {

        link.style.color = "#148C86";
        link.style.fontWeight = "700";

    }

});


/*========================================
        STAT COUNTER ANIMATION
========================================*/

const counters = document.querySelectorAll(".aboutStats h2");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.innerText;

            const number = parseInt(text);

            if (isNaN(number)) return;

            let current = 0;

            const increment = Math.ceil(number / 70);

            const timer = setInterval(() => {

                current += increment;

                if (current >= number) {

                    current = number;

                    clearInterval(timer);

                }

                if (text.includes("+")) {

                    counter.innerText = current + "+";

                }

                else if (text.includes("%")) {

                    counter.innerText = current + "%";

                }

                else {

                    counter.innerText = current;

                }

            }, 20);

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: 0.5
    }

);

counters.forEach((counter) => {

    counterObserver.observe(counter);

});


/*========================================
        BUTTON HOVER EFFECT
========================================*/

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


/*========================================
        PAGE LOADED
========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

document.body.style.opacity = "0";
document.body.style.transition = "opacity .7s ease";