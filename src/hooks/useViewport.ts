import { useAppSelector } from "./typedHooks";
import { viewportSizesWidth, viewportSizesHeight } from "../store/viewport/viewportSelector";

const useViewport = () => {
    const width = useAppSelector(viewportSizesWidth);
    const height = useAppSelector(viewportSizesHeight);

    return { width, height };
};

export default useViewport;
