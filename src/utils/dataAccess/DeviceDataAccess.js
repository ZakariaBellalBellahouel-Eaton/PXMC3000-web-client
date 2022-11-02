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
            })
    }, [getDeviceInformationUrl]);
    return (deviceinformations);

}
