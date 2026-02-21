// src/components/Navbar.tsx
"use client"; 
import { useWishlist } from "@/store/useWishlist";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { count } = useWishlist() as any;

  return (
    <nav className="p-5 bg-white border-b border-[#D2B4DE] flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="font-bold text-[#4A3B4F] text-xl tracking-tighter">
        LUXE ARCHIVE
      </Link>
      <div className="flex items-center gap-2 bg-[#F5F5DC] px-4 py-2 rounded-full border border-[#D2B4DE]">
        <Heart size={18} className="text-[#A569BD]" fill={count > 0 ? "#A569BD" : "none"} />
        <span className="text-sm font-medium text-[#4A3B4F]">{count} Items</span>
      </div>
    </nav>
  );
}