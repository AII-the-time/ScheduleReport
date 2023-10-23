import { createContext } from "react";
export default createContext<{
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    modalType: "LOGIN" | "STORE_INFO" | "WORKER_INFO" | null;
    setModalType: React.Dispatch<
        React.SetStateAction<"LOGIN" | "STORE_INFO" | "WORKER_INFO" | null>
    >;
}>({
    accessToken: null,
    setAccessToken: () => {},
    modalType: null,
    setModalType: () => {},
});
