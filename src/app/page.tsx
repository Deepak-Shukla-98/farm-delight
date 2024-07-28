"use client";
import "../../public/assets/css/theme.min.css";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { TiUser } from "react-icons/ti";

function Default() {
  const [isToggleOpen, setIsToggleOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 400 : false
  );
  return (
    <main className="main" id="top">
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3 bg-light opacity-85"
        data-navbar-on-scroll="data-navbar-on-scroll"
      >
        <div className="container px-0">
          <a className="navbar-brand m-0" href="/">
            <img
              className="d-inline-block align-top img-fluid"
              src="assets/img/gallery/logo-icon.png"
              alt=""
              width="50"
            />
            <span className="text-theme font-monospace fs-4 ps-2">
              Farm Delight
            </span>
          </a>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsToggleOpen(!isToggleOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${
              isToggleOpen ? "collapse" : ""
            } navbar-collapse border-top border-lg-0 mt-4 mt-lg-0`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            </ul>
            <div className="d-flex">
              <a href="/cart">
                <IoCartSharp
                  size={25}
                  color="grey"
                  className="mx-2 cursor-pointer"
                />
              </a>
              <a href="/signin">
                <TiUser size={25} color="grey" className="cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <section className="py-0" id="header">
        <div
          className="bg-holder d-none d-md-block"
          style={{
            backgroundImage: "url(assets/img/illustrations/hero-header.png)",
            backgroundPosition: "right top",
            backgroundSize: "contain",
          }}
        ></div>
        <div
          className="bg-holder d-md-none"
          style={{
            backgroundImage: "url(assets/img/illustrations/hero-bg.png)",
            backgroundPosition: "right top",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="container">
          <div className="row align-items-center min-vh-75 min-vh-lg-100">
            <div className="col-md-7 col-lg-6 col-xxl-5 py-6 text-sm-start text-center">
              <h1 className="mt-6 mb-sm-4 fw-semi-bold lh-sm ">
                Get Your Superfood Now
              </h1>
              <p className="mb-4 fs-1">
                Enjoy the nutritious benefits of makhana with our easy online
                ordering and subscription options.
              </p>
              <a className="btn btn-lg btn-success" href="#" role="button">
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5" id="Opportuanities">
        <div
          className="bg-holder d-none d-sm-block"
          style={{
            backgroundImage: "url(assets/img/illustrations/bg.png)",
            backgroundPosition: "top left",
            backgroundSize: "225px 755px",
            marginTop: "-17.5rem",
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto text-center mb-3">
              <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">
                Why Choose Farm Delight?
              </h5>
              <p className="mb-5">
                Farm Delight offers premium quality makhana, sourced from the
                finest lotus seeds and roasted to perfection. Our makhana is not
                only a delicious snack but also packed with nutrients like
                protein and minerals, making it a healthier choice for your
                snacking needs.
              </p>
            </div>
          </div>
          <div className="row flex-center h-100">
            <div className="col-xl-9">
              <div className="row">
                <div className="col-md-4 mb-5">
                  <div className="card h-100 shadow px-4 px-md-2 px-lg-3 card-span pt-6">
                    <div className="text-center text-md-start card-hover">
                      <img
                        className="ps-3 icons"
                        src="assets/img/icons/farmer.svg"
                        height="60"
                        alt=""
                      />
                      <div className="card-body">
                        <h6 className="fw-bold fs-1 heading-color">
                          Discover the Source of Makhana
                        </h6>
                        <p className="mt-3 mb-md-0 mb-lg-2">
                          Experience the purity straight from our dedicated
                          farmers. Our makhana is sustainably sourced, ensuring
                          you get the best, natural taste and nutrition.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <div className="card h-100 shadow px-4 px-md-2 px-lg-3 card-span pt-6">
                    <div className="text-center text-md-start card-hover">
                      <img
                        className="ps-3 icons"
                        src="assets/img/icons/growth.svg"
                        height="60"
                        alt=""
                      />
                      <div className="card-body">
                        <h6 className="fw-bold fs-1 heading-color">
                          Nutrient-Rich Superfood
                        </h6>
                        <p className="mt-3 mb-md-0 mb-lg-2">
                          Rich in protein, fiber, and essential minerals,
                          supports weight management, heart health, and overall
                          wellness, making it a perfect snack.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <div className="card h-100 shadow px-4 px-md-2 px-lg-3 card-span pt-6">
                    <div className="text-center text-md-start card-hover">
                      <img
                        className="ps-3 icons"
                        src="assets/img/icons/planting.svg"
                        height="60"
                        alt=""
                      />
                      <div className="card-body">
                        <h6 className="fw-bold fs-1 heading-color">
                          Health Benefits of Makhana
                        </h6>
                        <p className="mt-3 mb-md-0 mb-lg-2">
                          Invest in your health with makhana. Enjoy the numerous
                          health advantages that come with every handful of
                          makhana.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5" id="invest">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 mb-3">
              <div className="row">
                <div className="col-lg-9 mb-3">
                  <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">
                    Shop at Your Convenience
                  </h5>
                  <p className="mb-5">
                    Experience the ease of ordering premium quality makhana,
                    tailored to your needs, directly from our dedicated farms.
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <div className="card text-white">
                    <img
                      className="card-img"
                      src="assets/img/gallery/short-terms.png"
                      alt="..."
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-center px-5 px-md-3 px-lg-5 bg-dark-gradient">
                      <h6 className="text-success pt-2">Check Our Products</h6>
                      <hr
                        className="text-white"
                        style={{ height: "0.12rem", width: "2.813rem" }}
                      />
                      <div className="pt-lg-3">
                        <h6 className="fw-bold text-white fs-1 fs-md-2 fs-lg-3 w-xxl-50">
                          Quick Makhana Delivery
                        </h6>
                        <p className="w-xxl-75">
                          Perfect for those who want to quickly replenish their
                          stock with high-quality, nutrient-rich makhana.
                        </p>
                        <button
                          className="btn btn-lg btn-light text-success"
                          type="button"
                        >
                          Browse Products
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-5">
                  <div className="card text-white">
                    <img
                      className="card-img"
                      src="assets/img/gallery/fully-funded.png"
                      alt="..."
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-center px-5 px-md-3 px-lg-5 bg-light-gradient">
                      <h6 className="text-success pt-2">Long-Term Supply</h6>
                      <hr
                        className="text-white"
                        style={{ height: "0.12rem", width: "2.813rem" }}
                      />
                      <div className="pt-lg-3">
                        <h6 className="fw-bold text-white fs-1 fs-md-2 fs-lg-3 w-xxl-50">
                          Regular Makhana Shipments
                        </h6>
                        <p className="w-xxl-75">
                          Subscribe to our long-term supply plan to receive
                          regular shipments of premium makhana.
                        </p>
                        <button
                          className="btn btn-lg btn-light text-success"
                          type="button"
                        >
                          Subscribe Today
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0" id="testimonial">
        <div className="container-lg">
          <div className="row flex-center">
            <div className="col-12 col-lg-10 col-xl-12">
              <div
                className="bg-holder"
                style={{
                  backgroundImage:
                    "url(assets/img/illustrations/testimonial-bg.png)",
                  backgroundPosition: "top left",
                  backgroundSize: "120px 83px",
                }}
              ></div>
              <h6 className="fs-3 fs-lg-4 fw-bold lh-sm">
                What Our Customers Are <br />
                are saying about Farm Delight
              </h6>
            </div>
            <div
              className="carousel slide pt-3"
              id="carouselExampleDark"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <div className="row h-100 mx-3 mx-sm-5 mx-md-4 my-md-7 m-lg-7 mt-7">
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-1.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Sarah Johnson
                              </h5>
                              <p className="fw-normal text-black">
                                Nutritionist
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            "I've incorporated makhana into my clients' diets,
                            and the results have been phenomenal. The quality is
                            top-notch, and the nutritional benefits are evident
                            in improved energy and overall health."
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-2.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Michael Lee
                              </h5>
                              <p className="fw-normal text-black">
                                Fitness Trainer
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            "Makhana has become a staple in my meal plans for
                            clients. It's a great source of protein and fiber,
                            perfect for anyone looking to maintain a healthy
                            lifestyle. The convenience of regular deliveries is
                            a huge plus!"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-3.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Emily Davis
                              </h5>
                              <p className="fw-normal text-black">
                                Health Blogger
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            "I'm always on the lookout for healthy snacks, and
                            makhana is a winner. It's delicious, nutritious, and
                            versatile. I've recommended it to all my followers,
                            and they love it just as much as I do."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <div className="row h-100 mx-3 mx-sm-5 mx-md-4 my-md-7 m-lg-7 mt-7">
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-1.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Fernando Soler
                              </h5>
                              <p className="fw-normal text-black">
                                Telecommunication Engineer
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            &quot;Quis autem vel eum iure reprehenderit qui in
                            ea voluptate velit esse quam nihil molestiae
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-2.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Ilone Pickford
                              </h5>
                              <p className="fw-normal text-black">
                                Head of Agrogofund Groups{" "}
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            &quot;At vero eos et accusamus et iusto odio
                            dignissimos ducimus qui blanditiis praesentium{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-3.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Ed O’Brien
                              </h5>
                              <p className="fw-normal text-black">Herbalist</p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            &quot;Ui dolorem eum fugiat quo voluptas nulla
                            pariatur? At vero eos et accusamus et iusto odio
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row h-100 mx-3 mx-sm-5 mx-md-4 my-md-7 m-lg-7 mt-7">
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-1.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Fernando Soler
                              </h5>
                              <p className="fw-normal text-black">
                                Telecommunication Engineer
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            &quot;Quis autem vel eum iure reprehenderit qui in
                            ea voluptate velit esse quam nihil molestiae
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-2.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Ilone Pickford
                              </h5>
                              <p className="fw-normal text-black">
                                Head of Agrogofund Groups{" "}
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            &quot;At vero eos et accusamus et iusto odio
                            dignissimos ducimus qui blanditiis praesentium{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-5 mb-md-0">
                      <div className="card h-100 shadow">
                        <div className="card-body my-3">
                          <div className="align-items-xl-center d-block d-xl-flex px-3">
                            <img
                              className="img-fluid me-3 me-md-2 me-lg-3"
                              src="assets/img/gallery/user-3.png"
                              width="50"
                              alt=""
                            />
                            <div className="flex-1 align-items-center pt-2">
                              <h5 className="mb-0 fw-bold text-success">
                                Ed O’Brien
                              </h5>
                              <p className="fw-normal text-black">Herbalist</p>
                            </div>
                          </div>
                          <p className="mb-0 px-3 px-md-2 px-xxl-3">
                            &quot;Ui dolorem eum fugiat quo voluptas nulla
                            pariatur? At vero eos et accusamus et iusto odio
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-3 px-sm-6 px-md-0 px-lg-5 px-xl-4">
                <div className="col-12 position-relative">
                  <a
                    className="carousel-control-prev carousel-icon z-index-2"
                    href="#carouselExampleDark"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next carousel-icon z-index-2"
                    href="#carouselExampleDark"
                    role="button"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0" id="contact">
        <div
          className="bg-holder"
          style={{
            backgroundImage: "url(assets/img/illustrations/footer-bg.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="container">
          <div
            className="row justify-content-lg-between"
            style={{ paddingTop: "2rem" }}
          >
            <div className="col-6 col-sm-4 col-lg-auto mb-3">
              <h6 className="mb-3 text-1000 fw-semi-bold">COMPANY </h6>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    About Us
                  </a>
                </li>
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Team
                  </a>
                </li>
                {/* <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Careers
                  </a>
                </li> */}
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 col-lg-auto mb-3">
              <h6 className="mb-3 text-1000 fw-semi-bold">INVEST </h6>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Features
                  </a>
                </li>
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    How it works
                  </a>
                </li>
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 col-lg-auto mb-3">
              <h6 className="mb-3 text-1000 fw-semi-bold">LEGAL </h6>
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Privacy
                  </a>
                </li>
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Terms
                  </a>
                </li>
                <li className="mb-3">
                  <a className="text-700 text-decoration-none" href="#!">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-auto mb-3">
              <div className="card bg-success">
                <div className="card-body p-sm-4">
                  <h5 className="text-white">Blog Farm Delight</h5>
                  <p className="mb-0 text-white fs--1 fs-sm-1">
                    write email to us info@farmdelight.com
                  </p>
                  <button className="btn btn-light text-success" type="button">
                    Sing In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="text-300 mb-0" />
        </div>
      </section>
    </main>
  );
}
export default Default;
