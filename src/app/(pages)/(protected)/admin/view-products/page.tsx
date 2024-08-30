"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import * as yup from "yup";
import Link from "next/link";
import {
  deleteProduct,
  getProducts,
  updateProducts,
} from "@/components/services/axios";

const schema = yup.object().shape({
  name: yup.string().required("Enter product name"),
  price: yup
    .number()
    .required("Enter product price")
    .positive("Price must be positive"),
  discount: yup
    .number()
    .required("Enter discount")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100"),
  photo: yup.mixed().required("Upload a product photo"),
  inventory: yup
    .number()
    .required("Enter inventory quantity")
    .min(0, "Inventory cannot be negative"),
  short_desc: yup.string().required("Feild is required"),
  long_desc: yup.string().required("Feild is required"),
  length: yup.number().required("Feild is required"),
  breadth: yup.number().required("Feild is required"),
  height: yup.number().required("Feild is required"),
  weight: yup.number().required("Feild is required"),
  status: yup.string().required("Select status"),
});

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: null,
    price: null,
    discount: null,
    photo: null,
    inventory: null,
    short_desc: "",
    long_desc: "",
    length: null,
    breadth: null,
    height: null,
    weight: null,
    status: null,
  });
  const fetchProducts = async () => {
    const response = await getProducts({});
    setProducts(response);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleEdit = (product: any) => {
    setSelectedProduct({
      ...product,
      status: !!product.status ? "in_stock" : "out_of_stock",
    });
    setIsModalOpen(true);
  };
  const handleUpdate = async (values: any) => {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("discount", values.discount.toString());
    if (values.photo instanceof File) {
      formData.append("photo", values.photo);
    }
    formData.append("short_desc", values.short_desc.toString());
    formData.append("long_desc", values.long_desc.toString());
    formData.append("length", values.length.toString());
    formData.append("breadth", values.breadth.toString());
    formData.append("height", values.height.toString());
    formData.append("weight", values.weight.toString());
    formData.append("inventory", values.inventory.toString());
    formData.append("status", values.status);
    await updateProducts(formData);
    setIsModalOpen(false);
    fetchProducts();
  };
  const handleDelete = async (data: any) => {
    if (confirm("Are you sure") == true) {
      await deleteProduct(data);
      setIsModalOpen(false);
      fetchProducts();
    }
  };
  const columns = [
    {
      name: "Product Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: any) => row.price,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row: any) => row.discount,
      sortable: true,
    },
    {
      name: "Inventory",
      selector: (row: any) => row.inventory,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => (row.status ? "In Stock" : "Out Of Stock"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex justify-around">
          <FaRegEdit
            onClick={() => handleEdit(row)}
            size={20}
            color="blue"
            className="cursor-pointer"
          />
          <FaTrash
            onClick={() => handleDelete(row)}
            size={20}
            color="red"
            className="cursor-pointer mx-4"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <div className="container mt-5">
      <div className="flex justify-end">
        <Link
          href={"/admin/add-products"}
          className="px-4 underline cursor-pointer"
        >
          Add
        </Link>
      </div>

      <DataTable
        title="Products"
        columns={columns}
        data={products}
        pagination
      />
      <Sheet open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit Products</SheetTitle>
            <SheetDescription>
              Make changes to your products here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Formik
            initialValues={selectedProduct}
            validationSchema={schema}
            onSubmit={handleUpdate}
          >
            {({ setFieldValue, handleChange, values }) => (
              <Form>
                <div className="my-3 grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative mt-4">
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={values.name || ""}
                        placeholder="product name"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Name
                      </label>
                    </div>
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative mt-4">
                      <input
                        id="price"
                        type="text"
                        name="price"
                        value={values.price || ""}
                        placeholder="price"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Price
                      </label>
                    </div>
                    <ErrorMessage
                      name="price"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="discount"
                        type="text"
                        name="discount"
                        value={values.discount || ""}
                        placeholder="discount"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Discount
                      </label>
                    </div>
                    <ErrorMessage
                      name="discount"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="photo"
                        type="file"
                        name="photo"
                        className="peer relative w-full rounded border border-slate-200 px-4 py-2.5 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 [&::file-selector-button]:hidden"
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            setFieldValue(
                              "photo",
                              event.currentTarget.files[0]
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor="id-file01"
                        className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        {" "}
                        Upload a Picture{" "}
                      </label>
                    </div>
                    <ErrorMessage
                      name="photo"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="short_desc"
                        type="text"
                        name="short_desc"
                        value={values.short_desc || ""}
                        placeholder="short_desc"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Short Desc
                      </label>
                    </div>
                    <ErrorMessage
                      name="short_desc"
                      component="small"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="long_desc"
                        type="text"
                        name="long_desc"
                        value={values.long_desc || ""}
                        placeholder="long_desc"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Long Desc
                      </label>
                    </div>
                    <ErrorMessage
                      name="long_desc"
                      component="small"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="length"
                        type="number"
                        name="length"
                        value={values.length || ""}
                        placeholder="length"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Length
                      </label>
                    </div>
                    <ErrorMessage
                      name="length"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="breadth"
                        type="number"
                        name="breadth"
                        value={values.breadth || ""}
                        placeholder="breadth"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Breadth
                      </label>
                    </div>
                    <ErrorMessage
                      name="breadth"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="height"
                        type="number"
                        name="height"
                        value={values.height || ""}
                        placeholder="height"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Height
                      </label>
                    </div>
                    <ErrorMessage
                      name="height"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div className="relative">
                      <input
                        id="weight"
                        type="number"
                        name="weight"
                        value={values.weight || ""}
                        placeholder="weight"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Weight
                      </label>
                    </div>
                    <ErrorMessage
                      name="weight"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6 mb-2">
                    <div className="relative">
                      <input
                        id="inventory"
                        type="number"
                        name="inventory"
                        value={values.inventory || ""}
                        placeholder="inventory"
                        className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="id-01"
                        className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Inventory
                      </label>
                    </div>
                    <ErrorMessage
                      name="inventory"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="col-span-4 lg:col-span-6 mb-2">
                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        value={values.status || ""}
                        onChange={handleChange}
                        className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      >
                        <option value="" label="Select status" />
                        <option value={"in_stock"} label="In Stock" />
                        <option value={"out_of_stock"} label="Out Of Stock" />
                      </select>
                      <label
                        htmlFor="status"
                        className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Select an option
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-labelledby="title-04 description-04"
                        role="graphics-symbol"
                      >
                        <title id="title-04">Arrow Icon</title>
                        <desc id="description-04">
                          Arrow icon of the select list.
                        </desc>
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <ErrorMessage
                      name="status"
                      component="small"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Save changes</Button>
                  <SheetClose asChild>
                    <Button type="button" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </Form>
            )}
          </Formik>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductListPage;
