import { c as create_ssr_component, b as each, e as escape, a as add_attribute } from "../../../chunks/index3.js";
const teachings = [
  {
    "institution": "Science-po Paris",
    "course": "Introduction to econometrics with R",
    "year": "2019",
    "ressources": [
      {
        "elements": [
          {
            "name": "Github repository",
            "link": "https://github.com/ScPoEcon/ScPoEconometrics"
          },
          {
            "name": "Supplement",
            "link": "https://github.com/SuperMayo/ScPoEconometrics_Supplement"
          }
        ]
      }
    ]
  },
  {
    "institution": "Paris 1 Pantheon-Sorbonne",
    "course": "Macroéconomie 2",
    "year": "2017",
    "ressources": [
      {
        "title": "Contrôle Continu 2",
        "elements": [
          {
            "name": "Sujet A",
            "link": "teaching/macrol2paris1/SujetA.pdf",
            "supplementName": "Correction",
            "supplementLink": "teaching/macrol2paris1/SujetA_Correc.pdf"
          },
          {
            "name": "Sujet B",
            "link": "teaching/macrol2paris1/SujetB.pdf",
            "supplementName": "Correction",
            "supplementLink": "teaching/macrol2paris1/SujetB_Correc.pdf"
          },
          {
            "name": "Sujet C",
            "link": "teaching/macrol2paris1/SujetC.pdf",
            "supplementName": "Correction",
            "supplementLink": "teaching/macrol2paris1/SujetC_Correc.pdf"
          },
          {
            "name": "Sujet D",
            "link": "teaching/macrol2paris1/SujetD.pdf",
            "supplementName": "Correction",
            "supplementLink": "teaching/macrol2paris1/SujetD_Correc.pdf"
          }
        ]
      }
    ]
  },
  {
    "institution": "Ecole des Ponts ParisTech",
    "course": "Introduction à l'économie",
    "year": "2017",
    "ressources": [
      {
        "elements": [
          {
            "name": "TD7 Mankiw, Romer, Weil",
            "link": "teaching/enpc/MRW.html",
            "supplementName": "Code (R)",
            "supplementLink": "teaching/enpc/MRW.zip"
          },
          {
            "name": "TD8 Le multiplicateur budgétaire",
            "link": "teaching/enpc/TD8.html",
            "supplementName": "Code (R)",
            "supplementLink": "teaching/enpc/TD8.zip"
          }
        ]
      }
    ]
  }
];
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${each(teachings, ({ course, institution, ressources }) => {
    return `<div><h2>${escape(course)} - ${escape(institution)}</h2>
            ${each(ressources, ({ title, elements }) => {
      return `${title ? `<h3>${escape(title)}</h3>` : ``}
                <ul>${each(elements, ({ name, link, supplementLink, supplementName }) => {
        return `<li><a${add_attribute("href", link, 0)} rel="noopener noreferrer" target="_blank">${escape(name)}</a>
                            ${supplementLink ? `  -  
                                <a${add_attribute("href", supplementLink, 0)} rel="noopener noreferrer" target="_blank">${escape(supplementName)}
                                </a>` : ``}
                    </li>`;
      })}
                </ul>`;
    })}
        </div>`;
  })}</main>`;
});
export {
  Page as default
};
