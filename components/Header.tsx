import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggler";
import logo from "../public/logo.png";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className=" w-fit">
          <Image
            src={logo}
            // src="https://www.shareicon.net/data/2015/08/10/82855_dropbox_4096x4096.png"
            alt="logo"
            height={50}
            width={50}
            className="invert"
          />
        </div>
        <h1 className="font-bold text-xl">DATAVAULT</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
