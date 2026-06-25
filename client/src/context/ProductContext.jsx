import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { localProducts } from "../data/products";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within ProductProvider");
  return context;
};

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Fetch products — tries API first, falls back to local data
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];
        if (productList.length > 0) {
          setAllProducts(productList);
          setProducts(productList);
          setLoading(false);
          return;
        }
      }
      throw new Error("No products from API");
    } catch {
      // Fallback to local data
      const local = Array.isArray(localProducts) ? localProducts : [];
      setAllProducts(local);
      setProducts(local);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name?.localeCompare(b.name));
        break;
      default:
        break;
    }

    setProducts(filtered);
  }, [allProducts, searchQuery, selectedCategory, sortBy, priceRange]);

  const getProductById = useCallback(
    (id) =>
      allProducts.find((p) => p._id === id || p.id === id || String(p._id) === String(id)),
    [allProducts]
  );

  const getProductsByCategory = useCallback(
    (category) => {
      if (!category || category === "all") return allProducts;
      return allProducts.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    },
    [allProducts]
  );

  const getCategories = useCallback(() => {
    const cats = allProducts
      .map((p) => p.category)
      .filter(Boolean);
    return ["all", ...new Set(cats)];
  }, [allProducts]);

  const getFeaturedProducts = useCallback(
    (limit = 8) =>
      allProducts
        .filter((p) => p.isFeatured || p.rating >= 4)
        .slice(0, limit),
    [allProducts]
  );

  const getNewArrivals = useCallback(
    (limit = 8) =>
      [...allProducts]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        )
        .slice(0, limit),
    [allProducts]
  );

  const getBestSellers = useCallback(
    (limit = 8) =>
      [...allProducts]
        .sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0))
        .slice(0, limit),
    [allProducts]
  );

  const addProduct = (product) => {
    setAllProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id, updatedData) => {
    setAllProducts((prev) =>
      prev.map((p) =>
        p._id === id || p.id === id ? { ...p, ...updatedData } : p
      )
    );
  };

  const deleteProduct = (id) => {
    setAllProducts((prev) =>
      prev.filter((p) => p._id !== id && p.id !== id)
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    setPriceRange([0, 10000]);
  };

  const value = {
    products,
    allProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    fetchProducts,
    getProductById,
    getProductsByCategory,
    getCategories,
    getFeaturedProducts,
    getNewArrivals,
    getBestSellers,
    addProduct,
    updateProduct,
    deleteProduct,
    resetFilters,
    totalProducts: allProducts.length,
    filteredCount: products.length,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;