import { useEffect, useState } from "react";
import { getPublicProducts } from "../../api/product.api";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getPublicProducts({
        page,
        limit: 10,
        search,
        category,
        minPrice,
        maxPrice,
        sort,
      });

      setProducts(res.product || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchProducts();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 md:text-3xl">Products</h1>

      {/* FILTERS */}
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 md:grid-cols-5">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2"
        />

        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded p-2"
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded p-2"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="oldest">Oldest</option>
        </select>

        <button
          onClick={handleApplyFilters}
          className="bg-black text-white rounded px-4"
        >
          Apply
        </button>
      </div>

      {products.length === 0 && 
      <div>
        <p>No products found</p>
        <p className="font-extralight text-sm">Check your internet connection and try again</p>
      </div>
      
      }

      {/* PRODUCT GRID */}
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

      {/* PAGINATION */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
