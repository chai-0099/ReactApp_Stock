import React from 'react'
//import axios
import axios from 'axios'
//import the useState hook
import { useState } from 'react'
//import the useEffect hook
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, HStack, VStack, Heading } from '@chakra-ui/react'


const Stocks = ({addToWishList}) => {

  //create a state variable for the stocks
  const [stocks, setStocks] = useState([])
  //create a navigate function
  const navigate = useNavigate()
  //create a state variable for loading
  const [loading, setLoading] = useState(true)
  //create a state variable for country
  const [country, setCountry] = useState('India')

//implement a handleclick function to fetch the stocks based on the country using useNavigate

  const handleClick = (symbol) => {
    console.log(symbol)
    navigate(`/timeseries/${symbol}`)
  }

  //use the useEffect hook to fetch the stocks
  useEffect(() => {
    setLoading(true)
    //make a get request to fetch the stocks
    axios.get(`https://api.twelvedata.com/stocks?country=${country}?`)

      .then((res) => {
        //once the data is received, update the state variable and set loading to false
        setStocks(res.data.data)
        console.log(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        //if there is error, set the loading to false
        setLoading(false)
      })
  }, [country])
  console.log(stocks)


  return (
 //add a container with width full max width full and margin top 2
    <Container maxW="full" mt="2">
      {/*Add a hStack with with full width and content display space evenly*/}
      <HStack w="full" justifyContent="space-evenly">
        {/*Add a button of purple color with onclick function to fetch the stocks based on the country*/}
        <button onClick={() => setCountry('India')} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>India</button>
        {/*Add a button of purple color with onclick function to fetch the stocks based on the country*/}
        <button onClick={() => setCountry('United States')} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>United States</button>
        {/*Add a button of purple color with onclick function to fetch the stocks based on the country*/}
        <button onClick={() => setCountry('United Kingdom')} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>United Kingdom</button>
        {/*Add a button of purple color with onclick function to fetch the stocks based on the country*/}
        <button onClick={() => setCountry('Canada')} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>Canada</button>
        {/*Add a button of purple color with onclick function to fetch the stocks based on the country*/}
        <button onClick={() => setCountry('Germany')} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>Germany</button>
        {/*Add a button of purple color with onclick function to fetch the stocks based on the country*/}
        <button onClick={() => setCountry('F0rance')} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>France</button>
      </HStack>

      {/*Add a container to display the stocks with margin auto*/}
      <Container maxW="container.xl" mt="2"  >
        {/*Add a heading to display the stocks with color white*/}
        <h1 style={{ color: 'Black' }}>Stocks in {country}</h1>
        </Container>
{/*Add the loading state variable to display the loading message*/}
      {
        loading ? <h1>Loading...</h1> :<>
        
        {/*Add a HStack with wrap as wrap and justify content as space evenly*/}
        <HStack w="full" wrap="wrap" justifyContent="space-evenly">
          {/*Implement a map function to display the stocks*/}
          {
            stocks.map((stock) => {
              return (
                //add a Vstack with width 300px and height 300px and border radius 10px and margin 2px and padding 2px
                <VStack w="300px" h="200px" borderRadius="10px" m="2px" p="2px" bg="purple.300">
                  {/*Add a heading to display the stock name with color white*/}
                  <Heading style={{ color: 'white' }}>{stock.symbol}</Heading>
                  {/*Add a heading to display the stock symbol with color white*/}
                  <h1 style={{ color: 'white' }}>{stock.sname}</h1>
                  {/*Add a HStack to display the stock exchange with color white*/}
                  <HStack>
                  <h1 style={{ color: 'white' }}>Country:</h1>
                    <h1 style={{ color: 'white' }}>{stock.country}</h1>
       
                  </HStack>
                  {/*Add a HStack to display the stock country with color white*/}
                  <HStack>
                  <h1 style={{ color: 'white' }}>Exchange:</h1>
                    <h1 style={{ color: 'white' }}>{stock.exchange}</h1>
                    <h1 style={{ color: 'white' }}>Currency:</h1>
                    <h1 style={{ color: 'white' }}>{stock.currency}</h1>
                  </HStack>
                 {/*Add a HStack buttons to navigate to timeseries and cart using handleclick*/}
                  <HStack>
                    <button onClick={() => handleClick(stock.symbol)} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>Time-Series</button>
                    <button onClick={() =>  addToWishList(stock)} style={{ backgroundColor: 'purple', color: 'white', padding: '10px', borderRadius: '10px' }}>Add to Cart</button>
                  </HStack>
                  
                
                </VStack>
              )
            })
          }


          </HStack>
        
        </>
      }
    </Container>
  );
}

export default Stocks