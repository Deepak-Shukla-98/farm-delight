// components/OrderForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface IFormInputs {
  emailOrPhone: string;
  newsOffers: boolean;
  firstName?: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  saveInfo: boolean;
}

const schema = yup.object().shape({
  emailOrPhone: yup.string().required("Enter an email or phone number"),
  newsOffers: yup.boolean(),
  firstName: yup.string().notRequired(),
  lastName: yup.string().required("Enter a last name"),
  address: yup.string().required("Enter an address"),
  apartment: yup.string().notRequired(),
  city: yup.string().required("Enter a city"),
  state: yup.string().required("Select a state"),
  pinCode: yup.string().required("Enter a ZIP / postal code"),
  phone: yup.string().required("Enter a phone number"),
  saveInfo: yup.boolean(),
});

const OrderForm: React.FC = () => {
  const initialValues: IFormInputs = {
    emailOrPhone: "",
    newsOffers: false,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    saveInfo: false,
  };

  const onSubmit = (values: IFormInputs) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
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
            <label className="block text-sm font-medium mb-1">
              Email or mobile phone number
            </label>
            <Field
              type="text"
              name="emailOrPhone"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <ErrorMessage
              name="emailOrPhone"
              component="small"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <Field
              type="checkbox"
              name="newsOffers"
              className="mr-2"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.newsOffers}
            />
            <label className="text-sm font-medium">
              Email me with news and offers
            </label>
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
                name="firstName"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name
              </label>
              <Field
                type="text"
                name="lastName"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <ErrorMessage
                name="lastName"
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
                <option value="Telangana">Telangana</option>
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
                name="pinCode"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <ErrorMessage
                name="pinCode"
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
          <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
