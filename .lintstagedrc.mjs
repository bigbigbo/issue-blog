import path from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => JSON.stringify(path.relative(process.cwd(), f)))
    .join(" ")}`;

const config = {
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
  "**/*.{css,less,scss}": ["prettier --write"],
};

export default config;
