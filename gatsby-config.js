module.exports = {
  siteMetadata: {
    title: `Antoine Mayerowitz`,
    description: `My personal site`,
    author: `Antoine Mayerowitz a.mayerowitz@gmail.com`,
    externalLinks: {
      github: `https://github.com/SuperMayo`,
      linkedin: `https://www.linkedin.com/in/antoinemayerowitz/`,
      twitter: `https://twitter.com/AntoineMyrwtz`,
    },
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Research",
        link: "/research",
      },
      {
        name: "Teaching",
        link: "/teaching",
      },
      /**      
      {
        name: "Blog",
        link: "/blog",
      },
*/
      {
        name: "Gallery",
        link: "/gallery",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gallery`,
        path: `${__dirname}/static/gallery`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-remark-images`,
    `gatsby-remark-copy-linked-files`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
        plugins: [`gatsby-remark-images`, `gatsby-remark-copy-linked-files`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
  ],
}
