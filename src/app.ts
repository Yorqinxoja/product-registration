interface Product {
    name: string;
    price: number;
    type: string;
    unit: string;
    date: string;
    deliveredBy: string;
  }
  
  class ProductManager {
    products: Product[] = [];
  
    constructor() {

      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
      }
  
      this.displayProducts(this.products);
    }
  
    addProduct(product: Product): void {
      this.products.push(product);
      this.updateLocalStorage();
      this.displayProducts(this.products);
    }
  
    searchProduct(searchTerm: string): void {
      const filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.displayProducts(filteredProducts);
    }
  
    updateLocalStorage(): void {
      localStorage.setItem("products", JSON.stringify(this.products));
    }
  
    displayProducts(products: Product[]): void {
      const productList = document.getElementById("productList")!;
      productList.innerHTML = "";
  
      products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price} - ${product.type} - ${product.unit} - ${product.date} - Delivered by ${product.deliveredBy}`;
        productList.appendChild(li);
      });
    }
  }
  
  const productManager = new ProductManager();
  
  document.getElementById("productForm")!.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
    const type = (document.getElementById("type") as HTMLInputElement).value;
    const unit = (document.getElementById("unit") as HTMLInputElement).value;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    const deliveredBy = (document.getElementById("deliveredBy") as HTMLInputElement).value;
  
    const newProduct: Product = { name, price, type, unit, date, deliveredBy };
    productManager.addProduct(newProduct);
  
    (document.getElementById("productForm") as HTMLFormElement).reset();
  });
  
  document.getElementById("search")!.addEventListener("input", (event) => {
    const searchTerm = (event.target as HTMLInputElement).value;
    productManager.searchProduct(searchTerm);
  });
  