import Router from "./Router.js";

function startNetwork() {

  // create an array of nodes
  // set position to custom start for Group 9 topology.
  var nodes = new vis.DataSet([
    { id: 1, label: "Router 1" },
    { id: 2, label: "Router 2" },
    { id: 3, label: "Router 3" },
    { id: 4, label: "Router 4" },
    { id: 5, label: "Router 5" },
    { id: 6, label: "Router 6" },
    { id: 7, label: "Router 7" },
    { id: 8, label: "Router 8" },
    { id: 9, label: "Router 9" },
    { id: 10, label: "Router 10" },
    { id: 11, label: "Router 11" },
  ]);

  // create an array of edges
  var edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 1, to: 8 },
    { from: 2, to: 3 },
    { from: 2, to: 6 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 5, to: 7 },
    { from: 6, to: 7 },
    { from: 6, to: 10 },
    { from: 7, to: 8 },
    { from: 7, to: 9 },
    { from: 7, to: 11 },
    { from: 8, to: 9 },
    { from: 9, to: 11 },
  ]);

  // Provide the data in the vis format
  const data = {
    nodes: nodes,
    edges: edges
  };

  // set options for the vis graph
  const options = {
    autoResize: true,
    width: '100%',
    height: '100%',
    layout: {
      randomSeed: "0.5070662133956556:1618897481010",
    }
  };

  // create a network by getting container
  var container = document.getElementById('mynetwork');

  // initialize your network!
  var network = new vis.Network(container, data, options);
}



startNetwork();
