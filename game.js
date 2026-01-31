const questions = [
 {q:"Ai chỉ huy quân ta trận Bạch Đằng?",a:["Ngô Quyền","Lý Thường Kiệt","Trần Hưng Đạo","Quang Trung"],c:0,e:"Ngô Quyền lãnh đạo trận Bạch Đằng năm 938."},
 {q:"Chiến thuật chính?",a:["Cọc gỗ","Cung tên","Voi chiến","Pháo"],c:0,e:"Cọc gỗ nhọn cắm dưới sông."},
 {q:"Quân xâm lược?",a:["Nam Hán","Tống","Nguyên","Minh"],c:0,e:"Quân Nam Hán xâm lược."},
 {q:"Con sông nào?",a:["Bạch Đằng","Hồng","Đà","Mã"],c:0,e:"Trận đánh trên sông Bạch Đằng."},
 {q:"Năm xảy ra?",a:["938","981","1288","1427"],c:0,e:"Năm 938."},
 {q:"Ý nghĩa?",a:["Độc lập","Mất nước","Thua trận","Hòa"],c:0,e:"Chấm dứt 1000 năm Bắc thuộc."}
];

let index=0;
let boats=[];
let move=0;
let timer;

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
  b.style.top=(20+i*50)+"px";
  b.style.left="0px";
  box.appendChild(b);
  boats.push(b);
 }
}

function showQuestion(){
 clearTimeout(timer);
 document.getElementById("stake").style.display="none";
 document.getElementById("explain").innerText="";
 document.getElementById("nextBtn").style.display="none";

 let q=questions[index];
 document.getElementById("question").innerText=q.q;
 for(let i=0;i<4;i++){
  document.getElementById("b"+i).innerText=q.a[i];
  document.getElementById("b"+i).disabled=false;
 }
}

function answer(i){
 let q=questions[index];
 for(let k=0;k<4;k++) document.getElementById("b"+k).disabled=true;

 if(i===q.c){
  correctSound.play();
  showStake();
  sinkBoat();
 } else {
  wrongSound.play();
  moveBoats();
 }

 document.getElementById("explain").innerText=q.e;
 document.getElementById("nextBtn").style.display="inline";
}

function showStake(){
 let stake=document.getElementById("stake");
 stake.style.display="block";
 stake.style.left="350px";
}

function sinkBoat(){
 if(boats.length>0){
  let b=boats.shift();
  sinkSound.play();
  b.style.top="300px";
 }
}

function moveBoats(){
 move+=30;
 boats.forEach(b=>{
  b.style.left=move+"px";
 });
 if(move>=600){
  alert("❌ Thua rồi!");
  location.reload();
 }
}

function nextQuestion(){
 index++;
 if(index>=questions.length){
  alert("🎉 Chiến thắng!");
  location.reload();
 }
 showQuestion();
}
