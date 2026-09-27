/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        darkMode ? "☀️" : "🌙";

    localStorage.setItem(
        "restaurantTheme",
        darkMode ? "dark" : "light"
    );

});


/* Load saved theme */

if (
    localStorage.getItem("restaurantTheme") === "dark"
) {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";

}


/* =========================
   MOBILE MENU
========================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const navMenu =
    document.getElementById("navMenu");


mobileMenu.addEventListener("click", () => {

    if (navMenu.style.display === "flex") {

        navMenu.style.display = "none";

    } else {

        navMenu.style.display = "flex";

        navMenu.style.position = "absolute";

        navMenu.style.top = "76px";

        navMenu.style.left = "0";

        navMenu.style.right = "0";

        navMenu.style.padding = "25px";

        navMenu.style.background =
            getComputedStyle(document.body)
                .getPropertyValue("--white");

        navMenu.style.flexDirection = "column";

    }

});


/* =========================
   MENU FILTER
========================= */

const categoryButtons =
    document.querySelectorAll(".category");

const menuCards =
    document.querySelectorAll(".menu-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
            button.dataset.category;

        menuCards.forEach(card => {

            const cardCategory =
                card.dataset.category;

            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================
   MENU SEARCH
========================= */

const searchInput =
    document.getElementById("menuSearch");


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();

    menuCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        if (name.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


/* =========================
   FAVORITES
========================= */

const favorites =
    document.querySelectorAll(".favorite");


favorites.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        button.textContent =
            button.classList.contains("liked")
                ? "♥"
                : "♡";

    });

});


/* =========================
   CART
========================= */

let cart = [];


const cartButton =
    document.getElementById("cartButton");

const closeCart =
    document.getElementById("closeCart");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


/* Open cart */

cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

});


/* Close cart */

function closeCartPanel() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* Add item */

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);

        const existing =
            cart.find(item =>
                item.name === name
            );


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name,
                price,
                quantity: 1
            });

        }


        updateCart();

        cartSidebar.classList.add("open");

        cartOverlay.classList.add("show");

    });

});


/* Update cart */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let quantityTotal = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p style="color:var(--muted)">
                Your cart is empty.
            </p>`;

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        quantityTotal += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <span>
                    ₹${item.price} × ${item.quantity}
                </span>

            </div>

            <div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    class="remove-item"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });


    cartCount.textContent =
        quantityTotal;

    cartTotal.textContent =
        total;

}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================
   CHECKOUT
========================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert(
        "Thank you! Your order has been received."
    );

    cart = [];

    updateCart();

    closeCartPanel();

});


/* =========================
   REVIEWS SLIDER
========================= */

const reviews = [

    {
        text:
            "Absolutely beautiful restaurant. The food, atmosphere and service were exceptional.",
        author:
            "— Ananya Sharma"
    },

    {
        text:
            "The Chef's Table experience was incredible. Every course was beautifully presented.",
        author:
            "— Rahul Mehta"
    },

    {
        text:
            "Perfect place for a family dinner. The desserts were absolutely amazing!",
        author:
            "— Kavya Rao"
    }

];


let currentReview = 0;


const reviewText =
    document.getElementById("reviewText");

const reviewAuthor =
    document.getElementById("reviewAuthor");


function showReview(index) {

    reviewText.textContent =
        `"${reviews[index].text}"`;

    reviewAuthor.textContent =
        reviews[index].author;

}


document
    .getElementById("nextReview")
    .addEventListener("click", () => {

        currentReview++;

        if (
            currentReview >= reviews.length
        ) {
            currentReview = 0;
        }

        showReview(currentReview);

    });


document
    .getElementById("prevReview")
    .addEventListener("click", () => {

        currentReview--;

        if (currentReview < 0) {
            currentReview =
                reviews.length - 1;
        }

        showReview(currentReview);

    });


/* =========================
   RESERVATION
========================= */

const reservationForm =
    document.getElementById("reservationForm");

const reservationMessage =
    document.getElementById(
        "reservationMessage"
    );


reservationForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "guestName"
            ).value;


        reservationMessage.textContent =
            `Thank you ${name}! Your table request has been received. We'll contact you shortly.`;


        reservationForm.reset();

    }
);


/* =========================
   DATE RESTRICTION
========================= */

const dateInput =
    document.getElementById(
        "reservationDate"
    );


const today =
    new Date().toISOString().split("T")[0];


dateInput.min = today;


/* =========================
   INITIAL CART
========================= */

updateCart();