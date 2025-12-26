const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    const imageUrl = product.images?.[0]?.url || product.image;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>
                <div className="space-y-4">
                    <img src={imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
                    <div>
                        <h3 className="font-semibold">Description</h3>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Date Created</h3>
                        <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
