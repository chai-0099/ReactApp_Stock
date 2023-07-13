import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { HStack, VStack, Text } from '@chakra-ui/react'



const Timeseries= ()=> {
  //Add useParams to get the symbol from the url
  const { id } = useParams()

  //Add a state variable to store the timeseries data
  const [timeseries, setTimeseries] = useState([])

  //Add a state variable to store the loading state

  const [loading, setLoading] = useState(true)

  //add a state variable to add available stocks

  const [available, setAvailable] = useState([])

  //make a api call to get the timeseries data based on the symbol

  useEffect(() => {
    axios.get(`https://api.twelvedata.com/time_series?symbol=${id}&interval=1min&apikey=0975893c35e04bc59419ad713796a678`)
      .then((res) => {
  //Set the timeseries data to the response data
        setTimeseries(res.data.values)
        //set available to true
        setAvailable(true)
        //add if condition to check if the timeseries data is available
        if (res.data.values===undefined) {
          //set available to false
          setAvailable(false)
        }
        //set loading to false
        setLoading(false)
      })
      .catch ((err) => {
        //set loading to false
        setLoading(false)
        //set available to false
        setAvailable(false)
        //display the error message
        console.log(err)
      })
  }, [id])
console.log(timeseries)
console.log(available)

  return (
<div>

{/* is loading is true then show loading else show the time series data */}
{loading ? <h1>Loading...</h1> : (
  <>
  <HStack mt={'4'} wrap={'wrap'} >
    {/* if available is true then show the time series data else show not available */}
    {available ? (
      <>
{/* map the timeseries datat and show the informations using chakra ui react */}
        {timeseries.map((timeSeriesData) => (

          <HStack shadow={'2px 2px 3px blue'} minW={'329'} maxW={'329'} m={'2'} p={'2'}>
            <VStack>
              <HStack w={'full'}>
                <Text>Open:{timeSeriesData.open}</Text>
                <Text>Close:{timeSeriesData.close}</Text>
                </HStack> 

                <HStack w={'full'}>
                <Text>High:{timeSeriesData.high}</Text>
                <Text>low:{timeSeriesData.low}</Text>
                </HStack> 

                <HStack w={'full'}>
                <Text>datetime:{timeSeriesData.datetime}</Text>
                </HStack>
            </VStack>

          </HStack>
        ))}
      </>
    ) : (
      <h1>Not Available</h1>
    )}
  </HStack>
  </>
)}


</div>
)
}

export default Timeseries
