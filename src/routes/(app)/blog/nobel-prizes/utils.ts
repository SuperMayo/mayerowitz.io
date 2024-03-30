export interface Laureate {
    name: string;
    id: string;
    birthDate: string;
    birthCountry: string;
    affiliation: string;
    portion: string;
    motivation: string;
    affiliationCountry: string;
    awardYear: string;
    nNobelPrizes: number;
    category: string;
    gender: string;
}

export interface rawLaureate {
    [key: string]: any;
}

export interface Node {
    id: string;
    group: "laureate" | "country" | "affiliation";
    tooltip?: Laureate;
    visible?: boolean;
    index?: number;
    vx?: number;
    vy?: number;
    x?: number;
    y?: number;
}

export interface Link {
    source: string;
    target: string;
    type: "birthCountry" | "affiliationCountry" | "affiliation" | "affiliationToCountry";
    visible?: boolean;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
}

function extractLaureate(rawLaureate: rawLaureate): Laureate {
    let l = rawLaureate;
    return {
        id: l.id,
        name: l.fullName.en,
        birthDate: l.birth.date,
        birthCountry: l.birth.place.countryNow.en,
        affiliation: l.nobelPrizes[0].affiliations[0].name.en,
        portion: l.nobelPrizes[0].portion,
        motivation: l.nobelPrizes[0].motivation.en,
        affiliationCountry: l.nobelPrizes[0].affiliations[0].countryNow.en,
        awardYear: l.nobelPrizes[0].awardYear,
        nNobelPrizes: l.nobelPrizes.length,
        category: l.nobelPrizes[0].category.en,
        gender: l.gender,
    };
}

export const processLaureates = (rawLaureates : rawLaureate[]) => {
    const filteredLaureates = rawLaureates.filter(laureate => {
        return (
        laureate.birth && 
        laureate.birth.place && 
        laureate.birth.place.country &&
        laureate.birth.place.country.en &&
        laureate.nobelPrizes &&
        laureate.nobelPrizes.length > 0 &&
        laureate.nobelPrizes[0].affiliations &&
        laureate.nobelPrizes[0].affiliations.length > 0 &&
        laureate.nobelPrizes[0].affiliations[0].country &&
        laureate.nobelPrizes[0].affiliations[0].country.en
        );
    });

    const laureates: Laureate[] = filteredLaureates.map((laureate: rawLaureate) => {
        return extractLaureate(laureate);
    });

    const links : Link[] = [];
    laureates.forEach((laureate: Laureate) => {
        const id = laureate.id;
        const birthCountry = laureate.birthCountry;
        const affiliationCountry = laureate.affiliationCountry;
        const affiliation = laureate.affiliation;
        
        links.push({ source: id, target: birthCountry, type: 'birthCountry' });
        links.push({ source: id, target: affiliationCountry, type: 'affiliationCountry' });
        links.push({ source: id, target: affiliation, type: 'affiliation' });
        links.push({ source: affiliation, target: affiliationCountry, type: 'affiliationToCountry' });
    });

    const nodes : Node[] = [];
    laureates.forEach((laureate: Laureate) => {
        nodes.push({ id: laureate.id, group: "laureate", tooltip: laureate });
    });
    links.forEach((link: Link) => {
        // Only append new nodes
        if (!nodes.find(node => node.id === link.target)) {
            nodes.push({ id: link.target, group: link.type !== "affiliation" ? "country" : "affiliation" });
        }
        if (!nodes.find(node => node.id === link.source)) {
            nodes.push({ id: link.target, group: link.type !== "affiliation" ? "country" : "affiliation" });
        }
    });


    return {
        links: links,
        laureates: laureates,
        nodes: nodes,
    }
}

export const mergeSimulationData = (original, simulationData, isLink = false) => {
    return original.map(item => {
        let simItem;
        if (isLink) {
            simItem = simulationData.find(simItem => 
                simItem.source.id === item.source.id && simItem.target.id === item.target.id
            );
        } else {
            simItem = simulationData.find(simItem => simItem.id === item.id);
        }
        return simItem ? { ...item, ...simItem } : item;
    });
};
