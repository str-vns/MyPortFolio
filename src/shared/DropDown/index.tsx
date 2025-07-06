import * as React from "react"

import { Button } from "@_/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@_/components/ui/dropdown-menu"
import { dropdownOptions } from "@_/data/InputsData"

interface DropdownMenuCheckboxesProps {
  isDarkMode?: boolean;
  isCategory?: string;
  returnVal: (value: string) => void;
}

interface DropdownOptions {
    value: string;
    label: string;
}

export const DropdownMenuCheckboxes: React.FC<DropdownMenuCheckboxesProps> = ({ isCategory, returnVal, isDarkMode }) => {
   const [category, setCategory] = React.useState("")
   
    React.useEffect(() => {
      if (isCategory) {
        setCategory(isCategory)
      }
    }, [isCategory])

   const handleCategoryChange = (selected: string) => {
     setCategory(selected)
     returnVal(selected)
   }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`bg-black text-[${isDarkMode ? "#FFDEDE" : "#F1EFEC"}] px-15`}>
            {category || "Open"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={category} onValueChange={handleCategoryChange}>
          {dropdownOptions.map((option: DropdownOptions) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}