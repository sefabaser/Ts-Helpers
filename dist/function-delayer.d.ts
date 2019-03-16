export declare class FunctionDelayer {
    private delay;
    private delayerTimeout;
    constructor(delay?: number);
    call(callback: () => void): void;
    halt(): void;
}
