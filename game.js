let current = 0;
let time = 30;
let timer;
let boatCount = 5;

/* CHỌN KIỂU GIẢI THÍCH:
   1 = ChatGPT (AI)
   2 = Thủ công (offline)
*/
let explainMode = 2;

// ÂM THANH
const soundCorrect = new Audio("correct.wav");
const soundWrong = new Audio("wrong.wav");
const soundWin = new Audio("win.wav");
const soundLose = new Audio("lose.wav");

// API KEY (chỉ dùng khi explainMode = 1)
const API_KEY = "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";

// CÂU HỎI
const questions = [
  {
    q: "Trận Bạch Đằng năm 938 do ai chỉ huy?",
    A: "Ngô Quyền",
    B: "Trần Hưng Đạo",
    C: "Lý Thường Kiệt",
    D: "Quang Trung",
    answer: "A",
    explain: "Ngô Quyền lãnh đạo quân dân ta đánh bại quân Nam Hán năm 938, mở ra thời kỳ độc lập."
  },
  {
    q: "Vũ khí chủ yếu trên sông Bạch Đằng là gì?",
    A: "Súng",
    B: "Cọc gỗ",
    C: "Mìn",
    D: "Đá",
    answer: "B",
    explain: "Quân ta dùng cọc gỗ cắm dưới lòng sông, lợi dụng thủy triều để đánh chìm thuyền giặc."
  },
  {
    q: "Chiến thắng Bạch Đằng có ý nghĩa gì?",
    A: "Mất độc lập",
    B: "Mở đầu thời kỳ độc lập",
    C: "Không quan trọng",
    D: "Bị đô hộ tiếp",
    answer: "B",
    explain: "Chiến thắng năm 938 chấm dứt hơn 1000 năm Bắc thuộc, mở ra thời kỳ tự chủ."
  }
];

function startGame(){
  document.getElementById("startScreen").style.display="none";
  document.getElementById("result").classList.add("hidden");
  document.getElementById("game").style.display="block";

  current = 0;
  boatCount = 5;
  updateBoats();
  loadQuestion();
  startTimer();
}

function loadQuestion(){
  resetTimer();
  let q = questions[current];
  document.getElementById("question").innerText = q.q;
  let btn = document.querySelectorAll("#answers button");
  btn[0].innerText = "A. " + q.A;
  btn[1].innerText = "B. " + q.B;
  btn[2].innerText = "C. " + q.C;
  btn[3].innerText = "D. " + q.D;
  window.correct = q.answer;
  document.getElementById("explain").innerText="";
}

function choose(ans){
  resetTimer();
  let q = questions[current];

  if(ans === window.correct){
    soundCorrect.play();
    showStake();
    sinkBoatSmooth();
  }else{
    soundWrong.play();
  }

  // GIẢI THÍCH
  if(explainMode === 2){
    document.getElementById("explain").innerText = q.explain;
  }else{
    explainByAI(q.q, q.answer);
  }

  setTimeout(()=>{
    if(ans === window.correct){
      boatCount--;
      updateBoats();
    }

    current++;
    if(boatCount <= 0){
      winGame();
      return;
    }
    if(current >= questions.length){
      loseGame();
      return;
    }
    loadQuestion();
  },3000);
}

function updateBoats(){
  let box=document.getElementById("boats");
  box.innerHTML="";
  for(let i=0;i<boatCount;i++){
    let img=document.createElement("img");
    img.src="boat.png";
    img.className="boat";
    box.appendChild(img);
  }
}

function showStake(){
  let s=document.getElementById("stake");
  s.style.display="block";
  setTimeout(()=>{s.style.display="none"},800);
}

function sinkBoatSmooth(){
  let boats=document.querySelectorAll(".boat");
  if(boats.length>0){
    let b = boats[boats.length-1];
    b.classList.add("sink");
  }
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

// ===== AI GIẢI THÍCH =====
async function explainByAI(question, answer){
  document.getElementById("explain").innerText="AI đang tạo lời giải...";

  const res = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + API_KEY
    },
    body:JSON.stringify({
      model:"gpt-3.5-turbo",
      messages:[
        {role:"system", content:"Bạn là giáo viên lịch sử Việt Nam."},
        {role:"user", content:`Giải thích ngắn gọn vì sao đáp án ${answer} đúng cho câu hỏi: ${question}`}
      ]
    })
  });

  const data = await res.json();
  document.getElementById("explain").innerText =
    data.choices[0].message.content;
}
