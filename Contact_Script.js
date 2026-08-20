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


const EMAILJS_PUBLIC_KEY = "Hs9YXZBD2kT4ExQEq";

const EMAILJS_SERVICE_ID = "service_v1uqlwi";

const EMAILJS_TEMPLATE_ID = "template_bw46axg";

const isEmailJsConfigured =
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "service_vzgo8y6" &&
    EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";


/* Initialize EmailJS */

if (typeof emailjs !== "undefined" && isEmailJsConfigured) {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const submitButton =
    document.getElementById("submitButton");

const formStatus =
    document.getElementById("formStatus");

if (!contactForm) {
    console.error("Contact form not found on this page.");
} else if (!isEmailJsConfigured) {
    console.warn("EmailJS is not configured. Add your public key, service ID, and template ID.");

    if (formStatus) {
        formStatus.className = "error";
        formStatus.textContent =
            "The form is not configured yet. Please add your EmailJS credentials before sending messages.";
    }

    if (submitButton) {
        submitButton.disabled = true;
    }
} else {
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
}
