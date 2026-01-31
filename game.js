let boats = [];
let qIndex = 0;
let waiting = false;
let canNext = false;
let delayTimer = null;

const correctSound = new Audio("correct.wav");
const wrongSound   = new Audio("wrong.wav");

const questions = [
 {q:"Ai lãnh đạo trận Bạch Đằng?",a:["Ngô Quyền","Lý Thường Kiệt","Trần Hưng Đạo","Quang Trung"],c:0,e:"Ngô Quyền chỉ huy trận Bạch Đằng năm 938."},
 {q:"Quân ta dùng vũ khí gì trên sông?",a:["Cọc gỗ","Tên lửa","Pháo","Bom"],c:0,e:"Quân ta dùng cọc gỗ đóng dưới lòng sông."},
 {q:"Trận Bạch Đằng nổi tiếng năm nào?",a:["938","1000","1427","1789"],c:0,e:"Năm 938 là trận Bạch Đằng nổi tiếng nhất."},
 {q:"Quân xâm lược là ai?",a:["Nam Hán","Nguyên","Pháp","Mỹ"],c:0,e:"Quân Nam Hán xâm lược nước ta."},
 {q:"Mục đích cọc gỗ?",a:["Đâm thuyền","Trang trí","Làm cầu","Làm nhà"],c:0,e:"Cọc gỗ dùng để đâm thủng thuyền giặc."},
 {q:"Chiến thắng giúp nước ta?",a:["Độc lập","Mất nước","Bị đô hộ","Không đổi"],c:0,e:"Chiến thắng giúp nước ta giành độc lập."}
];

function initBoats(){
 const area=document.getElementById("boats");
 area.innerHTML="";
 boats=[];
 for(let i=0;i<5;i++){
   let b=document.createElement("img");
   b.src="boat.png";
   b.className="boat";
   b.style.left="50px";
   b.style.top=(80+i*80)+"px";
   area.appendChild(b);
   boats.push(b);
 }
}

function showQuestion(){
 waiting=false;
 canNext=false;
 document.getElementById("nextBtn").style.display="none";
 document.getElementById("explain").innerText="";
 let q=questions[qIndex];
 document.getElementById("q").innerText=q.q;
 for(let i=0;i<4;i++){
   document.getElementById("b"+i).innerText=q.a[i];
 }
}

function answer(n){
 if(waiting) return;
 waiting=true;

 if(delayTimer){
   clearTimeout(delayTimer);
   delayTimer=null;
 }

 let q=questions[qIndex];

 if(n===q.c){
   correctSound.currentTime = 0;
   correctSound.play();
   document.getElementById("explain").innerText="✔ "+q.e;
   delayTimer=setTimeout(showStakeAndKill,30000);
 } else {
   wrongSound.currentTime = 0;
   wrongSound.play();
   document.getElementById("explain").innerText="❌ "+q.e;
   delayTimer=setTimeout(moveBoatsSmallStep,30000);
 }

 setTimeout(()=>{
   canNext=true;
   document.getElementById("nextBtn").style.display="inline-block";
 },30000);
}

function showStakeAndKill(){
 let stake=document.getElementById("stake");
 if(boats.length===0) return;

 stake.style.display="block";
 stake.style.top=boats[0].style.top;

 setTimeout(()=>{
   boats[0].remove();
   boats.shift();
   stake.style.display="none";
   checkWin();
 },1000);
}

function moveBoatsSmallStep(){
 boats.forEach(b=>{
   let x=parseInt(b.style.left);
   let newX=x+40;
   b.style.left=newX+"px";
   if(newX>=750){
     lose();
   }
 });
}

function nextQuestion(){
 if(!canNext) return;
 qIndex++;
 if(qIndex>=questions.length){
   win();
   return;
 }
 showQuestion();
}

function checkWin(){
 if(boats.length===0){
   win();
 }
}

function win(){
 alert("🎉 BẠN THẮNG 🎉");
 location.reload();
}

function lose(){
 alert("💀 BẠN THUA 💀");
 location.reload();
}

window.onload=()=>{
 initBoats();
 showQuestion();
};
