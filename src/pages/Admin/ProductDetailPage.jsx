import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../api/product.api";

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await getProduct(id);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (!product) return <p>Product not found.</p>;

    const imageUrl = product.images?.[0] || product.image;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Link to={`/admin/products/edit/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit Product
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">Description</h2>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Price</h2>
                        <p className="text-gray-700">₦{product.price.toLocaleString()}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Stock</h2>
                        <p className="text-gray-700">{product.stock} units available</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Date Created</h2>
                        <p className="text-gray-700">{new Date(product.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
