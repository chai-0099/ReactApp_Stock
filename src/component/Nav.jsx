import { Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, HStack } from "@chakra-ui/react"

function nav() {
  return (
//add a container to the nav bar with full width, top margin and color purple
    <Container maxW="full" mt="0" bg="purple.500">
      {/*Add a horizontal stack to the container with spacing 4 and padding 4 with two buttons rot to home and cart*/}
      <HStack spacing="4" p="2" justifyContent={'space-between'}>
        <Link to="/">
          <Button colorScheme="white" >
       StockWatch
          </Button>
        </Link>
        <Link to="/cart">
          <Button colorScheme="white">
            Wishlist
          </Button>
        </Link>
      </HStack>
      </Container>
  )
}

export default nav