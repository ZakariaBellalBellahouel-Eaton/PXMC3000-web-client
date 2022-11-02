import axios from 'axios';
import { useState, useEffect } from 'react'


export function useGetDeviceInformation() {
    console.log("Yeh I hit the useGetDeviceInformation")
    const getDeviceInformationUrl = '/DeviceInformation';
    const [deviceinformations, setDeviceInformation] = useState(null);


    useEffect(() => {
        axios.get(getDeviceInformationUrl)
            .then(response => {
                setDeviceInformation(response.data)
                console.log("I'm inside the get")
                console.log(response.data)
            })
            .catch(function (error) {
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
            })
    }, [getDeviceInformationUrl]);
    return (deviceinformations);

}
