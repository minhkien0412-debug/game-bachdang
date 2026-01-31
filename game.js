const questions=[
 {q:"Ai chỉ huy quân ta trận Bạch Đằng?",a:["Ngô Quyền","Lý Thường Kiệt","Trần Hưng Đạo","Quang Trung"],c:0,e:"Ngô Quyền lãnh đạo trận Bạch Đằng năm 938."},
 {q:"Vũ khí chính dưới sông?",a:["Cọc gỗ","Cung tên","Voi","Pháo"],c:0,e:"Cọc gỗ nhọn giấu dưới nước để đâm thuyền giặc."},
 {q:"Quân xâm lược?",a:["Nam Hán","Tống","Nguyên","Minh"],c:0,e:"Quân Nam Hán bị đánh bại."},
 {q:"Con sông nào?",a:["Bạch Đằng","Hồng","Đà","Mã"],c:0,e:"Trận đánh diễn ra trên sông Bạch Đằng."},
 {q:"Năm xảy ra?",a:["938","981","1288","1427"],c:0,e:"Năm 938."},
 {q:"Ý nghĩa?",a:["Độc lập","Mất nước","Thua","Hòa"],c:0,e:"Chấm dứt 1000 năm Bắc thuộc."}
];

let idx=0;
let boats=[];
let moveX=0;

const correctSound=new Audio("correct.wav");
const wrongSound=new Audio("wrong.wav");
const sinkSound=new Audio("sink.wav");

function startGame(){
 document.getElementById("startScreen").style.display="none";
 document.getElementById("gameScreen").style.display="block";
 createBoats();
 showQuestion();
}

function createBoats(){
 let box=document.getElementById("boats");
 box.innerHTML="";
 boats=[];
 for(let i=0;i<5;i++){
  let b=document.createElement("img");
  b.src="boat.png";
  b.className="boat";
  b.style.left="50px";
  b.style.top=(80+i*70)+"px";
  box.appendChild(b);
  boats.push(b);
 }
}

function showQuestion(){
 document.getElementById("stake").style.display="none";
 document.getElementById("explain").innerText="";
 document.getElementById("nextBtn").style.display="none";

 let q=questions[idx];
 document.getElementById("question").innerText=q.q;
 for(let i=0;i<4;i++){
  document.getElementById("b"+i).innerText=q.a[i];
  document.getElementById("b"+i).disabled=false;
 }
}

function answer(i){
 let q=questions[idx];
 for(let k=0;k<4;k++) document.getElementById("b"+k).disabled=true;

 if(i===q.c){
  correctSound.play();
  showStakeHitBoat();
 }else{
  wrongSound.play();
  moveBoatsSmall();
 }

 document.getElementById("explain").innerText=q.e;
 document.getElementById("nextBtn").style.display="inline";
}

function showStakeHitBoat(){
 if(boats.length===0) return;
 let stake=document.getElementById("stake");
 let boat=boats[0];

 stake.style.left=boat.style.left;
 stake.style.top=boat.style.top;
 stake.style.display="block";

 setTimeout(()=>{
  sinkSound.play();
  boat.style.top="1200px"; // chìm xuống
  boat.style.opacity="0";
  boats.shift();
  stake.style.display="none";
 },800);
}

function moveBoatsSmall(){
 moveX+=40;
 boats.forEach(b=>{
  b.style.left=moveX+"px";
 });
 if(moveX>=window.innerWidth-200){
  alert("💀 Bạn thua!");
  location.reload();
 }
}

function nextQuestion(){
 idx++;
 if(idx>=questions.length){
  alert("🎉 Bạn thắng!");
  location.reload();
 }
 showQuestion();
}
