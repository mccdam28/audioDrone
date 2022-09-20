var a      = 0;
var fr     = 30;
var b      = 0;
var diffF  = 0;
function setup() 
{
  createCanvas(800, 800);
  angleMode(DEGREES);
  
  textSize(15);
  
  freqOneSliderFreq = createSlider(100,1000,100);
  freqOneSliderFreq.position(20,20);
  
  freqTwoSliderFreq = createSlider(100,1000,100);
  freqTwoSliderFreq.position(20,50);
  
  freqOneSliderAmp  = createSlider(0,10,5);
  freqOneSliderAmp.position(20,80);
  
  freqTwoSliderAmp  = createSlider(0,10,5);
  freqTwoSliderAmp.position(20,110);
  
  oscOne = new p5.SinOsc();
  oscOne.amp(0.5);
  oscTwo = new p5.SinOsc();
  oscTwo.amp(0.5);

  oscOne.freq(100);
  oscTwo.freq(501);

  oscOne.start();
  oscTwo.start();

  fft = new p5.FFT(0.99,1024);
  a   = 360 / (10 * fr);
  b   = a;
  frameRate(fr);
  
}

function draw() 
{
  background(0);
  oscOne.amp(freqOneSliderAmp.value()/10);
  oscOne.freq(freqOneSliderFreq.value());
  
  oscTwo.amp(freqTwoSliderAmp.value()/10);
  oscTwo.freq(freqTwoSliderFreq.value());
  
  spectrum = fft.analyze();
 
  push();
    translate(width/2,height/2,100);
    rotate(a);
    for (let i = 0; i< spectrum.length; i++)
    {
      {
      stroke(spectrum[i]);
      strokeWeight(i*10);
      line(0, i*7, 0, (i+1)*7);
      }
    }
  pop();
  a += b;
}