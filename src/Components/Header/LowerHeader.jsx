import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css"


function LowerHeader() {
  return (
    <div className={classes.lower_container}>

        <ul>
            <li><AiOutlineMenu /></li>
            <li>Today'd Deals</li>
            <li>Costumer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader