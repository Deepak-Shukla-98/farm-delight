"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import * as yup from "yup";
import {
  deleteAdminOrders,
  getAdminOrders,
  updateAdminOrders,
} from "@/components/services/axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  status: yup.string().required("Select status"),
});

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const fetchOrders = async () => {
    const response = await getAdminOrders({});
    setOrders(response);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const handleEdit = (product: any) => {
    setSelected(product);
    setIsOpen(true);
  };
  const handleUpdate = async (values: any) => {
    let { orderItems, ...rest } = values;
    await updateAdminOrders(rest);
    setIsOpen(false);
    fetchOrders();
  };
  const handleDelete = async (data: any) => {
    if (confirm("Are you sure") == true) {
      await deleteAdminOrders(data);
      setIsOpen(false);
      fetchOrders();
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "USER ID",
      selector: (row: any) => row.userId,
      sortable: true,
    },
    {
      name: "CREATED AT",
      selector: (row: any) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: "UPDATED AT",
      selector: (row: any) => new Date(row.updatedAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "COUPON ID",
      selector: (row: any) => row.couponId || "N/A",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: any) => (
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
      sortable: true,
    },
  ];
  return (
    <div className="container mt-5">
      <DataTable
        title="Orders"
        columns={columns}
        data={orders}
        expandableRows
        expandableRowsComponent={ExpandableComponent}
        pagination
      />
      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h5>Edit Product</h5>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={selected}
              validationSchema={schema}
              onSubmit={handleUpdate}
            >
              {({ setFieldValue }) => (
                <Form>
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
                      <option value="PENDING" label="Pending" />
                      <option value="SHIPPED" label="Shipped" />
                      <option value="DELIVERED" label="Delivered" />
                      <option value="CANCELLED" label="Cancelled" />
                      <option value="RETURNED" label="Returned" />
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

export default OrdersListPage;

const ExpandableComponent: React.FC<ExpanderComponentProps<any>> = ({
  data,
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0, padding: 0 }}
    animate={{ opacity: 1, height: "auto", padding: "4px" }}
    exit={{ opacity: 0, height: 0, padding: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-2 bg-gray-50">
      <h4 className="mb-2 font-bold">Order Items:</h4>
      {data.orderItems.map((f: any) => (
        <div className="w-full px-3 min-[400px]:px-6">
          <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
            <div className="img-box max-lg:w-full">
              <img
                src={f.photo}
                alt="Premium Watch image"
                className="aspect-square w-full lg:max-w-[140px] rounded-xl"
              />
            </div>
            <div className="flex flex-row items-center w-full ">
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                <div className="flex items-center">
                  <div className="">
                    <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                      {f.name}
                    </h2>
                    <div className="flex items-center ">
                      <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                        Size: <span className="text-gray-500">100 ml</span>
                      </p>
                      <p className="font-medium text-base leading-7 text-black ">
                        Qty: <span className="text-gray-500">{f.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                    <div className="flex gap-3 lg:block">
                      <p className="font-medium text-sm leading-7 text-black">
                        Price
                      </p>
                      <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                        ${f.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
