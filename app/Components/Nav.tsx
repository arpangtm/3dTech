"use client";
import { Fragment, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  //Checks if loged in or not and displays returns signup button or Profile Picture
  function configureButton(session: any) {
    const button = session ? (
      <div className="flex space-x-5">
        <Image
          width={200}
          height={100}
          alt="ProfilePic"
          src={session?.user?.image!}
          className={"rounded-full h-14 w-14"}
        ></Image>
      </div>
    ) : (
      <div className="space-x-5">
        <button
          onClick={() => {
            push("/login");
          }}
          className={
            "p-2 bg-transparent border-2 border-white-700 text-white rounded-md hover:bg-white hover:text-black"
          }
        >
          Login
        </button>
        <button
          onClick={() => {
            push("/signup");
          }}
          className={
            "p-2 bg-white border-2 border-white-700 text-black rounded-md hover:bg-transparent hover:text-white"
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
        <Menu as="div" className="relative text-left flex gap-4">
          <a
            href="/checkout"
            className="flex items-center space-x-2 px-2 py-1 bg-white text-black rounded-md"
          >
            <BsFillCartFill></BsFillCartFill>CheckOut
          </a>
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
            <Menu.Items className="absolute right-0 z-10 mt-20 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          src={session?.user?.image!}
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
                        onClick={async() => {
                          await signOut({
                            callbackUrl:
                              "https://3dtechverse.arpangtm.com.np/signout",
                          });
                        }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
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

  return (
    <>
      <section
        className={
          " w-screen flex justify-around md:justify-between md:w-auto items-center my-5 mx-3 sm:mx-4 lg:mx-9"
        }
      >
        <a href="/" className={"text-5xl"}>
          TS
        </a>
        <div
          className={`gap-5 ${
            menuState ? `inline-block` : `hidden`
          } md:flex md:flex-row space-x-12 items-center`}
        >
          <ul
            className={`flex flex-col gap-5 justify-center items-center md:flex-row md:space-x-10`}
          >
            <a href="#">
              <li>Latest</li>{" "}
            </a>
            <a href="/wishlist">
              <li>Wishlist</li>{" "}
            </a>
          </ul>
          {configureButton(session)}
        </div>
        <div
          id="mobileMenu"
          onClick={() => changeState(!menuState)}
          className={`text-white block md:hidden`}
        >
          {menuState ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </section>
    </>
  );
}
