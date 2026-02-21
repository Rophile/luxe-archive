"use client"; 
import { useWishlist } from "@/store/useWishlist";
import { Heart, User } from "lucide-react"; // Tambah ikon User biar manis
import Link from "next/link";
import { memo } from "react"; // 1. Import memo

// 2. Bungkus fungsi dengan memo
const Navbar = memo(function Navbar() {
  const { count } = useWishlist() as any;

  return (
    <nav className="p-5 bg-white border-b border-[#D2B4DE] flex justify-between items-center sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        
        {/* Logo & Nama Pembuat */}
        <div className="flex flex-col">
          <Link href="/" className="font-bold text-[#4A3B4F] text-xl tracking-tighter leading-none">
            LUXE ARCHIVE
          </Link>
          <span className="text-[10px] text-[#A569BD] font-medium tracking-widest uppercase mt-1">
            Created by Syaila Fa Agna
          </span>
        </div>
        
        {/* Wishlist Counter */}
        <div className="flex items-center gap-2 bg-[#F5F5DC] px-4 py-2 rounded-full border border-[#D2B4DE] shadow-sm">
          <Heart 
            size={18} 
            className="text-[#A569BD] transition-all duration-300" 
            fill={count > 0 ? "#A569BD" : "none"} 
          />
          <span className="text-sm font-medium text-[#4A3B4F]">{count} Items</span>
        </div>

      </div>
    </nav>
  );
});

export default Navbar;