import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@_/components/ui/accordion";
import type { AccordionItems } from "@_/types/extend";
import { useDarkMode } from "@_/stores/useDarkMode";

interface AccordionProps {
  items?: AccordionItems;
}

import React from "react";

const Accordions: React.FC<AccordionProps> = ({ items }) => {
const { isDarkMode } = useDarkMode();
  return (
    <Accordion type="single" collapsible >
      <AccordionItem value={`item-${items?.key || '1'}`}>
        <AccordionTrigger className={`ml-82 lg:ml-105  ${isDarkMode ? 'text-[#FFDEDE]' : 'text-[#F1EFEC]'}`}>View More</AccordionTrigger>
        <AccordionContent className={`text-[16px] text-gray-500 ${isDarkMode ? 'text-[#FFDEDE]' : 'text-[#F1EFEC]'}`}>
            <div>
            <h3 className="text-lg font-semibold mt-2">Programming Language</h3>
           {items?.pLanguages && items?.pLanguages.length > 0 && (
            <p className="text-lg mb-2">
                {items?.pLanguages.map((lang: string, index: number) => (
                  <p key={index}>{lang}</p>
                ))}
            </p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Features:</h3>
            {items?.features && items?.features.length > 0 && (
            <ul className="list-disc pl-5 ">
                {items.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
            )}
          </div>

           <div>
            <h3 className="text-lg font-semibold mt-2">Tools:</h3>
           {items?.tools && items?.tools.length > 0 && (
            <ul className="list-disc pl-5">
                {items?.tools.map((tool: string, index: number) => (
                  <li key={index}>{tool}</li>
                ))}
            </ul>
            )}
          </div>
          
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default Accordions;
