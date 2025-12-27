import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/product.api";
import { Link } from "react-router-dom";

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search / Sort / Pagination
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // debounced search
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
        setSearch(searchInput);
        setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({
        search,
        sort,
        page,
        limit,
      });

      // 👇 IMPORTANT: match backend response
      setProducts(res.data?.products || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, sort, page]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          to="/admin/products/new"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Product
        </Link>
      </div>

      {/* SEARCH & SORT */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      {/* TABLE */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No image</span>
                    )}
                  </td>

                  <td className="py-2 px-4 border">{product.name}</td>

                  <td className="py-2 px-4 border">
                    ₦{product.price.toLocaleString()}
                  </td>

                  <td className="py-2 px-4 border">{product.stock}</td>

                  <td className="py-2 px-4 border">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="text-blue-500 mr-3"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductTable;
