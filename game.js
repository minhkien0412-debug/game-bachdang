const questions = [
  {
    q: "Trận Bạch Đằng năm 938 do ai chỉ huy?",
    a: ["Ngô Quyền", "Trần Hưng Đạo", "Lý Thường Kiệt", "Quang Trung"],
    correct: 0,
    explain: "Ngô Quyền là người chỉ huy trận Bạch Đằng năm 938 đánh bại quân Nam Hán."
  },
  {
    q: "Chiến thuật chính ở trận Bạch Đằng là gì?",
    a: ["Đánh trực diện", "Dùng cọc gỗ dưới nước", "Phục kích trên núi", "Đánh ban đêm"],
    correct: 1,
    explain: "Quân ta cắm cọc gỗ dưới lòng sông, lợi dụng thủy triều để tiêu diệt thuyền địch."
  },
  {
    q: "Con sông diễn ra trận Bạch Đằng thuộc tỉnh nào ngày nay?",
    a: ["Quảng Ninh - Hải Phòng", "Huế", "Hà Nội", "Nghệ An"],
    correct: 0,
    explain: "Sông Bạch Đằng nằm giữa Quảng Ninh và Hải Phòng."
  },
  {
    q: "Quân xâm lược bị đánh bại năm 938 là?",
    a: ["Quân Tống", "Quân Mông Nguyên", "Quân Nam Hán", "Quân Minh"],
    correct: 2,
    explain: "Quân Nam Hán bị tiêu diệt hoàn toàn trên sông Bạch Đằng."
  },
  {
    q: "Ý nghĩa lớn nhất của chiến thắng Bạch Đằng 938?",
    a: ["Mở rộng lãnh thổ", "Kết thúc 1000 năm Bắc thuộc", "Giữ yên biên giới", "Phát triển thương mại"],
    correct: 1,
    explain: "Chiến thắng Bạch Đằng chấm dứt hơn 1000 năm Bắc thuộc."
  },
  {
    q: "Ai là người hi sinh trong trận Bạch Đằng 938?",
    a: ["Hoàng Thao", "Lưu Hoằng Tháo", "Triệu Tiết", "Thoát Hoan"],
    correct: 1,
    explain: "Lưu Hoằng Tháo – con vua Nam Hán – bị giết trong trận Bạch Đằng."
  }
];

let current = 0;
let time = 30;
let timer;
let boatCount = 5;

const soundCorrect = new Audio("correct.wav");
const soundWrong = new Audio("wrong.wav");
const soundSplash = new Audio("splash.wav");

function startGame(){
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  loadQuestion();
  startTimer();
  createBoats();
}

function loadQuestion(){
  let q = questions[current];
  document.getElementById("question").innerText = q.q;

  for(let i=0;i<4;i++){
    document.getElementById("btn"+i).innerText = q.a[i];
  }

  window.correct = q.correct;
  document.getElementById("explain").innerText = "";
}

function startTimer(){
  time = 30;
  document.getElementById("time").innerText = time;

  clearInterval(timer);
  timer = setInterval(()=>{
    time--;
    document.getElementById("time").innerText = time;
    if(time <= 0){
      clearInterval(timer);
      loseGame();
    }
  },1000);
}

function resetTimer(){
  clearInterval(timer);
  startTimer();
}

function choose(ans){
  resetTimer();
  let q = questions[current];

  if(ans === window.correct){
    soundCorrect.play();
    showStake();
    sinkBoat();
    document.getElementById("explain").innerText = "✅ Đúng! " + q.explain;
    boatCount--;
    updateBoats();
  }else{
    soundWrong.play();
    document.getElementById("explain").innerText = "❌ Sai! " + q.explain;
    moveBoatsForward();
  }

  setTimeout(()=>{
    current++;

    if(boatCount <= 0){
      winGame();
      return;
    }

    if(current >= questions.length){
      current = 0;
    }

    loadQuestion();
  },3000);
}

function createBoats(){
  const area = document.getElementById("boatArea");
  area.innerHTML = "";
  for(let i=0;i<5;i++){
    let img = document.createElement("img");
    img.src = "boat.png";
    img.className = "boat";
    img.style.left = (i*120+100)+"px";
    img.style.top = "200px";
    area.appendChild(img);
  }
}

function updateBoats(){
  const boats = document.querySelectorAll(".boat");
  if(boats.length>0){
    boats[0].remove();
  }
}

function sinkBoat(){
  const boats = document.querySelectorAll(".boat");
  if(boats.length>0){
    boats[0].classList.add("sink");
    soundSplash.play();
  }
}

function moveBoatsForward(){
  const boats = document.querySelectorAll(".boat");
  boats.forEach(b=>{
    b.style.top = (b.offsetTop + 20) + "px";
  });
}

function showStake(){
  const stake = document.getElementById("stake");
  stake.style.display = "block";
  setTimeout(()=>{
    stake.style.display = "none";
  },1500);
}

function winGame(){
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("winScreen").style.display = "block";
}

function loseGame(){
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("loseScreen").style.display = "block";
}

function restart(){
  location.reload();
}
