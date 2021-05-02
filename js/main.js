import { Router } from './Router.js';
import { IP } from './IPAddress.js';

export function startNetwork() {

  routers = [];
  var i;
  for (i = 1; i < 12; i++){
    routers.push(new Router(new IP(192,168,0,i),0));
  }

  nodesArray = [];
  routers.forEach(r => {
    let info = "ID: " + r.RID.IPInt + "\n" +
                "LSDB: " + r.LSDB;
    nodesArray.push({id:r.RID.IPInt, label:r.RID.IPString, title: info})
  });

  // create an array of nodes
  // set position to custom start for Group 9 topology.
  nodes = new vis.DataSet(nodesArray);

  // create an array of edges
  edges = new vis.DataSet([
    { id: "1-3", from: 1, to: 3, label: '5', weight: 5},
    { id: "1-2", from: 1, to: 2, label: '3', weight: 3},
    { id: "1-8", from: 1, to: 8, label: '4', weight: 4},
    { id: "2-3", from: 2, to: 3, label: "3", weight: 3},
    { id: "2-6", from: 2, to: 6, label: '4', weight: 4},
    { id: "3-4", from: 3, to: 4, label: "4", weight: 4},
    { id: "4-5", from: 4, to: 5, label: '2', weight: 2},
    { id: "5-6", from: 5, to: 6, label: "3", weight: 3},
    { id: "5-7", from: 5, to: 7, label: "4", weight: 4},
    { id: "6-7", from: 6, to: 7, label: '7', weight: 7},
    { id: "6-10", from: 6, to: 10, label: '5', weight: 5},
    { id: "7-8", from: 7, to: 8, label: '3', weight: 3},
    { id: "7-9", from: 7, to: 9, label: '5', weight: 5},
    { id: "7-11", from: 7, to: 11, label: '6', weight: 6},
    { id: "8-9", from: 8, to: 9, label: '8', weight: 8},
    { id: "9-11", from: 9, to: 11, label: '7', weight: 7},
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