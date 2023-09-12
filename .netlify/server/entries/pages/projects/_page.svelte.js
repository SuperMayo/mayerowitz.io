import { c as create_ssr_component, b as each, a as add_attribute, e as escape } from "../../../chunks/index3.js";
const projects = {
  "generative": [
    {
      "name": "Dunes penplot app",
      "link": "/generative-apps/dunes.html",
      "description": "Web app for svg exports",
      "date": 2021,
      "external": false
    },
    {
      "name": "Tiny Planets",
      "link": "https://supermayo.github.io/tinyPlanets/",
      "description": "Randomly generated planets in pixel art",
      "date": 2019,
      "external": true
    }
  ],
  "web": [
    {
      "name": "Creative Destruction 2021",
      "link": "https://www.creativedestruction2021.org/",
      "description": "Replay website for the Economics of Creative Destruction conference",
      "date": 2022
    },
    {
      "name": "Rehpere",
      "link": "https://Rehpere.org",
      "description": "Website for the department of epistemology and history of economics at Sorbonne university",
      "date": 2018
    }
  ]
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><div><h2>Generative Art</h2>
        <ul>${each(projects.generative, ({ name, link, description, date }) => {
    return `<li><a${add_attribute("href", link, 0)} rel="noopener noreferrer" target="_blank">${escape(name)}</a>
              <br>
              <p class="text-sm font-mono font-thin">${escape(date)}. ${escape(description)}</p>
            </li>`;
  })}</ul>
        <h2>Web</h2>
        <ul>${each(projects.web, ({ name, link, description, date }) => {
    return `<li><a${add_attribute("href", link, 0)} rel="noopener noreferrer" target="_blank">${escape(name)}</a>
              <br>
              <p class="text-sm font-mono font-thin">${escape(date)}. ${escape(description)}</p>
          </li>`;
  })}</ul></div></main>`;
});
export {
  Page as default
};
