"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSharedContext } from "../context/sharedContext";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const {
      state: { isAuthenticated },
      dispatch,
    } = useSharedContext();
    const pathname = usePathname();
    useEffect(() => {
      if (
        typeof window !== "undefined" ? !!localStorage.getItem("token") : false
      ) {
        dispatch({
          type: "SET_AUTH_STATE",
          payload: true,
        });
      } else {
        if (!isAuthenticated) {
          return redirect("/signin");
        }
      }
    }, [pathname]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

export function isAdmin(Component: any) {
  return function IsAuth(props: any) {
    const {
      state: { isAuthenticated, isAdmin },
      dispatch,
    } = useSharedContext();
    const pathname = usePathname();
    useEffect(() => {
      if (
        typeof window !== "undefined"
          ? !!localStorage.getItem("token") &&
            !!localStorage.getItem("user_type")
          : false
      ) {
        dispatch({
          type: "SET_AUTH_STATE",
          payload: true,
        });
        dispatch({
          type: "SET_ADMIN_STATE",
          payload: true,
        });
      } else {
        // if (!isAuthenticated || !isAdmin) {
        //   return redirect("/products");
        // }
      }
    }, [pathname]);

    // if (!isAuthenticated || !isAdmin) {
    //   return null;
    // }

    return <Component {...props} />;
  };
}
