export const apiWrapperForErrorHandling = (fn:Function) => {
    return async (...args:any[]) => {
        try {
            return await fn(...args);
        } catch (e) {
            console.log("asdf")
            throw e;
        }
    }
};
