import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../api/productsAPI.js";

function ProductForm() {

  // para actualizar la interfaz cuando se haya a;adido un producto nuevo
  const queryClient = useQueryClient()

  // configurar la mutacion | crear funcion para enviar datos al backend
  const addProductMutation = useMutation({
    // llamar a la funcion para guardar datos
    mutationFn: createProduct,
    // ejecutar funcion cuando sea exitoso
    onSuccess: () => {
      console.log("Product added!");
      // invalidar datos por el nombre de querykey en products.jsx
      queryClient.invalidateQueries('products')
    },
  });

  // usar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <button>Add product</button>
    </form>
  );
}

export default ProductForm;
