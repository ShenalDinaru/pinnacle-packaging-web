/* =========================================
   EMAILJS CONFIGURATION
========================================= */

/*
    Replace these three values with your
    EmailJS details.

    1. PUBLIC KEY
    2. SERVICE ID
    3. TEMPLATE ID
*/


const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";

const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";


/* Initialize EmailJS */

emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const submitButton =
    document.getElementById("submitButton");

const formStatus =
    document.getElementById("formStatus");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Disable button */

    submitButton.disabled = true;

    submitButton.innerHTML =
        "SENDING...";


    formStatus.className = "";

    formStatus.textContent = "";


    /*
        Send form through EmailJS
    */

    emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
    )

    .then(function () {

        /* Success */

        formStatus.className = "success";

        formStatus.textContent =
            "Your message has been sent successfully. Our team will get back to you shortly.";


        contactForm.reset();


        submitButton.disabled = false;

        submitButton.innerHTML =
            'SEND MESSAGE <span>↗</span>';

    })

    .catch(function (error) {

        console.error(
            "EmailJS Error:",
            error
        );


        formStatus.className = "error";

        formStatus.textContent =
            "Something went wrong while sending your message. Please try again or contact us directly.";


        submitButton.disabled = false;

        submitButton.innerHTML =
            'SEND MESSAGE <span>↗</span>';

    });

});