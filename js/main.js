import { Router } from './Router.js';
import { IP } from './IPAddress.js';

var nodes, edges, network, routers, nodesArray;

function startNetwork() {

  routers = [];
  for (i = 1; i < 12; i++){
    routers.push(new Router(new IP(192,168,0,i),0));
  }

  nodesArray = [];
  routers.forEach(r => nodesArray.push({id:r.RID.IPInt, label:r.RID.IPStr}));

  // create an array of nodes
  // set position to custom start for Group 9 topology.
  nodes = new vis.DataSet(nodesArray);

  // create an array of edges
  edges = new vis.DataSet([
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
  var data = {
    nodes: nodes,
    edges: edges
  };

  // set options for the vis graph
  var options = {
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
  network = new vis.Network(container, data, options);
}

startNetwork();
