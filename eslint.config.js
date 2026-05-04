import js from "@eslint/js";
import globals from "globals";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Ignore generated files
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  // Basic ESLint rules
  js.configs.recommended,

  // HTML linting
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: { html },
    rules: {
      ...html.configs.recommended.rules,
      // Formatting is handled by Prettier; keep ESLint for semantic HTML checks.
      "html/indent": "off",
      "html/require-closing-tags": "off",
      "html/no-extra-spacing-tags": "off",
      "html/attrs-newline": "off",
    },
  },

  // Global variables
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Prettier config should be last
  eslintConfigPrettier,
];
