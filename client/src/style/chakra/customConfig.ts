import { StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// https://themera.vercel.app/
const colors = {
  brand: {
    '50': '#E7F2FE',
    '100': '#BBDBFB',
    '200': '#90C4F9',
    '300': '#64ACF7',
    '400': '#3895F5',
    '500': '#0D7EF2',
    '600': '#0A65C2',
    '700': '#084B91',
    '800': '#053261',
    '900': '#031930',
  },
};

const bodyFontFamily = `-apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue',
sans-serif`;

const fonts = {
  heading: bodyFontFamily,
  body: bodyFontFamily,
};

const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.50', 'gray.800')(props),
      lineHeight: 'base',
    },
  }),
};

const components = {
  Button: {
    borderRadius: '2rem',
  },
  FormLabel: {
    fontSize: '0.5rem',
  },
};

const customConfig = {
  breakpoints,
  colors,
  components,
  fonts,
  styles,
};

export default customConfig;
