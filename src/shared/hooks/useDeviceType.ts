import { useState, useEffect } from 'react';
import { getDeviceType, type DeviceType } from '../config/breakPoints';

export function useDeviceType(): DeviceType {
    const [deviceType, setDeviceType] = useState<DeviceType>(() =>
        getDeviceType(window.innerWidth)
    );

    useEffect(() => {
        const handleResize = () => {
            const newDeviceType = getDeviceType(window.innerWidth);
            setDeviceType(newDeviceType);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceType;
}
