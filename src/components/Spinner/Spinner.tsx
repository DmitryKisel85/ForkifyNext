import { memo } from "react";

import s from "./spinner.module.scss";

const Spinner = memo(() => {
	return (
		<div className={s.root}>
			<div className={s.container}></div>
		</div>
	);
});

export { Spinner };
