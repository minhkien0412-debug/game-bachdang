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
const soundCorrect = Âm thanh mới ("correct.wav"); 
const soundWrong = Âm thanh mới ("wrong.wav"); 
const soundSplash = Âm thanh mới ("splash.wav"); 
const soundWin = Âm thanh mới ("win.wav"); 
const soundLose = Âm thanh mới ("lose.wav"); 

const START_TIME = 30;
const WRONG_PENALTY = 5;

cho chỉ số = 0; 
let boats = [];
cho phép thời gian = START_TIME; 
hẹn giờ dễ dàng = không; 
let locked = false;
let gameQuestions = [];

chức năng playÂm thanh (âm thanh) { 
 sound.currentTime = 0;
 sound.play();
}

chức năng xáo trộn(danh sách){ 
 let copy = [... danh sách]; 
 for(let i=copy.length-1; i>0; i--){ 
  const j = Math.floor(Math.random() * (i + 1));
 [sao chép [i], sao chép [j]] = [sao chép [j], sao chép [i]]; 
 }
 trả lại bản sao; 
}

chức năng startGame(){ 
 clearInterval (hẹn giờ); 
 chỉ số = 0; 
 khóa = sai; 
 thời gian = START_TIME; 
 gameQuestions = xáo trộn (câu hỏi); 

 document.getElementById("startScreen").style.display="none";
 document.getElementById("winScreen").style.display="none";
 document.getElementById("loseScreen").style.display="none";
 document.getElementById("gameScreen").style.display="khối"; 
 document.getElementById("stake").style.display="none";
 document.getElementById("explain").innerText = "";

 spawnBoats(gameQuestions.length);
 showQ();
 startTimer (START_TIME); 
}

chức năng spawnBoats(totalBoats){ 
 let area = document.getElementById("boatArea");
 area.innerHTML = "";
 thuyền = []; 
 khoảng cách const = Math.max(90, Math.floor((window.innerWidth - 200) / totalBoats)); 
 for(let i=0; i<totalBoats; i++){ 
  let b = document.createElement("img");
  b.src = "boat.png";
 b.className = "thuyền"; 
 b.style.left = (80 + i * khoảng cách) + "px"; 
  area.appendChild(b);
 thuyền.push(b); 
 }
}

hàm showQ(){ 
 khóa = sai; 
 let q = gameQuestions[index];
 document.getElementById("question").innerText = q.q;
 for(let i=0; i<4; i++){ 
  document.getElementById("btn"+i).innerText = q.a[i];
 }
 document.getElementById("explain").innerText = "";
}

chức năng tickTimer(){ 
 thời gian--; 
 document.getElementById("time").innerText = thời gian; 
 if(thời gian <= 0){ 
 thua(); 
 }
}

chức năng startTimer (giây) { 
 clearInterval (hẹn giờ); 
 if(typeof seconds === "số"){ 
 thời gian = giây; 
 }
 document.getElementById("time").innerText = thời gian; 
 hẹn giờ = setInterval (tickTimer, 1000); 
}

hàm chọn (i){ 
 nếu (bị khóa) trở lại; 
 khóa = đúng; 

 let q = gameQuestions[index];
 clearInterval (hẹn giờ); 

 if(i === q.c){
  playSound(soundCorrect);
 playSound (soundSplash); 

 document.getElementById("stake").style.display="khối"; 

  if(boats.length > 0){
 thuyền[0].classList.add("chìm"); 
    boats.shift(); // thuyền chết vĩnh viễn
  }

 document.getElementById("explain").innerText = " ✅ ĐÚNG! " + q.e; 

 setTimeout (nextQ, 2000); 

 }khác{ 
  playSound(soundWrong);
 thời gian = Math.max (0, thời gian - WRONG_PENALTY); 
 document.getElementById("time").innerText = thời gian; 
 document.getElementById("explain").innerText = " ❌ SAI! " + q.e + ' (-${WRONG_PENALTY}s)'; 

 if(thời gian <= 0){ 
 setTimeout (thua, 700); 
 trở về; 
  }

  setTimeout(()=>{
 khóa = sai; 
    startTimer();
  },1200);
 }
}

hàm nextQ(){ 
 document.getElementById("stake").style.display="none";
 chỉ mục ++; 

 if(index >= gameQuestions.length || boats.length === 0){
 thắng(); 
 }khác{ 
  showQ();
 startTimer (START_TIME); 
 }
}

hàm win(){ 
 clearInterval (hẹn giờ); 
 playSound (soundWin); 
 document.getElementById("gameScreen").style.display="none";
 document.getElementById("winScreen").style.display="khối"; 
}

hàm lose(){ 
 clearInterval (hẹn giờ); 
 playSound(soundLose);
 document.getElementById("gameScreen").style.display="none";
 document.getElementById("loseScreen").style.display="khối"; 
}

chức năng khởi động lại (){ 
 startGame();
}
