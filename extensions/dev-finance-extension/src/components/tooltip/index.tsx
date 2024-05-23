interface TooltipProps {
  text: string;
}

export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className="absolute bottom-full mb-[8px] hidden w-max max-w-[320px] p-[12px] text-[14px] text-left text-white bg-gray-900 rounded-[8px] shadow-md transition-opacity duration-200 group-hover:block dark:bg-gray-700">
      {text}
    </div>
  );
};
