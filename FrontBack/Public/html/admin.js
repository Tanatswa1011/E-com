document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const errorMessage = document.getElementById("error-msg");

  productForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(productForm);

      try {
          const response = await fetch("http://localhost:5000/products/new", { // Update endpoint URL
              method: "POST",
              body: formData,
          });

          if (!response.ok) {
              throw new Error("Failed to add product.");
          }

          alert("Product added successfully!");
          productForm.reset();
          errorMessage.textContent = "";
      } catch (error) {
          errorMessage.textContent = error.message;
      }
  });
});

