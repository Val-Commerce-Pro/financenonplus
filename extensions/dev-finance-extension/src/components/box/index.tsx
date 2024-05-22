import { ReactNode } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip } from "../tooltip";

type BoxProps = {
  children: ReactNode;
  title?: string;
  toolTipContent?: string;
  fill?: boolean;
};

export const Box = ({ children, title, toolTipContent, fill }: BoxProps) => {
  return (
    <div className={`w-full flex flex-col ${fill ? "h-full" : ""}`}>
      {title && (
        <div className="bg-[#2cb484] p-[16px] flex items-center justify-center rounded-t-lg">
          <h2 className="text-white font-semibold text-base text-center w-full">
            {title}
          </h2>
          {toolTipContent && (
            <div
              className="ml-auto"
              data-tooltip-placement="left"
              data-tooltip-target="tooltip-left"
              data-tooltip-trigger="hover"
            >
              <IoIosInformationCircleOutline size={22} />
              <Tooltip text={toolTipContent} />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
