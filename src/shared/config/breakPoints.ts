export const BREAKPOINTS = {
    MOBILE_MAX: 767,
    TABLET_MIN: 768,
    TABLET_MAX: 1279,
    DESKTOP_MIN: 1280
} as const;

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const DEVICE_FOV = {
    mobile: 75,
    tablet: 60,
    desktop: 50
} as const;

export function getDeviceType(width: number): DeviceType {
    if (width <= BREAKPOINTS.MOBILE_MAX) return 'mobile';
    if (width <= BREAKPOINTS.TABLET_MAX) return 'tablet';
    return 'desktop';
}
