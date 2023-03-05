import { memo } from "react";

import s from "./footer.module.scss";

const Footer = memo(() => {
	return (
		<footer className={s.root}>
			<p className={s.copyright}>&copy; Design by Jonas Schmedtmann.</p>
		</footer>
	);
});

export { Footer };
