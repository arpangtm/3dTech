"use client";
import { Fragment, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavLogo from "./NavLogo";

interface Active {
  active: any;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuState, changeState] = useState(false);
  const { push } = useRouter();

  if (status == "loading") {
    return <div></div>;
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  // Mobile menu component
  const MobileMenu = () => (
    <div
      className={`${
        menuState ? "block" : "hidden"
      } md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm rounded-lg mt-2 p-4 z-50`}
    >
      <div className="flex flex-col space-y-4">
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3">
          <a
            href="#"
            className="text-white hover:text-gray-300 py-2 px-3 rounded-md transition-colors"
          >
            Latest
          </a>
          <a
            href="/wishlist"
            className="text-white hover:text-gray-300 py-2 px-3 rounded-md transition-colors"
          >
            Wishlist
          </a>
        </nav>

        {/* Cart Button */}
        {session && (
          <a
            href="/checkout"
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
          >
            <BsFillCartFill />
            <span>CheckOut</span>
          </a>
        )}

        {/* Auth Buttons or Profile */}
        <div className="border-t border-gray-700 pt-4">
          {session ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-3 py-2">
                <Image
                  width={40}
                  height={40}
                  alt="ProfilePic"
                  src={session?.user?.image!}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-white font-semibold">
                    {session?.user?.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <a
                  href="#"
                  className="text-white hover:text-gray-300 py-2 px-3 rounded-md transition-colors"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 py-2 px-3 rounded-md transition-colors"
                >
                  Payment
                </a>
                <button
                  onClick={async () => {
                    await signOut({
                      callbackUrl:
                        "https://3dtechverse.arpangtm.com.np/signout",
                    });
                  }}
                  className="text-white hover:text-gray-300 py-2 px-3 rounded-md transition-colors text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  push("/login");
                  changeState(false);
                }}
                className="p-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  push("/signup");
                  changeState(false);
                }}
                className="p-3 bg-white border-2 border-white text-black rounded-md hover:bg-transparent hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop profile dropdown
  const ProfileDropdown = () => (
    <Menu as="div" className="">
      <Menu.Button className="flex items-center">
        <Image
          width={48}
          height={48}
          alt="ProfilePic"
          src={session?.user?.image!}
          className="rounded-full hover:ring-2 hover:ring-white hover:ring-opacity-50 transition-all"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" z-40 absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">
            <Menu.Item>
              {({ active }: Active) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "px-4 py-3 border-b border-gray-200"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      width={32}
                      height={32}
                      alt="ProfilePic"
                      src={session?.user?.image!}
                      className="rounded-full"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {session?.user?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }: Active) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }: Active) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  )}
                >
                  Payment
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }: Active) => (
                <button
                  onClick={async () => {
                    await signOut({
                      callbackUrl:
                        "https://3dtechverse.arpangtm.com.np/signout",
                    });
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  return (
    <div className="relative mx-4 md:mx-9">
      {/* Main Navbar */}
      <nav className="backdrop-blur-sm bg-black/90 w-full max-w-none py-4 px-4 sm:px-6 lg:px-8 rounded-full flex justify-between items-center my-5">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <NavLogo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <a
              href="/"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Latest
            </a>
            <a
              href="/wishlist"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Wishlist
            </a>
          </nav>

          {/* Desktop Auth Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <a
                  href="/checkout"
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
                >
                  <BsFillCartFill />
                  <span>CheckOut</span>
                </a>
                <ProfileDropdown />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => push("/login")}
                  className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => push("/signup")}
                  className="px-4 py-2 bg-white border-2 border-white text-black rounded-md hover:bg-transparent hover:text-white transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => changeState(!menuState)}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {menuState ? (
            <AiOutlineClose size={24} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  );
}
