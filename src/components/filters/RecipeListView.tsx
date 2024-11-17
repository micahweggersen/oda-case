import { RecipeList } from '../../types';
import RecipeCard from '../cardTypes/RecipeCard';

interface RecipeListViewProps {
  recipes: RecipeList[];
}

const RecipeListView: React.FC<RecipeListViewProps> = ({ recipes }) => (
  <>
    {recipes.map(item =>
      item.items.map((recipeItem, index) => (
        <RecipeCard key={index} index={index} item={recipeItem} />
      )),
    )}
  </>
);

export default RecipeListView;
