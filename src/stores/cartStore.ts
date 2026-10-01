import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';
import { Product } from '@services/productApi';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    changeQuantity: (productId: number, delta: number) => void;
    clearCart: () => void;
    getTotalQuantity: () => number;
    getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product) => {
                set((state) => {
                    const existing = state.items.find((i) => i.product.id === product.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { product, quantity: 1 }] };
                });
            },
            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.product.id !== productId),
                }));
            },
            changeQuantity: (productId, delta) => {
                set((state) => ({
                    items: state.items
                        .map((i) => {
                            if (i.product.id === productId) {
                                const newQty = i.quantity + delta;
                                return newQty > 0 ? { ...i, quantity: newQty } : null;
                            }
                            return i;
                        })
                        .filter(Boolean) as CartItem[],
                }));
            },
            clearCart: () => set({ items: [] }),
            getTotalQuantity: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
            getTotalAmount: () => {
                return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            },
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);