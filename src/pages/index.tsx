import { Button, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function index() {
  return (
    <Flex
      marginX='auto'
      maxWidth='4xl'
      paddingTop='10'
      css={{ height: '100vh' }}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <HStack>
        <Link href='/posts'>
          <Button colorScheme='blue' textTransform='uppercase'>Posts</Button>
        </Link>
      </HStack>
    </Flex>
  );
}
