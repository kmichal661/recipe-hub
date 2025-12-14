"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INGREDIENT_POOL = exports.USER_NAMES = exports.CATEGORIES = exports.DIFFICULTIES = exports.TITLES = void 0;
exports.getRandomInt = getRandomInt;
exports.pick = pick;
exports.randomDateBetween = randomDateBetween;
exports.shortDescriptionFor = shortDescriptionFor;
exports.generateSteps = generateSteps;
exports.loadImageFiles = loadImageFiles;
exports.randomQuantity = randomQuantity;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.TITLES = [
    "Classic Margherita Pizza",
    "Creamy Chicken Alfredo",
    "Spicy Thai Basil Noodles",
    "Slow-Roasted Beef Brisket",
    "Lemon Garlic Butter Salmon",
    "Vegetable Ratatouille",
    "Hearty Beef Stew",
    "Grilled Shrimp Tacos",
    "Mushroom Risotto",
    "Butternut Squash Soup",
    "Honey Soy Glazed Chicken",
    "Pesto Pasta with Cherry Tomatoes",
    "Greek Salad with Feta",
    "Pulled Pork Sandwiches",
    "Teriyaki Salmon Bowl",
    "Spinach and Feta Frittata",
    "Citrus Quinoa Salad",
    "Garlic Butter Steak Bites",
    "Vegetarian Chili",
    "Chicken Tikka Masala",
    "Soba Noodle Salad",
    "Creamy Tomato Basil Soup",
    "Roasted Cauliflower Steaks",
    "Classic Beef Burger",
    "Shrimp Scampi Linguine",
    "Eggplant Parmesan",
    "Thai Green Curry",
    "Pan-Seared Scallops",
    "Maple Glazed Pork Chops",
    "BBQ Roasted Vegetables",
];
exports.DIFFICULTIES = ["Easy", "Medium", "Hard"];
exports.CATEGORIES = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Seafood",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "BBQ",
    "Salad",
];
exports.USER_NAMES = [
    "Oliver Smith",
    "Emma Johnson",
    "Liam Williams",
    "Ava Brown",
    "Noah Jones",
    "Isabella Garcia",
    "Lucas Miller",
    "Mia Davis",
    "Ethan Rodriguez",
    "Amelia Martinez",
    "James Wilson",
    "Sophia Anderson",
    "Benjamin Taylor",
    "Charlotte Thomas",
    "Henry Hernandez",
];
exports.INGREDIENT_POOL = [
    "All-purpose flour",
    "Granulated sugar",
    "Salt",
    "Black pepper",
    "Olive oil",
    "Unsalted butter",
    "Eggs",
    "Milk",
    "Heavy cream",
    "Parmesan cheese",
    "Mozzarella cheese",
    "Chicken breast",
    "Ground beef",
    "Beef broth",
    "Tomato",
    "Onion",
    "Garlic",
    "Basil",
    "Oregano",
    "Thyme",
    "Lemon",
    "Soy sauce",
    "Honey",
    "Brown sugar",
    "Rice",
    "Pasta",
    "Quinoa",
    "Potato",
    "Carrot",
    "Celery",
    "Red pepper",
    "Green pepper",
    "Mushrooms",
    "Spinach",
    "Kale",
    "Zucchini",
    "Eggplant",
    "Corn",
    "Black beans",
    "Chickpeas",
    "Shrimp",
    "Salmon",
    "Pork chops",
    "Bacon",
    "Maple syrup",
    "Pesto",
    "Cherry tomatoes",
    "Cilantro",
    "Ginger",
    "Coconut milk",
    "Red curry paste",
    "Sour cream",
    "Cream cheese",
    "Walnuts",
    "Almonds",
    "Breadcrumbs",
    "Vanilla extract",
];
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}
function randomDateBetween(yearStart = 2023, yearEnd = 2025) {
    const start = new Date(yearStart, 0, 1).getTime();
    const end = new Date(yearEnd, 11, 31).getTime();
    return new Date(getRandomInt(start, end));
}
function shortDescriptionFor(title) {
    const base = `${title} — a simple, flavorful dish perfect for any night.`;
    // ensure 40-50 characters
    if (base.length >= 40 && base.length <= 50)
        return base;
    if (base.length < 40)
        return base.padEnd(45, " .").slice(0, getRandomInt(40, 50));
    return base.slice(0, getRandomInt(40, 50));
}
function generateSteps(title, count) {
    const verbs = [
        "Preheat the oven to 180°C (350°F) and prepare the baking dish by lightly greasing it.",
        "Finely chop the onions and garlic, then set them aside so they are ready when you start cooking.",
        "Heat the olive oil in a large pan over medium heat, then add the vegetables and sauté until soft.",
        "Combine all dry ingredients in a bowl and whisk thoroughly to ensure even distribution before adding liquids.",
        "Whisk together eggs and milk in a separate bowl, then slowly incorporate into the dry mixture until smooth.",
        "Roast the meat in a preheated oven, turning occasionally to promote even browning and internal cooking.",
        "Simmer the sauce gently for at least 15 minutes, stirring occasionally to prevent sticking or burning.",
        "Grill the protein over high heat for a short time to get a charred exterior while keeping the inside tender.",
        "Stir the risotto constantly while gradually adding warm stock to build creaminess and prevent clumping.",
        "Combine the prepared ingredients, taste, and adjust seasoning with salt and pepper as needed before serving.",
        "Season the dish with fresh herbs, lemon, and a drizzle of olive oil to brighten the final flavors.",
        "Allow the finished dish to rest for a few minutes so flavors can settle and the texture can firm up.",
    ];
    const extras = [
        "Make sure to taste frequently and adjust seasoning gradually to avoid over-salting the final dish.",
        "If the sauce thickens too quickly, add a splash of warm water or stock to loosen and keep it silky.",
        "Use a sharp knife to ensure clean cuts and consistent sizes so the ingredients cook evenly.",
        "When using fresh herbs, add them at the end of cooking to preserve aroma and bright flavors.",
        "For best results, use a heavy-bottomed pan to distribute heat evenly and avoid burned spots.",
        "Reserve a little cooking liquid to finish the dish and create a smooth, glossy sauce if needed.",
    ];
    const steps = [];
    for (let i = 0; i < count; i++) {
        const v = pick(verbs);
        const e = pick(extras);
        let step = `${v} ${e}`;
        // Ensure step length between 120 and 150 characters
        if (step.length < 120) {
            // pad with additional descriptive text
            const pad = " Carefully follow the timings and watch for visual cues so you can reproduce this result.";
            while (step.length + pad.length < 120)
                step += pad;
            if (step.length > 150)
                step = step.slice(0, getRandomInt(120, 150));
        }
        else if (step.length > 150) {
            step = step.slice(0, getRandomInt(120, 150));
        }
        steps.push(step.trim());
    }
    return steps;
}
function loadImageFiles() {
    const imagesDir = path_1.default.resolve(process.cwd(), "src", "images");
    try {
        const files = fs_1.default.readdirSync(imagesDir).filter((f) => !f.startsWith("."));
        return files;
    }
    catch (e) {
        return [];
    }
}
function randomQuantity() {
    const measures = [
        "1 cup",
        "2 cups",
        "1 tbsp",
        "2 tbsp",
        "1 tsp",
        "2 tsp",
        "100 g",
        "200 g",
        "1 slice",
        "3 cloves",
        "1 piece",
        "2 pieces",
    ];
    return pick(measures);
}
