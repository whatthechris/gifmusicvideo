var api = "https://api.tenor.com/v1/search?"
var query = "q="
var input = "cats"
var apiKey = "&key=2X3XMOVR7IT6"
var limit = "&limit="
var limitnumber = "20"
var imgurl= [];
var imgCount = 0;
let textfield;

var cnv, soundFile, fft, peakDetect;

function preload() {
	soundFile = loadSound('assets/lovesick.mp3');
}

function setup(){
	noCanvas();
	fft = new p5.FFT();
    peakDetect = new p5.PeakDetect(3000, 20000, 0.35, 5);

    textfield = createInput('Type a keyword and hit enter');
}

function keyPressed() {
    if (keyCode === ENTER) {
      if (soundFile.isPlaying() ) {
        removeElements();
        soundFile.pause();
        textfield = createInput(input);
	  }else{
        removeElements();
        soundFile.play();
        input = textfield.value();
        textfield.value('');
        print(input)
        var url = api + query + input + apiKey + limit + limitnumber;
        loadJSON(url, gotData);
      }
    }
  }

function gotData(tenor){
    for (let i = 0; i < limitnumber; i++) {
        imgurl[i] = (tenor.results[i].media[0].tinygif.url);
    }
}


function draw(){
	//-------beat detection-------
		fft.analyze();
		peakDetect.update(fft);

		if ( peakDetect.isDetected) {
            removeElements();
            img = createImg(imgurl[imgCount]);
            img.size(innerWidth,innerHeight);
            imgCount = int(random(0,limitnumber));
            print(imgCount);
		}
}

// // toggle play/stop when canvas is clicked
// function mouseClicked() {
// 	if (mouseX > 0 && mouseX < window.innerWidth && mouseY > 0 && mouseY < window.innerHeight) {
// 	  if (soundFile.isPlaying() ) {
//         soundFile.pause();
//         textfield = createInput('');
// 	  } else {
//         soundFile.play();
//         print(imgurl);
// 	  }
// 	}
//   }