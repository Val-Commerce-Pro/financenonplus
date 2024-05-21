import { Spinner } from "../spinner";

type ModalProps = {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  isLoading?: boolean;
};

export const Modal = ({ onSubmit, onClose, isLoading = false }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 rounded-lg shadow p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-4">
          <h3 className="text-xl font-semibold text-white">
            Consors EFI Request
          </h3>
        </div>
        <div className="mb-4 text-center text-gray-200">
          {isLoading ? (
            <p>
              We are going to foward you to the CONSORS EFI webpage, please
              wait.
            </p>
          ) : (
            <p>
              Sie sind kurz davor eine Leasinganfrage an CONSORS EFI Leasing zu
              senden. Sind Sie sicher, dass ihre Daten korrekt sind? Die
              Leasinganfrage kann im Nachhinein nicht verändert werden.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="h-12 px-4 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 disabled:bg-gray-600"
          >
            Abbrechen
          </button>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
            disabled={isLoading}
            className="h-12 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 disabled:bg-gray-600"
          >
            {isLoading ? <Spinner /> : "Anfrage senden"}
          </button>
        </div>
      </div>
    </div>
  );
};
