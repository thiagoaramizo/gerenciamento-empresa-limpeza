import { Copy } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

interface CopyCellProps {
    value: string
    formatedValue?: string
}

export default function CopyCell ({value, formatedValue}: CopyCellProps) {
    return (
        <div className="flex items-center group">
          <span>{formatedValue || value}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button 
                  className="w-fit px-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 active:text-primary active:scale-110"
                  onClick={ () => navigator.clipboard.writeText(value)}
                >
                  <Copy size={16} />
                  <span className="sr-only">Copiar</span>
              </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Clique para copiar</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>  
        </div>
      )
}