"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSharedContext } from "@/components/context/sharedContext";
import { toast } from "react-hot-toast";
import { getProducts } from "@/components/services/axios";
interface Product {
  id: number;
  name: string;
  price: number;
  photo: string;
  status: boolean;
  quantity?: number;
}
const suggestions = [
  {
    id: 1,
    name: "Tangy Oragne",
    price: 250,
    photo: "photo-1646753522408-077ef9839300",
    quantity: 1,
    status: true,
  },
  {
    id: 5,
    name: "Riot Energy",
    price: 399,
    photo: "photo-1649261191624-ca9f79ca3fc6",
    quantity: 1,
    status: true,
  },
  {
    id: 6,
    name: "Riot Red",
    price: 399,
    photo: "photo-1649261191606-cb2496e97eee",
    quantity: 1,
    status: true,
  },
];
function Cart() {
  const [suggestions, setSuggestions] = useState<any>([]);
  const {
    state: { products_in_cart },
    dispatch,
  } = useSharedContext();
  const getData = async () => {
    let data = await getProducts({});
    setSuggestions(data.splice(-3));
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDispatch = (id: number) => {
    let arr = products_in_cart.filter((f: any) => f.id !== id);
    dispatch({
      type: "UPDATE_CART",
      payload: arr,
    });
    toast("Removed", {
      icon: "💔",
    });
    localStorage.setItem("cart", JSON.stringify(arr));
  };
  const incQuantity = (id: number) => {
    let arr = products_in_cart.map((product: Product) =>
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
  };
  const decQuantity = (id: number) => {
    let arr = products_in_cart
      .map((product: Product) => {
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
  const handleAdd = (data: any) => {
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
    } else {
      dispatch({
        type: "UPDATE_CART",
        payload: [...products_in_cart, data],
      });
      localStorage.setItem("cart", JSON.stringify([...products_in_cart, data]));
    }
    toast("Added to Cart", {
      icon: "😃",
    });
  };
  let sum = products_in_cart.reduce(
    (a: any, s: any) => a + s.price * s.quantity,
    0
  );
  let discount =
    products_in_cart.reduce((a: any, s: any) => a + s.quantity, 0) * 0;
  let total = sum;
  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {products_in_cart.length ? (
              <div className="space-y-6">
                {products_in_cart.map((d: any) => (
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link
                        href={`/products/${d.id}`}
                        className="shrink-0 md:order-1"
                      >
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={d.photo}
                          alt="imac image"
                        />
                      </Link>

                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            onClick={() => decQuantity(d.id)}
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
                            value={d.quantity}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            onClick={() => incQuantity(d.id)}
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
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ₹{d.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {d.name}
                        </a>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                              />
                            </svg>
                            Add to Favorites
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => handleDispatch(d.id)}
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="container mx-auto mt-24">
                  <div className="flex justify-center">
                    <div className="w-full max-w-md">
                      <div className="bg-white shadow-md rounded-lg">
                        <div className="p-6 text-center">
                          <img
                            src="https://i.imgur.com/dCdflKN.png"
                            className="w-32 h-32 mx-auto mb-4"
                            alt="Empty Cart"
                          />
                          <h3 className="text-xl font-bold">
                            Your Cart is Empty
                          </h3>
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
              </div>
            )}
            <div className="hidden xl:mt-8 xl:block">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                People also bought
              </h3>
              <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                {suggestions.map((d: any) => (
                  <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <Link
                      href={{
                        pathname: `/products/${d.id}`,
                        query: { product: JSON.stringify(d) },
                      }}
                      className="overflow-hidden rounded"
                    >
                      <img
                        className="mx-auto h-44 w-44 dark:hidden"
                        src={d.photo}
                        alt="imac image"
                      />
                    </Link>
                    <div>
                      <Link
                        href={{
                          pathname: `/products/${d.id}`,
                          query: { product: JSON.stringify(d) },
                        }}
                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        {d.name}
                      </Link>
                      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through"> ₹{d.price + 100} </span>
                      </p>
                      <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        ₹{d.price}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2.5">
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={() => handleAdd(d)}
                      >
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{sum}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -₹{discount}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{0.0}
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ₹{total}
                  </dd>
                </dl>
              </div>
              <Link
                href={products_in_cart.length ? "/checkout" : "/products"}
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Checkout
              </Link>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {" "}
                  or{" "}
                </span>
                <Link
                  href="/products"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Do you have a voucher or gift card?{" "}
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Apply Code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
