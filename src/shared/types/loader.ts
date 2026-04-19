export type TextureMappingKey = string;

export interface LoadingState {
    progress: number;
    isComplete: boolean;
    onEnter: () => void;
}
