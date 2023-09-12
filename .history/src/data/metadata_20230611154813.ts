interface MenuLink {
    name: string;
    link: string;
}

export const siteTitle : string = 'Antoine Mayerowitz';
export const menuLinks : Array<MenuLink> = [
    {name: 'Home', link: '/'},
    {
        name: "Research", link: "/research",
      },
      {
        name: "Teaching", link: "/teaching",
      },
      /**      
      {
        name: "Blog", link: "/blog",
      },
*/
      {
        name: "Projects", link: "/projects",
      },
      {
        name: "Gallery", link: "/gallery",
      },
];