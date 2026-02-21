import { ArrowLeft, Heart, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

// BARIS SAKTI: Ini yang membuat halaman ini menjadi SSR (Server-Side Rendering)
export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { 
    cache: 'no-store' // Memastikan data tidak disimpan di cache (ciri khas SSR)
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return <div className="p-20 text-center">Produk tidak ditemukan.</div>;

  return (
    <div className="min-h-screen p-6 md:p-16 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#D2B4DE]">
        
        {/* Sisi Kiri: Gambar */}
        <div className="md:w-1/2 p-12 bg-[#EADDCA]/20 flex items-center justify-center relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[350px] object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center text-[#A569BD] hover:gap-2 transition-all font-medium">
              <ArrowLeft size={20} className="mr-2" /> Back to Collection
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Detail */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#A569BD] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
              SSR Rendered
            </span>
            <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /></div>
            <span className="text-xs text-gray-400">{product.rating.rate} / 5</span>
          </div>

          <h1 className="text-3xl font-serif text-[#4A3B4F] mb-4 leading-tight">{product.title}</h1>
          
          <p className="text-gray-500 mb-8 leading-relaxed italic text-sm">
            "{product.description}"
          </p>

          <div className="flex items-center justify-between mb-8">
            <span className="text-4xl font-light text-[#4A3B4F] tracking-tighter">${product.price}</span>
            <button className="bg-[#4A3B4F] text-white p-4 rounded-2xl hover:bg-[#A569BD] transition-all group">
              <Heart size={20} className="group-hover:fill-white" />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6 flex items-center gap-3 text-[#A569BD]">
            <ShieldCheck size={18} />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">
              Authentic Archive Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}