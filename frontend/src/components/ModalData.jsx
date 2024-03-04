import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const ModalData = ({ setShowModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-general-medium fixed inset-0 z-30 transition-all duration-500 "
    >
      {/* Modal Backdrop */}
      <div className="bg-filter bg-opacity-50 fixed inset-0 w-full h-full z-20 bg-gray-400"></div>

      {/* Modal Content */}
      <main className="flex flex-col items-center justify-center h-full w-full ">
        <div className="modal-wrapper flex items-center z-30 rounded-lg ">
          <div className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative  bg-green-400 overflow-y-scroll">
            <div className="modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark">
              <h5 className=" text-primary-dark dark:text-primary-light text-xl">
                - Choisissez une date et réservez votre hôtel -
              </h5>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="px-4 font-bold text-primary-dark dark:text-primary-light"
              >
                <FiX className="text-3xl" />
              </button>
            </div>
            <div className="modal-body p-5 w-full h-full ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="max-w-xl m-4 text-left"
              >
                <div className="">
                  <div className="mt-6 mb-6">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                    />
                  </div>
                  <div className="mt-6 mb-6">
                    <input
                      type="date"
                      name="EndDate"
                      id="EndDate"
                      className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                    />
                  </div>
                </div>

                <div className="mt-6 pb-4 sm:pb-1 cursor-pointer">
                  <span
                    onClick={() => {
                      setShowModal(false);
                    }}
                    type="submit"
                    className="px-4
											sm:px-6
											py-2
											sm:py-2.5
											text-white
											bg-indigo-500
											hover:bg-indigo-600
											rounded-md
											focus:ring-1 focus:ring-indigo-900 duration-500"
                    aria-label="Submit Request"
                  >
                    <button>Valider la réservation</button>
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right cursor-pointer">
              <span
                onClick={() => {
                  setShowModal(false);
                }}
                type="button"
                className="px-4
									sm:px-6
									py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light
									rounded-md
									focus:ring-1 focus:ring-indigo-900 duration-500"
                aria-label="Close Modal"
              >
                <button>Close</button>
              </span>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ModalData;
