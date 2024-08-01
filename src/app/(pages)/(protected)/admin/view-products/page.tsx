"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import * as yup from "yup";
import {
  deleteProduct,
  getProducts,
  updateProducts,
} from "@/components/services/axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import Link from "next/link";

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
    console.log({ values });
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("discount", values.discount.toString());
    if (values.photo instanceof File) {
      formData.append("photo", values.photo);
    }
    formData.append("inventory", values.inventory.toString());
    formData.append("status", values.status);
    await updateProducts(formData);
    setIsModalOpen(false);
    fetchProducts();
  };
  const handleDelete = async (data: any) => {
    await deleteProduct(data);
    setIsModalOpen(false);
    fetchProducts();
  };
  return (
    <div className="container mt-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <Link
          href={"/admin/add-products"}
          className="px-4 underline cursor-pointer"
        >
          Add
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-separate rounded border-slate-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                No
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Price
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Discount
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Inventory
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Status
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any, index: number) => (
              <tr key={product.id}>
                <th
                  scope="row"
                  className="h-12 px-6 text-sm text-center transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
                >
                  {index + 1}
                </th>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.name}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.price}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.discount}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.inventory}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {product.status ? "In Stock" : "Out Of Stock"}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  <div className="flex justify-around">
                    <FaRegEdit
                      onClick={() => handleEdit(product)}
                      size={20}
                      color="blue"
                      className="cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(product)}
                      size={20}
                      color="red"
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        style={{ marginTop: "200px" }}
      >
        <ModalContent>
          <ModalHeader>
            <h5>Edit Product</h5>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={selectedProduct}
              validationSchema={schema}
              onSubmit={handleUpdate}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-4">
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

                  <div className="mb-4">
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

                  <div className="mb-4">
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

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          setFieldValue("photo", event.currentTarget.files[0]);
                        }
                      }}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="photo"
                      component="small"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="mb-4">
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

                  <div className="mb-4">
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
                  <ModalFooter>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      type="submit"
                    >
                      Update Product
                    </button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductListPage;
