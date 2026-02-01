let current = 0;
let time = 30;
let timer;
let boatCount = 5;

const soundCorrect = new Audio("correct.wav");
const soundWrong = new Audio("wrong.wav");
const soundWin = new Audio("win.wav");
const soundLose = new Audio("lose.wav");

const questions = [
  {
    q:"Ai chỉ huy trận Bạch Đằng 938?",
    A:"Ngô Quyền",
    B:"Trần Hưng Đạo",
    C:"Lý Thường Kiệt",
    D:"Quang Trung",
    answer:"A",
    explain:"Ngô Quyền chỉ huy quân ta đánh bại quân Nam Hán năm 938."
  },
  {
    q:"Vũ khí chính trên sông Bạch Đằng?",
    A:"Súng",
    B:"Cọc gỗ",
    C:"Bom",
    D:"Đá",
    answer:"B",
    explain:"Quân ta đóng cọc gỗ dưới lòng sông để đâm thủng thuyền giặc."
  },
  {
    q:"Chiến thắng Bạch Đằng giúp nước ta?",
    A:"Mất nước",
    B:"Có vua mới",
    C:"Giành độc lập",
    D:"Không thay đổi",
    answer:"C",
    explain:"Chấm dứt hơn 1000 năm Bắc thuộc."
  }
];

function startGame(){
  document.getElementById("result").classList.add("hidden");
  document.getElementById("startScreen").style.display="none";
  document.getElementById("game").style.display="block";

  current = 0;
  boatCount = 5;

  updateBoats();
  loadQuestion();
  startTimer();
}

function updateBoats(){
  let box = document.getElementById("boats");
  box.innerHTML="";
  for(let i=0;i<boatCount;i++){
    let img=document.createElement("img");
    img.src="boat.png";
    img.className="boat";
    box.appendChild(img);
  }
}

function loadQuestion(){
  resetTimer();
  let q=questions[current];
  document.getElementById("question").innerText=q.q;
  let btn=document.querySelectorAll("#answers button");
  btn[0].innerText="A. "+q.A;
  btn[1].innerText="B. "+q.B;
  btn[2].innerText="C. "+q.C;
  btn[3].innerText="D. "+q.D;
  window.correct=q.answer;
  document.getElementById("explain").innerText="";
}

function choose(ans){
  resetTimer();
  let q=questions[current];

  if(ans===window.correct){
    soundCorrect.play();
    showStake();
    sinkBoat();
    document.getElementById("explain").innerText=q.explain;
    boatCount--;
    updateBoats();
  }else{
    soundWrong.play();
    document.getElementById("explain").innerText="❌ Sai rồi!";
  }

  setTimeout(()=>{
    current++;
    if(boatCount<=0){
      winGame(); return;
    }
    if(current>=questions.length){
      loseGame(); return;
    }
    loadQuestion();
  },3000);
}

function sinkBoat(){
  let boats=document.querySelectorAll(".boat");
  if(boats.length>0){
    boats[boats.length-1].classList.add("sink");
  }
}

function showStake(){
  let s=document.getElementById("stake");
  s.style.display="block";
  setTimeout(()=>{s.style.display="none"},800);
}

function startTimer(){
  time=30;
  document.getElementById("time").innerText=time;
  timer=setInterval(()=>{
    time--;
    document.getElementById("time").innerText=time;
    if(time<=0){
      clearInterval(timer);
      loseGame();
    }
  },1000);
}

function resetTimer(){
  clearInterval(timer);
  startTimer();
}

function winGame(){
  soundWin.play();
  document.getElementById("resultText").innerText="🎉 BẠN THẮNG!";
  document.getElementById("result").classList.remove("hidden");
}

function loseGame(){
  soundLose.play();
  document.getElementById("resultText").innerText="💀 BẠN THUA!";
  document.getElementById("result").classList.remove("hidden");
}
