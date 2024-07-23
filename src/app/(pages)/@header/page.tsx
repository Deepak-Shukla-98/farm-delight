import Link from "next/link";
import React, { useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { TiUser } from "react-icons/ti";

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

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
              <a className="nav-link fw-medium" href="/products">
                Shop
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link fw-medium" href="/about">
                About
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link fw-medium" href="/contact">
                Contact{" "}
              </a>
            </li>
            <li className="nav-item px-1">
              <a className="nav-link fw-medium" href="/cart">
                <IoCartSharp
                  size={25}
                  color="grey"
                  className="mx-2 cursor-pointer"
                />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="/signin">
                <TiUser size={25} color="grey" className="cursor-pointer" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
