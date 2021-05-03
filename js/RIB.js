// routing information base
// used in OSPF to store the shortest paths to each node
// typically an entry in the RIB will be formatted as:
//      {destination: , cost: , advanceNode: }
export class RIB {
    constructor() {
        this.RIB = [];
    }

    setRIB(other) {
        this.RIB = other;
    }

    getRIB() {
        return this.RIB;
    }

    add(entry) {
        this.RIB.push(entry);
    }

    toString() {
        let ret = "";
        this.RIB.forEach(link => {
            ret += link.destination + " " + link.cost + " " + link.advanceNode + '\n';
        });

        return ret;
    }
}