# Vite + React + Antd Mobile + React Router + Typescript + React Redux + Redux Toolkit + Tailwind CSS + ESLint + Prettier + Husky + Commitlint + Lintstaged + Commitizen + Standard Version + Github Actions + Docker + CI/CD

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
### Page code group recommend
```sh
# Folder structure

# Directory structure

# We have generated a complete development framework for you, providing a wide range of functions and pitfalls for middle and back-end development. Below is the directory structure of the entire project.
├── config                   # config, including routing, build, etc.
├── mock                     # local mock data
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               #   local static resources
│   ├── components           #   business common components
│   ├── e2e                  #   integrated test case
│   ├── layouts              #  common layout 
│   ├── models               #  global model 
│   ├── pages                #  business page entry and common template 
│   ├── services             #  background interface service 
│   ├── utils                #  tool library 
│   ├── locales              #  internationalization resources
│   ├── global.less          #  global style 
│   └── global.ts            #  global JS 
├── tests                    #  test tool 
├── README.md
└── package.json


# page code structure recommend
# To make the project code more organized, and to make it easier for developers to locate the related page component code, we have defined a set of standards. This standard is currently only recommended as a guide and is not mandatory.
src
├── components
└── pages
    ├── Welcome        // Routing components should not contain other routing components. Based on this convention, routing components and non-routing components can be clearly distinguished.
    |   ├── components // For complex pages, you can do a deeper organizational structure, but it is recommended not to exceed three layers.
    |   ├── Form.tsx
    |   ├── index.tsx  // Page component code
    |   └── index.less // Page style
    ├── Order          // Routing components should not contain other routing components. Based on this convention, routing components and non-routing components can be clearly distinguished.
    |   ├── index.tsx
    |   └── index.less
    ├── User
    |   ├── components // Common components collection in group
    |   ├── Login      // Group page Login
    |   ├── Register   // Group page Register
    |   └── util.ts    // Here you can have some common methods, not recommended and not constrained, see business scenarios for organization
    └── *              // Other page component code
``` 
