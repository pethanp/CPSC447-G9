export class IP {
    constructor(b1, b2, b3, b4) {
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;
        this.IPStr = this.IPString();
    }
    // Getter
    get IPStr() {
        return this.IPString();
    }
    get IPInt() {
        return this.IPInt();
    }
    // Setter
    // Method
    setIP(b1, b2, b3, b4) {
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;
    }
    IPString() {
        return ""+this.b1+"."+this.b2+"."+this.b3+"."+this.b4;
    }
    IPInt() {
        return this.b4;
    }
}