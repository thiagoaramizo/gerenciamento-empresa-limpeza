import config  from "./packages/web/tailwind.config";

// Alterando rotas de conteúdo para execução a partir da raiz
config.content = [
    "./packages/web/src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/web/src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/web/src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ]

export default config;
