import React, { useState } from 'react'
import axios from 'axios'
import {Button} from '@shopify/polaris';
import {TextField} from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const[username , setUsername]=useState()
    const[password , setPassword]=useState()
    
    const navigate = useNavigate();
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA";

    const fetchapi_fun= async ()=>{
      try{
        const response = await axios(`https://fbapi.sellernext.com/user/login?username=${username}&password=${password}` , {headers:{
            authorization:token
          }})
          //  console.log(response)
          sessionStorage.setItem('token' , response.data.data.token)
          if(response.data.success===true){
           navigate("/dashboard")
        }
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div id="main_div_id_login_page">
        <div id="inner_div_id">
        <TextField
      label="Username"
      value={username}
      onChange={(e)=>setUsername(e)}
      autoComplete="off"
    />
     <TextField
      label="Password"
      value={password}
      onChange={(e)=>setPassword(e)}
      autoComplete="off"
    />
           
            <Button onClick={()=>fetchapi_fun()} primary>Login</Button>

        </div>
    </div>
  )
}
