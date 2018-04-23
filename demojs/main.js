(function (app) {
  var input = document.querySelector('#graph-number-input');
  var addNumberBtn = document.querySelector('#add-number-btn');
  var listOutput = document.querySelector('.number-list-display');
  var createChartBtn = document.querySelector('#create-graph-btn');

  var graphHolder = '.graph-holder';
  var resetData = false;
  var dataset = [];

  var updateData = function () {
    var value = Number(input.value);
    if (typeof value !== 'number') {
      return;
    }
    if (resetData) {
      dataset = [];
      resetData = false;
    }
    dataset.push(value);
    input.value = '';
    listOutput.innerText = dataset.join(', ');
  };

  addNumberBtn.addEventListener('click', function () {
    updateData();
  });

  input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      updateData();
    }
  });

  createChartBtn.addEventListener('click', function () {
    var graph = new app.BarChart();
    graph.createChart(dataset, graphHolder);
    resetData = true;
  });
})(window.app = window.app || {});
