# Bar Graph Generator
Create a simple svg Pie chart with;

## Demo
[View Demo](https://zwelden.github.io/svg-bar-graph/)

## TODO
- [ ] Add in Chart Title header/element
- [ ] Add in Chart axes values
- [ ] add data attributes to each bar
- [ ] style demo page
- [ ] all object dataset or array dataset entry

## How to use
1. add the svg-bar-chart.js file to you html page
2. create a wrapper element in your html file to hold the bar chart, for example `<div class="graph-holder"></div>`
3. create a dataset array like:
  ```javascript
    var someDataset =  [10, 15, 16, 23, 8, 19, 9, 22];
  ```
4. Target the container element, new up a bar chart, call the createGraph method and pass in a dataset and container element slector name:
  ```javascript
    var graphWrapperEL = '.chart wrapper');
    var graph = new BarGraph();
    graph.createGraph(dataset, graphWrapperEl);
  ```
