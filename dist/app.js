"use strict";
class ProductManager {
    constructor() {
        this.products = [];
        // Load products from LocalStorage
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            this.products = JSON.parse(storedProducts);
        }
        this.displayProducts(this.products);
    }
    addProduct(product) {
        this.products.push(product);
        this.updateLocalStorage();
        this.displayProducts(this.products);
    }
    searchProduct(searchTerm) {
        const filteredProducts = this.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        this.displayProducts(filteredProducts);
    }
    updateLocalStorage() {
        localStorage.setItem("products", JSON.stringify(this.products));
    }
    displayProducts(products) {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";
        products.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = `${product.name} - $${product.price} - ${product.type} - ${product.unit} - ${product.date} - Delivered by ${product.deliveredBy}`;
            productList.appendChild(li);
        });
    }
}
const productManager = new ProductManager();
document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const type = document.getElementById("type").value;
    const unit = document.getElementById("unit").value;
    const date = document.getElementById("date").value;
    const deliveredBy = document.getElementById("deliveredBy").value;
    const newProduct = { name, price, type, unit, date, deliveredBy };
    productManager.addProduct(newProduct);
    document.getElementById("productForm").reset();
});
document.getElementById("search").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    productManager.searchProduct(searchTerm);
});
