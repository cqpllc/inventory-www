import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useColorMode
} from '@chakra-ui/react';

export interface LoginFormValues {
  email: string
  password: string
}

export interface LoginPageProps {
  isLoading: boolean
  onSubmit: (val: LoginFormValues) => any
}

export function LoginPage({ isLoading, onSubmit }: LoginPageProps) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'}
      align="center"
      justify="center"
      h="100vh"
    >
      <Box
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        p={6}
        rounded="md"
        w="md"
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  colorScheme="cyan"
                  width="full"
                >
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
