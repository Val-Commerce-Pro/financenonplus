import { useState } from "react";
import { MdDoneOutline } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { clearCartData } from "../../utils/shopifyAjaxApi";
import { Spinner } from "../spinner";

type ModalProps = {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  isLoading?: boolean;
  responseApp?: {
    responseSuccess: boolean;
    responseText: string;
  };
};

export const Modal = ({
  onSubmit,
  onClose,

  isLoading = false,
  responseApp = { responseSuccess: false, responseText: "Test" },
}: ModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { responseSuccess, responseText } = responseApp;

  const handleFinishClick = async (): Promise<void> => {
    localStorage.clear();
    await clearCartData();
    navigate("/");
    location.reload();
  };

  // shopbrandname=SHOPNAME
  // const parameters = new URLSearchParams({
  //   vendorid: "2500213",
  //   order_id: order_name,
  //   order_amount: textAmount,
  //   notifyURL: `https://e-bike.cpro-server.de/api/public/notify/${order_id}`,
  // });
  // const link = `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${parameters}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 rounded-lg shadow p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-4">
          <h3 className="text-xl font-semibold text-white">
            Albis Leasing Anfrage
          </h3>
        </div>
        <div className="mb-4 text-center text-gray-200">
          {isLoading ? (
            <p>
              Wir senden ihre Anfrage an ALBIS, bitte warten Sie einen Moment.
            </p>
          ) : submitted ? (
            responseSuccess ? (
              <div className="flex flex-col items-center gap-2">
                <MdDoneOutline size={30} fill="#1ece53" />
                <span>
                  Deine Leasing Anfrage an Albis wurde erfolgreich versendet!
                </span>
                <p>Weitere Informationen erhalten Sie per Mail.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <VscError size={30} fill="#e51130" />
                <span>{responseText}</span>
              </div>
            )
          ) : (
            <p>
              Sie sind kurz davor eine Leasinganfrage an ALBIS Leasing zu
              senden. Sind Sie sicher, dass ihre Daten korrekt sind? Die
              Leasinganfrage kann im Nachhinein nicht verändert werden.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={responseSuccess || isLoading}
            className="h-12 px-4 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 disabled:bg-gray-600"
          >
            Abbrechen
          </button>
          {submitted && responseSuccess ? (
            <button
              onClick={handleFinishClick}
              className="h-12 px-4 text-sm font-medium text-white bg-[#1ece53] rounded-lg hover:bg-[#1a4d2a] focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
              Finish
            </button>
          ) : (
            <button
              onClick={(e) => {
                onSubmit(e);
                setSubmitted(true);
              }}
              disabled={submitted && !isLoading}
              className="h-12 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 disabled:bg-gray-600"
            >
              {isLoading ? <Spinner /> : "Anfrage senden"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
