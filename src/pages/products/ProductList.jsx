import { useEffect, useState } from "react";
import { getProducts } from "../../api/product.api";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try{
      setLoading(true);
      const res = await getProducts({page: 1, limit: 10});
      setProducts(res.data?.products|| []);
      setPagination(res.data?.pagination || null)

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if(loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 md:text-3xl">Products</h1>
      {products.length === 0 && <p>No products found</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onPreview={() => setSelectedProduct(product)}
          />
        ))}

      </div>
      
    </div>
  )
};

export default ProductList;