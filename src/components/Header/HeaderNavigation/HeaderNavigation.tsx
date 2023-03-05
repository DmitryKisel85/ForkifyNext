import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaRegEdit, FaRegBookmark } from "react-icons/fa";

import { useScrollLock } from "hooks/useScrollLock";

import { AddRecipeModal } from "components/AddRecipeModal";
import { Bookmarks } from "components/Bookmarks";

import s from "./headerNavigation.module.scss";

const HeaderNavigation = () => {
	const [isOverButton, setIsOverButton] = useState(false);
	const [isOverList, setIsOverList] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const { lockScroll, unlockScroll } = useScrollLock();

	// block scroll when modal is opened
	useEffect(() => {
		if (isOpenModal) {
			lockScroll();
		} else {
			unlockScroll();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpenModal]);

	const isOverListHandle = (boolean: boolean) => {
		setIsOverList(boolean);
	};

	return (
		<>
			<nav className={s.root}>
				<ul className={s.list}>
					<li className={s.item}>
						<button className={s.btn} onClick={() => setIsOpenModal(true)}>
							<FaRegEdit />
							<span>Add recipe</span>
						</button>
					</li>
					<li className={s.item}>
						<button
							className={s.btn}
							onMouseOver={() => setIsOverButton(true)}
							onMouseOut={() => setIsOverButton(false)}>
							<FaRegBookmark />
							<span>Bookmarks</span>
						</button>
						{(isOverButton || isOverList) && <Bookmarks isOverListHandle={isOverListHandle} />}
					</li>
				</ul>
			</nav>
			<AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
				{isOpenModal && <AddRecipeModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />}
			</AnimatePresence>
		</>
	);
};

export { HeaderNavigation };
