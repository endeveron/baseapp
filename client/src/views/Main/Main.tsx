import { Flex, useColorMode } from '@chakra-ui/react';
import { HeartIcon } from 'components';
import { Button } from 'components';

const Main = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="main view">
      <Flex h="100%" align="center" justify="center" py="4">
        <Button
          onClick={toggleColorMode}
          className="Abc"
          // leftIcon={<HeartIcon boxSize={4} />}
        >
          Toggle Theme to {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Flex>
    </div>
  );
};

export { Main };
