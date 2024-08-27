// components/OrderForm.tsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { getUserdetails, getShippingCost } from "../services/axios";

interface IFormInputs {
  email: string;
  first_name?: string;
  last_name: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  saveInfo: boolean;
}
interface OrderFormProps {
  handleSubmit: (data: void) => void;
  setStore: (data: void) => void;
}
const schema = yup.object().shape({
  email: yup.string().required("Enter an email"),
  first_name: yup.string().notRequired(),
  last_name: yup.string().required("Enter a last name"),
  address: yup.string().required("Enter an address"),
  apartment: yup.string().notRequired(),
  city: yup.string().required("Enter a city"),
  state: yup.string().required("Select a state"),
  pincode: yup.string().required("Enter a ZIP / postal code"),
  phone: yup.string().required("Enter a phone number"),
  saveInfo: yup.boolean(),
});
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Madhya Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Tripura",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar (UT)",
  "Chandigarh (UT)",
  "Dadra & Nagar Haveli (UT)",
  "Daman & Diu (UT)",
  "Lakshadweep (UT)",
  "Puducherry (UT)",
];
const OrderForm: React.FC<OrderFormProps> = ({
  handleSubmit = () => {},
  setStore = () => {},
}: any) => {
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    saveInfo: false,
  });
  const getData = async () => {
    let res = await getUserdetails({});
    if (!!res) setData((d: any) => ({ ...d, ...res }));
  };
  useEffect(() => {
    getData();
  }, []);
  const onSubmit = (values: IFormInputs) => {
    handleSubmit(values);
  };
  const getCost = async (pincode: any) => {
    let res = await getShippingCost({ pincode: pincode, weight: "0.250" });
    if (!!res) setStore(res.freight_charge);
  };
  useEffect(() => {
    if (!!data.pincode) getCost(data.pincode);
  }, [data.pincode]);
  return (
    <Formik
      initialValues={data}
      enableReinitialize
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, values }: any) => (
        <Form className="max-w-md mx-auto p-4 bg-white rounded-lg">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400 text-sm mb-5">
            Complete your order by providing your payment details.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Field
              type="text"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <ErrorMessage
              name="email"
              component="small"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <h2 className="text-lg font-semibold mb-4">Delivery</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Country/Region
            </label>
            <select className="w-full border border-gray-300 p-2 rounded-md">
              <option>India</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name (optional)
              </label>
              <Field
                type="text"
                name="first_name"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name
              </label>
              <Field
                type="text"
                name="last_name"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <ErrorMessage
                name="last_name"
                component="small"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <Field
              type="text"
              name="address"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <ErrorMessage
              name="address"
              component="small"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Apartment, suite, etc. (optional)
            </label>
            <Field
              type="text"
              name="apartment"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Field
                type="text"
                name="city"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <ErrorMessage
                name="city"
                component="small"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <Field
                as="select"
                name="state"
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">Select</option>
                {states.map((d, i) => (
                  <option value={d} key={i}>
                    {d}
                  </option>
                ))}
                {/* Add more options as needed */}
              </Field>
              <ErrorMessage
                name="state"
                component="small"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PIN code</label>
              <Field
                type="text"
                name="pincode"
                className="w-full border border-gray-300 p-2 rounded-md"
                onChange={(e: any) => {
                  handleChange(e);
                  getCost(e.target.value);
                }}
              />
              <ErrorMessage
                name="pincode"
                component="small"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Field
              type="text"
              name="phone"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <ErrorMessage
              name="phone"
              component="small"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <Field
              type="checkbox"
              name="saveInfo"
              className="mr-2"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.saveInfo}
            />
            <label className="text-sm font-medium">
              Save this information for next time
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
