import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const config = {
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
  "**/*.{css,less,scss}": ["prettier --write"],
};

export default config;
