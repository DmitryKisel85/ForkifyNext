import { memo } from "react";
import logo from "assets/logo.png";

import { SearchBox } from "components/Header/SearchBox";
import { HeaderNavigation } from "components/Header/HeaderNavigation";

import s from "./header.module.scss";

const Header = memo(() => {
	return (
		<header className={s.root}>
			<img src={logo} alt='Logo' className={s.logo} />
			<SearchBox />
			<HeaderNavigation />
		</header>
	);
});

export { Header };
