let questions = [
{
 q:"Ai lãnh đạo chiến thắng Bạch Đằng năm 938?",
 a:["Lý Thường Kiệt","Ngô Quyền","Trần Hưng Đạo","Lê Lợi"],
 c:1,
 e:"Ngô Quyền đã dùng chiến thuật cọc gỗ để đánh bại quân Nam Hán năm 938."
},
{
 q:"Vũ khí đặc biệt trên sông Bạch Đằng là gì?",
 a:["Súng","Cọc gỗ","Đá","Cung tên"],
 c:1,
 e:"Cọc gỗ nhọn được cắm dưới lòng sông để đâm thủng thuyền giặc."
},
{
 q:"Sông Bạch Đằng thuộc vùng nào?",
 a:["Miền Trung","Miền Bắc","Miền Nam","Tây Nguyên"],
 c:1,
 e:"Sông Bạch Đằng thuộc khu vực Quảng Ninh – Hải Phòng."
},
{
 q:"Chiến thắng Bạch Đằng 938 chấm dứt thời kỳ nào?",
 a:["Bắc thuộc","Phong kiến","Pháp thuộc","Chiến tranh"],
 c:0,
 e:"Chiến thắng này kết thúc hơn 1000 năm Bắc thuộc."
},
{
 q:"Quân xâm lược trong trận Bạch Đằng 938 là?",
 a:["Tống","Nam Hán","Nguyên","Minh"],
 c:1,
 e:"Quân Nam Hán đem quân xâm lược và bị đánh bại."
},
{
 q:"Chiến thắng Bạch Đằng mở ra thời kỳ gì?",
 a:["Độc lập","Chiến tranh","Nô lệ","Chia cắt"],
 c:0,
 e:"Chiến thắng mở ra thời kỳ độc lập lâu dài cho dân tộc."
}
];

let qIndex=0;
let boats=[];
let totalSpawned=0;
let destroyed=0;
let moveStep=80;
let timeLeft=15;
let timerInterval=null;

function startGame(){
 document.getElementById("startScreen").style.display="none";
 document.getElementById("game").style.display="block";
 spawnBoats();
 showQuestion();
 startTimer();
}

function spawnBoats(){
 let river=document.getElementById("river");

 while(boats.length<5 && totalSpawned<6){
   let boat=document.createElement("img");
   boat.src="boat.png";
   boat.className="boat";
   boat.style.left=(50 + boats.length*140)+"px";
   river.appendChild(boat);
   boats.push(boat);
   totalSpawned++;
 }
}

function showQuestion(){
 if(qIndex>=questions.length){
   win();
   return;
 }
 let q=questions[qIndex];
 document.getElementById("question").innerText=
   q.q+"\nA."+q.a[0]+"  B."+q.a[1]+"  C."+q.a[2]+"  D."+q.a[3];
 document.getElementById("explain").innerText="";
 resetTimer();
}

function answer(n){
 let q=questions[qIndex];
 stopTimer();

 if(n===q.c){
   document.getElementById("correctSound").play();
   document.getElementById("explain").innerText="✔ "+q.e;
   showStakeAndKill();
 } else {
   document.getElementById("wrongSound").play();
   document.getElementById("explain").innerText="❌ "+q.e;
   moveBoats();
 }

 qIndex++;
 setTimeout(showQuestion,1500);
}

function showStakeAndKill(){
 if(boats.length===0) return;

 let river=document.getElementById("river");
 let boat=boats.shift();

 let stake=document.createElement("img");
 stake.src="stake.png";
 stake.className="stake";

 let bx=parseInt(boat.style.left);
 stake.style.left=(bx+20)+"px";
 river.appendChild(stake);

 setTimeout(()=>{
   let splash=document.createElement("img");
   splash.src="splash.png";
   splash.className="splash";
   splash.style.left=(bx+10)+"px";
   river.appendChild(splash);

   document.getElementById("splashSound").play();
   boat.style.top="500px";
   boat.style.opacity="0";

   setTimeout(()=>{
     boat.remove();
     stake.remove();
     splash.remove();
     destroyed++;
     spawnBoats();
     if(destroyed>=6) win();
   },800);
 },400);
}

function moveBoats(){
 boats.forEach(b=>{
   let x=parseInt(b.style.left);
   let newX=x+moveStep;
   b.style.left=newX+"px";
   if(newX>=700) lose();
 });
}

function startTimer(){
 timeLeft=15;
 document.getElementById("timer").innerText="⏱ Thời gian: "+timeLeft;
 timerInterval=setInterval(()=>{
   timeLeft--;
   document.getElementById("timer").innerText="⏱ Thời gian: "+timeLeft;
   if(timeLeft<=0){
     stopTimer();
     moveBoats();
     qIndex++;
     showQuestion();
   }
 },1000);
}

function resetTimer(){
 stopTimer();
 startTimer();
}

function stopTimer(){
 if(timerInterval) clearInterval(timerInterval);
}

function win(){
 document.getElementById("game").style.display="none";
 document.getElementById("endScreen").style.display="block";
 document.getElementById("endText").innerText="🎉 CHIẾN THẮNG BẠCH ĐẰNG!";
}

function lose(){
 document.getElementById("game").style.display="none";
 document.getElementById("endScreen").style.display="block";
 document.getElementById("endText").innerText="💀 THUA! THUYỀN GIẶC ĐÃ TỚI BỜ!";
}

