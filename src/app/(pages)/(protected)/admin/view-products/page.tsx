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
  inventory: yup
    .number()
    .required("Enter inventory quantity")
    .min(0, "Inventory cannot be negative"),
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
            {({ setFieldValue }) => (
              <Form>
                <div className="my-3 grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12">
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="name"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Price
                      </label>
                      <Field
                        type="number"
                        name="price"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="price"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Discount
                      </label>
                      <Field
                        type="number"
                        name="discount"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="discount"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Photo
                      </label>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          id="picture"
                          type="file"
                          onChange={(event) => {
                            if (event.currentTarget.files) {
                              setFieldValue(
                                "photo",
                                event.currentTarget.files[0]
                              );
                            }
                          }}
                        />
                      </div>
                      <ErrorMessage
                        name="photo"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Short Desc
                      </label>
                      <Field
                        type="text"
                        name="short_desc"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="short_desc"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Long Desc
                      </label>
                      <Field
                        type="text"
                        name="long_desc"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="long_desc"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Length
                      </label>
                      <Field
                        type="number"
                        name="length"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="length"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Breadth
                      </label>
                      <Field
                        type="number"
                        name="breadth"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="breadth"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Height
                      </label>
                      <Field
                        type="number"
                        name="height"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="height"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Weight
                      </label>
                      <Field
                        type="number"
                        name="weight"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="weight"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Inventory
                      </label>
                      <Field
                        type="number"
                        name="inventory"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      />
                      <ErrorMessage
                        name="inventory"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="w-full border border-gray-300 p-2 rounded-md"
                      >
                        <option value="" label="Select status" />
                        <option value={"in_stock"} label="In Stock" />
                        <option value={"out_of_stock"} label="Out Of Stock" />
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
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
