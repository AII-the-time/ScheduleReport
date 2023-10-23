import { createContext } from "react";
export default createContext<{
    managerId: number | null;
    setManagerId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
    managerId: null,
    setManagerId: ()=>{}
});
