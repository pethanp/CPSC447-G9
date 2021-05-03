import { PriorityQueue } from './PriorityQueue.js';
import { IP } from "./IPAddress.js";
import { Router } from "./Router.js";
import { startNetwork } from './main.js';

// make module functions visible to the window
window.selectStart = selectStart;
window.selectDestination = selectDestination;
window.sendPacket = sendPacket;
window.makeEdge = makeEdge;
window.makeRouter = makeRouter;
window.resetNetwork = resetNetwork;
window.changeEdge = changeEdge;
window.removeEdge = removeEdge;

 /* Function to set start Node and visually respresent it */
function selectStart() {
    var selected = network.getSelectedNodes();

    // check if there is any selection
    if (selected.length === 0) {
        let e = new Error("Must select a start Node");
        console.error(e.message);
        return;
    }

    // check that selection isn't endNode
    if (selected[0] === destinationNode) {
        let e = new Error("Can't select end as start node.");
        console.error(e.message);
        return;
    }

    // check if there is a current start node, if there isn't then reset startnode color
    if (startNode !== null) {
        nodes.update([{ id: startNode, color: { background: '#97c2fc',
                                                    highlight: {
                                                        background: '#97c2fc',
                                                    }
                                                } }]);
        startNode = selected[0];
    }
    else {
        startNode = selected[0];
    }

    // change color to aquamarine
    nodes.update([{ id: startNode, color: { background: "aquamarine", 
                                                highlight: {
                                                    background: "aquamarine",
                                                    } } }]);

    // FIXME: add more functionality for packet sending later
}

/* Function to set end Node and visually respresent it */
function selectDestination() {
    let selected = network.getSelectedNodes();

    // check if there is any selection
    if (selected.length === 0) {
        let e = new Error("Must select an end Node");
        console.error(e.message);
        return;
    }

    // check that selection isn't startNode
    if (selected[0] === startNode) {
        let e = new Error("Can't select start as end node.");
        console.error(e.message);
        return;
    }

    // check if there is a current end node, if there is then reset end node color and replace value
    if (destinationNode !== null) {
        nodes.update([{ id: destinationNode, color: { background: '#97c2fc',
                                                        highlight: {
                                                            background: '#97c2fc',
                                                            }
                                                        } }]);
        destinationNode = selected[0];
    }
    else {
        destinationNode = selected[0];
    }

    // change color to orange
    nodes.update([{ id: destinationNode, color: { background: "orange", 
                                                highlight: {
                                                    background: "orange",
                                                    } } }]);

    // FIXME: add more functionality for packet sending later
}

/* Button handler for sending packet using dijkstra's */
function sendPacket() {
    if (!startNode || !destinationNode) {
        throw new Error("Need to select proper start/end nodes");
    }


    let currRouter = routers[startNode-1];
    let path = [];
    path.push(currRouter.RID.IPInt);
    let i = 0;

    while (currRouter !== routers[destinationNode-1]) {
        // use router LSDB to find shortest path to destinationNode
        let nextRouter = currRouter.getOutLink(destinationNode);
        path.push(nextRouter);
        currRouter = routers[nextRouter-1];
    }
    
    animatePath(path);
}

/* Function to add a new edge to the network */
function makeEdge() {
    let fromNode = parseInt(document.getElementById('fromInput').value);
    let toNode = parseInt(document.getElementById('toInput').value);
    let weight = parseInt(document.getElementById('weightInput').value);
    
    // get proper edge id
    let edgeString = "";
    if (fromNode < toNode) edgeString = fromNode + "-" + toNode;
    else edgeString = toNode + "-" + fromNode;
    
    // check edge doesn't exist
    if (edges.get(edgeString) !== null) {
        throw new Error("Edge already exists!");
    }

    // add edge
    edges.add({id: edgeString, from: fromNode, to: toNode, label: '' + weight, weight: weight});
}

/* Function to change the */
function changeEdge() {
    let fromNode = parseInt(document.getElementById('fromInput').value);
    let toNode = parseInt(document.getElementById('toInput').value);
    let weight = parseInt(document.getElementById('weightInput').value);
    
    // get proper edge id
    let edgeString = "";
    if (fromNode < toNode) edgeString = fromNode + "-" + toNode;
    else edgeString = toNode + "-" + fromNode;
    
    // check edge doesn't exist
    if (edges.get(edgeString) === null) {
        throw new Error("Edge doesn't exist.");
    }

    // update weight and label of edge
    edges.remove(edgeString);
    edges.add({id: edgeString, from: fromNode, to: toNode, label: '' + weight, weight: weight});
}

/* Function to remove an edge from the network */
function removeEdge() {
    let fromNode = parseInt(document.getElementById('fromInput').value);
    let toNode = parseInt(document.getElementById('toInput').value);

    // get proper edge id
    let edgeString = "";
    if (fromNode < toNode) edgeString = fromNode + "-" + toNode;
    else edgeString = toNode + "-" + fromNode;

    // check if edge doesn't exist
    if (edges.get(edgeString) === null) {
        throw new Error("Edge doesn't exist.");
    }

    edges.remove(edgeString);
}

/* Function to make a new router/node in the network */
function makeRouter() {
    // next available router ID
    let routerId = nodesArray[nodesArray.length -1].id + 1;
    
    // add new router to routers
    routers.push(new Router(new IP(192,168,0,routerId), 0));

    // add newRouter object to nodesArray
    let r = routers[routers.length - 1];
    let info = "ID: " + r.RID.IPInt + "\n" +
                "LSDB: " + r.LSDB;
    let newRouter = {id: r.RID.IPInt, label: r.RID.IPString, title: info};

    // add to nodesArray
    nodesArray.push(newRouter);

    // add to network
    nodes.add(newRouter);

    let connections = document.getElementById('edgeConnections').value;
    
    // check if connections are provided
    if (connections !== '') {
        // parse edge connections:
        let connectionEdges = connections.split(', ');

        // parse each string pair in the following format: 'dest weight'
        connectionEdges.forEach(pairing => {
            let values = pairing.split(' ');
            console.log(values);

            let fromNode = routerId;
            let toNode = parseInt(values[0]);
            let weight = parseInt(values[1]);
            
            // get proper edgeIdString
            let edgeString = '';
            if (fromNode < toNode) edgeString = fromNode +'-'+ toNode;
            else edgeString = toNode +'-'+ fromNode;

            edges.add({id: edgeString, from: fromNode, to: toNode, label: ''+weight, weight: weight});
        });
    }
}

/* Function to reset the network to the default */
function resetNetwork() {
    if (network) {
        network.destroy();
    }

    startNetwork();
}

/* Function to color the final path after finding the shortest path */
async function animatePath(shortestPath) {
    // visualize routing
    for (let i = 0; i < shortestPath.length - 1; i++) {
        await animateEdgeColorVisited(shortestPath[i], shortestPath[i+1]);
    }

    // finalize path
    for (let i = 0; i < shortestPath.length - 1; i++) {
        animateEdgeColorFinal(shortestPath[i], shortestPath[i+1]);
    }
}

/* Function to change the color of the edge between curr and adj as shortest path (aka GREEN) */
function animateEdgeColorFinal(curr, adj) {
    // needed to get proper edge id for the edge
    let edgeIdString = null;

    if (curr < adj) {
        edgeIdString = curr+"-"+adj;
    }
    else {
        edgeIdString = adj+"-"+curr;
    }
    
    edges.update([{id: edgeIdString, background: {enabled: true, color: 'lime'}}]);
}

/* Function to change the color of the edge between curr and adj as visited (aka RED)*/
async function animateEdgeColorVisited(curr, adj) {

    // needed to get proper edge id for the edge
    let edgeIdString = null;

    if (curr < adj) {
        edgeIdString = curr+"-"+adj;
    }
    else {
        edgeIdString = adj+"-"+curr;
    }
    
    // turn edge color red
    edges.update([{id: edgeIdString, background: {enabled: true, color: 'red'}}]);

    // wait 1.2 seconds and turn off color
    await sleep(1200);

    // reset edge color
    edges.update([{id: edgeIdString, background: {enabled: true, color: 'white'}}]);
}

/* Basic sleep utility function */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}