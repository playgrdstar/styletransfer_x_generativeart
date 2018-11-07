var organic = [];
var change, colorsPalette;
var c;
var output;
var capturedImage;

var style1;

function setup() {
  c = createCanvas(150, 150);
  c.parent('p5canvas');
  background(159,65,115,10);
  change = 0;
  colorsPalette = [color(146, 167, 202,30),
            color(186, 196, 219,30),
            color(118, 135, 172,30),
            color(76, 41, 81,30),
            color(144, 62, 92,30),
            color(178, 93, 119,30),
            color(215, 118, 136,30),
            color(246, 156, 164,30),];

  for (var i=0;i<110;i++){
    organic.push(new Organic(0.05+1*i/2,width/2,height/2,i*1,i*random(90),colorsPalette[floor(random(8))]));
  }

  style1 = ml5.styleTransfer('models/wave', modelLoaded);

}



function draw() {
  
  background(159,65,115,10);
  for(var i=0; i<organic.length;i++){
      organic[i].show(change);
  }

  change+=0.01;

  if (frameCount%210==0){
    learn();
  }

}

function modelLoaded() {
  if(style1.ready){
    console.log('Ready!')
  }
}

function runModel(){
  console.log('Running model');
  style1.transfer(capturedImage, function(err, result) {
    createImg(result.src).parent('styled');
    createImg(result.src).parent('styled2');
  });
}


function learn(){

    $('#outimage').empty();
    $('#styled').empty();
    $('#styled2').empty();
    saveFrames('_', '_', 1, 25, function(data) {
    // console.log(data[1].imageData);
    capturedImage = createImg(data[1].imageData, runModel);
    capturedImage.parent('outimage');
    });
}


function Organic(radius,xpos,ypos,detail,angle,color){

  this.radius = radius;
  this.xpos = xpos;
  this.ypos = ypos;
  this.detail = detail;
  this.angle = angle;
  this.color = color;

  this.show = function(change){

    noStroke();
    strokeWeight(0.1);
    stroke(200);
    fill(this.color);
    push();
    translate(xpos, ypos);
    rotate(this.angle+change);
    beginShape();
    var off = 0;
    // var change = this.change;
    for (var i = 0; i < TWO_PI; i += 0.1) {
      var offset = map(noise(off, change), 0, 1, -detail, detail);
      // console.log(change);
      // console.log(offset);
      var r = this.radius + offset;
      var x = r * cos(i);
      var y = r * sin(i);
      // ellipse(x,y,20,20);
      vertex(x, y);
      off += 0.1;
    }
    endShape();
    pop();
    }
}