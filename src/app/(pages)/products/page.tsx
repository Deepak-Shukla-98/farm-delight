"use client";
import { useSharedContext } from "@/components/context/sharedContext";
import { getProducts } from "@/components/services/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  photo: string;
  status: boolean;
  quantity?: number;
}
export default function Shop() {
  const [products, setProducts] = useState<any>([]);
  const {
    state: { products_in_cart, allproducts },
    dispatch,
  } = useSharedContext();
  const getData = async () => {
    let data = await getProducts({});
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: data,
    });
    setProducts(data);
  };
  useEffect(() => {
    if (!!allproducts.length) {
      setProducts(allproducts);
    } else {
      getData();
    }
  }, []);
  const handleDispatch = (data: Product) => {
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
  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
    >
      {products.map((d: any) => (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <Link href={`/products/${d.id}`}>
            <img
              src={d.photo}
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
          </Link>
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {d.name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${d.price}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  ${d.price + 100}
                </p>
              </del>
              <div
                className="ml-auto cursor-pointer"
                onClick={() => handleDispatch(d)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
