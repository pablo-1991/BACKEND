const socket = io();


const createProductForm = document.getElementById("createProductForm");
const category = document.getElementById("category");
const title = document.getElementById("title");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const cardContainer = document.getElementById("cardContainer");


createProductForm.onsubmit = (e) => {
    const product = {
        category: category.value,
        title: title.value,
        price: price.value,
        image: thumbnail.value,
        code: code.value,
        stock: stock.value,
    };
};

socket.on("sendProduct", (prod) => {
    const card = `<div class="flex justify-center w-40 h-40">
        <div class="rounded-lg shadow-lg bg-white">
        <img class="rounded-t-lg h-28 w-40" src=${prod.thumbnail} alt="" />
        <div class="flex justify-between p-2">
            <h5
            class="text-gray-900 text-md font-medium mb-2"
            >${prod.title}</h5>
            <p class="text-gray-700 text-base mb-4">$ ${prod.price}</p>
        </div>
        </div>
    </div>`;
    cardContainer.innerHTML += card;
});