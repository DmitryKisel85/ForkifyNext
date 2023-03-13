import { useAppSelector } from "./typedHooks";
import { viewportSizesWidth, viewportSizesHeight } from "store/viewport/viewportSelector";

export const useViewport = () => {
	const width = useAppSelector(viewportSizesWidth);
	const height = useAppSelector(viewportSizesHeight);

	return { width, height };
};
