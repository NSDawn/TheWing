// v2 class, makes a 2 value vector
class v2 {
    constructor(in_a, in_b, polar_mode = false) {
      if (!polar_mode) {
        this.x = in_a;
        this.y = in_b;
      } else {
        this.x = in_a * Math.cos(in_b);
        this.y = in_a * Math.sin(in_b);
      }
    }
    get area() {
      return this._calcArea();
    }
    _calcArea() {
      return (this.x * this.y);
    }
    get slope() {
      return this._calcSlope();
    }
    _calcSlope() {
      return (this.x / this.y);
    }
    get r() {
      return this._calcR();
    }
    _calcR() {
      return (Math.sqrt((this.x * this.x)+(this.y * this.y)));
    }
    get theta() {
      return this._calcTheta();
    }
    _calcTheta() {
      return (Math.atan(this.y / this.x));
    }
    isWithin(in_v2a, in_v2b) {
      return ((Math.min(Math.max(in_v2a.x, in_v2b.x), this.x) == Math.max(Math.min(in_v2a.x, in_v2b.x), this.x)) && (Math.min(Math.max(in_v2a.y, in_v2b.y), this.y) == Math.max(Math.min(in_v2a.y, in_v2b.y), this.y)));
    }
}

function removeFromArray(arr, value) { 
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}


// makes a better console.log debugging function
function cl(out_var = "無") {
    let e = new Error();
    e = e.stack.split("\n")[2].split(":");
    e.pop();
    let output = "line " + String(e.pop()) + " run";
    if (out_var !== "無") {output += " with output " + String(out_var)};
    console.log(output);
    return output
}