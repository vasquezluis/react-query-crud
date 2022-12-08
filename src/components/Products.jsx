import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProducts, deleteProduct, updateProduct } from "../api/productsAPI";

function Products() {
  // ejecutar hook de react-query
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    // nombrar la peticion | traer datos
    queryKey: ["products"],
    // funcion de peticion
    queryFn: getProducts,
    // seleccionar datos y modificarlos
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const queryClient = useQueryClient();

  // mutacion para eliminar datos
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  // mutacion para actualizar check
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => {
          deleteProductMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <input
        type="checkbox"
        id={product.id}
        checked={product.inStock}
        onChange={(e) =>
          updateProductMutation.mutate({
            ...product,
            inStock: e.target.checked,
          })
        }
      />
      <label htmlFor={product.id}>In Stock </label>
    </div>
  ));
}

export default Products;
