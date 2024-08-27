import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { XIcon } from "./xIcon";
import { ExclamationIcon } from "./exclamationIcon";
import { CheckIcon } from "./checkIcon";

export const XToolTip = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center text-center">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button>
              <XIcon />
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
              <ExclamationIcon />
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
              <CheckIcon />
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
