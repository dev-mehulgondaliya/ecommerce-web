import React from 'react'
import ShowToast from '../shared/ShowToast';

async function fetchApi({apiName, method, body, auth=false}) {
    let response;
    if(method.toUpperCase() === 'GET'){
        response = await fetch(apiName)
    }else{
        response = await fetch(apiName,{
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }
   
    if(response.status === 200){
        const data = await response.json()
        alert(data.message)
        return data
    }
    else{
        const data = await response.json()
        alert(data.message)
        throw new Error('Something went wrong')
    }
}

export default fetchApi