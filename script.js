/* 1. Partikel Cahaya Hangat di Latar Belakang agar Suasana Hidup */
const canvas = document.getElementById("ambientCanvas");
const ctx = canvas.getContext("2d");

let cw = 0;
let ch = 0;

function resizeAmbient() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeAmbient);
resizeAmbient();

const motes = Array.from({ length: 28 }, () => ({
  x: Math.random() * cw,
  y: Math.random() * ch,
  r: Math.random() * 2.4 + 1.1,
  vx: (Math.random() - 0.5) * 0.22,
  vy: -Math.random() * 0.28 - 0.08,
  alpha: Math.random() * 0.45 + 0.18
}));

function renderAmbient() {
  ctx.clearRect(0, 0, cw, ch);

  for (const m of motes) {
    m.x += m.vx;
    m.y += m.vy;

    if (m.y < -10) {
      m.y = ch + 10;
      m.x = Math.random() * cw;
    }
    if (m.x < -10) m.x = cw + 10;
    if (m.x > cw + 10) m.x = -10;

    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(218, 152, 82, ${m.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(renderAmbient);
}

renderAmbient();

/* 2. Konten Ucapan Tulus dari Murid untuk Ibu Gustin */
const classroomSlides = [
  {
    speech: "\"Selamat pagi, Bu Gustin... Aku sudah menulis beberapa hal di papan tulis ini khusus buat Ibu.\"",
    heading: "Terima Kasih Sudah Menjadi Rumah Kedua di Sekolah",
    body: "Bu Gustin, mungkin aku jarang mengucapkannya langsung, tapi perhatian dan kesabaran Ibu selama menjadi wali kelas benar-benar terasa. Di saat kami mulai lelah atau bingung melangkah, Ibu selalu hadir menenangkan dan mengarahkan tanpa pernah membuat kami merasa sendirian."
  },
  {
    speech: "\"Setiap cara Ibu mengingatkan dan menyemangati kami selalu membekas di hati, Bu.\"",
    heading: "Hal-Hal Sederhana yang Selalu Aku Ingat",
    body: "Aku ingat bagaimana Ibu selalu menanyakan kabar kami dengan tulus, menegur dengan lembut saat kami lalai, dan tetap percaya pada kemampuan kami bahkan ketika kami sendiri sedang ragu. Bagiku, Ibu bukan sekadar guru, tapi sosok yang selalu menguatkan."
  },
  {
    speech: "\"Maaf kalau selama ini kami sering merepotkan Ibu... Terima kasih sudah tetap sabar, Bu Gustin.\"",
    heading: "Doa Terbaik dari Muridmu",
    body: "Di Hari Guru Nasional ini, aku ingin berterima kasih setulus-tulusnya untuk setiap waktu, tenaga, dan kasih sayang yang Ibu berikan kepada kelas kami. Semoga Ibu Gustin selalu diberi kesehatan, ketenangan, dan kebahagiaan."
  }
];

let currentSlide = 0;

const sceneBuilding = document.getElementById("sceneBuilding");
const sceneClassroom = document.getElementById("sceneClassroom");
const sceneEnding = document.getElementById("sceneEnding");

const buildingCard = document.getElementById("buildingCard");
const btnDoor = document.getElementById("btnDoor");

const boardCounter = document.getElementById("boardCounter");
const studentSpeech = document.getElementById("studentSpeech");
const chalkContent = document.getElementById("chalkContent");
const boardHeading = document.getElementById("boardHeading");
const boardBody = document.getElementById("boardBody");

const btnPrevBoard = document.getElementById("btnPrevBoard");
const btnNextBoard = document.getElementById("btnNextBoard");

const btnGift = document.getElementById("btnGift");
const giftHint = document.getElementById("giftHint");
const giftTicket = document.getElementById("giftTicket");

const btnBackToClass = document.getElementById("btnBackToClass");
const btnStartOver = document.getElementById("btnStartOver");
const finalSong = document.getElementById("finalSong");

/* Transisi Smooth Antar Scene */
function switchSceneSmooth(targetScene) {
  const currentActive = document.querySelector(".scene.active");
  if (currentActive === targetScene) return;

  if (currentActive) {
    currentActive.classList.remove("visible");
    currentActive.classList.add("leaving");

    setTimeout(() => {
      currentActive.classList.remove("active", "leaving");
      targetScene.classList.add("active");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          targetScene.classList.add("visible");
        });
      });
    }, 420);
  } else {
    targetScene.classList.add("active");
    requestAnimationFrame(() => targetScene.classList.add("visible"));
  }
}

/* Memastikan scene pembuka tampil smooth saat pertama kali dibuka */
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    sceneBuilding.classList.add("visible");
  });
});

/* Pergantian Teks di Papan Tulis & Balon Kata Murid dengan Fade Lembut */
function renderClassroomSlide(index, animate = true) {
  currentSlide = index;
  const item = classroomSlides[currentSlide];

  if (!animate) {
    boardCounter.textContent = `Bagian ${currentSlide + 1} / ${classroomSlides.length}`;
    studentSpeech.textContent = item.speech;
    boardHeading.textContent = item.heading;
    boardBody.textContent = item.body;
    btnNextBoard.textContent = currentSlide === classroomSlides.length - 1 ? "Ke Penutup" : "Lanjut Baca";
    return;
  }

  studentSpeech.classList.add("fade-swap");
  chalkContent.classList.add("fade-swap");

  setTimeout(() => {
    boardCounter.textContent = `Bagian ${currentSlide + 1} / ${classroomSlides.length}`;
    studentSpeech.textContent = item.speech;
    boardHeading.textContent = item.heading;
    boardBody.textContent = item.body;
    btnNextBoard.textContent = currentSlide === classroomSlides.length - 1 ? "Ke Penutup" : "Lanjut Baca";

    studentSpeech.classList.remove("fade-swap");
    chalkContent.classList.remove("fade-swap");
  }, 260);
}

/* Klik Pintu: Pintu Berayun Terbuka -> Zoom Masuk Halus -> Masuk Kelas */
btnDoor.addEventListener("click", () => {
  btnDoor.classList.add("open");

  setTimeout(() => {
    buildingCard.classList.add("entering-door");
  }, 420);

  setTimeout(() => {
    renderClassroomSlide(0, false);
    switchSceneSmooth(sceneClassroom);
    setTimeout(() => {
      buildingCard.classList.remove("entering-door");
    }, 500);
  }, 920);
});

btnPrevBoard.addEventListener("click", () => {
  if (currentSlide > 0) {
    renderClassroomSlide(currentSlide - 1, true);
  } else {
    btnDoor.classList.remove("open");
    switchSceneSmooth(sceneBuilding);
  }
});

btnNextBoard.addEventListener("click", () => {
  if (currentSlide < classroomSlides.length - 1) {
    renderClassroomSlide(currentSlide + 1, true);
  } else {
    switchSceneSmooth(sceneEnding);
  }
});

btnGift.addEventListener("click", () => {
  giftTicket.classList.add("open");
  giftHint.textContent = "Hadiah kecil telah terbuka khusus untuk Ibu Gustin:";
  btnGift.textContent = "Hadiah Sudah Dibuka";
});

btnBackToClass.addEventListener("click", () => {
  renderClassroomSlide(classroomSlides.length - 1, false);
  switchSceneSmooth(sceneClassroom);
});

btnStartOver.addEventListener("click", () => {
  finalSong.pause();
  finalSong.currentTime = 0;

  btnDoor.classList.remove("open");
  giftTicket.classList.remove("open");
  giftHint.textContent = "Tekan tombol di bawah ini untuk membuka hadiah kecil dariku, Bu.";
  btnGift.textContent = "Buka Hadiah Kecil";

  currentSlide = 0;
  switchSceneSmooth(sceneBuilding);
});
