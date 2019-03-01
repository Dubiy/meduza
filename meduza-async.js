

class MeduzaAsync {
    constructor(canvas) {
        this.offscreen = canvas.transferControlToOffscreen();
        this.worker = new Worker('worker.js');
        this.worker.postMessage({
            msg: "renderMandelbrot",
            canvas: this.offscreen
        }, [this.offscreen]);
        this.worker.onmessage = this.onMessageListener.bind(this);
    }

    onMessageListener(aRequest) {
        console.log(aRequest);
        // switch (aRequest) {
        //
        //     case "renderMandelbrot":
        //         this.CPS = 2; // CPS stands for "complex plane square". That is, we are examining a 2*CPS by 2*CPS square region of the complex plane such that this square (or box) is centered at the complex plane's origin.
        //         this.MAX_ITERATIONS = 300; // Increase to improve detection of complex c values that belong to the Mandelbrot set.
        //         this.DELTA = 0.002; // Decreasing this value increases the number of "pixels" on the canvas, thereby increasing the size of the rendering but without losing image resolution.
        //
        //         this.canvas = aRequest.data.canvas;
        //         this.ctx = this.canvas.getContext('2d');
        //
        //         this.drawCos();
        //         this.draw();
        //         break;
        //
        //
        // }
    }
}
