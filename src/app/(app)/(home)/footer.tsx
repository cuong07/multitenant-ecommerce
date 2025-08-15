import React from "react";

export const Footer = () => {
  return (
    <footer className="flex border-t justify-between font-medium p-4">
      <div>
        <p className="">
          © {new Date().getFullYear()} Silk Road. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
