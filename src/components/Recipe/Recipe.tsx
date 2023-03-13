import { FaRegSmileBeam } from "react-icons/fa";

import { recipeIdSelector } from "store/recipe/recipeSelector";
import { useAppSelector } from "hooks/typedHooks";

import { RecipeElement } from "components/RecipeElement";
import { RenderMessage } from "components/RenderMessage";

import s from "./recipe.module.scss";

const Recipe = () => {
	const recipeId = useAppSelector(recipeIdSelector);

	return (
		<div className={s.root}>
			{recipeId ? (
				<RecipeElement id={recipeId} />
			) : (
				<RenderMessage
					text='Start by searching for a recipe or an ingredient. Have fun!'
					icon={<FaRegSmileBeam />}
				/>
			)}
		</div>
	);
};

export { Recipe };
