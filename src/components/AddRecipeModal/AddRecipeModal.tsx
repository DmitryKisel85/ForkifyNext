import classNames from "classnames";

import AddRecipeForm from "../AddRecipeForm";

import styles from "./addRecipeModal.module.scss";

type ModalProps = {
    modalShow: boolean;
    handleModalClose: () => void;
};

const AddRecipeModal = ({ modalShow, handleModalClose }: ModalProps) => {
    const modalActiveClass = classNames(styles.modal, {
        [styles.active]: modalShow,
    });

    return (
        <div className={modalActiveClass} onClick={handleModalClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.btnCloseModal} onClick={handleModalClose}>
                    &times;
                </button>
                <AddRecipeForm />
            </div>
        </div>
    );
};

export default AddRecipeModal;
