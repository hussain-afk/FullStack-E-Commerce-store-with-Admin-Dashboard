import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div className="
      fixed inset-0 z-[100]
      flex items-center justify-center
      bg-black/50
      p-4
      backdrop-blur-sm
    ">

      {/* Modal Box */}
      <div className="
        relative
        w-full
        max-w-lg
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-2xl
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:'none']
        [scrollbar-width:'none']
      ">

        {/* Modal Header */}
        <div className="
          sticky top-0 z-10
          flex items-center
          justify-between
          border-b
          border-gray-200
          bg-white
          px-5 py-4
          sm:px-6
        ">
          <div>
            {title && <h2 className="text-lg font-bold text-black">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-lg
              border border-gray-200
              text-gray-500
              transition-all
              hover:border-black
              hover:bg-black
              hover:text-white
              active:scale-95
              cursor-pointer
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* Modal Body (Anything you pass inside will render here) */}
        <div className="p-5 sm:p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;