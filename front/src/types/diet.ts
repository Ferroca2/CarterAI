export interface Diet {
    totalCalories: string;
    meals: {
        hour: string;
        nameOfMeal: string;
        food: string[];
        macros: {
            protein: string;
            carbs: string;
            fat: string;
        };
    }[];
}
