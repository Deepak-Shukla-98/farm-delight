// components/OrderForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-white rounded-lg"
    >
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400 text-sm mb-5">
        Complete your order by providing your payment details.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Email or mobile phone number
        </label>
        <input
          type="text"
          {...register("emailOrPhone")}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        {errors.emailOrPhone && (
          <small className="text-red-500 text-xs mt-1 ">
            {errors.emailOrPhone.message}
          </small>
        )}
      </div>

      <div className="mb-4">
        <input type="checkbox" {...register("newsOffers")} className="mr-2" />
        <label className="text-sm font-medium">
          Email me with news and offers
        </label>
      </div>

      <h2 className="text-lg font-semibold mb-4">Delivery</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Country/Region</label>
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
          <input
            type="text"
            {...register("firstName")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.lastName && (
            <small className="text-red-500 text-xs mt-1 ">
              {errors.lastName.message}
            </small>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          {...register("address")}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        {errors.address && (
          <small className="text-red-500 text-xs mt-1 ">
            {errors.address.message}
          </small>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Apartment, suite, etc. (optional)
        </label>
        <input
          type="text"
          {...register("apartment")}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            {...register("city")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.city && (
            <small className="text-red-500 text-xs mt-1 ">
              {errors.city.message}
            </small>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            {...register("state")}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="Telangana">Telangana</option>
            {/* Add more options as needed */}
          </select>
          {errors.state && (
            <small className="text-red-500 text-xs mt-1 ">
              {errors.state.message}
            </small>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PIN code</label>
          <input
            type="text"
            {...register("pinCode")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.pinCode && (
            <small className="text-red-500 text-xs mt-1 ">
              {errors.pinCode.message}
            </small>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="text"
          {...register("phone")}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        {errors.phone && (
          <small className="text-red-500 text-xs mt-1 ">
            {errors.phone.message}
          </small>
        )}
      </div>

      <div className="mb-4">
        <input type="checkbox" {...register("saveInfo")} className="mr-2" />
        <label className="text-sm font-medium">
          Save this information for next time
        </label>
      </div>
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
