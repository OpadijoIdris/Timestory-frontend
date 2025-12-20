import { createContext, useState, useContext, useEffect } from "react";
import { fetchCartCount } from "../api/cart.api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        const getCartCount = async () => {
            if (user) {
                const count = await fetchCartCount();
                setCartCount(count);
            }
        };
        getCartCount();
    }, [user]);

    const updateCartCount = async () => {
        if (user) {
            const count = await fetchCartCount();
            setCartCount(count);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
