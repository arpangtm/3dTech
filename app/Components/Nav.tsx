"use client";
import { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { BsFillCartFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Active {
  active: any;
}

//Checks if loged in or not and displays returns signup button or Profile Picture
function configureButton() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const button = session ? (
    <div className="flex space-x-5">
      <button className="flex items-center space-x-2 px-2 py-1 bg-white text-black rounded-md">
        <BsFillCartFill></BsFillCartFill>CheckOut
      </button>
      <Image
        width={50}
        height={50}
        alt="ProfilePic"
        src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
        className={"rounded-full"}
      ></Image>
    </div>
  ) : (
    <div className="space-x-5">
      <button
        onClick={() => {
          push("/login");
        }}
        className={
          "p-2 bg-transparent border-2 border-white-700 text-white rounded-md hover:bg-white hover:text-black hover:border-0 hover:scale-110"
        }
      >
        Login
      </button>
      <button
        onClick={() => {
          push("/signup");
        }}
        className={
          "p-3 bg-white text-black rounded-md hover:bg-transparent hover:scale-90 hover:text-white hover:border-2"
        }
      >
        Sign Up
      </button>
    </div>
  );

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  if (session) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>{button}</Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }: Active) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    <div className={"flex right-3"}>
                      <Image
                        width={30}
                        height={30}
                        alt="ProfilePic"
                        src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                        className={"rounded-full mr-3"}
                      ></Image>
                      <div>
                        <h2 className={"font-bold"}>{session?.user?.name}</h2>
                        <p className={"text-sm"}>{session?.user?.email}</p>
                      </div>
                    </div>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: Active) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
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
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Payment
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }: Active) => (
                    <button
                      type="submit"
                      onClick={() => {
                        signOut();
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  return button;
}

export default function Navbar() {
  return (
    <>
      <section
        className={
          "flex justify-between items-center my-5 mx-3 sm:mx-4 lg:mx-9"
        }
      >
        <h1 className={"text-5xl"}>TS</h1>
        <div className={"flex space-x-12 items-center"}>
          <ul className={"flex space-x-10"}>
            <li>Latest</li>
            <li>Wishlist</li>
          </ul>
          {configureButton()}
        </div>
      </section>
    </>
  );
}
