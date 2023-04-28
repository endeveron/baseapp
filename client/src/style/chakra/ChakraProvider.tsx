import {
  ColorModeScript,
  Container,
  ChakraProvider as Provider,
} from '@chakra-ui/react';

import { WithChildren } from 'common/types';
import theme from 'style/chakra/theme';

const ChakraProvider = ({ children }: WithChildren) => (
  <Provider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Container maxW="container.xl">{children}</Container>
  </Provider>
);

export { ChakraProvider };
