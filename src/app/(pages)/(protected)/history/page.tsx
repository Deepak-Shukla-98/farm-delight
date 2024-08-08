"use client";
import { getOrderHistory } from "@/components/services/axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [orders, setOrders] = useState<any>([]);
  const getData = async () => {
    let data = await getOrderHistory({});
    if (!!data) setOrders(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="py-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-manrope font-bold text-3xl lead-10 text-black mb-9">
          Order History
        </h2>

        {/* <div className="flex sm:flex-col lg:flex-row sm:items-center justify-end">
          <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
            <li className="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
              All Order
            </li>
            <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
              Summary
            </li>
            <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
              Completed
            </li>
            <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
              Cancelled
            </li>
          </ul>
          <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
            <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
              <svg
                className="relative "
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                  stroke="#111827"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                name="from-dt"
                id="from-dt"
                className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                placeholder="11-01-2023"
              />
            </div>
            <p className="font-medium text-lg leading-8 text-black">To</p>
            <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
              <svg
                className="relative "
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                  stroke="#111827"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                name="to-dt"
                id="to-dt"
                className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                placeholder="11-01-2023"
              />
            </div>
          </div>
        </div> */}
        {orders.map((d: any) => (
          <div className="mb-6 main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Order Id:{" "}
                  <span className="text-indigo-600 font-medium">#{d.id}</span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Order Payment :{" "}
                  <span className="text-gray-400 font-medium">
                    {" "}
                    {moment(d.createdAt).format("LL")}
                  </span>
                </p>
              </div>
              <Link
                href={"/products"}
                className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
              >
                Order Again
              </Link>
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              {d.orderItems.map((f: any) => (
                <div className="w-full px-3 min-[400px]:px-6">
                  <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                    <div className="img-box max-lg:w-full">
                      <img
                        src={f.photo}
                        alt="Premium Watch image"
                        className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                      />
                    </div>
                    <div className="flex flex-row items-center w-full ">
                      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                        <div className="flex items-center">
                          <div className="">
                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                              {f.name}
                            </h2>
                            <div className="flex items-center ">
                              <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                Size:{" "}
                                <span className="text-gray-500">100 ml</span>
                              </p>
                              <p className="font-medium text-base leading-7 text-black ">
                                Qty:{" "}
                                <span className="text-gray-500">
                                  {f.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Price
                              </p>
                              <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                ${f.price}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Status
                              </p>
                              <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                {d.status}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                Expected Delivery Time
                              </p>
                              <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                {moment(f.createdAt)
                                  .add(9, "days")
                                  .format("LL")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200"></div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price:{" "}
                <span className="text-indigo-600"> ${d.total}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
