import { addToCart } from "../../api/cart.api";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { updateCartCount } = useCart();

  const imageUrl =
    product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images[0].url || product.images[0]
      : product.image;

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      await updateCartCount();
      // maybe show a toast notification
    } catch (err) {
      console.error(err);
      // maybe show an error toast
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      {/* Image */}
      <div className="aspect-square bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>

        <p className="text-sm font-semibold mt-1">
          ₦{Number(product.price).toLocaleString()}
        </p>

        <button
          onClick={handleAddToCart}
          className="
            mt-3
            w-full
            bg-black
            text-white
            text-sm
            py-2
            rounded-md
            active:scale-95
            transition
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;