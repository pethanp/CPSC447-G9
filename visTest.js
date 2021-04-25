// create an array of nodes
// set position to custom start for Group 9 topology.
var nodes = new vis.DataSet([
    {id: 1, label: "Router 1"},
    {id: 2, label: "Router 2"},
    {id: 3, label: "Router 3"},
    {id: 4, label: "Router 4"},
    {id: 5, label: "Router 5"},
    {id: 6, label: "Router 6"},
    {id: 7, label: "Router 7"},
    {id: 8, label: "Router 8"},
    {id: 9, label: "Router 9"},
    {id: 10, label: "Router 10"},
    {id: 11, label: "Router 11"},
]);
  
// create an array of edges
// I will set the id of the edges to be from the
// smaller node to the bigger node, seperated with a dash
// ex. (1-3)
var edges = new vis.DataSet([
    {id: '1-3', from: 1, to: 3},
    {id: '1-2', from: 1, to: 2},
    {id: '1-8', from: 1, to: 8},
    {id: '2-3', from: 2, to: 3},
    {id: '2-6', from: 2, to: 6},
    {id: '3-4', from: 3, to: 4},
    {id: '4-5', from: 4, to: 5},
    {id: '5-6', from: 5, to: 6},
    {id: '5-7', from: 5, to: 7},
    {id: '6-7', from: 6, to: 7},
    {id: '6-10', from: 6, to: 10},
    {id: '7-8', from: 7, to: 8},
    {id: '7-9', from: 7, to: 9},
    {id: '7-11', from: 7, to: 11},
    {id: '8-9', from: 8, to: 9},
    {id: '9-11', from: 9, to: 11},
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


network.on("afterDrawing", function (ctx)
{
    var pos = network.getPositions([1, 2]);
    ctx.strokeStyle = ctx.filStyle = 'green';
    ctx.moveTo(pos[1].x, pos[1].y);
    ctx.lineTo(pos[1].x + (pos[2].x-pos[1].x)*50/100, pos[1].y + (pos[2].y - pos[1].y)*50/100);
    ctx.fill();
    ctx.stroke();
});