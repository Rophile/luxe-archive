// src/store/useWishlist.ts
import { create } from 'zustand';

export const useWishlist = create((set) => ({
  count: 0,
  // Fungsi untuk menambah angka wishlist
  inc: () => set((state: any) => ({ count: state.count + 1 })),
}));