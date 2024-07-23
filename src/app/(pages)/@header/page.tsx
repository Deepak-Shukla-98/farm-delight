import { useSharedContext } from "@/components/context/sharedContext";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { TiUser } from "react-icons/ti";

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const {
    state: { products_in_cart },
  } = useSharedContext();
  return (
    <nav
      className="top-0 w-full py-3 bg-light opacity-85"
      style={{ backgroundColor: "#FAFBFD" }}
    >
      <div className="container mx-auto flex items-center justify-between">
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
          className="navbar-toggler collapsed"
          type="button"
          aria-expanded={isToggleOpen}
          onClick={() => setIsToggleOpen(!isToggleOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${
            isToggleOpen ? "block" : "hidden"
          } navbar-collapse border-lg-0 mt-4 mt-lg-0 lg:flex lg:items-center`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex space-x-4">
            <li className="nav-item px-2">
              <a
                className="nav-link fw-medium active"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link fw-medium" href="/products">
                Shop
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link fw-medium" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link fw-medium" href="/contact">
                Contact{" "}
              </Link>
            </li>
            <li className="nav-item px-1">
              <Link className="nav-link fw-medium relative" href="/cart">
                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center gap-1 rounded-full bg-emerald-500 px-1.5 text-sm text-white">
                  {products_in_cart.length}
                  <span className="sr-only"> new emails</span>
                </span>
                <IoCartSharp
                  size={25}
                  color="grey"
                  className="mx-2 cursor-pointer"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" href="/signin">
                <TiUser size={25} color="grey" className="cursor-pointer" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
