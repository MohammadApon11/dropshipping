import React, { useEffect, useState } from "react";
import SectionWraper from "../Components/Wrapper's/SectionWraper";
import { baseURL } from "../Utils";
import axios from "axios";
import Swal from "sweetalert2";

export default function OrderPage() {
  const [orders, setOrders] = useState([]); // State to hold the list of orders
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const [refundStatus, setRefundStatus] = useState(null); // State for refund feedback

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/orders`); // Fetch all orders
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders(); // Fetch orders when the component mounts
  }, []); // Runs once when the component mounts

  const handleRefund = async (trxID) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/bkash/payment/refund/${trxID}`
      ); // Refund request
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Refund successful!",
          icon: "success",
        });
        setRefundStatus("Refund successful!");
        // Set success message
      } else {
        setRefundStatus("Refund failed."); // Set failure message
      }
    } catch (error) {
      setRefundStatus(`Error during refund: ${error.message}`); // Set error message
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading while fetching orders
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if fetching fails
  }

  return (
    <div>
      <SectionWraper>
        <h1 className="my-5 text-3xl text-center underline text-gray-600">
          Manage Orders
        </h1>
        {refundStatus && <p>{refundStatus}</p>} {/* Display refund status */}
        <div className="text-gray-600 overflow-auto">
          <ul className="grid grid-cols-6 lg:gap-20 sm:gap-3 py-3 bg-gray-200 px-5 rounded-tl-md rounded-tr-md">
            <li>Sl</li>
            <li>Date</li>
            <li>trxID</li>
            <li>Status</li>
            <li>Total</li>
            <li>Action</li>
          </ul>

          {orders.map((order, index) => (
            <ul
              key={order._id}
              className="grid grid-cols-6 lg:gap-20 sm:gap-3 py-5 bg-gray-100 px-5 rounded-bl-md rounded-br-md border-b"
            >
              <li>{index + 1}</li>
              <li>{order.date}</li>
              <li>{order.trxID}</li>
              <li className={`py-1 text-sm px-3 mx-auto rounded-lg`}>
                <button className="text-green-500 font-bold">Paid</button>
              </li>
              <li>${order.amount}</li>
              <li>
                <button
                  className="btn btn-sm bg-header hover:bg-header text-white"
                  onClick={() => handleRefund(order.trxID)} // Trigger refund on click
                >
                  Refund
                </button>
              </li>
            </ul>
          ))}
        </div>
      </SectionWraper>
    </div>
  );
}
