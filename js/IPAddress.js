export class IP {
    constructor(b1, b2, b3, b4) {
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;

    }
    // Getter
    // Setter
    // Method
    setIP(b1, b2, b3, b4) {
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.b4 = b4;
    }
    
    get IPString() {
        return ""+this.b1+"."+this.b2+"."+this.b3+"."+this.b4;
    }
    set IPString(ipstr){
        this.IPString = ipstr;
    }

    get IPInt() {
        return this.b4;
    }
    set IPInt(b4) {
        this.b4 = b4;
    }
}