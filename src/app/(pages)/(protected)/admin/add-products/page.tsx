"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { postProducts } from "@/components/services/axios";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface IFormInputs {
  name: string;
  price: number;
  discount: number;
  photo: File | null;
  inventory: number;
  short_desc: string;
  long_desc: string;
  length: number;
  breadth: number;
  height: number;
  weight: number;
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
  short_desc: yup.string().required("Feild is required"),
  long_desc: yup.string().required("Feild is required"),
  length: yup.number().required("Feild is required"),
  breadth: yup.number().required("Feild is required"),
  height: yup.number().required("Feild is required"),
  weight: yup.number().required("Feild is required"),
  status: yup.string().required("Select status"),
});

const Page = () => {
  const initialValues: IFormInputs = {
    name: "",
    price: 0,
    discount: 0,
    photo: null,
    inventory: 0,
    short_desc: "",
    long_desc: "",
    length: 0,
    breadth: 0,
    height: 0,
    weight: 0,
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
    formData.append("short_desc", values.short_desc.toString());
    formData.append("long_desc", values.long_desc.toString());
    formData.append("length", values.length.toString());
    formData.append("breadth", values.breadth.toString());
    formData.append("height", values.height.toString());
    formData.append("weight", values.weight.toString());

    try {
      const response = await postProducts(formData);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, handleChange, isSubmitting, values, errors }) => {
        return (
          <Form>
            <div className="bg-gray-100 dark:bg-gray-800 py-6">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                  <div className="md:flex-1 px-4">
                    <div className="mt-3 h-[460px] rounded-2xl bg-gray-300 dark:bg-gray-700 relative">
                      {!!values.photo ? (
                        <img
                          className="w-full h-full object-cover rounded-2xl"
                          src={URL.createObjectURL(values.photo)}
                          alt="Product Image"
                        />
                      ) : (
                        <div className="w-full h-full flex content-center items-center">
                          <div className="relative my-6 w-full">
                            <input
                              id="id-dropzone01"
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                if (event.currentTarget.files) {
                                  setFieldValue(
                                    "photo",
                                    event.currentTarget.files[0]
                                  );
                                }
                              }}
                              className="hidden"
                            />
                            <label
                              htmlFor="id-dropzone01"
                              className="relative flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-3 py-6 text-center text-sm font-medium transition-colors"
                            >
                              <span className="inline-flex h-12 items-center justify-center self-center rounded-full bg-slate-100/70 px-3 text-slate-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-label="File input icon"
                                  role="graphics-symbol"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                                  />
                                </svg>
                              </span>
                              <span className="text-slate-500">
                                Drag & drop or
                                <span className="text-emerald-500">
                                  {" "}
                                  upload a file
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                      {!!values.photo ? (
                        <IoMdCloseCircleOutline
                          className="absolute top-0 right-0 m-1 cursor-pointer"
                          size={30}
                          color="#F88379"
                          onClick={() => {
                            setFieldValue("photo", null);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <ErrorMessage
                      name="photo"
                      component="small"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="md:flex-1 px-4 text-xs">
                    <div className="mb-2">
                      <label className="font-bold text-gray-700 dark:text-gray-300">
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
                    <div className="mb-2">
                      <label className="font-bold text-gray-700 dark:text-gray-300">
                        Short Desc
                      </label>
                      <textarea
                        name="short_desc"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={values.short_desc}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="short_desc"
                        component="small"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="flex mb-2">
                      <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Price:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Availability:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Discount:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Inventory:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="mr-2">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Length:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                      <div className="mr-2">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Breadth:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                      <div className="mr-2">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Height:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                      <div className="mr-2">
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Weight:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-1">
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
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        Product Description:
                      </span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        <div className="mb-4">
                          <textarea
                            name="long_desc"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={values.long_desc}
                            onChange={handleChange}
                            rows={4}
                          />
                          <ErrorMessage
                            name="long_desc"
                            component="small"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        type="submit"
                        className="w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                        disabled={isSubmitting}
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Page;
