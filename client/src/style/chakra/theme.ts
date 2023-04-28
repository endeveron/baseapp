import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import customConfig from 'style/chakra/customConfig';

const baseConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config: baseConfig,
  ...customConfig,
});

export default theme;
