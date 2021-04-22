export class IP {
    constructor(b1, b2, b3, b4) {
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;
        this.IPStr = this.IPString();
    }
    constructor(){
        this.b1 = 0;
        this.b2 = 0;
        this.b3 = 0;
        this.b4 = 0;
        this.IPString = this.IPString();
    }
    // Getter
    get IPStr() {
        return this.IPString();
    }
    get IPInt() {
        return this.IPInt();
    }
    // Setter
    set setIP(b1, b2, b3, b4) {
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;
    }
    // Method
    IPString() {
        return ""+this.b1+"."+this.b2+"."+this.b3+"."+this.b4;
    }
    IPInt() {
        return this.b4;
    }
}