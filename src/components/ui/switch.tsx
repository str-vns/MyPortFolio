import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '../../lib/utils';
import { useDarkMode } from '@_/stores/useDarkMode';
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    { className, checkedIcon, uncheckedIcon, onCheckedChange, ...props },
    ref
  ) => {
    const isControlled = props.checked !== undefined;

    const [internalChecked, setInternalChecked] = React.useState(
      props.defaultChecked ?? false
    );
    const isChecked = isControlled ? props.checked : internalChecked;

    const handleCheckedChange = (checked: boolean) => {
      if (!isControlled) {
        setInternalChecked(checked);
      }
      if (onCheckedChange) {
        onCheckedChange(checked);
      }
    }
    const { isDarkMode } = useDarkMode();
    const effectiveCheckedIcon = checkedIcon;
    const effectiveUncheckedIcon = uncheckedIcon || checkedIcon;
    const icon = isChecked
      ? effectiveCheckedIcon
      : effectiveUncheckedIcon;

    return (
      <SwitchPrimitives.Root
        className={cn(
          `peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
            ${isDarkMode
              ? 'data-[state=checked]:bg-black'
              : 'data-[state=checked]:bg-white'}
            data-[state=unchecked]:bg-white`,
          className
        )}
        onCheckedChange={handleCheckedChange}
        {...props}
        checked={isChecked}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            `pointer-events-none flex h-4 w-4 items-center justify-center rounded-full  shadow-lg ring-0 transition-transform data-[state=checked]-translate-x-0 data-[state=unchecked]:translate-x-0`
          )}
        >
          {icon && (
            <span className='flex items-center justify-center'>
              {icon}
            </span>
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    );
  }
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };