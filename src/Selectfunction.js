import React, { useState } from 'react'
import { Select } from '@shopify/polaris'
// import {TextField} from '@shopify/polaris';

export default function Selectfunction(props) {
const[filter , setFilter]=useState()
    const options = [
        { label: "Equals", value: "1" },
        { label: "Not Equals", value: "2" },
        { label: "Contains", value: "3" },
        { label: "Does Not Contains", value: "4" },
        { label: "Starts With", value: "5" },
        { label: "Ends With", value: "6" },
     ]      
    const selectfun = (e) => {
      props.getData(e , props.ind)
      setFilter(e)
   
   };

  return (
    <>
    <Select onChange={selectfun}  options={options} value={filter} />
    {/* <TextField  placeholder="user_id" autoComplete="off"/>  */}
    </>
  )
}
