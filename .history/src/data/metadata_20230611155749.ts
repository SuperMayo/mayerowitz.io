interface MenuLink {
    name: string;
    link: string;
}

const siteTitle : string = 'Antoine Mayerowitz';
const menuLinks : Array<MenuLink> = [
    {name: 'Home', link: '/'},
    {
        name: "Research", link: "/research",
      },
      {
        name: "Teaching", link: "/teaching",
      },  
      {
        name: "Blog", link: "/blog",
      },
      {
        name: "Projects", link: "/projects",
      },
      {
        name: "Gallery", link: "/gallery",
      },
];
const description : string =  `My personal site`;
const author : string = `Antoine Mayerowitz a.mayerowitz@gmail.com`;
const externalLinks : {[key: string]: string} = {
  github: `https://github.com/SuperMayo`,
  linkedin: `https://www.linkedin.com/in/antoinemayerowitz/`,
  twitter: `https://twitter.com/AntoineMyrwtz`,
  instagram: `https://www.instagram.com/super_mayo/`,
};

const metadata = {
    siteTitle,
    menuLinks,
    description,
    author,
    externalLinks,
};

export default metadata;