// OSPF uses an Interface Table and Routing Information Base to maintain a 
// link state database
import { RIB } from './RIB.js';

export class LSDB {
    constructor(RIB, IT) {
        this.RIB = RIB;
        this.IT = IT;
    }

    setRIB(newRIB) {
        this.RIB.setRIB(newRIB)
    }

    getRIB() {
        return this.RIB.getRIB();
    }

    get RIBStr() {
        return this.RIB.toString();
    }

    addInterface(link) {
        this.IT.addLink(link);
    }

    buildLSDB() {
        RIB.getRIB.forEach(element => {
            LSDB.push(element);
        });
    }
}