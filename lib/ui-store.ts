"use client";

import { create } from "zustand";

type UIState = {
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  mobileMenuOpen: false,
  openSearch: () => set({ searchOpen: true, mobileMenuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  openMobileMenu: () => set({ mobileMenuOpen: true, searchOpen: false }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));
