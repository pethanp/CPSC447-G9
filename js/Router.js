import { InterfaceTable } from "./InterfaceTable.js";
import { LSDB } from "./LSDB.js";
import { RIB } from "./RIB.js";
import { PriorityQueue } from './PriorityQueue.js';

export class Router {
    constructor(RID, AID) {
        this.AID = AID;
        this.RID = RID;
        this.LSDB = new LSDB(new RIB(), new InterfaceTable());
    }
    // Getter
    
    // Setter

    // Method
    helloMsg() {
        
    }

    buildRIB() {
        let ret = djikstraAlgorithm(this.RID.IPInt);
        let dist = ret[0];
        let prev = ret[1];
        let forwardingTable = getForwardingTable(prev, dist, this.RID.IPInt);

        for (let i = 1; i <= Object.keys(forwardingTable).length; i++) {
            if (i !== this.RID.IPInt) {
                let link = {destination: i, cost: dist[i], advanceNode: forwardingTable[i]};
                this.LSDB.RIB.add(link);
            }
        }
    }

    getOutLink(targetNode) {
        let db = this.LSDB.RIB.getRIB();
        let ret;

        if (this.RID.IPInt === targetNode) {
            return this.RID.IPInt;
        }

        let pathPossible = false;

        db.forEach(link => {
            if (link.destination === targetNode) {
                ret = link.advanceNode;
                pathPossible = true;
            }
        });

        if (pathPossible)
            return ret;
        else
            throw new Error("Requested path to " + targetNode + " from " + this.RID.IPInt + " not possible!");
            
    }

    send(msg) {
        
    }
};

/* Function to perform dijkstra's algorithm 
    Returns distances and parent tree in array
    */
function djikstraAlgorithm(startNode) {
    // distances of nodes
    let distances = {};
    distances[startNode] = 0;

    // Stores the reference to previous nodes
    let prev = {};
    prev[startNode] = -1;

    let pq = new PriorityQueue(nodes.length * nodes.length);

    // Set distances to all nodes to be infinite except startNode
    nodes.forEach(node => {
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
        
        // -1 for 0-based indexing of router array
        let neighbors = routers[currNode-1].LSDB.IT.getInterfaces();
    
        neighbors.forEach(neighbor => {
            // get proper neighborId
            let neighborNode = getNeighborNodeId(currNode, neighbor);

            let alt = distances[currNode] + getWeight(currNode, neighborNode);
            if (alt < distances[neighborNode]) {
                distances[neighborNode] = alt;
                prev[neighborNode] = currNode;
                pq.enqueue(neighborNode, distances[neighborNode]);
            }
        });
    }

    return [distances, prev];
}

/* Returns the weight of the edge between nodes curr and adj */
function getWeight(curr, adj) {
    if (curr < adj) {
        return edges.get(curr+'-'+adj).weight;
    }
    else {
        return edges.get(adj+'-'+curr).weight;
    }
}

/* Function to return the proper neighborId from the edge based
    on the current node */
function getNeighborNodeId(curr, edge) {
    if (edge.from === curr) return edge.to;
    else return edge.from;
}

/* Function to get the forwarding interface from parent array */
function getForwardingTable(prev, dist, source) {
    let forwardingTable = {};

    // build up forwarding table for all nodes
    for (let i = 1; i <= Object.keys(prev).length; i++)
    {
        let edgeId = i < source ? i +"-"+ source : source +"-"+ i;

        // if the vertex connects to the source, and the edge is equal to the dist[i]
        // simply add the vertex as it's interface in the table
        if (edges.get(edgeId) !== null && edges.get(edgeId).weight === dist[i]) {
            forwardingTable[i] = i;
        }
        // find a path to i from source
        else
        {
            let connected = false;
            let v = i;

            // iterate up the parents from i until we get to the source
            while (!connected)
            {
                // we are at the parent
                if (prev[v] === -1)
                {
                    connected = true;
                }
                // find route
                else if (prev[v] === source) {
                    forwardingTable[i] = v;
                    connected = true;
                }
                else
                    v = prev[v];
            }
        }
    }

    return forwardingTable;
}