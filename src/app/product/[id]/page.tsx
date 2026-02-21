import { ArrowLeft, Heart, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Memastikan SSR
export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Cek jika response tidak oke
    if (!res.ok) return null;
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Gunakan Promise<{ id: string }> untuk Next.js versi terbaru
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params-nya dulu (Wajib di Next.js 15+)
  const resolvedParams = await params;
  
  // 2. Ambil data produk
  const product = await getProduct(resolvedParams.id);

  // 3. Jika produk tidak ada atau API error, tampilkan pesan ramah
  if (!product || !product.title) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5DC] p-10">
        <h2 className="text-2xl font-serif text-[#4A3B4F] mb-4">Gagal memuat detail produk</h2>
        <p className="text-gray-500 mb-6 text-center italic">Coba refresh halaman atau periksa koneksi internet kamu.</p>
        <Link href="/" className="bg-[#A569BD] text-white px-6 py-2 rounded-full hover:bg-[#4A3B4F] transition-all">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-16 flex justify-center items-center bg-[#F5F5DC]">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#D2B4DE]">
        
        {/* Sisi Kiri: Gambar */}
        <div className="md:w-1/2 p-12 bg-[#EADDCA]/20 flex items-center justify-center relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[350px] object-contain mix-blend-multiply" 
          />
          <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center text-[#A569BD] hover:gap-2 transition-all font-medium">
              <ArrowLeft size={20} className="mr-2" /> Kembali
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Detail */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center text-[#4A3B4F]">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#A569BD] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
              SSR - Server Side
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">{product.title}</h1>
          <p className="text-gray-500 mb-8 italic text-sm leading-relaxed">"{product.description}"</p>

          <div className="flex items-center justify-between">
            <span className="text-4xl font-light">${product.price}</span>
            <button className="bg-[#4A3B4F] text-white p-4 rounded-2xl hover:bg-[#A569BD] transition-all">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}