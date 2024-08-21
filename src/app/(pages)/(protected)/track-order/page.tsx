"use client";
import { getOrdersById, updateAdminOrders } from "@/components/services/axios";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [orders, setOrders] = useState<any>({ orderItems: [] });
  const getData = async () => {
    let [data] = await getOrdersById({ id });
    if (!!data) setOrders(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const total = orders.orderItems.reduce(
    (a: any, s: any) => a + s?.price * s.quantity,
    0
  );
  const handleCancel = async () => {
    let { orderItems, ...rest } = orders;
    await updateAdminOrders({ ...rest, status: "RETURNED" });
    getData();
  };
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Track the delivery of order #{orders.id.substring(0, 9)}
        </h2>

        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
          <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
            {orders.orderItems.map((d: any) => (
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-6">
                  <a href="#" className="h-14 w-14 shrink-0">
                    <img
                      className="h-full w-full dark:hidden"
                      src={d.photo}
                      alt="imac image"
                    />
                  </a>
                  <a
                    href="#"
                    className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    {d.name}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Product ID:
                    </span>{" "}
                    {d.productId.substring(0, 9)}
                  </p>

                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900 dark:text-white">
                      x{d.quantity}
                    </p>

                    <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                      ₹{d.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">
                    Original price
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    ₹{total}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    -₹0.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">
                    Store Pickup
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    ₹99
                  </dd>
                </dl>

                {/* <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                  ₹99
                  </dd>
                </dl> */}
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{orders.total}
                </dd>
              </dl>
            </div>
          </div>

          <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order history
              </h3>

              <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
                    Estimated delivery by{" "}
                    {moment(orders.createdAt).add(9, "days").format("LL")}
                  </h4>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Products delivered
                  </p>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
                    Today
                  </h4>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Products being delivered
                  </p>
                </li>

                <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                    <svg
                      className="h-4 w-4"
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
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 font-semibold">
                    {moment(orders.createdAt).add(7, "days").format("LLL")}
                  </h4>
                  <p className="text-sm">Products in the courier's warehouse</p>
                </li>

                <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                    <svg
                      className="h-4 w-4"
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
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 text-base font-semibold">
                    {moment(orders.createdAt).add(5, "days").format("LLL")}
                  </h4>
                  <p className="text-sm">
                    Products delivered to the courier - DHL Express
                  </p>
                </li>

                <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                    <svg
                      className="h-4 w-4"
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
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 font-semibold">
                    {moment(orders.createdAt).format("LLL")}
                  </h4>
                  <p className="text-sm">Payment accepted</p>
                </li>

                <li className="ms-6 text-primary-700 dark:text-primary-500">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                    <svg
                      className="h-4 w-4"
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
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <div>
                    <h4 className="mb-0.5 font-semibold">
                      {moment(orders.createdAt).format("LLL")}
                    </h4>
                    <a href="#" className="text-sm font-medium hover:underline">
                      Order placed - Receipt #{orders.id.substring(0, 9)}
                    </a>
                  </div>
                </li>
              </ol>

              <div className="gap-4 sm:flex sm:items-center">
                {orders.status !== "RETURNED" && (
                  <button
                    type="button"
                    className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    onClick={handleCancel}
                  >
                    Cancel the order
                  </button>
                )}

                <Link
                  href={`/order-placed?id=${orders.id}`}
                  className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                >
                  Order details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
