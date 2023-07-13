import React from 'react';
//import BrowserRouter as Router, Route, Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import Stocks component'
import Stocks from './component/Stocks';
//import Nav component
import Nav from './component/Nav';
//import Cart component
import Cart from './component/Cart';
//import Timeseries component
import TimeSeries from './component/TimeSeries';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToast } from "@chakra-ui/react"

function App() {

//add usestate variable to add wishlist
const [wishlist, setWishlist] = useState([]);

//add usetoast hook
const toast = useToast();

//fetch wishlist data from the backend server using get request
useEffect(() => {
  axios.get('http://localhost:5000/wishlist')
  .then((response) => {
    console.log(response.data);
    setWishlist(response.data.wishlist);
  })
  .catch((error) => {
    console.log(error);
  })
}, []);


//create a function to make a api put call sending wishlist data to the backend server
const updateWishList = () => {
  axios.put('http://localhost:5000/wishlist', {wishlist: wishlist})
  .then((response) => {
    console.log(response.data);
    toast({
      title: "Wishlist Updated",
      description: "Your wishlist has been updated successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  })
  .catch((error) => {
    console.log(error);
    toast({
      title: "Wishlist Update Failed",
      description: "Your wishlist update has failed",
      status: "error",
      duration: 2000,
      isClosable: true,
    })
  })
}


//create a function to add a stock to the wishlist
const addToWishList = (stock) => {
  //check if the stock is already in the wishlist
  if (wishlist?.find((wishlistItem=> wishlistItem.symbol === stock.symbol))) {
    toast({
      title: "Stock already in wishlist",
      description: "The stock you are trying to add is already in the wishlist",
      status: "error",
      duration: 2000,
      isClosable: true,
    })
    return;
  }
  //add the stock to the wishlist

  const newWishlist = [...wishlist, stock];
  setWishlist(newWishlist);

  //update the wishlist on the backend server
  updateWishList();
}
  return (
    <div>
    {/*Create the routes for the app*/}
    <Router>
      {/*Create the nav bar*/}
      <Nav />
      {/*Create the routes for the app*/}
      <Routes>
        {/*Create the route for the home page*/}
        <Route path="/" element={<Stocks  addToWishList= { addToWishList}/>} />
        {/*Create the route for the cart page*/}
        <Route path="/cart" element={<Cart wishlist={wishlist} />} />
        {/*Create the route for the timeseries page*/}
        <Route path="/timeseries/:id" element={<TimeSeries />} />
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
