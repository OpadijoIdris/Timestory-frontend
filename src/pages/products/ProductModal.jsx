const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center overflow-y-auto py-10 px-4">
      <div className="bg-white max-w-lg w-full rounded-lg overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Image */}
        <div className="aspect-square bg-gray-100 max-h-[60vh]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 overflow-y-auto">
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <p className="text-lg font-bold">
            ₦{Number(product.price).toLocaleString()}
          </p>

          <p className="text-sm text-gray-500">
            Category: {product.category?.name || "Uncategorized"}
          </p>

          <p className="text-gray-700 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
