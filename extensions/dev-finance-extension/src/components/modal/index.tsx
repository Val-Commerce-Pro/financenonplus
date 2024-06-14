// import { useEffect } from "react";
import { Spinner } from "../spinner";

type ModalProps = {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  isLoading?: boolean;
};

export const Modal = ({ onSubmit, onClose, isLoading = false }: ModalProps) => {
  return (
    <div
      id="fowardShadowModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        id="fowardClientModal"
        className="bg-gray-700 rounded-lg shadow p-[24px] w-full max-w-[512px]"
      >
        <div className="flex justify-between items-center border-b border-gray-600 pb-[16px] mb-[16px]">
          <h3 className="text-[20px] font-semibold text-white">
            Finanzierung by Consors Finanz
          </h3>
        </div>
        <div className="mb-[16px] text-left text-gray-200">
          {isLoading ? (
            <p>
              We are redirecting you to the Consors Finance webpage. Please
              wait.
            </p>
          ) : (
            <p>
              Mit Klick auf „Jetzt kaufen“ werden Ihre personenbezogenen Daten
              an Consors Finanz für die Kreditprüfung weitergeleitet.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-[16px]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-[100px] h-[48px] px-[16px] text-[14px] font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-[8px] hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 disabled:bg-gray-600"
          >
            Abbrechen
          </button>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
            disabled={isLoading}
            className="max-w-[150px] h-[48px] px-[16px] text-[14px] font-medium text-white bg-[#2cb484] rounded-[8px] hover:bg-[#559880] focus:outline-none focus:ring-4 focus:bg-[#468871] disabled:bg-gray-600"
          >
            {isLoading ? <Spinner /> : "Jetzt kaufen"}
          </button>
        </div>
      </div>
    </div>
  );
};
