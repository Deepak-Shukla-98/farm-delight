"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useSharedContext } from "@/components/context/sharedContext";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { getProducts } from "@/components/services/axios";

export default function Products() {
  const params = useParams();
  const [data, setData] = useState({
    id: null,
    name: null,
    price: null,
    photo: "",
    quantity: 0,
    status: null,
  });
  const [in_cart, set_in_cart] = useState(false);

  const {
    state: { products_in_cart, allproducts },
    dispatch,
  } = useSharedContext();
  useEffect(() => {
    let { id } = params;
    let arr = products_in_cart.filter((f: any) => f.id === id);
    if (arr.length) {
      set_in_cart(true);
      setData(arr?.[0]);
    } else {
      set_in_cart(false);
      const [data] = allproducts.filter((f: any) => f.id === id);
      setData({ ...data, quantity: 0 });
    }
  }, [products_in_cart.length, allproducts]);

  const handleDispatch = (data: any) => {
    let arr = products_in_cart.filter((f: any) => f.id !== data.id);
    let product = products_in_cart.filter((f: any) => f.id === data.id);
    if (product.length) {
      dispatch({
        type: "UPDATE_CART",
        payload: [...arr, { ...product[0], quantity: product[0].quantity + 1 }],
      });
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...arr,
          { ...product[0], quantity: product[0].quantity + 1 },
        ])
      );
      setData((o) => ({ ...o, quantity: o.quantity + 1 }));
    } else {
      dispatch({
        type: "UPDATE_CART",
        payload: [...products_in_cart, { ...data, quantity: 1 }],
      });
      localStorage.setItem("cart", JSON.stringify([...products_in_cart, data]));
    }
    toast("Added to Cart", {
      icon: "😃",
    });
  };
  const incQuantity = (id: any) => {
    if (in_cart) {
      setData((o) => ({ ...o, quantity: o.quantity + 1 }));
      let arr = products_in_cart.map((product: any) =>
        product.id === id
          ? {
              ...product,
              quantity: !!product.quantity ? product.quantity + 1 : 0 + 1,
            }
          : product
      );
      dispatch({
        type: "UPDATE_CART",
        payload: arr,
      });
      toast("Added to Cart", {
        icon: "😃",
      });
      localStorage.setItem("cart", JSON.stringify(arr));
    } else {
      handleDispatch(data);
    }
  };
  const decQuantity = (id: any) => {
    if (!in_cart) {
      return;
    }
    setData((o) => ({ ...o, quantity: o.quantity - 1 }));
    let arr = products_in_cart
      .map((product: any) => {
        if (product.id === id) {
          if (!!product.quantity && product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return null;
          }
        } else {
          return product;
        }
      })
      .filter(Boolean);
    dispatch({
      type: "UPDATE_CART",
      payload: arr,
    });
    toast("Removed", {
      icon: "💔",
    });
    localStorage.setItem("cart", JSON.stringify(arr));
  };
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-2xl bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={data.photo}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4 mt-5">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {data.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt.
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 mx-1">
                    ${data.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 mx-1">
                    {data.status ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="counter-input" className="sr-only">
                  Choose quantity:
                </label>
                <div className="flex items-center justify-between md:order-3 ">
                  <div className="flex items-center">
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="counter-input"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      onClick={() => decQuantity(data.id)}
                    >
                      <svg
                        className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="counter-input"
                      data-input-counter
                      className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                      placeholder=""
                      value={data.quantity}
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="counter-input"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      onClick={() => incQuantity(data.id)}
                    >
                      <svg
                        className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() => handleDispatch(data)}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 text-center dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    <Link href={"/cart"}>Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
