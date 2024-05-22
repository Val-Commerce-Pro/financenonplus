interface TooltipProps {
  text: string;
}

export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className="absolute bottom-full mb-2 hidden w-max max-w-xs p-[12px] text-sm text-left text-white bg-gray-900 rounded-lg shadow-md transition-opacity duration-200 group-hover:block dark:bg-gray-700">
      {text}
    </div>
  );
};
