import axios from 'axios';
import { useState, useEffect } from 'react'


export function useGetDeviceInformation() {
    const getDeviceInformationUrl = 'http://127.0.0.1:8000/DeviceInformation';
    const [deviceinformations, setDeviceInformation] = useState(null);


    useEffect(() => {
        axios.get(getDeviceInformationUrl)
            .then(response => {
                setDeviceInformation(response.data)
            })
    }, [getDeviceInformationUrl]);
    return (deviceinformations);

}
