    // create an array with nodes
    var nodes = new vis.DataSet([
      {id: 1, label: 'Router 1'},
      {id: 2, label: 'Router 2'},
      {id: 3, label: 'Router 3'},
      {id: 4, label: 'Router 4'},
      {id: 5, label: 'Router 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
  ]);

  // create a network
  var container = document.getElementById('mynetwork');

  // provide the data in the vis format
  var data = {
      nodes: nodes,
      edges: edges
  };
  var options = {};

  // initialize your network!
  var network = new vis.Network(container, data, options);