import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchDataStatus = (url:string) => {
//משתנים שאותם אני אחזיר
const[isLoading,setLoading] = useState(false)
const[data,setData]=useState<any>(null)
const[error,setError]=useState<any>(null)
// יכנס לכאן תקרה בכל פעם שמשנה הניתוב
useEffect(()=>{
   setLoading(true)
         axios.get(url).then((response)=>{
         setData(response.data)
         })
         .catch((err)=>{
            setError(err)
         })
         .finally(()=>{
            setLoading(false)
         })
        }
    ,[url])
    return {isLoading,data,error}
}

export default useFetchDataStatus


