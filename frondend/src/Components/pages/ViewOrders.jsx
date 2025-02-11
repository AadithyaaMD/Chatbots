import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Calendar, Package, ArrowLeft } from "lucide-react";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const userId = auth.currentUser.uid;
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate() // Convert Firestore timestamp to JS date
        }));

        setOrders(ordersList);
        setFilteredOrders(ordersList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth, db]);

  // Filter orders by selected date range
  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    setFilteredOrders(filtered);
  }, [startDate, endDate, orders]);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate("/user")} 
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Profile
          </button>
          <h1 className="text-2xl font-bold">Your Orders</h1>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2 bg-zinc-800 p-3 rounded-md">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="bg-transparent text-white focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 p-3 rounded-md">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-400">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-gray-400">No orders found.</p>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="flex items-center bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <img src={order.image} alt={order.productName} className="w-16 h-16 object-cover rounded-md" />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">{order.productName}</h3>
                  <p className="text-gray-400">${order.price}</p>
                  <p className="text-xs text-gray-500">Ordered on {new Date(order.timestamp).toLocaleDateString()}</p>
                </div>
                <Package className="h-6 w-6 text-blue-400" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
