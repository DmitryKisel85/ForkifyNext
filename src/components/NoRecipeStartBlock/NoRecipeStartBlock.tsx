import { FaRegSmile } from "react-icons/fa";

import styles from "./noRecipeStartBlock.module.scss";

const NoRecipeStartBlock = () => {
    return (
        <div className={styles.message}>
            <FaRegSmile />
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
    );
};

export default NoRecipeStartBlock;
