import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchOrdersByUserId } from '../api/orderApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import { ArrowLeft } from 'lucide-react';

type Order = {
  id?: number;
  date: string;
  items: any[];
  total?: number;
  status?: string;
};

const getRandomStatus = () => {
  const statuses = ['Processing', 'Shipped', 'Delivered'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateOrderId = (id: number) => `ORD-${String(id).padStart(6, '0')}`;

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    if (user?.id) {
      fetchOrdersByUserId(user.id).then((res) => {
        const withStatus = res.map((order: Order, i: number) => ({
          ...order,
          status: getRandomStatus(),
          id: i + 1, // 仮に順番でIDつけてる（本番ならorder.id使用）
        }));
        setOrders(withStatus);
      });
    }
  }, [user]);

  const calculateTotal = (items: any[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sortedOrders = [...orders].sort((a, b) => {
    if (sort === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sort === 'highest') return (b.total ?? calculateTotal(b.items)) - (a.total ?? calculateTotal(a.items));
    return 0;
  });

  return (
    <>
      <Header />
      <div className="fixed inset-0 -z-10">
        <ParticlesBackground />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-orange-600 hover:underline hover:text-orange-700 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Order History</h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="highest">Sort: Highest Price</option>
          </select>
        </div>

        {sortedOrders.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-8">
            {sortedOrders.map((order, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b">
                  <div className="text-sm text-gray-700">
                    <div className="font-semibold">Order ID: {generateOrderId(order.id ?? i + 1)}</div>
                    <div>Date: {new Date(order.date).toLocaleString()}</div>
                    <div className="mt-1 text-xs text-blue-600 font-medium">Status: {order.status}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    Total: ${order.total?.toFixed(2) ?? calculateTotal(order.items).toFixed(2)}
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>

  );
};

export default OrderHistoryPage;
