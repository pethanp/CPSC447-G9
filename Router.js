export class Router {
    constructor(RID, AID) {
        this.AID = AID;
        this.RID = RID;
        this.LSDB = new Array();
    }
    // Getter
    get RID() {
        return this.RID;
    }
    // Setter
    set setAID(n) {
        this.AID = n;
    }
    set setRID(n) {
        this.RID = n;
    }
    // Method
    helloMsg() {
        
    }
}

// Exports the whole class
// module.exports = Router;