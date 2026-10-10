import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Le contenu du site est rédigé en français : les apostrophes
      // typographiques sont omniprésentes dans le texte JSX.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    // React Hook Form expose une API impérative (handleSubmit, refs internes)
    // que les règles expérimentales du React Compiler signalent à tort.
    // La logique reste néanmoins conforme aux règles des hooks.
    files: ["src/components/messages/message-form.tsx"],
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
