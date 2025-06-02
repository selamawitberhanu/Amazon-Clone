import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import {auth} from "./Utility/firebase";
import { Type } from "./Utility/action.type.js";
import { DataContext } from "./Components/DataProvider/DataProvider";
function App() {
const {state , dispatch} = useContext(DataContext);
const {user} = state;
useEffect(()=>{
auth.onAuthStateChanged(async ()=>{
  if(user)
    {
 dispatch({
  type: Type.SET_USER_KEY, 
  user: user
 })
  }
  else{
    dispatch({
  type: Type.SET_USER_KEY, 
  user: null
 })
  }
})
}, [])

  return <Routing />


    // <div className="App">
    //   <Header />
    //   {/* <Test1 />
    //   <br />
    //   <Test2 /> */}
    //   <Carousel />
    //   <Category />
    //   <Product />
    // </div>
  
}

export default App;
