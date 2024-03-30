// Types
interface MenuLink {
    name: string;
    link: string;
}

// Data
const siteTitle: string = "Antoine Mayerowitz";
const menuLinks: Array<MenuLink> = [
    {
        name: "Research",
        link: "/research",
    },
    {
        name: "Teaching",
        link: "/teaching",
    },
    {
        name: "Writings",
        link: "/blog",
    },
    {
        name: "Projects",
        link: "/projects",
    },
    {
        name: "Gallery",
        link: "/gallery",
    },
    {
        name: "about",
        link: "/",
    },
];
const url: string = `https://www.mayerowitz.io`;
const description: string = `My personal site`;
const author: string = `Antoine Mayerowitz`;
const twitterUsername: string = `@AntoineMyrwtz`;
const externalLinks: { [key: string]: string } = {
    twitter: `https://twitter.com/AntoineMyrwtz`,
    //  bluesky: `https://bsky.app/profile/antoine.mayerowitz.io`,
    //  linkedin: `https://www.linkedin.com/in/antoinemayerowitz/`,
    github: `https://github.com/SuperMayo`,
    instagram: `https://www.instagram.com/super_mayo/`,
    twitch: `https://www.twitch.tv/supermayotv`,
};

// Export
const metadata = {
    siteTitle,
    url,
    menuLinks,
    description,
    author,
    twitterUsername,
    externalLinks,
};

export default metadata;

