import React, { useContext } from 'react';
import classes from "./Header.module.css"
import {Link} from 'react-router-dom'

import { MdOutlineLocationOn } from "react-icons/md";

import {BsSearch} from "react-icons/bs";
import LowerHeader from './LowerHeader';
import { BsCart2 } from "react-icons/bs";
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

const Header = () => {

    const {state, dispatch}  = useContext(DataContext);
const { basket, user } = state;
  const totalItems = basket?. length ? basket. reduce((sum,item)=>sum + (item.amount|| 0),0) : 0; 

// console.log(useContext(DataContext));
  return (
    <section className={classes.fixed}>
<section className={classes.header_container}>
    
        <div className={classes.logo_container}>
            {/* logo */}
            <Link to ="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </Link>
            <div className={classes.delivery}>
            {/* delivery */}
            <span>
                {/* icon */}
                <MdOutlineLocationOn />
            </span>
            <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
            </div>
            </div>
        </div>
        <div className={classes.search}>
            {/* search */}
            <select name="" id="">
                <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder='search product'/>
            {/* icon */}
        </div>
        {/* right side link */}
        <div className={classes.order_container}>
            <div className={classes.language}>
                 <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US Flag"
            />
                 <section>
                     <option value="">En</option>
                </section>
             </div>
             {/* three components */}
             <Link to={!user && "/auth"}>
            <div>
              {user?(
                <>
                  <p>Hello, {user?.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Sign out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign in</p>
                  <span>Account & list</span>
                </>
              )}
            </div>
          </Link>
             {/* orders */}
             <Link to ="/orders">
                  <p>returns</p>
             <span className={classes.bold}>& Orders</span>
             </Link>
            {/* cart */}
            <Link to={"/cart"} className={classes.cartRapper}>
            {/* icon */}
            <BsCart2 size={25}/>
            <span>{totalItems}</span>
            </Link>
         </div>
     
 </section>
<LowerHeader />
</section>
  )
}

export default Header

