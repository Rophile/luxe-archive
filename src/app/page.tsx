import Link from 'next/link';

// Fungsi untuk mengambil data dari API (Ini akan menjadi SSG secara default)
async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products?limit=8');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Header Elegan */}
      <div className="text-center mb-16 mt-10">
        <h1 className="text-5xl font-serif text-[#4A3B4F] mb-3">Luxe Archive</h1>
        <p className="text-[#A569BD] tracking-[0.3em] uppercase text-xs font-bold">Curated Selection • SSG Technique</p>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product: any) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="bg-white rounded-3xl p-6 border border-[#EADDCA] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-40 object-contain group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-[#4A3B4F] font-medium truncate mb-1">{product.title}</h3>
              <p className="text-[#A569BD] font-bold text-lg">${product.price}</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
                <span>View Details</span>
                <span className="bg-[#F5F5DC] px-2 py-1 rounded text-[#A569BD]">SSR →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}