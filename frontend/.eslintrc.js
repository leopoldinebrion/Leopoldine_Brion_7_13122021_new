module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 0,
    "import/no-named-as-default": 0,
    'vue/no-multiple-template-root': "off",
    "no-use-before-define": ["error", {"functions": false, "classes": false}]
    },
}
