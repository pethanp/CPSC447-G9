// These will control the size of the HTML canvas that vis.js will draw on
// and therefore the size of the graph on a webpage will be responsive hopefully

function getDivWidth() {
    return (window.innerWidth - 100);
}

function getDivHeight() {
    return (window.innerHeight - 90);
}

// create an array of nodes
// set position to custom start for Group 9 topology.
var nodes = new vis.DataSet([
    {id: 1, label: "Router 1", x: getDivWidth()/2 -400, y: getDivHeight()/2 -150},
    {id: 2, label: "Router 2", x: getDivWidth()/2 -150, y: getDivHeight()/2 -200},
    {id: 3, label: "Router 3", x: getDivWidth()/2 -200, y: getDivHeight()/2 -100},
    {id: 4, label: "Router 4", x: getDivWidth()/2 -200, y: getDivHeight()/2 -20},
    {id: 5, label: "Router 5", x: getDivWidth()/2 -300, y: getDivHeight()/2 +50},
    {id: 6, label: "Router 6", x: getDivWidth()/2 +0, y: getDivHeight()/2 +0},
    {id: 7, label: "Router 7", x: getDivWidth()/2 -100, y: getDivHeight()/2 +100},
    {id: 8, label: "Router 8", x: getDivWidth()/2 -400, y: getDivHeight()/2 +200},
    {id: 9, label: "Router 9", x: getDivWidth()/2 -200, y: getDivHeight()/2 +200},
    {id: 10, label: "Router 10", physics: true},
    {id: 11, label: "Router 11", x: getDivWidth()/2 +0, y: getDivHeight()/2 +200},
]);
  
// create an array of edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 1, to: 8},
    {from: 2, to: 3},
    {from: 2, to: 6},
    {from: 3, to: 4},
    {from: 4, to: 5},
    {from: 5, to: 6},
    {from: 5, to: 7},
    {from: 6, to: 7},
    {from: 6, to: 10},
    {from: 7, to: 8},
    {from: 7, to: 9},
    {from: 7, to: 11},
    {from: 8, to: 9},
    {from: 9, to: 11},
]);
  
// Provide the data in the vis format
const data = {
    nodes: nodes,
    edges: edges
};

// set options for the vis graph
const options = {
    autoResize: true,
    width: getDivWidth() + 'px',
    height: getDivHeight() + 'px',
    layout: {randomSeed: 0},
    nodes: {
        fixed:false,
        physics:false
    }
};

// create a network by getting container
var container = document.getElementById('mynetwork');

// initialize your network!
var network = new vis.Network(container, data, options);

// set the size of the window dynamically
// hopefully this works
function refresh() {
    network.setOptions({
        width: getDivWidth() + "px",
        height: getDivHeight() + "px",
    });
    window.location.reload();
};