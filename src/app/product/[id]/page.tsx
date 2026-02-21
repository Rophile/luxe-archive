"use client"; // Wajib karena ada interaksi tombol
import { useWishlist } from "@/store/useWishlist";
import { ArrowLeft, Heart, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = use(getProduct(resolvedParams.id));
  
  // Ambil fungsi 'inc' dari Zustand
  const { inc } = useWishlist() as any;
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return <div className="p-20 text-center">Produk tidak ditemukan.</div>;

  const handleWishlist = () => {
    inc(); // Menambah angka di Navbar
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000); // Efek animasi tombol
  };

  return (
    <div className="min-h-screen p-6 md:p-16 flex justify-center items-center bg-[#F5F5DC]">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#D2B4DE]">
        
        {/* Sisi Kiri: Gambar */}
        <div className="md:w-1/2 p-12 bg-[#EADDCA]/20 flex items-center justify-center relative">
          <img src={product.image} alt={product.title} className="max-h-[350px] object-contain mix-blend-multiply" />
          <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center text-[#A569BD] font-medium tracking-tight">
              <ArrowLeft size={20} className="mr-2" /> Back
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Detail */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <span className="bg-[#A569BD] text-white text-[10px] px-3 py-1 rounded-full w-fit mb-4 font-bold uppercase tracking-widest">
            SSR Rendered
          </span>
          <h1 className="text-3xl font-serif text-[#4A3B4F] mb-4">{product.title}</h1>
          <p className="text-gray-500 mb-8 italic text-sm">"{product.description}"</p>

          <div className="flex items-center justify-between">
            <span className="text-4xl font-light text-[#4A3B4F]">${product.price}</span>
            
            {/* TOMBOL LOVE YANG SEKARANG BISA DIKLIK */}
            <button 
              onClick={handleWishlist}
              className={`p-4 rounded-2xl transition-all duration-300 transform ${
                isAdded ? "bg-[#A569BD] scale-110" : "bg-[#4A3B4F] hover:bg-[#A569BD]"
              } text-white`}
            >
              <Heart size={20} fill={isAdded ? "white" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}