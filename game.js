let questions = [
 {q:"Trận Bạch Đằng năm 938 do ai chỉ huy?",
  a:["Ngô Quyền","Trần Hưng Đạo","Lý Thường Kiệt","Quang Trung"],
  c:0, e:"Ngô Quyền lãnh đạo quân dân đánh bại quân Nam Hán."},

 {q:"Chiến thuật chính ở Bạch Đằng là gì?",
  a:["Cọc gỗ ngầm","Đánh bộ","Phòng thủ thành","Cung tên"],
  c:0, e:"Cắm cọc gỗ nhọn dưới sông để phá thuyền giặc."},

 {q:"Kẻ thù năm 938 là ai?",
  a:["Nam Hán","Tống","Nguyên","Minh"],
  c:0, e:"Quân Nam Hán xâm lược nước ta."},

 {q:"Trận Bạch Đằng diễn ra ở đâu?",
  a:["Sông Bạch Đằng","Sông Hồng","Sông Đà","Sông Cả"],
  c:0, e:"Diễn ra trên sông Bạch Đằng."},

 {q:"Ai là con trai Ngô Quyền?",
  a:["Ngô Xương Ngập","Ngô Nhật Khánh","Đinh Bộ Lĩnh","Lê Hoàn"],
  c:0, e:"Ngô Xương Ngập là con Ngô Quyền."},

 {q:"Quân giặc đi bằng gì?",
  a:["Thuyền","Ngựa","Xe","Bộ"],
  c:0, e:"Quân Nam Hán đi bằng thuyền."}
];

// ===== ÂM THANH =====
const soundCorrect = new Audio("correct.wav");
const soundWrong   = new Audio("wrong.wav");
const soundSplash  = new Audio("splash.wav");
const soundWin     = new Audio("win.wav");
const soundLose    = new Audio("lose.wav");

let index=0, boats=[], time=30, timer;

function startGame(){
 document.getElementById("startScreen").style.display="none";
 document.getElementById("gameScreen").style.display="block";
 spawnBoats();
 showQ();
 startTimer();
}

function spawnBoats(){
 let area=document.getElementById("boatArea");
 area.innerHTML="";
 boats=[];
 for(let i=0;i<5;i++){
  let b=document.createElement("img");
  b.src="boat.png";
  b.className="boat";
  b.style.left=(150+i*150)+"px";
  area.appendChild(b);
  boats.push(b);
 }
}

function showQ(){
 let q=questions[index];
 document.getElementById("question").innerText=q.q;
 for(let i=0;i<4;i++){
  document.getElementById("btn"+i).innerText=q.a[i];
 }
 document.getElementById("explain").innerText="";
}

function choose(i){
 let q=questions[index];
 resetTimer();

 if(i===q.c){
  soundCorrect.play();      // ✅ đúng
  soundSplash.play();      // 🌊 chìm

  document.getElementById("stake").style.display="block";
  boats[0].classList.add("sink");
  boats.shift();
  document.getElementById("explain").innerText="ĐÚNG! "+q.e;

  setTimeout(nextQ,2000);
 }else{
  soundWrong.play();       // ❌ sai
  document.getElementById("explain").innerText="SAI! "+q.e;
 }
}

function nextQ(){
 document.getElementById("stake").style.display="none";
 index++;
 if(index>=questions.length){
  win();
 }else{
  spawnBoats();
  showQ();
 }
}

function startTimer(){
 time=30;
 document.getElementById("time").innerText=time;
 timer=setInterval(()=>{
  time--;
  document.getElementById("time").innerText=time;
  if(time<=0){
   lose();
  }
 },1000);
}

function resetTimer(){
 clearInterval(timer);
 startTimer();
}

function win(){
 clearInterval(timer);
 soundWin.play();   // 🎉 thắng
 document.getElementById("gameScreen").style.display="none";
 document.getElementById("winScreen").style.display="block";
}

function lose(){
 clearInterval(timer);
 soundLose.play();  // 💀 thua
 document.getElementById("gameScreen").style.display="none";
 document.getElementById("loseScreen").style.display="block";
}

function restart(){
 location.reload();
}
