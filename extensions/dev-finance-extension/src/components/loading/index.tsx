import { Spinner } from "../spinner";

const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <Spinner />
          <div className="mt-[16px] text-lg font-semibold">Loading...</div>
        </div>
      </div>
    </>
  );
};
export default Loading;
