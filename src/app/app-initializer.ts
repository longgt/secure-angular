export function initializer(): () => Promise<any> {
    return () => {
        return Promise.resolve();
    };
}
