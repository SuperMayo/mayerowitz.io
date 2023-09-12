import { c as create_ssr_component, a as add_attribute, e as escape, n as null_to_empty, v as validate_component, b as each } from "../../../chunks/index3.js";
var data = {
  title: "Research",
  path: "/research",
  templateKey: "research-page",
  wp: {
    heading: "Working Paper",
    items: [{
      title: "Innovation Networks and Business-Stealing.",
      authors: "With Philippe Aghion, Matthew O. Jackson & Abhijit Tagade",
      year: 2022,
      journal: "CEPR Discussion Paper DP17911",
      url: "https://cepr.org/publications/dp17911",
      "abstract": "We use the universe of US Patent and Trademark Office (USPTO) data on patents and inventors from 1976 to 2017 to look at how inventors potential concern for business-stealing affects coauthorship on patents. First, we find an inverted-U shape in the fraction of coauthors that an inventor has per year who are new as a function number of other inventors also working in an inventor’s field. Second, we find that after a breakthrough invention, an inventor brings in persistently fewer than usual new coauthors. Third, a higher potential concern for business stealing—as measured either by the number of others working or the average price markups by firms in the area—leads to a higher drop in the fraction of new co-authors per patent after a breakthrough. We show how these patterns can be explained via a simple model in which inventors trade off gains from collaboration against threats of business stealing.",
      cite: "@article{aghion2023innovation,\ntitle={Innovation Networks and Business-Stealing},\nauthor={Aghion, Philippe and Jackson, Matthew O and Mayerowitz, Antoine and Tagade, Abhijit},\njournal={CEPR Press Discussion Paper No. 17911.},\nyear={2023}\n}\n"
    }]
  },
  book: {
    heading: "Book Chapter",
    items: [{
      title: "A State-Space Model to Estimate Potential Growth in the Industrialized Countries.",
      authors: "With Thomas Brand and Gilles Dufrénot",
      journal: "Recent Econometric Techniques for Macroeconomic and Financial Data",
      year: "2021",
      url: "http://dx.doi.org/10.1007/978-3-030-54252-8_3 ",
      "abstract": "This paper proposes new estimates of potential growth for 5 major industrialized countries. We use a state-space approach to obtain joint estimates of potential growth and the natural interest rates. The model is a reduced-form of a partial equilibrium model with a Phillips curve and an IS curve. In addition to the usual determinants of prices and business fluctuations, we consider financial variables as a determinant of the business cycle.",
      cite: "@article{brand2021state,\ntitle={A State-Space Model to Estimate Potential Growth in the Industrialized Countries},\nauthor={Brand, Thomas and Dufr{\\'e}not, Gilles and Mayerowitz, Antoine},\njournal={Recent Econometric Techniques for Macroeconomic and Financial Data},\npages={61--77},\nyear={2021},\npublisher={Springer}\n}\n"
    }]
  },
  wip: {
    heading: "Work in Progress",
    items: [
      {
        title: "Responsible Demand, Irresponsible Lobbying?",
        authors: "With Olimpia Cutinelli-Rendina and Sonja Dobkowitz",
        year: 2023,
        "abstract": "We explore how shifts in environmental preferences impact firms' strategic decisions concerning lobbying and innovation. It centers around the U.S. automotive industry, a sector distinctly divided into 'clean' (electric and hybrid) and 'dirty' (fossil fuel) products. To measure the change in consumer preferences, we introduce a new measure of high-frequency environmental interest based on internet search queries. We also propose a novel approach to measure changes in preferences, using wildfires as an exogenous shock to consumer preferences. Our results reveal that as environmental interest grows, firms increase their lobbying expenditures on environmental topics while also increasing their innovation in cleaner technologies.  We argue that these results are best understood as a demand-driven mechanism: when households lower demand for dirty goods due to environmental concerns, investment in clean technologies becomes especially important. Consequently, firms' eagerness to protect profits through lobbying increases in order to finance more clean research."
      },
      {
        title: "Chinese Patenting and U.S. Firms Technology Specialization.",
        year: 2023,
        "abstract": "We investigate the impact of Chinese competition on the innovation strategies of U.S. firms. We study this effect in light of the surge in Chinese patenting following its entry into the World Trade Organization (WTO). With data on patent applications into the USPTO, we first document the exponential growth in applications from Chinese assignees. Our findings illustrate that despite being heterogeneous, this increase pervades all technological fields. Next, we leverage this foreign competition shock and the variations in firms' exposure to apply a shift-share instrumental variable design using international applications from China as an instrument. Our findings indicate that affected U.S. firms concentrate on fewer technologies and produce less original patents. We find no evidence that these effects are offset by an overall improvement in patent quality. On the contrary, we measure a decline in breakthrough patents, despite a surge in the number of inventors and patent applications. We interpret these results as a shift in the innovation strategy of incumbent U.S. firms towards more incremental innovation."
      }
    ]
  }
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  return `<button${add_attribute(
    "class",
    `border-teal-700 border-2 px-half py-0 rounded-none
        hover:text-beige hover:bg-teal-600
        text-xs
        drop-shadow-md uppercase hover:rotate-1
        transition-all duration-700 ease-in-out
        font-bold shadow-md
        ${active ? "rotate-2 bg-teal-700 text-beige" : "bg-beige text-teal-700"}`,
    0
  )}>${slots.default ? slots.default({}) : ``}</button>

`;
});
const TextIcon_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-ugmxza{font-size:1rem\n    }",
  map: null
};
const TextIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { rotate = false } = $$props;
  let { alignMiddle = false } = $$props;
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
    $$bindings.rotate(rotate);
  if ($$props.alignMiddle === void 0 && $$bindings.alignMiddle && alignMiddle !== void 0)
    $$bindings.alignMiddle(alignMiddle);
  $$result.css.add(css);
  return `<div class="${escape(
    null_to_empty(`inline-block transition-transform duration-200 ease-in-out
    font-bold mr-1
    ${alignMiddle ? "align-middle" : ""}
    ${rotate ? "rotate-45" : ""}`),
    true
  ) + " svelte-ugmxza"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const IconCite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  return `<svg viewBox="0 0 15 16"${add_attribute("class", `w-4 align-bottom fill-none duration-700 transition-all ${active ? "stroke-beige" : "stroke-teal-700"}`, 0)}><path d="M6.5 3.5H1.5V8.5H3.75L1.75 12.5H4.75L6.5 9V3.5zM13.5 3.5H8.5V8.5H10.75L8.75 12.5H11.75L13.5 9V3.5z"></path></svg>`;
});
const Paper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { url = "" } = $$props;
  let { authors = "" } = $$props;
  let { year = "" } = $$props;
  let { abstract = "" } = $$props;
  let { journal = "" } = $$props;
  let { cite = "" } = $$props;
  let showAbstract = false;
  let hoverCite = false;
  let citeLabel = "BiBTeX";
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.authors === void 0 && $$bindings.authors && authors !== void 0)
    $$bindings.authors(authors);
  if ($$props.year === void 0 && $$bindings.year && year !== void 0)
    $$bindings.year(year);
  if ($$props.abstract === void 0 && $$bindings.abstract && abstract !== void 0)
    $$bindings.abstract(abstract);
  if ($$props.journal === void 0 && $$bindings.journal && journal !== void 0)
    $$bindings.journal(journal);
  if ($$props.cite === void 0 && $$bindings.cite && cite !== void 0)
    $$bindings.cite(cite);
  return `<div class="mb-one"><div class="flex flex-row pb-quarter"><div class="flex border-black flex-col"><div>${url ? `<a${add_attribute("href", url, 0)} rel="noopener noreferrer" target="_blank">${escape(title)}</a>` : `${escape(title)}`}
                ${authors ? `${escape(authors)}` : ``}</div>
            <div><p class="text-sm font-mono font-thin">${escape(journal)}${year && journal ? `, ${escape(year)}` : ``}</p></div></div></div>
    <p>${abstract ? `${validate_component(Button, "Button").$$render($$result, { active: showAbstract }, {}, {
    default: () => {
      return `${validate_component(TextIcon, "TextIcon").$$render($$result, { rotate: showAbstract }, {}, {
        default: () => {
          return `+`;
        }
      })}abstract
        `;
    }
  })}` : ``}
    ${cite ? `${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(TextIcon, "TextIcon").$$render($$result, { alignMiddle: true }, {}, {
        default: () => {
          return `${validate_component(IconCite, "IconCite").$$render($$result, { active: hoverCite }, {}, {})}`;
        }
      })}
            ${escape(citeLabel)}`;
    }
  })}` : ``}</p>
    ${``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><h2>${escape(data.wp.heading)}</h2>
    <ul>${each(data.wp.items, (item) => {
    return `<li>${validate_component(Paper, "Paper").$$render(
      $$result,
      {
        title: item.title,
        abstract: item.abstract,
        authors: item.authors,
        year: item.year,
        journal: item.journal,
        url: item.url,
        cite: item.cite
      },
      {},
      {}
    )}
            </li>`;
  })}</ul>
    <h2>${escape(data.book.heading)}</h2>
    <ul>${each(data.book.items, (item) => {
    return `<li>${validate_component(Paper, "Paper").$$render(
      $$result,
      {
        title: item.title,
        abstract: item.abstract,
        authors: item.authors,
        year: item.year,
        journal: item.journal,
        url: item.url,
        cite: item.cite
      },
      {},
      {}
    )}
            </li>`;
  })}</ul>
    <h2>${escape(data.wip.heading)}</h2>
    <ul>${each(data.wip.items, (item) => {
    return `<li>${validate_component(Paper, "Paper").$$render(
      $$result,
      {
        title: item.title,
        abstract: item.abstract,
        authors: item.authors,
        year: item.year,
        url: item.url
      },
      {},
      {}
    )}
            </li>`;
  })}</ul></main>`;
});
export {
  Page as default
};
