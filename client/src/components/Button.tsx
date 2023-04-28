import {
  ButtonProps as ChakraButtonProps,
  Button as ChakraButton,
} from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps & {
  className?: string;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <ChakraButton
      borderRadius="2rem"
      className={className}
      fontWeight={500}
      colorScheme="brand"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export { Button };
