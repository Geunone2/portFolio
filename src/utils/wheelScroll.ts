export interface WheelScrollOptions {
    onScrollUp: () => void;
    onScrollDown: () => void;
    debounceTime?: number;
}

export function createWheelScrollHandler(options: WheelScrollOptions) {
    const {onScrollUp, onScrollDown, debounceTime = 800} = options;

    let isDebouncing = false;
    let debounceTimer: number | null = null;

    const handleWheel = (e: WheelEvent) => {
        if (isDebouncing) return;

        const deltaY = e.deltaY;

        if (Math.abs(deltaY) < 10) return;

        isDebouncing = true;

        if (deltaY > 0) {
            onScrollDown();
        } else {
            onScrollUp();
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = window.setTimeout(() => {
            isDebouncing = false;
            debounceTimer = null;
        }, debounceTime)
    };

    return {
        attach: (element: HTMLElement) => {
            element.addEventListener("wheel", handleWheel, {passive: true});
        },
        detach: (element: HTMLElement) => {
            element.removeEventListener("wheel", handleWheel);
            if (debounceTimer) {
                clearTimeout(debounceTimer)
            }
        }
    }
}