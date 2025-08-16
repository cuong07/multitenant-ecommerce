import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Data Science", slug: "data-science" },
      { name: "DevOps", slug: "devops" },
      { name: "Cybersecurity", slug: "cybersecurity" },
    ],
  },
  {
    name: "Design",
    color: "#F5A623",
    slug: "design",
    subcategories: [
      { name: "UI/UX Design", slug: "ui-ux-design" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "Product Design", slug: "product-design" },
      { name: "Animation", slug: "animation" },
      { name: "3D Design", slug: "3d-design" },
    ],
  },
  {
    name: "Business",
    color: "#50C878",
    slug: "business",
    subcategories: [
      { name: "Entrepreneurship", slug: "entrepreneurship" },
      { name: "Management", slug: "management" },
      { name: "Finance", slug: "finance" },
      { name: "Sales", slug: "sales" },
      { name: "E-commerce", slug: "e-commerce" },
    ],
  },
  {
    name: "Marketing",
    color: "#FF6F61",
    slug: "marketing",
    subcategories: [
      { name: "Digital Marketing", slug: "digital-marketing" },
      { name: "Content Marketing", slug: "content-marketing" },
      { name: "SEO", slug: "seo" },
      { name: "Social Media", slug: "social-media" },
      { name: "Advertising", slug: "advertising" },
    ],
  },
  {
    name: "Artificial Intelligence",
    color: "#8E44AD",
    slug: "artificial-intelligence",
    subcategories: [
      { name: "Machine Learning", slug: "machine-learning" },
      { name: "Deep Learning", slug: "deep-learning" },
      { name: "Natural Language Processing", slug: "nlp" },
      { name: "Computer Vision", slug: "computer-vision" },
      { name: "Robotics", slug: "robotics" },
    ],
  },
  {
    name: "Personal Development",
    color: "#2ECC71",
    slug: "personal-development",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Leadership", slug: "leadership" },
      { name: "Communication", slug: "communication" },
      { name: "Time Management", slug: "time-management" },
      { name: "Mindfulness", slug: "mindfulness" },
    ],
  },
  {
    name: "Languages",
    color: "#3498DB",
    slug: "languages",
    subcategories: [
      { name: "English", slug: "english" },
      { name: "Chinese", slug: "chinese" },
      { name: "Japanese", slug: "japanese" },
      { name: "Spanish", slug: "spanish" },
      { name: "French", slug: "french" },
      { name: "German", slug: "german" },
    ],
  },
  {
    name: "Health & Fitness",
    color: "#E67E22",
    slug: "health-fitness",
    subcategories: [
      { name: "Nutrition", slug: "nutrition" },
      { name: "Workout", slug: "workout" },
      { name: "Yoga", slug: "yoga" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Sports", slug: "sports" },
    ],
  },
  {
    name: "Science",
    color: "#1ABC9C",
    slug: "science",
    subcategories: [
      { name: "Physics", slug: "physics" },
      { name: "Chemistry", slug: "chemistry" },
      { name: "Biology", slug: "biology" },
      { name: "Astronomy", slug: "astronomy" },
      { name: "Geology", slug: "geology" },
    ],
  },
  {
    name: "Education",
    color: "#9B59B6",
    slug: "education",
    subcategories: [
      { name: "Online Learning", slug: "online-learning" },
      { name: "Higher Education", slug: "higher-education" },
      { name: "STEM", slug: "stem" },
      { name: "Languages Learning", slug: "languages-learning" },
      { name: "Certifications", slug: "certifications" },
    ],
  },
  {
    name: "Entertainment",
    color: "#E84393",
    slug: "entertainment",
    subcategories: [
      { name: "Movies", slug: "movies" },
      { name: "TV Shows", slug: "tv-shows" },
      { name: "Music", slug: "music" },
      { name: "Gaming", slug: "gaming" },
      { name: "Streaming", slug: "streaming" },
    ],
  },
  {
    name: "Travel",
    color: "#16A085",
    slug: "travel",
    subcategories: [
      { name: "Adventure", slug: "adventure" },
      { name: "Luxury", slug: "luxury" },
      { name: "Backpacking", slug: "backpacking" },
      { name: "Cultural", slug: "cultural" },
      { name: "Eco Travel", slug: "eco-travel" },
    ],
  },
  {
    name: "Food & Cooking",
    color: "#D35400",
    slug: "food-cooking",
    subcategories: [
      { name: "Recipes", slug: "recipes" },
      { name: "Baking", slug: "baking" },
      { name: "Healthy Eating", slug: "healthy-eating" },
      { name: "World Cuisine", slug: "world-cuisine" },
      { name: "Beverages", slug: "beverages" },
    ],
  },
  {
    name: "History & Culture",
    color: "#6C3483",
    slug: "history-culture",
    subcategories: [
      { name: "Ancient History", slug: "ancient-history" },
      { name: "Modern History", slug: "modern-history" },
      { name: "Art History", slug: "art-history" },
      { name: "Philosophy", slug: "philosophy" },
      { name: "Anthropology", slug: "anthropology" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parent = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color || null,
        parent: null,
      },
    });
    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parent.id,
        },
      });
    }
  }
};
await seed();
process.exit(0);
