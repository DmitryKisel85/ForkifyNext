import { motion, AnimatePresence } from "framer-motion";

import AddRecipeForm from "../AddRecipeForm";

import styles from "./addRecipeModal.module.scss";

type ModalProps = {
    modalShow: boolean;
    handleModalClose: () => void;
    setModalShow: (value: boolean) => void;
};

const AddRecipeModal = ({ modalShow, handleModalClose, setModalShow }: ModalProps) => {
    return (
        <>
            {modalShow && (
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
                    className={styles.modal}
                    onClick={handleModalClose}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { duration: 0.3 } }}
                        exit={{
                            scale: 0,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.btnCloseModal} onClick={() => setModalShow(false)}>
                            &times;
                        </button>
                        <AddRecipeForm />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default AddRecipeModal;
