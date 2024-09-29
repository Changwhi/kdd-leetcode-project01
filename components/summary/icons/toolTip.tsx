import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Check,
  X,
  AlertTriangleIcon
} from "lucide-react";

export const XToolTip = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center text-center">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button>
            <X className="w-4 h-4 text-red-500" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              {text}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export const ExclamationToolTip = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center text-center">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button>
            <AlertTriangleIcon className="w-4 h-4 text-yellow-500" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              {text}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export const CheckToolTip = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center text-center">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button>
            <Check className="w-4 h-4 text-gray-500" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              {text}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};
