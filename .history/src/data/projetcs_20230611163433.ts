interface Project {
    name: string;
    link: string;
    description: string;
    date: number;
    external?: boolean;
}

interface Projects {
    generative: Project[];
    web: Project[];
}

const projects  = {
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
      "web" : [
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
}