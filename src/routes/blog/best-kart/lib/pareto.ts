import type { MarioKartGear } from "../interfaces";

export default function fastParetoFilter(
  data: Array<MarioKartGear>,
  xAxis: string,
  yAxis: string,
  gearType: string
) {
  // Sort all points according to X in descending order
  var sortedDataset = data.sort(function (a, b) {
    return b[xAxis] - a[xAxis];
  });

  let firstMax = false;

  let maxY = 99999;
  let thisX = 99999;

  // Loop through all points in the data
  for (var i = 0; i < sortedDataset.length; i++) {
    sortedDataset[i].frontier = 0;

    // Select only the points that are of the same type
    if(sortedDataset[i].type == gearType){
      var point = sortedDataset[i];
      console.log({point, maxY, thisX})

      if (!firstMax) {
        firstMax = true;
        // First element of the sorted data is on the pareto frontier
        sortedDataset[i].frontier = 1;
        maxY = point[yAxis];
        thisX = point[xAxis];
      }

      // If the point is not dominated, add it to the Pareto frontier
      if ((point[yAxis] > maxY) || (point[yAxis] == maxY && point[xAxis] == thisX)){
        maxY = point[yAxis];
        thisX = point[xAxis];
        sortedDataset[i].frontier = 1;
      }
    }
  }
  // Return the array of non-dominated points
  return sortedDataset;
}
