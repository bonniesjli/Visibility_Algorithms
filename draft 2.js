
// Find intersection of RAY & SEGMENT
function getIntersection(ray,segment){
  // RAY in parametric: Point + Direction*T1
  var r_px = ray.a.x;
  var r_py = ray.a.y;
  var r_dx = ray.b.x-ray.a.x;
  var r_dy = ray.b.y-ray.a.y;
  // SEGMENT in parametric: Point + Direction*T2
  var s_px = segment.a.x;
  var s_py = segment.a.y;
  var s_dx = segment.b.x-segment.a.x;
  var s_dy = segment.b.y-segment.a.y;
  // Are they parallel? If so, no intersect
  var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
  var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
  if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
    return null;
  }
  // SOLVE FOR T1 & T2
  // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
  // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
  // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
  // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
  var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
  var T1 = (s_px+s_dx*T2-r_px)/r_dx;
  // Must be within parametic whatevers for RAY/SEGMENT
  if(T1<0) return null;
  if(T2<0 || T2>1) return null;
  // Return the POINT OF INTERSECTION
  return {
    x: r_px+r_dx*T1,
    y: r_py+r_dy*T1,
    param: T1
  };
}
function getBIntersection(ray,boarder){
  // RAY in parametric: Point + Direction*T1
  var r_px = ray.a.x;
  var r_py = ray.a.y;
  var r_dx = ray.b.x-ray.a.x;
  var r_dy = ray.b.y-ray.a.y;
  // SEGMENT in parametric: Point + Direction*T2
  var s_px = boarder.a.x;
  var s_py = boarder.a.y;
  var s_dx = boarder.b.x-boarder.a.x;
  var s_dy = boarder.b.y-boarder.a.y;
  // Are they parallel? If so, no intersect
  var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
  var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
  if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
    return null;
  }
  // SOLVE FOR T1 & T2
  // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
  // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
  // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
  // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
  var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
  var T1 = (s_px+s_dx*T2-r_px)/r_dx;
  // Must be within parametic whatevers for RAY/SEGMENT
  if(T1<0) return null;
  if(T2<0 || T2>1) return null;
  // Return the POINT OF INTERSECTION
  return {
    x: r_px+r_dx*T1,
    y: r_py+r_dy*T1,
    param: T1
  };
}
///////////////////////////////////////////////////////
// DRAWING
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function draw(){
  // Clear canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // Draw segments
  ctx.strokeStyle = "#999";
  for(var i=0;i<segments.length;i++){
    var seg = segments[i];
    ctx.beginPath();
    ctx.moveTo(seg.a.x,seg.a.y);
    ctx.lineTo(seg.b.x,seg.b.y);
    ctx.stroke()
  }
  for(var j=0;j<boarder.length;j++){
      var boa = boarder[j];
      ctx.beginPath();
      ctx.moveTo(boa.a.x,boa.a.y);
      ctx.lineTo(boa.b.x,boa.b.y);
      ctx.stroke()
  }
  // Ray from center of screen to mouse
  var ray = {
    a:{x:320,y:180},
    b:{x:Mouse.x,y:Mouse.y}
  };
  
  // Find CLOSEST intersection
  var closestIntersect = null;
  for(var i=0;i<segments.length;i++){
    var intersect = getIntersection(ray,segments[i]);
    if(!intersect) continue;
    if(!closestIntersect || intersect.param<closestIntersect.param){
      closestIntersect=intersect;
    }
  }
  for(var j=0;j<boarder.length;j++){
    var intersect = getBIntersection(ray,boarder[j]);
    if(!intersect) continue;
    if(!closestIntersect || intersect.param<closestIntersect.param){
      closestIntersect=intersect;
    }
  }
  var intersect = closestIntersect;
  // Draw red laser
  ctx.strokeStyle = "#dd3838";
  ctx.beginPath();
  ctx.moveTo(320,180);
  ctx.lineTo(intersect.x,intersect.y);
  
  ctx.stroke();
// upper left
  if(intersect.x < 320 && (intersect.y === 0 || intersect.y === 360)){
      X = 320 - (intersect.x)*(180 - intersect.y)/(320 - intersect.x)
      ctx.strokeStyle = "#dd3838";
      ctx.beginPath();
      ctx.moveTo(intersect.x,360);
      ctx.lineTo(0,X);
      ctx.stroke();

      ctx.fillStyle = "#dd3838";
      ctx.beginPath();
      ctx.arc(intersect.x, intersect.y, 4, 0, 2*Math.PI, false);
      ctx.fill();
  }
// upper right -- TO DO 

  if(intersect.x > 320 && (intersect.y === 0 || intersect.y === 360)){
      X = 320 - (intersect.x)*(180 + intersect.y)/(320 + intersect.x)
      ctx.strokeStyle = "#dd3838";
      ctx.beginPath();
      ctx.moveTo(intersect.x,360);
      ctx.lineTo(640,X);
      ctx.stroke();

      ctx.fillStyle = "#dd3838";
      ctx.beginPath();
      ctx.arc(intersect.x, intersect.y, 4, 0, 2*Math.PI, false);
      ctx.fill();
  }

// right upper
  if(intersect.y < 180 && (intersect.x === 640)){
      X = 180 - (intersect.y)*(intersect.x - 320)/(intersect.y - 180)
      ctx.strokeStyle = "#dd3838";
      ctx.beginPath();
      ctx.moveTo(0,intersect.y);
      ctx.lineTo(X,0);
      ctx.stroke();

      ctx.fillStyle = "#dd3838";
      ctx.beginPath();
      ctx.arc(intersect.x, intersect.y, 4, 0, 2*Math.PI, false);
      ctx.fill();
  }

// red laser 
      ctx.fillStyle = "#dd3838";
      ctx.beginPath();
      ctx.arc(intersect.x, intersect.y, 4, 0, 2*Math.PI, false);
      ctx.fill();
}
// LINE SEGMENTS
var segments = [
  // Polygon #1
  {a:{x:100,y:150}, b:{x:120,y:50}},
  {a:{x:120,y:50}, b:{x:200,y:80}},
  {a:{x:200,y:80}, b:{x:140,y:210}},
  {a:{x:140,y:210}, b:{x:100,y:150}},
  // Polygon #2
  {a:{x:100,y:200}, b:{x:120,y:250}},
  {a:{x:120,y:250}, b:{x:60,y:300}},
  {a:{x:60,y:300}, b:{x:100,y:200}},
  // Polygon #3
  {a:{x:200,y:260}, b:{x:220,y:150}},
  {a:{x:220,y:150}, b:{x:300,y:200}},
  {a:{x:300,y:200}, b:{x:350,y:320}},
  {a:{x:350,y:320}, b:{x:200,y:260}},
  // Polygon #4
  {a:{x:340,y:60}, b:{x:360,y:40}},
  {a:{x:360,y:40}, b:{x:370,y:70}},
  {a:{x:370,y:70}, b:{x:340,y:60}},
  // Polygon #5
  {a:{x:450,y:190}, b:{x:560,y:170}},
  {a:{x:560,y:170}, b:{x:540,y:270}},
  {a:{x:540,y:270}, b:{x:430,y:290}},
  {a:{x:430,y:290}, b:{x:450,y:190}},
  // Polygon #6
  {a:{x:400,y:95}, b:{x:580,y:50}},
  {a:{x:580,y:50}, b:{x:480,y:150}},
  {a:{x:480,y:150}, b:{x:400,y:95}}
]
var boarder = [
  // Border
  {a:{x:0,y:0}, b:{x:640,y:0}},
  {a:{x:640,y:0}, b:{x:640,y:360}},
  {a:{x:640,y:360}, b:{x:0,y:360}},
  {a:{x:0,y:360}, b:{x:0,y:0}}
]
// DRAW LOOP
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
var updateCanvas = true;
function drawLoop(){
    requestAnimationFrame(drawLoop);
    if(updateCanvas){
      draw();
      updateCanvas = false;
    }
}
window.onload = function(){
  drawLoop();
};
// MOUSE  
var Mouse = {
  x: canvas.width/2+10,
  y: canvas.height/2
};
canvas.onmousemove = function(event){ 
  Mouse.x = event.clientX;
  Mouse.y = event.clientY;
  updateCanvas = true;
};
