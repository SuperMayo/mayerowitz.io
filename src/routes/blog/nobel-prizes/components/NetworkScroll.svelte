<script>
import {onMount} from "svelte";
import { browser } from "$app/environment";
import {
  stepIndex,
  linkType,
	nodeType,
	highlightFemale,
  nodesRelation
} from "../store";
import NobelNetwork from "./NobelNetwork.svelte";


$stepIndex = 0;

const target2event = {
  0: () => {
    $linkType = ["birthCountry"]
    $nodeType = ["country", "laureate"]
    $stepIndex = 0;
  },
  1: () => {
    $linkType = ["affiliationCountry"]
    $stepIndex = 1;
    $highlightFemale = false;
    $nodesRelation = "network";
  },
  2: () => {
    $nodeType = ["leaureate"];
    $nodesRelation = "matrix";
  },
  3: () => {
    $highlightFemale = true;
    $stepIndex = 3;
  }
}

function fireEvent(entryIndex) {
    if (entryIndex in target2event) {
      target2event[entryIndex]();
    }
}

function setType(type) {
    console.log(type == $linkType)
    if(type != $linkType){
        linkType.set(type);
    }
}

// Scrollytelling magic
onMount(() => {

        const options = {
        threshold: 0.7,
    };

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
        // check if visible or not
        if (entry.isIntersecting) {
            // resolve stage in graph
            const entryIndex = entry.target.getAttribute("data-index");
            if (entryIndex in target2event) {
            fireEvent(entryIndex);
            }
        }
        });
    }, options);
        // store elements to track
    const sections = [...document.querySelectorAll(".step")];
    // observe elements to track
    sections.forEach((section) => {
      observer.observe(section);
    });
});

</script>

<section>
  <div class="scrolly-container">
    <div class="charts-container">
      <div class="chart-holder">
        <NobelNetwork />
      </div>
    </div>
    <div class="steps-container">
        <div class="step" data-index="0">
            <h2>Step 1</h2>
            <p>Laureates to birth country</p>
    </div>
    <div class="step" data-index="1">
        <h2>Step 2</h2>
        <p>Laureates to affiliation Country</p>
    </div>
    <div class="step" data-index="2">
        <h2>Step 3</h2>
        <p>Laureates to aff</p>
    </div>
  </div>
</section>

<style>
    section {
      padding-bottom: 5rem;
      max-width: 1200px;
      margin: auto;
    }
  
    .scrolly-container {
      text-align: center;
      display: flex;
      position: relative;
      margin-top: 0;
      padding-top: 0;
      flex-direction: row;
      padding-left: 2rem;
      width: 100vw;
      left: calc(-50vw + 50%);
      margin: auto;
    }
  
    .charts-container {
      position: sticky;
      top: 25%;
      width: 100%;
      height: 45vh;
      margin-right: 2%;
      flex: 0 0 60%; /* This item will take up 70% of the container's width */
    }
  
    .steps-container {
      /* border: 2px solid red; */
      width: 100%;
    }
  
    .chart-holder {
      width: 100%;
      height: 100%;
    }
  
    .step {
      position: relative;
      scroll-snap-align: center;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      height: 90vh;
      display: flex;
      place-items: center;
      justify-content: flex-start;
      padding: 1rem;
      padding-right: 1.4rem;
    }
    .step {
      height: 100vh;
    }
  
    .step-content {
      text-align: left;
      font-size: var(--size-default);
      font-family: var(--font-light);
      padding-left: 1.5rem;
      background-color: var(--white);
      border: 5px solid var(--squidink);
      padding: 20px;
    }
  
    .step-content > h2 {
      font-family: var(--font-heavy);
      text-transform: uppercase;
      font-size: var(--size-default);
    }
  
    .step-content > p {
      font-size: var(--size-default);
      font-family: var(--font-light);
    }
  
    hr {
      width: 100%;
    }
  
    /* .step > * {
        opacity: 1;
        transform: translate3d(0, 4rem, 0);
        transition: opacity 800ms var(--delay),
          transform 800ms cubic-bezier(0.13, 0.07, 0.26, 0.99) var(--delay);
      } */
  
    /* Comment out the following line to always make it 'text-on-top' */
    @media screen and (max-width: 950px) {
      .scrolly-container {
        display: block;
        top: 30%;
        width: 99%;
        padding-left: 0;
      }
  
      .step {
        height: 120vh;
        padding: 0;
        padding-right: 0;
        margin-bottom: 50vh;
      }
  
      .step-content {
        text-align: left;
        font-size: var(--size-default);
        font-family: var(--font-light);
        padding-left: 0;
        background-color: rgba(255, 255, 255, 0.93);
        border: 3px solid var(--squidink);
        padding: 10px;
        line-height: 1.1;
      }
      .steps-container {
        pointer-events: none;
      }
      .charts-container {
        top: 20%;
        width: 100%;
        height: 50vh;
        margin-right: 0%;
        flex: 0 0 100%;
      }
    }
    /* 
    @media screen and (max-width: 950px) {
      .scrolly-container {
        display: block;
        flex-direction: column-reverse;
        top: 30%;
        width: 99%;
        padding-left: 0;
      }
  
      .steps-container {
        pointer-events: none;
      }
  
      .charts-container {
        top: 20.5%;
        width: 95%;
        margin: auto;
        top: 25%;
        width: 100%;
        height: 45vh;
        margin-right: 0%;
      }
  
      .step {
        height: 130vh;
      }
  
      .step-content {
        width: 95%;
        max-width: 768px;
        font-size: 15px;
        line-height: 1.3;
        background: rgba(241, 243, 243, 0.913);
      }
      .charts-container {
        top: 25%;
        width: 100%;
        height: 45vh;
        margin-right: 0%;
        flex: 0 0 100%;
      }
    } */
  </style>