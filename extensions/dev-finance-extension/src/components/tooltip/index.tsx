interface TooltipProps {
  text: string;
}

export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <>
      <div
        style={{ visibility: "hidden" }}
        className="absolute bottom-full mb-[8px] w-max max-w-[320px] p-[12px] text-[14px] text-left text-white bg-gray-900 rounded-[8px] shadow-md transition-opacity duration-200 group-hover:!visible dark:bg-gray-700"
      >
        {text}
      </div>
    </>
  );
};
