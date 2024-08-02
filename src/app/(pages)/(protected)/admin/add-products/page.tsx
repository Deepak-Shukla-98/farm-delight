"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { postProducts } from "@/components/services/axios";

interface IFormInputs {
  name: string;
  price: number;
  discount: number;
  photo: File | null;
  inventory: number;
  status: string;
}

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
  status: yup.string().required("Select status"),
});

const Page = () => {
  const initialValues: IFormInputs = {
    name: "",
    price: 0,
    discount: 0,
    photo: null,
    inventory: 0,
    status: "",
  };

  const handleSubmit = async (
    values: IFormInputs,
    { setSubmitting }: FormikHelpers<IFormInputs>
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("discount", values.discount.toString());
    formData.append("photo", values.photo as Blob);
    formData.append("inventory", values.inventory.toString());
    formData.append("status", values.status);

    try {
      const response = await postProducts(formData);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values, errors }) => {
          return (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
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
                <label className="block text-sm font-medium mb-1">Price</label>
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
                <label className="block text-sm font-medium mb-1">Photo</label>
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
                <label className="block text-sm font-medium mb-1">Status</label>
                <Field
                  as="select"
                  name="status"
                  className="w-full border border-gray-300 p-2 rounded-md"
                >
                  <option value="" label="Select status" />
                  <option value="in_stock" label="In Stock" />
                  <option value="out_of_stock" label="Out Of Stock" />
                </Field>
                <ErrorMessage
                  name="status"
                  component="small"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                disabled={isSubmitting}
              >
                Add Product
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Page;
