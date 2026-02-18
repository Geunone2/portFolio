/**
 * 반응형 브레이크포인트 (Tailwind와 동일한 값)
 */
export const BREAKPOINTS = {
    MOBILE_MAX: 767,
    TABLET_MIN: 768,
    TABLET_MAX: 1279,
    DESKTOP_MIN: 1280
} as const;

/**
 * 디바이스 타입
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * 디바이스별 FOV (Field of View) 설정
 */
export const DEVICE_FOV = {
    mobile: 75,
    tablet: 60,
    desktop: 50
} as const;

/**
 * 현재 화면 너비로 디바이스 타입 판단
 */
export function getDeviceType(width: number): DeviceType {
    if (width <= BREAKPOINTS.MOBILE_MAX) return 'mobile';
    if (width <= BREAKPOINTS.TABLET_MAX) return 'tablet';
    return 'desktop';
}