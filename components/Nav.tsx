import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import Toggle from "./Toggle";

const Nav = () => {
  const { resolvedTheme } = useTheme();

  return (
    <nav className="flex flex-col items-center border-b mb-5 py-4">
      <div className="flex justify-between max-w-6xl w-full">
        <div className="flex items-center gap-5 px-4">
          <Link href="https://www.joinwarp.com">
            <Image
              src="/warp.svg"
              alt="Warp Logo"
              width={100}
              height={50}
              className={`logo ${resolvedTheme === "dark" ? "invert" : ""}`}
            />
          </Link>
        </div>

        <div className="flex items-center gap-5 px-4">
          <Link href="https://app.joinwarp.com/" className="login-button">
            <div className="flex items-center px-4 h-10 border rounded-md shadow transition hover:brightness-125">
              Log In
            </div>
          </Link>
          <Link
            href="https://www.joinwarp.com/demo"
            className="demo-button flex items-center h-10 px-4 border rounded-md shadow transition hover:brightness-125"
          >
            See a Demo
          </Link>
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
