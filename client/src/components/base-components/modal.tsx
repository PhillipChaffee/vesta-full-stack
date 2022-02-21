import React from "react";

interface ModalProps {
  active: boolean;
  setActive: Function;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { active, setActive, children } = props;
  const overlayCss = active
    ? " ease-out duration-300 opacity-100"
    : " ease-in duration-200 opacity-0";
  const bodyCss = active
    ? " ease-out opacity-100 translate-y-0 sm:scale-100"
    : " ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95";

  return !active ? (
    <div />
  ) : (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={
            "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" +
            overlayCss
          }
          aria-hidden="true"
          onClick={() => setActive(false)}
        />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={
            "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" +
            bodyCss
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
