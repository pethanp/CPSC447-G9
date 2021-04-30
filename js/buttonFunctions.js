/* Priority queue class from javascript online, couldn't
    get import working for some reason
     */
class PriorityQueue {
    constructor(maxSize) {
       // Set default max size if not provided
       if (isNaN(maxSize)) {
          maxSize = 10;
        }
       this.maxSize = maxSize;
       // Init an array that'll contain the queue values.
       this.container = [];
    }
    // Helper function to display all values while developing
    display() {
       console.log(this.container);
    }
    // Checks if queue is empty
    isEmpty() {
       return this.container.length === 0;
    }
    // checks if queue is full
    isFull() {
       return this.container.length >= this.maxSize;
    }
    enqueue(data, priority) {
       // Check if Queue is full
       if (this.isFull()) {
          console.log("Queue Overflow!");
          return;
       }
       let currElem = new this.Element(data, priority);
       let addedFlag = false;
       // Since we want to add elements to end, we'll just push them.
       for (let i = 0; i < this.container.length; i++) {
          if (currElem.priority < this.container[i].priority) {
             this.container.splice(i, 0, currElem);
             addedFlag = true; break;
          }
       }
       if (!addedFlag) {
          this.container.push(currElem);
       }
    }
    dequeue() {
    // Check if empty
    if (this.isEmpty()) {
       console.log("Queue Underflow!");
       return;
    }
    return this.container.pop();
 }
 peek() {
    if (isEmpty()) {
       console.log("Queue Underflow!");
       return;
    }
    return this.container[this.container.length - 1];
 }
 clear() {
    this.container = [];
    }
 }
 // Create an inner class that we'll use to create new nodes in the queue
 // Each element has some data and a priority
 PriorityQueue.prototype.Element = class {
    constructor(data, priority) {
       this.data = data;
       this.priority = priority;
    }
 };

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

    let funcRet = djikstraAlgorithm(startNode);
    
    let prev = funcRet[0];
    let dist = funcRet[1];
    
    console.log(dist);
    console.log(prev);
}

/* Function to perform dijkstra's algorithm */
function djikstraAlgorithm(startNode) {
    // distances of nodes
    let distances = {};
    distances[startNode] = 0;
 
    // Stores the reference to previous nodes
    let prev = {};

    let pq = new PriorityQueue(nodes.length * nodes.length);
 
    // Set distances to all nodes to be infinite except startNode
    this.nodes.forEach(node => {
        if (node.id !== startNode) {
            distances[node.id] = Infinity;
            prev[node.id] = null;
        }
        pq.enqueue(node.id, distances[node.id]);
    });
    
    while (!pq.isEmpty()) {
       let minNode = pq.dequeue();
       let currNode = minNode.data;
       let weight = minNode.priority;

       this.network.getConnectedNodes(currNode).forEach(neighbor => {
          let alt = distances[currNode] + get_weight(currNode, neighbor);
          if (alt < distances[neighbor]) {
             distances[neighbor] = alt;
             prev[neighbor] = currNode;
             pq.enqueue(neighbor, distances[neighbor]);
          }
       });
    }

    return [prev, distances];
}

/* Returns the weight of the edge between nodes curr and adj */
function get_weight(curr, adj) {
    if (curr < adj) {
        return edges.get(curr+'-'+adj).weight;
    }
    else {
        return edges.get(adj+'-'+curr).weight;
    }
}