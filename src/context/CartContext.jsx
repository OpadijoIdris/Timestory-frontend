import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchCartCount, getCart } from "../api/cart.api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const { user } = useAuth();

    const fetchCart = useCallback(async () => {
        if (user) {
            try {
                const cartData = await getCart();
                if (cartData && cartData.data) {
                    setCart(cartData.data);
                    setCartCount(cartData.data.totalItems);
                } else {
                    setCart(null);
                    setCartCount(0);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error.message || error);
                setCart(null);
                setCartCount(0);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const updateCartCount = async () => {
        if (user) {
            const count = await fetchCartCount();
            setCartCount(count);
        }
    };

    return (
        <CartContext.Provider value={{ cart, cartCount, updateCartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
