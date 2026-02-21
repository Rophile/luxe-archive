"use client";

import { useWishlist } from "@/store/useWishlist";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Ambil ID dari params
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // 2. Siapkan State untuk data produk dan loading
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  
  // 3. Ambil fungsi 'inc' dari Zustand
  const { inc } = useWishlist() as any;

  // 4. Ambil data produk (Client-side fetching agar sinkron dengan state)
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleWishlist = () => {
    inc(); // Fungsi penambah angka di Navbar
    setIsAdded(true);
    // Balikin warna tombol setelah 1 detik biar ada efek feedback
    setTimeout(() => setIsAdded(false), 1000);
  };

  if (loading) return <div className="p-20 text-center font-serif italic text-[#4A3B4F]">Preparing luxury details...</div>;
  if (!product) return <div className="p-20 text-center">Produk tidak ditemukan.</div>;

  return (
    <div className="min-h-screen p-6 md:p-16 flex justify-center items-center bg-[#F5F5DC]">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#D2B4DE]">
        
        {/* Sisi Kiri: Gambar */}
        <div className="md:w-1/2 p-12 bg-[#EADDCA]/20 flex items-center justify-center relative">
          <img src={product.image} alt={product.title} className="max-h-[350px] object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500" />
          <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center text-[#A569BD] font-medium tracking-tight hover:underline">
              <ArrowLeft size={20} className="mr-2" /> Back to Archive
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Detail */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-[#A569BD] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
              Luxe Item
            </span>
          </div>
          
          <h1 className="text-3xl font-serif text-[#4A3B4F] mb-4 leading-tight">{product.title}</h1>
          <p className="text-gray-500 mb-8 italic text-sm leading-relaxed">"{product.description}"</p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-4xl font-light text-[#4A3B4F]">${product.price}</span>
            
            {/* TOMBOL LOVE */}
            <button 
              onClick={handleWishlist}
              className={`p-5 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg ${
                isAdded ? "bg-[#A569BD] scale-110 shadow-[#A569BD]/50" : "bg-[#4A3B4F] hover:bg-[#A569BD]"
              } text-white`}
            >
              <Heart size={24} fill={isAdded ? "white" : "none"} />
              <span className="font-medium">{isAdded ? "Added!" : "Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}