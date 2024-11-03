import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const[data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(false);

useEffect(()=>{
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error("failed to fetch")
            }
            const result = await response.json();
            setData(result.data || result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
},[url]);
   return{
    data,
    error,
    loading
   }; 
};

export default useFetch