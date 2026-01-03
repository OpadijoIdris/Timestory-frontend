import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../../api/category.api";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Categories
      </h2>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4
                       flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{cat.name}</p>
              <p className="text-sm text-gray-500">{cat.description}</p>
            </div>

            <button
              onClick={() => handleDelete(cat._id)}
              className="rounded-lg bg-red-100 px-4 py-2 text-sm
                         text-red-600 hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;