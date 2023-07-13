import { HStack } from '@chakra-ui/react'
import React from 'react'
import { Card, Heading } from "@chakra-ui/react"
import { CardHeader } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const cart = (wishlist) => {
console.log(wishlist)


  return (

    <div>
      {/* printing stocks in whishlist using chakra ui */}
      <Card>
        <CardHeader w={'full'} justifyItems={'center'} fontSize={'30'}>Stocks in Your wishList</CardHeader>
        {
          // if length of wishlish is zero then show there is no stock in your wishlist else show stocks
          wishlist?.length === 0 ? <CardHeader w={'full'} justifyContent={'center'}>There is no stock in your wishlist</CardHeader> :
            wishlist.wishlist.map((stock) => (
              <HStack bgColor={'purple.600'} w={'full'} justifyContent={'space-evenly'}mb={'5'} p={'2'} borderRadius={'md'}>
                <Heading color={'white'}>{stock.symbol}</Heading>
                <Heading color={'white'}>{stock.name}</Heading>
                <Heading color={'white'}>{stock.exchange}</Heading>

                <Button colorScheme='purple'><Link to ={`timeseries/${stock.symbol}`} >TimeSeries Data</Link></Button>

              </  HStack>
            ))

        }

      </Card>


    </div>
  )
}

export default cart
