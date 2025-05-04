import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react"],
            ["^@?\\w"],
            ["^@/lib"],
            ["@/components", "\\.\\/components"],
            ["\\.\\/"],
            ["@/hooks", "\\.\\/hooks", "\\./use.*[A-Z].*$"],
            ["^@/services"],
            ["^@/utils"],
            ["^@/types"],
            ["^@/"],
            ["^.+\\.?(css|less|scss|sass|styl)$"],
            ["^.+\\.?(png|img|jpg|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$"],
            ["^.+\\.?(mp4|webm|wav|mp3|m4a|aac|oga)$"],
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    plugins: {
      storybook,
    },
  },
];

export default eslintConfig;
