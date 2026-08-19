/* js */

"use strict";


/* GLOBAL VARIABLES*/

let products = [];

let currentProducts = [];

let currentProduct = null;


/* DOM ELEMENTS */

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const noResults =
    document.getElementById("noResults");

const resetFilters =
    document.getElementById("resetFilters");

const filterButtons =
    document.querySelectorAll(".filter");

const productModal =
    document.getElementById("productModal");

const closeModalButton =
    document.getElementById("closeModal");

const modalImage =
    document.getElementById("modalImage");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalApplications =
    document.getElementById("modalApplications");

const modalFeatures =
    document.getElementById("modalFeatures");

const modalInquiry =
    document.getElementById("modalInquiry");

const topButton =
    document.getElementById("topButton");

const header =
    document.querySelector(".productsHeader");

const heroBackground =
    document.querySelector(".productsHeroBackground");


/* BACKGROUND SLIDER */

const backgroundImages = [

    "../Assets/Backgrounds/bg2.jpg",

    "../Assets/Backgrounds/bg3.jpg",

    "../Assets/Backgrounds/bg4.jpg",

    "../Assets/Backgrounds/bg5.jpg"

];

let backgroundIndex = 0;


function changeBackground() {

    if (!heroBackground) return;

    heroBackground.style.opacity = "0";

    setTimeout(() => {

        heroBackground.style.backgroundImage =
            `url("${backgroundImages[backgroundIndex]}")`;

        heroBackground.style.opacity = "1";

        backgroundIndex =
            (backgroundIndex + 1) %
            backgroundImages.length;

    }, 600);

}


changeBackground();

setInterval(changeBackground, 5500);


/* LOAD PRODUCT JSON */

async function loadProducts() {

    try {

        const response =
            await fetch("products.json");


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        products =
            await response.json();


        currentProducts =
            [...products];


        displayProducts(currentProducts);

    }

    catch (error) {

        console.error(
            "Unable to load products.json:",
            error
        );


        productGrid.innerHTML = `

            <div class="noResults">

                <h3>
                    Product Catalogue Unavailable
                </h3>

                <p>
                    Please check that products.json is in
                    the same folder as products.html.
                </p>

            </div>

        `;

    }

}


/* CREATE PRODUCT CARD */

function createProductCard(product, index) {

    const card =
        document.createElement("article");


    card.className =
        "productCard";


    const features =
        Array.isArray(product.features)
            ? product.features.slice(0, 3)
            : [];


    const tags =
        Array.isArray(product.tags)
            ? product.tags
            : [];


    card.innerHTML = `

        <div class="productImage">

            <span class="productBadge">

                ${escapeHTML(product.category)}

            </span>


            <img
                src="${escapeAttribute(product.image)}"
                alt="${escapeAttribute(product.name)}"
                loading="lazy"
                onerror="this.style.display='none';"
            >

        </div>


        <div class="productContent">

            <span class="productCategory">

                ${escapeHTML(product.category)}

            </span>


            <h3>

                ${escapeHTML(product.name)}

            </h3>


            <p>

                ${escapeHTML(product.shortDescription)}

            </p>


            <ul class="productFeatures">

                ${features.map(feature => `

                    <li>

                        ${escapeHTML(feature)}

                    </li>

                `).join("")}

            </ul>


            <div class="productTags">

                ${tags.map(tag => `

                    <span>

                        ${escapeHTML(tag)}

                    </span>

                `).join("")}

            </div>


            <div class="productFooter">

                <button
                    class="viewButton"
                    type="button">

                    VIEW DETAILS

                </button>


                <button
                    class="inquiryButton"
                    type="button">

                    INQUIRY

                </button>

            </div>

        </div>

    `;


    const viewButton =
        card.querySelector(".viewButton");


    const inquiryButton =
        card.querySelector(".inquiryButton");


    /* VIEW DETAILS BUTTON*/

    viewButton.addEventListener(

        "click",

        () => openProductModal(product)

    );


    /* INQUIRY BUTTON */

    inquiryButton.addEventListener(

        "click",

        () => openInquiry(product.name)

    );


    setTimeout(() => {

        card.classList.add("visible");

    }, index * 70);


    return card;

}


/* DISPLAY PRODUCTS */

function displayProducts(productArray) {

    productGrid.innerHTML = "";


    currentProducts =
        [...productArray];


    if (productArray.length === 0) {

        noResults.hidden = false;

        return;

    }


    noResults.hidden = true;


    productArray.forEach(

        (product, index) => {

            const card =
                createProductCard(
                    product,
                    index
                );


            productGrid.appendChild(card);

        }

    );

}


/* SEARCH */

function searchProducts() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    updateClearButton();


    const activeFilter =
        document.querySelector(
            ".filter.active"
        );


    const selectedCategory =
        activeFilter
            ? activeFilter.dataset.filter
            : "all";


    const filtered =
        products.filter(product => {

            const matchesCategory =
                selectedCategory === "all" ||
                product.filter === selectedCategory;


            if (!query) {

                return matchesCategory;

            }


            const searchableText = [

                product.name,

                product.category,

                product.shortDescription,

                product.description,

                ...(product.applications || []),

                ...(product.features || []),

                ...(product.tags || [])

            ]

            .join(" ")

            .toLowerCase();


            return (

                matchesCategory &&

                searchableText.includes(query)

            );

        });


    displayProducts(filtered);

}


searchInput.addEventListener(

    "input",

    searchProducts

);


/* CLEAR SEARCH */

function updateClearButton() {

    if (searchInput.value.trim()) {

        clearSearch.classList.add(
            "visible"
        );

    }

    else {

        clearSearch.classList.remove(
            "visible"
        );

    }

}


clearSearch.addEventListener(

    "click",

    () => {

        searchInput.value = "";

        searchProducts();

        searchInput.focus();

    }

);


/* CATEGORY FILTER */

filterButtons.forEach(button => {

    button.addEventListener(

        "click",

        () => {

            filterButtons.forEach(

                item =>
                    item.classList.remove(
                        "active"
                    )

            );


            button.classList.add(
                "active"
            );


            searchProducts();

        }

    );

});


/* RESET FILTERS */

resetFilters.addEventListener(

    "click",

    () => {

        searchInput.value = "";


        filterButtons.forEach(

            button =>
                button.classList.remove(
                    "active"
                )

        );


        document

            .querySelector(
                '[data-filter="all"]'
            )

            .classList.add(
                "active"
            );


        searchProducts();

    }

);


/* RODUCT MODAL */

function openProductModal(product) {

    currentProduct =
        product;


    modalImage.src =
        product.image;


    modalImage.alt =
        product.name;


    modalCategory.textContent =
        product.category;


    modalTitle.textContent =
        product.name;


    modalDescription.textContent =
        product.description;


    modalApplications.innerHTML = "";


    (product.applications || [])

        .forEach(application => {

            const li =
                document.createElement("li");


            li.textContent =
                application;


            modalApplications.appendChild(li);

        });


    modalFeatures.innerHTML = "";


    (product.features || [])

        .forEach(feature => {

            const li =
                document.createElement("li");


            li.textContent =
                feature;


            modalFeatures.appendChild(li);

        });


    productModal.classList.add(
        "active"
    );


    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* CLOSE MODAL */

function closeProductModal() {

    productModal.classList.remove(
        "active"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    currentProduct =
        null;

}


closeModalButton.addEventListener(

    "click",

    closeProductModal

);


productModal.addEventListener(

    "click",

    event => {

        if (
            event.target ===
            productModal
        ) {

            closeProductModal();

        }

    }

);


document.addEventListener(

    "keydown",

    event => {

        if (

            event.key === "Escape" &&

            productModal.classList.contains(
                "active"
            )

        ) {

            closeProductModal();

        }

    }

);


/* EMAIL INQUIRY */

function openInquiry(productName) {

    const recipient =
        "jude.pppl@gmail.com";


    const subject =
        `Product Inquiry - ${productName}`;


    const body = `Dear Pinnacle Packaging,

I am interested in the following product:

Product: ${productName}

I found this product through your website.

Please provide me with further information regarding pricing, specifications, availability, and minimum order quantities.

Thank you.

Best regards,
[Your Name]
[Company Name]
[Contact Number]

From Web`;


    const mailtoLink =

        `mailto:${recipient}` +

        `?subject=${encodeURIComponent(subject)}` +

        `&body=${encodeURIComponent(body)}`;


    /* Opens the user's default email application /It does NOT force Gmail or Chrome.*/

    window.location.href =
        mailtoLink;

}


/* MODAL INQUIRY BUTTON*/

modalInquiry.addEventListener(

    "click",

    () => {

        if (currentProduct) {

            openInquiry(
                currentProduct.name
            );

        }

    }

);


/* HEADER SCROLL EFFECT*/

window.addEventListener(

    "scroll",

    () => {

        if (window.scrollY > 80) {

            header.classList.add(
                "scrolled"
            );

        }

        else {

            header.classList.remove(
                "scrolled"
            );

        }


        if (window.scrollY > 500) {

            topButton.classList.add(
                "show"
            );

        }

        else {

            topButton.classList.remove(
                "show"
            );

        }

    }

);


/* BACK TO TOP */

topButton.addEventListener(

    "click",

    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

);


/* SMOOTH ANCHOR SCROLL */

document

    .querySelectorAll(
        'a[href^="#"]'
    )

    .forEach(anchor => {

        anchor.addEventListener(

            "click",

            function(event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        );

    });


/* SECURITY / HTML ESCAPING*/

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


/* INITIALIZE */

loadProducts();