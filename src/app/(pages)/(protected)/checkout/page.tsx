"use client";
import React, { useState } from "react";
import { useSharedContext } from "@/components/context/sharedContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import OrderForm from "@/components/uicomponents/addressform";
import { placeOrders, verifyPayment } from "@/components/services/axios";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}
function Page() {
  const router = useRouter();
  const [store, setStore] = useState({
    freight_charge: 0,
    etd: null,
    courier_company_id: null,
    courier_name: null,
  });
  const {
    state: { products_in_cart },
    dispatch,
  } = useSharedContext();
  let sum = products_in_cart.reduce(
    (a: any, s: any) => a + s.price * s.quantity,
    0
  );
  let discount =
    products_in_cart.reduce((a: any, s: any) => a + s.quantity, 0) * 0;
  let total = sum + store.freight_charge - discount;

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (data: any) => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    let obj = {
      user: { ...data, ...store },
      total: total,
      orders: [
        {
          status: "PENDING",
          items: products_in_cart,
        },
      ],
    };
    try {
      let res = await verifyPayment(total);
      if (res) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Replace with your Razorpay Key ID
          amount: res.amount, // Amount in currency subunits
          currency: "INR",
          name: "Farm Delight",
          description: "Order Payment",
          image: "https://example.com/your_logo",
          order_id: res.orderId, // Order ID returned from the server
          handler: async function (response: any) {
            try {
              // Verify the payment on the server
              let reponse = await placeOrders({ response, ...obj });
              toast.success("Payment Successful!");
              router.push(`/order-placed?id=${reponse.id}`);
              localStorage.setItem("cart", JSON.stringify([]));
              dispatch({
                type: "UPDATE_CART",
                payload: [],
              });
            } catch (error) {
              toast.error("Payment verification failed!");
              console.error("Payment Verification Error:", error); // Debug: Check verification error
            }
          },
          prefill: {
            name: obj.user.first_name + " " + obj.user.last_name,
            email: obj.user.email,
            contact: obj.user.phone,
          },
          notes: {
            address: obj.user.address,
          },
          theme: {
            color: "#3399cc",
          },
        };
        if (window.Razorpay) {
          const paymentObject = new window.Razorpay(options);
          paymentObject.on("payment.failed", function (response: any) {
            toast.error("Payment Failed!");
            console.error("Payment Failure Response:", response.error); // Debug: Check payment failure
          });
          paymentObject.open();
        } else {
          toast.error("Razorpay script not loaded.");
        }
      }
    } catch (error) {
      console.error("Place Orders Error:", error); // Debug: Check place orders error
    }
  };

  function handleDataUpdate(data: any) {
    setStore(data);
  }
  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400 text-sm mb-5">
            Check your items. And select a suitable shipping method.
          </p>
          {products_in_cart.length ? (
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {products_in_cart.map((d: any) => (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={d.photo}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{d.name}</span>
                    <span className="float-right text-gray-400">
                      Quantity: {d.quantity}
                    </span>
                    <p className="text-lg font-bold">₹{d.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container mx-auto mt-8">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-white shadow-md rounded-lg">
                    <div className="p-6 text-center">
                      <img
                        src="https://i.imgur.com/dCdflKN.png"
                        className="w-32 h-32 mx-auto mb-4"
                        alt="Empty Cart"
                      />
                      <h3 className="text-xl font-bold">Your Cart is Empty</h3>
                      <h4 className="text-lg text-gray-600">
                        Add something to make me happy :)
                      </h4>
                      <div className="py-6 lg:px-24 text-center">
                        <Link
                          href="/products"
                          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {products_in_cart.length ? (
            <div className="mx-4 ">
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">₹{sum}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Discount</p>
                  <p className="font-semibold text-gray-900">₹{discount}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">
                    ₹{store.freight_charge}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">₹{total}</p>
              </div>
            </div>
          ) : null}
        </div>
        <OrderForm handleSubmit={handleSubmit} setStore={handleDataUpdate} />
      </div>
    </>
  );
}

export default Page;
