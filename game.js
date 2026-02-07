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

const soundCorrect = new Audio("correct.wav");
const soundWrong = new Audio("wrong.wav");
const soundSplash = new Audio("splash.wav");
const soundWin = new Audio("win.wav");
const soundLose = new Audio("lose.wav");

const START_TIME = 30;
const BOAT_STEP = 110;
const SCORE_PER_CORRECT = 100;

let index = 0;
let boats = [];
let time = START_TIME;
let timer = null;
let locked = false;
let canGoNext = false;
let isGameOver = false;
let score = 0;
let gameQuestions = [];
let enemyOffset = 0;
let finishX = 0;

function playSound(sound){
 sound.currentTime = 0;
 sound.play();
}

function shuffle(list){
 let copy = [...list];
 for(let i = copy.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * (i + 1));
  [copy[i], copy[j]] = [copy[j], copy[i]];
 }
 return copy;
}

function prepareQuestions(){
 return shuffle(questions).map((q)=>{
  const options = q.a.map((text, idx)=>({ text, idx }));
  const shuffledOptions = shuffle(options);
  return {
   q: q.q,
   a: shuffledOptions.map((item)=>item.text),
   c: shuffledOptions.findIndex((item)=>item.idx === q.c),
   e: q.e
  };
 });
}

function bindButtons(){
 document.getElementById("startBtn").addEventListener("click", startGame);
 document.getElementById("playAgainWin").addEventListener("click", restart);
 document.getElementById("playAgainLose").addEventListener("click", restart);
 document.getElementById("nextBtn").addEventListener("click", goNextQuestion);

 document.querySelectorAll(".answerBtn").forEach((btn)=>{
  btn.addEventListener("click", ()=> choose(Number(btn.dataset.answer)));
 });

 window.addEventListener("resize", updateFinishLine);
 document.addEventListener("keydown", (event)=>{
  if(event.key === "Enter" && canGoNext){
   goNextQuestion();
  }
 });
}

function setNextButton(show){
 const nextBtn = document.getElementById("nextBtn");
 nextBtn.style.display = show ? "inline-block" : "none";
 nextBtn.innerText = index === gameQuestions.length - 1 ? "Xem kết quả ➜" : "Câu tiếp theo ➜";
 canGoNext = show;
}

function setAnswersDisabled(disabled){
 document.querySelectorAll(".answerBtn").forEach((btn)=>{
  btn.disabled = disabled;
 });
}

function updateHud(){
 document.getElementById("score").innerText = score;
 document.getElementById("currentQuestion").innerText = Math.min(index + 1, gameQuestions.length);
 document.getElementById("totalQuestion").innerText = gameQuestions.length;
}

function startGame(){
 clearInterval(timer);
 index = 0;
 locked = false;
 canGoNext = false;
 isGameOver = false;
 score = 0;
 time = START_TIME;
 enemyOffset = 0;
 gameQuestions = prepareQuestions();

 document.getElementById("startScreen").style.display = "none";
 document.getElementById("winScreen").style.display = "none";
 document.getElementById("loseScreen").style.display = "none";
 document.getElementById("gameScreen").style.display = "block";
 document.getElementById("stake").style.display = "none";
 document.getElementById("explain").innerText = "";

 spawnBoats(gameQuestions.length);
 updateHud();
 showQ();
 startTimer(START_TIME);
}

function updateFinishLine(){
 const finishLine = document.getElementById("finishLine");
 finishX = finishLine.offsetLeft;
}

function spawnBoats(totalBoats){
 const area = document.getElementById("boatArea");
 area.innerHTML = "";
 boats = [];
 updateFinishLine();

 const spacing = 110;
 for(let i = 0; i < totalBoats; i++){
  let b = document.createElement("img");
  let baseX = 80 + i * spacing;
  b.src = "boat.png";
  b.className = "boat";
  b.dataset.baseX = String(baseX);
  b.style.left = baseX + "px";
  area.appendChild(b);
  boats.push(b);
 }
}

function showQ(){
 locked = false;
 setAnswersDisabled(false);
 setNextButton(false);
 updateHud();

 const q = gameQuestions[index];
 document.getElementById("question").innerText = q.q;
 for(let i = 0; i < 4; i++){
  document.getElementById("btn" + i).innerText = q.a[i];
 }
 document.getElementById("explain").innerText = "";
}

function tickTimer(){
 time--;
 document.getElementById("time").innerText = time;
 if(time <= 0){
  lose();
 }
}

function startTimer(seconds){
 clearInterval(timer);
 if(typeof seconds === "number"){
  time = seconds;
 }
 document.getElementById("time").innerText = time;
 timer = setInterval(tickTimer, 1000);
}

function enemyAdvance(){
 enemyOffset += BOAT_STEP;
 let reachFinish = false;

 for(let i = 0; i < boats.length; i++){
  const boat = boats[i];
  const baseX = Number(boat.dataset.baseX);
  const nextX = baseX + enemyOffset;
  boat.style.left = nextX + "px";
  if(nextX + 100 >= finishX){
   reachFinish = true;
  }
 }

 return reachFinish;
}

function choose(i){
 if(locked || isGameOver) return;
 locked = true;
 setAnswersDisabled(true);
 clearInterval(timer);

 const q = gameQuestions[index];
 if(i === q.c){
  playSound(soundCorrect);
  playSound(soundSplash);
  score += SCORE_PER_CORRECT;
  document.getElementById("stake").style.display = "block";

  if(boats.length > 0){
   boats[0].classList.add("sink");
   boats.shift();
  }

  document.getElementById("explain").innerText = "✅ ĐÚNG! " + q.e;
  setNextButton(true);
  updateHud();
  return;
 }

 playSound(soundWrong);
 const reached = enemyAdvance();
 document.getElementById("explain").innerText = "❌ SAI! Thuyền địch tiến lên!";

 if(reached){
  setTimeout(lose, 700);
  return;
 }

 setNextButton(true);
}

function goNextQuestion(){
 if(!canGoNext || isGameOver) return;
 nextQ();
}

function nextQ(){
 document.getElementById("stake").style.display = "none";
 index++;

 if(index >= gameQuestions.length){
  if(boats.length === 0){
   win();
  }else{
   lose();
  }
  return;
 }

 if(boats.length === 0){
  win();
 }else{
  showQ();
  startTimer(START_TIME);
 }
}

function win(){
 if(isGameOver) return;
 isGameOver = true;
 clearInterval(timer);
 playSound(soundWin);
 document.getElementById("winScore").innerText = score;
 document.getElementById("gameScreen").style.display = "none";
 document.getElementById("winScreen").style.display = "flex";
}

function lose(){
 if(isGameOver) return;
 isGameOver = true;
 clearInterval(timer);
 playSound(soundLose);
 document.getElementById("loseScore").innerText = score;
 document.getElementById("gameScreen").style.display = "none";
 document.getElementById("loseScreen").style.display = "flex";
}

function restart(){
 startGame();
}

window.addEventListener("DOMContentLoaded", bindButtons);
