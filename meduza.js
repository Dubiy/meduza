var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var i;
for(i=0; i<720; i+= 20){
    ctx.moveTo(i+5,180);
    ctx.lineTo(i,180);

}
ctx.stroke();

var counter = 0, x=0,y=180;


//100 iterations
var increase = 90/180*Math.PI / 90;
for(i=0; i<=720; i+=1){


    x = i;
    y =  180 - Math.cos(counter) * 120;
    counter += increase;

    ctx.moveTo(x,y);
    ctx.lineTo(x+1,y+1);
    ctx.stroke();
    //alert( " x : " + x + " y : " + y + " increase : " + counter ) ;

}






var CPS = 2; // CPS stands for "complex plane square". That is, we are examining a 2*CPS by 2*CPS square region of the complex plane such that this square (or box) is centered at the complex plane's origin.
var MAX_ITERATIONS = 300; // Increase to improve detection of complex c values that belong to the Mandelbrot set.
var DELTA = 0.002; // Decreasing this value increases the number of "pixels" on the canvas, thereby increasing the size of the rendering but without losing image resolution.

function Complex(x, y) {
    // Constructs the complex number x + yi. If any parameter is undefined, 0 is used instead.
    this.x = x || 0;
    this.y = y || 0;
} // Complex

Complex.prototype.toString = function() {
    // Returns a string representing this complex number in the form "x + yi".
    return this.y >= 0 ? this.x + " + " + this.y + "i" : this.x + " - " + (-this.y) + "i";
} // toString

Complex.prototype.modulus = function() {
    // Returns a real number equal to the absolute value of this complex number.
    return Math.sqrt(this.x*this.x + this.y*this.y);
} // modulus

Complex.prototype.add = function(z) {
    // Returns a complex number equal to the sum of the given complex number and this complex number.
    return new Complex(this.x + z.x, this.y + z.y);
} // sum

Complex.prototype.square = function() {
    // Returns a complex number equal to the square of this complex number.
    var x = this.x*this.x - this.y*this.y;
    var y = 2*this.x*this.y;

    return new Complex(x, y);
} // square

var globals = {}; // Store all would-be-global-variables in one handy global object.
globals.canvas = document.getElementsByTagName('canvas')[0];
globals.canvas.ctx = globals.canvas.getContext('2d');
globals.canvas.ctx.fillStyle = "black";

initializeCoordinateSystem();
drawMandelbrotSet();


function initializeCoordinateSystem() {
    var ctx = globals.canvas.ctx;

    ctx.translate(globals.canvas.width / 2, globals.canvas.height / 2); // Move the canvas's coordinate system to the center of the canvas.
    ctx.scale(1/DELTA, -1/DELTA); // Flip the y-axis to produce a standard Cartesian coordinate system and scale the canvas coordinate system to match the region of the complex plane under consideration.
} // initializeCoordinateSystem

function drawMandelbrotSet() {
    var ctx = globals.canvas.ctx;

    for (var Re = -CPS; Re <= CPS; Re = Re + DELTA) { // Represents the Re-axis. Re represents the real part of a complex c value.
        next_c_value: // "continue next_c_value;" is equivalent to an old school GOTO statement (which can be very handy in deeply nested loops).
            for (var Im = -CPS; Im <= CPS; Im = Im + DELTA) { // Represents the Im-axis. Im represents the imaginary part of a complex c value.
                var z = new Complex(0, 0); // Represents Zo (where "o" indicates subscript 0).
                var c = new Complex(Re, Im); // Represents a complex c value, which either does or does not belong to the Mandelbrot set, as determined in the next FOR loop.

                for (var iterationCount = 1; iterationCount <= MAX_ITERATIONS; iterationCount++) {
                    z = c.add( z.square() ); // Performs Zn+1 = (Zn)^2 + c
                    if (z.modulus() > 2) {
                        continue next_c_value; // The complex c value is not part of the Mandelbrot set, so immediately check the next one.
                    } // if
                } // for

                // Assert: z.modulus() <= 2, therefore the complex c value is probably a member of the Mandelbrot set - increase MAX_ITERATIONS to improve this determination.

                ctx.fillRect(Re, Im, DELTA, DELTA); // This c value is probably part of the Mandelbrot set, so color this pixel black. A "pixel" for the canvas is a DELTA x DELTA black square.
            } // for
    } // for
} // drawMandelbrotSet
