"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSharedContext } from "@/components/context/sharedContext";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { signIn } from "@/components/services/axios";
import { RiEyeCloseFill, RiEyeOffLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const metadata: Metadata = {
  title: "Sign In",
  description: "Created by Plura",
};

interface data {
  email: String;
  password: String;
}
export default function SignIn() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { dispatch } = useSharedContext();
  const [view, setView] = useState(false);
  const [data, setData] = useState<data>({
    email: "",
    password: "",
  });

  const login = async (values: data) => {
    let data = await signIn({ email: values.email, password: values.password });
    if (!!data?.token) {
      dispatch({
        type: "SET_AUTH_STATE",
        payload: true,
      });
      dispatch({
        type: "SET_LOGIN_USER",
        payload: data.user,
      });
      localStorage.setItem("token", `Bearer ${data.token}`);
      if (data.user.userType === "ADMIN")
        localStorage.setItem("user_type", `${data.user.userType}`);
      router.push("/products");
    }
  };
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <img
          src="https://picsum.photos/id/19/1800/900/"
          alt="Image"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center mt-28 lg:mt-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <small className="text-balance text-muted-foreground">
              Enter your email below to login
            </small>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              login(data);
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <Input
                    id="password"
                    type={view ? "text" : "password"}
                    required
                    onChange={(e) =>
                      setData((o) => ({ ...o, password: e.target.value }))
                    }
                  />
                  {view ? (
                    <RiEyeOffLine
                      onClick={() => setView(!view)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "35%",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <RiEyeCloseFill
                      onClick={() => setView(!view)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "35%",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
