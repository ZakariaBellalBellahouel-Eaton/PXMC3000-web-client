import axios from 'axios';
import { useState, useEffect } from 'react'

const basicurl = process.env.ApiUrl || ''; 


export function useGetDeviceInformation() {
    console.log("Yeh I hit the useGetDeviceInformation")
    const getDeviceInformationUrl = basicurl + '/api/v1/DeviceInformation';
    const [deviceinformations, setDeviceInformation] = useState(null);


    useEffect(() => {
        axios.get(getDeviceInformationUrl)
            .then(response => {
                setDeviceInformation(response.data)
                console.log("I'm inside the get")
                console.log("This is the Data : ", response.data)
                console.log("This is the Header : ", response.headers)
                console.log("This is the Status : ", response.status)
                console.log("This is the Status Text : ", response.statusText)
                console.log("This is the Status config : ", response.config)
                console.log("This is the Status Request : ", response.request)

            })
            .catch(function (error) {
                console.log("I'm inside the catch")
                if (error.response) {
                    // Request made and server responded
                    console.log("Inside error.response");
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log("Inside error.request");

                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    console.log("Inside error.Message");
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            }).finally(
                response => {
                    console.log("I'm at the finally part")
                    console.log("the header : " + response.headers)
                    console.log("the Message : " + response.message)
                }

            )
    }, [getDeviceInformationUrl]);
    return (deviceinformations);

}
