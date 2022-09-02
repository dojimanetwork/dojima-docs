/** @format */

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Dộjima Network",
  tagline: "Organizing the Unorganized Web3.0",
  url: "https://docs.dojima.network/",
  baseUrl: "/developer/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/dojimaicon.svg",
  organizationName: "Dộjima Network", // Usually your GitHub org/user name.
  projectName: "DộjimaDocs", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {

          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/dojimanetwork/dojima-docs.git",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
         title: 'Dộjima Docs',
        logo: {
          alt: "Dojima Logo",
          src: "img/dojimaicon.svg",
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
        switchConfig: {
          darkIcon: '🌙',
          darkIconStyle: {
            marginLeft: '2px',
          },
          // Unicode icons such as '\u2600' will work
          // Unicode with 5 chars require brackets: '\u{1F602}'
          lightIcon: '\u{1F31E}',
          lightIconStyle: {
            marginLeft: '1px',
          },
        },
      },
      footer: {
        style: "dark",
        links: [

          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/tWzKNF339N",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/dojimanetwork",
              },
              {
                label: "Medium",
                href: "https://medium.com/@dojimanetwork",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/dojimanetwork",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dộjima Network, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
