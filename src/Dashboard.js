import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@shopify/polaris';
import axios from 'axios'
import { Page, Card, DataTable } from '@shopify/polaris';
import { ProductsMinor } from '@shopify/polaris-icons';
import { InventoryMajor } from '@shopify/polaris-icons';
import { Select } from '@shopify/polaris';
import {Button} from '@shopify/polaris';
import {Frame, Loading} from '@shopify/polaris';
import Selectfunction from './Selectfunction';


export default function Dashboard(props) {
    var tempstr='';
    
    const arr1=['user_id' , 'catalog' , 'username' ,'shops.email','shopify_plan','updated_at','created_at','shop_url']
    var x =[];
    const [filterSelect, setFilterSelect]=useState(['','','','','','','','','']);
    const[filterTextName,setFilterTextName]=useState(['','','','','','','','','','']);
    const [filtertextinput,setFiltertextinput]=useState(['','','','','','','','','','']);
    const[loading , setLoading]=useState(false)
    const[filter , setFilter]=useState([])
    const[filterpara1 , setFilterpara1]=useState()
    const[filterpara2 , setFilterpara2]=useState(1)
    const[filterpara3 , setFilterpara3]=useState()
    const[flag , setFlag]=useState(false)
    var appendvalue=[];
    const[appendstate , setAppendstate]=useState([])
    const buttonref= useRef([])
    const from = useRef()
    const to = useRef();
    const[user , setUser] =useState()
    const[rows1 , setRows1 ]=useState([])
    const[count1 , setCount1]=useState(1)
    const [selected, setSelected] = useState(10);
    const options1 = [
        { label: '10', value: '10' },
        { label: '20', value: '20' },
        { label:'30', value: '30' },
        { label:'40', value: '40' },
    ];

    const changepage=(e)=>{
        if(e.target.innerText ==="Prev"){
            if(count1>2){
                setCount1(count1 - 1)
            }
          }
          if(e.target.innerText==="Next"){
            if(count1<Math.ceil(user/selected)){
                setCount1(count1 + 1)
            }
          }
          to.current = selected * count1;
          from.current = to.current - selected;
    }
    useEffect(()=>{
        to.current = selected * count1;
        from.current = to.current - selected;
    },[])
    const getData=(val , i)=>{
        // f1.push(arr1[i])
        // f2.push(val)
        let f1=filterSelect;
        f1[i]=val
        let f2=filterTextName;
        f2[i]=arr1[i]
        // filterSelect[i]=val;
        setFilterSelect([...f1])
        setFilterTextName([...f2])
        // filterTextName[i]=arr1[i]
        
         x[i] = val;
         setFilter(x)
         setFilterpara1(arr1[i])
         setFilterpara2(val)
        //  console.log(x)
        // console.log(f1)
        // console.log(filterSelect)
        // console.log(filterTextName)
     
    }
  
    const inputvalue=(e)=>{
        let x = arr1[Number(e.target.id)]
         setFilterpara1(x)
         setFilterpara3(e.target.value)
         setFlag(true)
         let f3=filtertextinput;
         f3[Number(e.target.id)]=e.target.value
         setFiltertextinput([...f3])
        //  filtertextinput[Number(e.target.id)]=e.target.value
        //  console.log(filtertextinput)
        
        //  console.log(appendvalue)
    }
    const handler2= async ()=>{
     
        // console.log(appendvalue)
        setLoading(true)
        filterSelect.map((d , index)=>{
        //    console.log(filterSelect)
            if(d!=''){
                tempstr+=`&filter[${arr1[index]}][${d}]=${filtertextinput[index]}`
            }
            
        })
        const response2 = await axios(` https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${count1}&count=${selected}${tempstr}`, {
        headers: {
                authorization: sessionStorage.getItem('token')
            }
        })
        
        setUser(response2.data.data.count)
        response2.data.data.rows.map((d) => {
            rows.push([d.user_id, d.catalog, d.username, d.email, d.shopify_plan, d.updated_at, d.created_at, d.shop_url])
        })
       setRows1(rows)
       setLoading(false)
       setFlag(false)
    }
    useEffect(()=>{
        // appendvalue.push(filterpara1 , filterpara2 , filterpara3)
        // setAppendstate([...appendstate] , appendvalue)
        // console.log(appendstate)
        // console.log(appendvalue)
        const timer= setTimeout(
            handler2,1000)
          return(()=>{
            clearTimeout(timer)
          })
   
        // handler2();
       
    },[flag])

    // var rows = useMemo(()=>{
    //     let t = []
    //     Array(8).fill(0).map((item , i)=>{
    //         let tt = []
    //         let ttt = <Selectfunction getData = {getData} ind = {i} />
    //         tt.push(ttt)
    //         t.push(tt)
    //     },[])
    //     return [t]
    // })

    // console.log(buttonref.current)

    var rows = [
        [ 
            [   <Selectfunction getData={getData}  ind={0}/>,
                 <input  placeholder="user_id" autoComplete="off" onKeyUp={inputvalue} ref={el => buttonref.current[0] = el} id="0"/> 
            ] ,
            [   <Selectfunction getData={getData}  ind={1}/>,
                 <input  placeholder="Catalog" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="1"/> 
            ] ,
            [   <Selectfunction getData={getData}  ind={2}/>,
                 <input  placeholder="username" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="2"/> 
            ] ,
            [
                <Selectfunction getData={getData}  ind={3}/>,
                // <Select onChange={selectfun} options={options} value={filter} />,
                 <input  placeholder="email" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="3"/> 
            ] ,
            [
                <Selectfunction  getData={getData}  ind={4}/>,
                // <Select onChange={selectfun} options={options} value={filter} />,
                 <input  placeholder="shopify_plan" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="4"/> 
            ] ,
            [
                <Selectfunction getData={getData}  ind={5}/>,
                // <Select onChange={selectfun} options={options} value={filter} />,
                 <input  placeholder="updated_at" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="5"/> 
            ] ,
            [
                <Selectfunction getData={getData}   ind={6}/>,
                // <Select onChange={selectfun} options={options} value={filter} />,
                 <input  placeholder="created_at" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="6"/> 
            ] ,
            [
                <Selectfunction getData={getData}  ind={7}/>,
                // <Select onChange={selectfun} options={options} value={filter} />,
                 <input  placeholder="shop_url" autoComplete="off" onChange={inputvalue} ref={el => buttonref.current[0] = el} id="7"/> 
            ] 

            
        ],
    ];

    const handleSelectChange = useCallback((value) => {
        setSelected(value)
      },[]);

    useEffect(() => {
        setLoading(true)
        const handler1 = async () => {
            rows.splice(1 , rows.length)   
            const response1 = await axios(` https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${count1}&count=${selected}`, {
                headers: {
                    authorization: sessionStorage.getItem('token')
                }
            })
            setUser(response1.data.data.count)
            response1.data.data.rows.map((d) => {
                rows.push([d.user_id, d.catalog, d.username, d.email, d.shopify_plan, d.updated_at, d.created_at, d.shop_url])
            })
           setRows1(rows)
           setLoading(false)
        
       }
    //    console.log("1")

        handler1();
        to.current = selected * count1;
        from.current = to.current - selected;
    },[ selected , count1 ])
//     useEffect(()=>{
//           const handlerfilter= async()=>{
//             const response1 = await axios(` https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${count1}&count=${selected}`, {
//                 headers: {
//                     authorization: sessionStorage.getItem('token')
//                 }
//             })
//             setUser(response1.data.data.count)
//             response1.data.data.rows.map((d) => {
//                 rows.push([d.user_id, d.catalog, d.username, d.email, d.shopify_plan, d.updated_at, d.created_at, d.shop_url])
//             })

//           }
//           handlerfilter();
//           console.log("2")
           
           
//    setFlag(false)
//     },[flag])
console.log(filterSelect)
console.log(filterTextName)
console.log(filtertextinput)
    return (<>
    <div id="navbar_div_id">DASHBOARD</div>
        <div id="dashboard_products_main_div_id">
            
            <div id="inner_dashboard_div_1">
                <p className="p1"><Icon
                    source={InventoryMajor}
                    color="base"
                /><span>Dashboard</span></p>
                <p className="p1"><Icon
                    source={ProductsMinor}
                    color="base"
                /><span>Products</span></p><p className="p1"><Icon
                    source={ProductsMinor}
                    color="base"
                /><span>Grid</span></p>
            </div>
            <div id="inner_dashboard_div_2">
                {loading===true?<div style={{height: '100px'}}>
      <Frame>
        <Loading />
      </Frame>
    </div>:""}
                <h1 id="h1">
                    Data Grid
                </h1>
                <h2 id="h2">
                    Showing from {from.current} to {to.current} of {user} users
                </h2>
                <div>
                    <div id="buttons_and_select_div_id">
                        <div>
                            <Button id="btn1" onClick={changepage}>Prev</Button><span id="count_span_id">{count1}</span><Button id="btn2" onClick={changepage}>Next</Button></div>
                        <div><Select
                        placeholder="Rows per page"
                        options={options1}
                        onChange={handleSelectChange}
                        value={selected}
                    />
                          </div>
                          <div>
                            <Button>View Coulumns</Button>
                          </div>
                                        </div>
                    
                    <Page title="User Details">
                        <Card>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'numeric',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                ]}
                                headings={[
                                    'UserId',
                                    'Catalog',
                                    'Shop Domain',
                                    'Shop Email',
                                    'Shop Plan name',
                                    'Updated at',
                                    'Created at',
                                    'Shop myShopify Domain '

                                ]}
                                rows={rows1}
                            />
                        </Card>
                    </Page>
                </div>
            </div>
        </div>
        </>
    )
}
