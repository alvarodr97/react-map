import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  children: React.ReactNode;
  side: "left" | "top" | "right" | "bottom";
  sideOffset?: number;
  tooltipText: string;
}

export const TooltipWrap = ({
  children,
  side,
  sideOffset = 4,
  tooltipText,
}: Props) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
