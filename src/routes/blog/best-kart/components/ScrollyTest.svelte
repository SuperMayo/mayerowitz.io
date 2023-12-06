<script>
  import { onMount } from "svelte";
  import ScatterPlot from "./ScatterPlot.svelte";

  let showY = false;
  let xAxis = "Speed";
  let yAxis = "Acceleration";
  let gearType = "driver";
  let showStar = false;
  let focus = [];
  let onlyFrontier = false;
  let hoveredData;
  
  let axisChoices = [
    {name: "Speed", value: "Speed"},
    {name: "Acceleration", value: "Acceleration"},
    {name: "Handling", value: "Handling"},
    {name: "Weight", value: "Weight"},
    {name: "Offroad", value: "off_road"},
    {name: "Mini Turbo", value: "mini_turbo"},
  ]

  let gearChoices = [
    {name: "Driver", value: "driver"},
    {name: "Body", value: "body"},
    {name: "Tire", value: "tire"},
    {name: "Glider", value: "glider"}
  ]

  const target2event = {
      0: () => {
          showY = false;
      },
      1: () => {
          showY = true;
          showStar = false;
          focus = [];
      },
      2: () => {
          showStar = false;
          gearType = "driver";
          xAxis = "Speed";
          yAxis = "Acceleration";
          focus = ["Koopa Troopa"];
          hoveredData = false;
      },
      3: () => {
          showStar = false;
          onlyFrontier = false;
          focus = ["Cat Peach", "Toadette"];
      },
      4: () => {
          showStar = true;
          onlyFrontier = true;
      },
  }

  function fireEvent(entryIndex) {
    if (entryIndex in target2event) {
      target2event[entryIndex]();
    }
  }

  //Run observer on each step at mount
  onMount(() => {
    // Step observer
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            //check if visible
            if(entry.isIntersecting) {
                //resolve stage
                const entryIndex = entry.target.getAttribute("data-index");
                fireEvent(entryIndex);
            }
        })
    }, {threshold: 0.7});
    // store elements to track
    const sections = [...document.querySelectorAll(".step")];
    // observe elements to track
    sections.forEach((section) => {
      observer.observe(section);
    });
  })
</script>

<h2 class="body-header">How It Works, Briefly</h2>
<p class="body-text">
    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod 
    nunc eu nunc aliquet, nec ultricies nisl aliquet. Nulla facilisi.
    Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
    facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla.
</p>
<br/>
<p class="body-text">
    The red fox jumps over the lazy cat, twice. The red fox jumps over the 
    lazy cat, twice. The red fox jumps over the lazy cat, twice.
</p>

<section id="scrolly">
    <div class="scrolly-container">
        <div class="steps-container">
            <div class="step" data-index="0">
                <div class="step-content">
                    <p>
                    If we rank the cars by one dimension (here {xAxis}), we can clearly see
                    which one is the fastest.
                    </p>
                </div>
            </div>
            <div class="step" data-index="1">
                <div class="step-content">
                    <p>
                    But once we introduce another dimension, one cannot pick
                    the `best` <select bind:value={gearType}>
                      {#each gearChoices as choice}
                        <option value={choice.value}>{choice.name.toLocaleLowerCase()}</option>
                      {/each}
                      </select> anymore, trades-off between <select bind:value={xAxis}>
                        {#each axisChoices as choice}
                            <option value={choice.value}>{choice.name.toLowerCase()}</option>
                        {/each}
                        </select> and <select bind:value={yAxis}>
                          {#each axisChoices as choice}
                            <option value={choice.value}>{choice.name.toLocaleLowerCase()}</option>
                          {/each}
                          </select> are inevitable.
                    <br/>
                    <button on:click={() => {xAxis = "Speed"; yAxis = "Acceleration"}}>Reset</button>
                    </p>
                </div>
            </div>
            <div class="step" data-index=2>
                <div class="step-content">
                    <p>
                    However, we can still see that some picks are always a bad idea.
                    Let's look at Koopa for instance. You can clearly see that there
                    are better picks for both speed and acceleration.
                    </p>
                </div>
            </div>
            <div class="step" data-index=3>
                <div class="step-content">
                    <p>
                    Cat peach allows you to have additional speed for the same
                    acceleration, and Toadette allows you to have additional
                    acceleration for the same speed. In any case, if you only care
                    about acceleration and speed, you should not pick Koopa Troopa.
                    </p>
                </div>
            </div>
            <div class="step" data-index=4>
                <div class="step-content">
                    <p>
                    We can highlight all drivers for which there is no objectively
                    better pick for both speed and acceleration. Together, they
                    form the pareto frontier.
                    </p>
                </div>
            </div>
        </div>
    <div class="spacer" />
    <div class="charts-container">
        <div class="chart-one">
            <ScatterPlot
              bind:showY
              bind:xAxis
              bind:yAxis
              bind:gearType
              bind:showStar
              bind:hoveredData
              bind:onlyFrontier
              bind:focus/>
        </div>
    </div>
    </div> 
</section>

<style>
    #scrolly {
      max-width: 1500px;
      margin: auto;
    }

    .chart-one {
      width: 100%;
      height: 100%;
    }
    
    /* space after scroll is finished */
    .spacer {
      height: 40vh;
    }
    .charts-container {
      position: sticky;
      top: 20%;
      width: 50vw;
      height: 50vw;
      margin-right: 5%;
    }
  
    .scrolly-container {
      margin-top: 1em;
      text-align: center;
      transition: background 100ms;
      display: flex;
    }
  
    .step {
      height: 110vh;
      display: flex;
      place-items: center;
      justify-content: center;
      pointer-events: none;
    }
  
    .step-content {
      font-size: var(--size-default);
      background: var(--bg);
      pointer-events: auto;
      border-radius: 1px;
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: background 500ms ease;
      text-align: left;
      width: 75%;
      margin: auto;
      max-width: 500px;
      font-family: var(--font-main);
      line-height: 1.3;
      border: 4px solid var(--default);
    }
  
    .step-content p {
      color: var(--squidink);
    }
  
    .steps-container {
      height: 100%;
      pointer-events: none;
    }
  
    .steps-container {
      flex: 1 1 40%;
      z-index: 10;
    }
 
    /* Comment out the following line to always make it 'text-on-top' */
    @media screen and (max-width: 950px) {
      .scrolly-container {
        flex-direction: column-reverse;
      }
  
      .charts-container {
        top: 20.5%;
        width: 80vw;
        height: 80vw;
        margin: auto;
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
  
      .spacer {
        height: 100vh;
      }
    }
  </style>