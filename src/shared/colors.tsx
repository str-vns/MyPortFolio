import { useDarkMode } from "@_/stores/useDarkMode";

interface ColorsTheme {
    LIGHTGREY: string;
    MEDIUMGREY: string;
    NAVYBLUE: string;
    SEMIBLACK: string;
    BLACK: string;
    TEXT: string;
    BUTTON?: string; 
    HOVERBUTTON?: string;
    HOVERTEXT?: string;
}
 const colorsThemeLight: ColorsTheme    = {
    LIGHTGREY: '#F1EFEC',
    MEDIUMGREY: '#D4C9BE',
    NAVYBLUE: '#123458',
    SEMIBLACK: '#030303',
    BLACK: '#000000',
    TEXT: '#F1EFEC',
    BUTTON: '#123458',
    HOVERBUTTON: '#D4C9BE',
    HOVERTEXT: '#030303',
} 
 const colorsThemeDark: ColorsTheme = {
    LIGHTGREY: '#000000',
    MEDIUMGREY: '#FFDEDE',
    NAVYBLUE: '#CF0F47',
    SEMIBLACK: '#FFDEDE',
    BLACK: '#000000',
    TEXT: '#FFDEDE',
    BUTTON: '#CF0F47',
    HOVERBUTTON: '#FF0B55',
    HOVERTEXT: '#000000',
}


export const useColorsTheme = () => {
  const { isDarkMode } = useDarkMode();

  return isDarkMode ? colorsThemeDark : colorsThemeLight;
};