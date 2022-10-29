import classNames from "classnames";

import { FaFileUpload } from "react-icons/fa";

import styles from "./addRecipeForm.module.scss";

const addRecipeForm = () => {
    return (
        <form className={styles.upload}>
            <div className={styles.uploadColumn}>
                <h3 className={styles.uploadHeading}>Recipe data</h3>
                <label>Title</label>
                <input value="TEST2323" required name="title" type="text" />
                <label>URL</label>
                <input value="TEST2323" required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input value="TEST2323" required name="image" type="text" />
                <label>Publisher</label>
                <input value="TEST2323" required name="publisher" type="text" />
                <label>Prep time</label>
                <input value="23" required name="cookingTime" type="number" />
                <label>Servings</label>
                <input value="23" required name="servings" type="number" />
            </div>

            <div className={styles.uploadColumn}>
                <h3 className={styles.uploadHeading}>Ingredients</h3>
                <label>Ingredient 1</label>
                <input
                    value="0.5,kg,Rice"
                    type="text"
                    required
                    name="ingredient-1"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 2</label>
                <input
                    value="1,,Avocado"
                    type="text"
                    name="ingredient-2"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 3</label>
                <input
                    value=",,salt"
                    type="text"
                    name="ingredient-3"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 4</label>
                <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 5</label>
                <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 6</label>
                <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
                <button className={classNames(styles.btn, styles.uploadBtn)}>
                    <FaFileUpload />
                    <span>Upload</span>
                </button>
            </div>
        </form>
    );
};

export default addRecipeForm;
