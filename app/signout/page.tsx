import React from "react";

function signOut() {
  return (
    <div className="flex justify-center items-center">
      <div id="popup-modal" className="flex justify-center items-center">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow bg-gray-700">
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 w-14 h-14 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-400">
                You are successfully logged out!
              </h3>
              <a href="/">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                >
                  Go to home
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signOut;
