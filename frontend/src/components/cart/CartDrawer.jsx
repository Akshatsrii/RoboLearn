import { useCart } from "../../context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#061B33]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-100">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-cyan-600" />
              <h2 className="text-lg font-bold text-[#0b2545]">Shopping Cart ({cartCount})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                <ShoppingBag size={48} className="text-slate-200 mb-4" />
                <p className="text-base font-semibold">Your cart is empty</p>
                <p className="text-sm mt-1 max-w-[200px] mx-auto">Explore our high-quality STEM kits to get started.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-[#0b2545] hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 border border-slate-100 rounded-xl hover:border-cyan-100 transition-colors"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80"}
                      alt={item.name || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name || item.title}</h4>
                      <p className="text-xs text-slate-400 capitalize mt-0.5">{item.category || item.level}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-500 hover:text-[#0b2545] hover:bg-slate-50 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-500 hover:text-[#0b2545] hover:bg-slate-50 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900">₹{(item.price || 0) * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-slate-500 font-medium">Subtotal</span>
                <span className="text-lg font-bold text-[#0b2545]">₹{cartTotal}</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal mb-5">
                Shipping and taxes calculated at checkout. Educational discount codes can be applied in next step.
              </p>
              <div className="space-y-2.5">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-[#0b2545] hover:bg-cyan-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-500 hover:text-[#0b2545] transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
