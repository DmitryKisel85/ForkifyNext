import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaRegEdit, FaRegBookmark } from "react-icons/fa";

import { useScrollLock } from "hooks/useScrollLock";

import { Modal } from "components/Modal";
import { Bookmarks } from "components/Bookmarks";

import s from "./headerNavigation.module.scss";

const HeaderNavigation = () => {
	const [isOverButton, setIsOverButton] = useState(false);
	const [isOverList, setIsOverList] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const { lockScroll, unlockScroll } = useScrollLock();

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

	const handleAddRecipe = () => setIsOpenModal(true);
	const handleOnMouseOver = () => setIsOverButton(true);
	const handleOnMouseOut = () => setIsOverButton(false);

	return (
		<>
			<nav className={s.root}>
				<ul className={s.list}>
					<li className={s.item}>
						<button className={s.btn} onClick={handleAddRecipe}>
							<FaRegEdit />
							<span>Add recipe</span>
						</button>
					</li>
					<li className={s.item}>
						<button className={s.btn} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
							<FaRegBookmark />
							<span>Bookmarks</span>
						</button>
						{(isOverButton || isOverList) && <Bookmarks isOverListHandle={isOverListHandle} />}
					</li>
				</ul>
			</nav>
			<AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
				{isOpenModal && <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />}
			</AnimatePresence>
		</>
	);
};

export { HeaderNavigation };
