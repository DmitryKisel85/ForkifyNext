import { motion } from "framer-motion";

import { RecipeForm } from "components/Modal/RecipeForm";

import s from "./modal.module.scss";

type ModalProps = {
	isOpenModal: boolean;
	setIsOpenModal: (value: boolean) => void;
};

const Modal = ({ isOpenModal, setIsOpenModal }: ModalProps) => {
	const handleCloseModal = () => {
		setIsOpenModal(false);
	};

	return (
		<>
			{isOpenModal && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							duration: 0.3,
						},
					}}
					exit={{
						opacity: 0,
						transition: {
							duration: 0.3,
						},
					}}
					className={s.root}
					onClick={handleCloseModal}>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { duration: 0.3 } }}
						exit={{
							scale: 0,
							transition: {
								duration: 0.3,
							},
						}}
						className={s.box}
						onClick={(e) => e.stopPropagation()}>
						<button className={s.btn} onClick={handleCloseModal}>
							&times;
						</button>
						<RecipeForm handleCloseModal={handleCloseModal} />
					</motion.div>
				</motion.div>
			)}
		</>
	);
};

export { Modal };
