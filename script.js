const PASSWORD = "VPAR";

const tap = document.getElementById("tap");
const lock = document.getElementById("lock");
const card = document.getElementById("card");
const error = document.getElementById("error");
const music = document.getElementById("music");

/* TAP */
tap.addEventListener("click", () => {
  music.volume = 0.8;
  music.play();
  tap.style.display = "none";
  lock.style.display = "block";
});

/* CHECK PASS */
function checkPass(){
  const val = document.getElementById("password").value;
  if(val === PASSWORD){
    lock.style.display = "none";
    card.style.display = "block";
  }else{
    error.innerText = "Sai mật khẩu!";
  }
}

/* PHÁO HOA */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function Firework(){
  this.x = Math.random()*canvas.width;
  this.y = canvas.height;
  this.targetY = Math.random()*canvas.height/2;
  this.speed = 4;
  this.exploded = false;
}

Firework.prototype.update = function(){
  if(this.y > this.targetY){
    this.y -= this.speed;
  }else{
    this.exploded = true;
  }
};

Firework.prototype.draw = function(){
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(this.x,this.y,2,2);
};

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(Math.random()<0.05){
    fireworks.push(new Firework());
  }
  fireworks.forEach((f,i)=>{
    f.update();
    f.draw();
    if(f.exploded) fireworks.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();
