import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import ProductCard from "./products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      {products.length === 0 && <p>No products found</p>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
        <ProductCard key={product._id} product={product}/>
      ))}
      </div>
      
    </div>
  )
};

export default Home;