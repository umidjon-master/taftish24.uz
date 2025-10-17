import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 🔹 Next.js default ESLint rules (TypeScript bilan)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 🔹 O'z sozlamalaring
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "eslint.config.mjs",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      // ✅ TypeScript `any` uchun ruxsat
      "@typescript-eslint/no-explicit-any": "off",

      // ⚠️ Foydalanilmagan o'zgaruvchilar faqat ogohlantirsin
      "@typescript-eslint/no-unused-vars": ["warn"],

      // ⚙️ Keraksiz Next.js va React ogohlantirishlarini o‘chirib qo‘yish
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",

      // ✨ Qo‘shimcha stil qoidalar
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      "no-console": "off",
    },
  },
];

export default eslintConfig;
