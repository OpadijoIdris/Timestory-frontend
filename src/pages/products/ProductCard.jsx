import { addToCart } from "../../api/cart.api";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const ProductCard = ({ product, onPreview }) => {
    const [quantity, setQuantity] = useState(1);
  const { updateCartCount } = useCart();

  const imageUrl =
    product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images[0].url || product.images[0]
      : product.image;

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      await updateCartCount();
      setQuantity(1);
      // maybe show a toast notification
    } catch (err) {
        alert(err.response?.data?.message || "Failed to add to cart")
      // maybe show an error toast
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
      {/* Image */}
      <div className="aspect-square bg-gray-100 cursor-pointer">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            onClick={onPreview}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-medium line-clamp-2 mb-2">{product.name}</h3>

        <p className="text-lg font-semibold mt-1">
          ₦{Number(product.price).toLocaleString()}
        </p>

        <p
        className={`text-sm mt-1 ${
          product.stock > 0 ? "text-green-600" : "text-red-500"
        }`}
      >
        {product.stock > 0
          ? `${product.stock} in stock`
          : "Out of stock"}
      </p>

      {/* Spacer to push button to the bottom */}
      <div className="flex-grow" />

      {/* Quantity Selector */}
      {product.stock > 0 && (
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="border h-8 w-8 rounded flex items-center justify-center text-lg"
          >
            −
          </button>

          <span className="text-lg">{quantity}</span>

          <button
            onClick={() =>
              setQuantity(q => Math.min(product.stock, q + 1))
            }
            className="border h-8 w-8 rounded flex items-center justify-center text-lg"
          >
            +
          </button>
        </div>
      )}

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="
            mt-4
            w-full
            bg-black
            text-white
            text-sm
            py-2.5
            rounded-md
            active:scale-95
            transition
            disabled:bg-gray-400
            disabled:cursor-not-allowed
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;