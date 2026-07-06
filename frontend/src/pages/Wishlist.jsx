import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowLeft, Package } from "lucide-react";
import SEO from "../components/SEO";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <SEO title="My Wishlist" description="View and manage your saved STEM kits" path="/wishlist" />
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8 font-medium">
          <ArrowLeft size={15} /> Back to Shop
        </Link>

        <h1 className="text-3xl font-extrabold text-[#0b2545] mb-8 flex items-center gap-3">
          <Heart size={28} className="text-red-500 fill-red-500" />
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto">
            <Heart size={48} className="text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0b2545]">Your wishlist is empty!</h2>
            <p className="text-sm text-slate-500 mt-2">Browse our catalog and save your favorite kits for later.</p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-[#0b2545] hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold mt-6 transition"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const price = item.price || (item.category === "Advanced" ? 5499 : item.category === "Intermediate" ? 3999 : 2499);
              return (
                <div
                  key={item._id}
                  className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-50 relative border border-slate-100">
                      <img
                        src={item.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"}
                        alt={item.name || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Delete button */}
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="absolute top-2.5 right-2.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 p-2 rounded-xl transition border border-slate-100 shadow-sm"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Level Badge */}
                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2.5 inline-block">
                      {item.category || item.level}
                    </span>

                    {/* Title */}
                    <Link to={`/products/${item._id}`} className="block">
                      <h3 className="font-bold text-slate-900 leading-snug hover:text-cyan-600 transition-colors mb-2 line-clamp-1">
                        {item.name || item.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                      {item.description || item.desc}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                    <span className="text-base font-bold text-[#0b2545]">₹{price}</span>
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="bg-cyan-50 hover:bg-cyan-600 text-cyan-600 hover:text-white px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs font-bold border border-cyan-100 hover:border-cyan-600 shadow-sm"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
