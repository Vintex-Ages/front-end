// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Vintex — Front-end',
  tagline: 'Documentação viva do front-end (VE-25)',

  url: 'https://vintex-ages.github.io',
  baseUrl: '/front-end/',

  organizationName: 'Vintex-Ages',
  projectName: 'front-end',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Vintex-Ages/front-end/tree/develop/documentation/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Vintex — Front-end',
        items: [
          {
            href: 'https://github.com/Vintex-Ages/front-end',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'Vintex — gerado a partir de documentation/ no front-end.',
      },
    }),
};

module.exports = config;
