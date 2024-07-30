"use client";
import { useSharedContext } from "@/components/context/sharedContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoCartSharp } from "react-icons/io5";
import { TiUser } from "react-icons/ti";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  useEffect(() => {
    setIsToggleOpen(
      typeof window !== "undefined" ? window.innerWidth < 992 : false
    );
  }, []);
  const {
    state: { products_in_cart, isAuthenticated },
    dispatch,
  } = useSharedContext();
  const Logout = () => {
    dispatch({
      type: "SET_AUTH_STATE",
      payload: false,
    });
    dispatch({
      type: "SET_LOGIN_USER",
      payload: {},
    });
    localStorage.clear();
    router.push("/signin");
  };

  return (
    <nav
      className="top-0 w-full py-3 bg-light opacity-85"
      style={{ backgroundColor: "#FAFBFD" }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <a className="flex items-center" href="/">
          <img
            className="inline-block align-top"
            src="assets/img/gallery/logo-icon.png"
            alt=""
            width="50"
          />
          <span className="text-theme font-monospace text-2xl pl-2">
            Farm Delight
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsToggleOpen(!isToggleOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isToggleOpen ? "hidden" : ""
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/products"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                href="/contact"
              >
                Contact{" "}
              </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
              <Link href="/cart">
                <span className="relative">
                  <IoCartSharp
                    size={25}
                    color="grey"
                    className="cursor-pointer"
                  />
                  <span className="absolute left-5 -top-2 inline-flex items-center justify-center gap-1 rounded-full bg-emerald-500 px-1.5 text-sm text-white">
                    {products_in_cart.reduce(
                      (a: any, s: any) => a + (!!s.quantity ? s.quantity : 1),
                      0
                    )}
                    <span className="sr-only"> new emails</span>
                  </span>
                </span>
              </Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <TiUser size={25} color="grey" className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link className="nav-link fw-medium" href="/history">
                        History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={Logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/signin" className="mx-2">
                  <TiUser size={25} color="grey" className="cursor-pointer" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
