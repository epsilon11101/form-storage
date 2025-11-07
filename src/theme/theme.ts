import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { esES } from '@mui/material/locale';
import { esES as DPesEs } from '@mui/x-date-pickers/locales';

import { createTheme, type Palette, type PaletteColor } from '@mui/material/styles'

import {
  PRIMARY,
  SECONDARY,
  TERTIARY,
  ACCENT,
  TITLE_OUTLINE,
  ERROR,
  WARNING,
  INFO,
  SUCCESS,
  FOCUS,
} from '@/theme/colors'

import { type CSSProperties } from 'react'



// Define custom types for palette keys
export type PaletteKey = keyof {
  [Key in keyof Palette as Palette[Key] extends PaletteColor
  ? Key
  : never]: true
}
// Extend Palette and PaletteOptions interfaces to include custom color keys
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
    accent: Palette['primary']
    titleOutline: Palette['primary']
    focus: Palette['primary']
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
    accent?: PaletteOptions['primary']
    titleOutline?: PaletteOptions['primary']
    focus?: PaletteOptions['primary']
  }
}
// Define component-specific color props
// interface ComponentColorProps {
//   tertiary?: true
//   focus?: true
//   accent?: true
//   titleOutline?: true
// }
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary?: true
    focus?: true
    accent?: true
    titleOutline?: true
  }
}
declare module '@mui/x-date-pickers/DatePicker' {
  interface DatePickerPropsColorOverrides {
    tertiary?: true
    focus?: true
    accent?: true
    titleOutline?: true
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    tertiary?: true
    focus?: true
    accent?: true
    titleOutline?: true

  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    tertiary?: true
    focus?: true
    accent?: true
    titleOutline?: true
  }
}
// TYPOGRAPHY VARIANTS
declare module '@mui/material/styles' {
  interface TypographyVariants {
    display: CSSProperties
    navLink: CSSProperties
    link: CSSProperties
    body: CSSProperties
    bodyImp: CSSProperties
    info: CSSProperties
    textTitles: CSSProperties
  }

  interface TypographyPropsColorOverrides {
    tertiary?: true
    focus?: true
    accent?: true
    titleOutline?: true
  }
  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    display?: CSSProperties
    navLink?: CSSProperties
    link?: CSSProperties
    body?: CSSProperties
    bodyImp?: CSSProperties
    info?: CSSProperties
    textTitles?: CSSProperties

  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true
    navLink: true
    link: true
    body: true
    bodyImp: true
    info: true
    textTitles: true
  }
}

/**
 * Function to create and customize MUI theme based on current locale.
 * @returns Customized MUI theme object.
 */
export const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body: 'p',
          bodyImp: 'p',
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: 42,
      fontWeight: 700,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    h2: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: 38,
      fontWeight: 700,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    h3: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: 30,
      fontWeight: 700,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    h4: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: 22,
      fontWeight: 700,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    button: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontWeight: 500,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    navLink: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 18,
      fontWeight: 600,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    link: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    body: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#646464",
    },
    bodyImp: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    info: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    caption: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    textTitles: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontSize: 10,
      fontWeight: 400,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },
    display: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: 38,
      fontWeight: 400,
      lineHeight: "normal",
      fontStyle: "normal",
      color: "#101010",
    },

  },
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
    tertiary: TERTIARY,
    error: ERROR,
    success: SUCCESS,
    warning: WARNING,
    info: INFO,
    focus: FOCUS,
    accent: ACCENT,
    titleOutline: TITLE_OUTLINE,
  }
}, esES, DPesEs)
