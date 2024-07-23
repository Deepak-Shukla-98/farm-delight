import React from "react";
import { Spinner } from "@nextui-org/spinner";

const Loader = ({ display = "none" }) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        zIndex: 999999,
        display: display,
        placeContent: "center",
        // cursor: "none",
      }}
      id="spinner"
    >
      <Spinner size="lg" color="primary" />
    </div>
  );
};

export default Loader;
