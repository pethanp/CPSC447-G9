// create an array of nodes
// set position to custom start for Group 9 topology.
var nodes = new vis.DataSet([
    {id: 1, label: "Router 1", fixed: true, x: -400, y: -150},
    {id: 2, label: "Router 2", fixed: true, x: -150, y: -200},
    {id: 3, label: "Router 3", fixed: true, x: -200, y: -100},
    {id: 4, label: "Router 4", fixed: true, x: -200, y: -20},
    {id: 5, label: "Router 5", fixed: true, x: -300, y: 50},
    {id: 6, label: "Router 6", fixed: true, x:0, y: 0},
    {id: 7, label: "Router 7", fixd: true, x: -100, y: 100},
    {id: 8, label: "Router 8", fixed: true, x: -400, y: 200},
    {id: 9, label: "Router 9", fixed: true, x: -200, y: 200},
    {id: 10, label: "Router 10"},
    {id: 11, label: "Router 11", fixed: true, x: 0, y: 200},
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

// These will control the size of the HTML canvas that vis.js will draw on
// and therefore the size of the graph on a webpage
const width = 400;
const height = 400;

// set options for the vis graph
const options = {
    autoResize: true,
    width: width + 'px',
    height: height + 'px',
    layout: {randomSeed: 0},
    nodes: {
        fixed:true,
        physics:false
    }
};

// create a network
var container = document.getElementById('mynetwork');

// initialize your network!
var network = new vis.Network(container, data, options);

// Set the coordinate system of Network such that it exactly
// matches the actual pixels of the HTML canvas on screen
// this must correspond with the width and height set for
// the networks container element.
network.moveTo({
    position: {x: 0, y: 0},
    offset: {x: -width/2, y: -height/2},
    scale: 1,
})