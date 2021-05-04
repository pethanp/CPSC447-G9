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

    removeLink(link) {
        let index = this.interfaces.indexOf(link);

        if (index >-1) {
            this.interfaces.splice(index, 1);
        }
    }
}