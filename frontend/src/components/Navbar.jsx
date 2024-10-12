import { Box, Flex, Button, Heading, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="white.500" px={4} py={3}>
      <Flex alignItems="center" maxW="container.xl" mx="auto">
        <Heading as="h1" size="lg" color="black">
          <RouterLink to="/">utor.io</RouterLink>
        </Heading>
        <Spacer />
        <Button as={RouterLink} to="/" colorScheme="blue" variant="ghost" mr={3}>
          Home
        </Button>
        <Button as={RouterLink} to="/create" colorScheme="blue" variant="ghost">
          Create Entry for Tutor
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
