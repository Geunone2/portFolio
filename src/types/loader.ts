/**
 * 텍스처 매핑 키 타입
 * from: src/load/textureConfig.ts
 */
export type TextureMappingKey = string;

/**
 * 로딩 상태
 */
export interface LoadingState {
    progress: number;
    isComplete: boolean;
    onEnter: () => void;
}