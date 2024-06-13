import { BsCartX } from "react-icons/bs";

const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center flex flex-col justify-center items-center">
          <BsCartX size={70} />
          <div className="mt-[16px] text-lg font-semibold">
            Dein Warenkorb ist leer!
          </div>
          <div className="mt-[8px] text-sm">
            Füge Artikel hinzu, um eine Finanzierung zu ermöglichen!
          </div>
        </div>
      </div>
    </>
  );
};
export default Loading;
