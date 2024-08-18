"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/components/services/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface data {
  email: String;
  password: String;
  "confirm-password": String;
}

function Page() {
  const router = useRouter();
  const [data, setData] = useState<data>({
    email: "",
    password: "",
    "confirm-password": "",
  });
  const changePassword = async () => {
    if (data.password === data["confirm-password"]) {
      await resetPassword(data);
      router.push(`/signin`);
    } else {
      toast.error("Password didn't match!");
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              changePassword();
            }}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) =>
                  setData((o) => ({ ...o, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) =>
                  setData((o) => ({ ...o, password: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <Input
                id="confirm-password"
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) =>
                  setData((o) => ({ ...o, "confirm-password": e.target.value }))
                }
              />
            </div>
            {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div> */}
            <Button type="submit" className="w-full">
              Reset passwod
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Page;
