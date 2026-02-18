import {useState, useEffect} from 'react';
import {getDeviceType, type DeviceType} from '../data/breakPoints';

/**
 * 현재 화면 크기에 따른 디바이스 타입을 반환하는 Hook
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
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