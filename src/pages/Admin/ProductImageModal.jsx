const ProductImageModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IMAGE */}
          <div>
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-80 object-cover rounded"
              loading="lazy"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <p className="text-gray-600">{product.description}</p>

            <div className="text-sm">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.category?.name}
              </p>
              <p>
                <span className="font-medium">Price:</span> ₦{product.price}
              </p>
              <p>
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {product.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <p className="text-xs text-gray-400">
              Created on{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageModal;