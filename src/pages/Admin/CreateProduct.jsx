import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../api/category.api";
import { createProduct, getProduct, updateProduct } from "../../api/product.api";

const CreateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const res = await getCategories();
                setCategories(res || []);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchProduct = async () => {
            if (isEditMode) {
                try {
                    const res = await getProduct(id);
                    const product = res.data;
                    setForm({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        category: product.category._id || product.category,
                    });
                } catch (err) {
                    console.error("Failed to fetch product for editing:", err);
                    alert("Failed to load product data.");
                }
            }
        };

        fetchCategories();
        fetchProduct();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", Number(form.price));
            formData.append("stock", Number(form.stock));
            formData.append("category", form.category);

            if (images.length > 0) {
                images.forEach((img) => {
                    formData.append("images", img);
                });
            }

            if (isEditMode) {
                await updateProduct(id, formData);
            } else {
                await createProduct(formData);
            }
            navigate("/admin/all-products");
        } catch (err) {
            console.error(err);
            alert(`Failed to ${isEditMode ? 'update' : 'create'} product`);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
      setImages(Array.from(e.target.files));
    }

    return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-6">{isEditMode ? "Edit Product" : "Create Product"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Product name.. min of 2 texts"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description.. min of 5 texts"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock quantity"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Product" : "Create Product")}
        </button>
      </form>
    </div>
    )
}

export default CreateProduct;