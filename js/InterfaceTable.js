export class InterfaceTable {
    constructor() {
        this.interfaces = [];
    }

    setInterfaces(other) {
        this.interfaces = other;
    }

    getInterfaces() {
        return this.interfaces;
    }

    addLink(link) {
        this.interfaces.push(link);
    }
}