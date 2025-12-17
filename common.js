// Common helpers used by all pages
function q(sel){return document.querySelector(sel)}
function qa(sel){return Array.from(document.querySelectorAll(sel))}


// simple toast (non-blocking)
function toast(msg,duration=1800){const t=document.createElement('div');t.textContent=msg;t.style.position='fixed';t.style.right='18px';t.style.bottom='18px';t.style.background='rgba(0,0,0,0.7)';t.style.padding='10px 12px';t.style.borderRadius='10px';t.style.zIndex=9999;document.body.appendChild(t);setTimeout(()=>t.remove(),duration)}


// Keyboard friendly: space toggles play/pause when audio/video exists

/* ---------- DATA ---------- */
const starLinks = [
  "https://vaotrlttfbkoxnuimdnf.supabase.co/storage/v1/object/public/family-photos/uploadrecent/thuctinh1.mp4",
  "https://vaotrlttfbkoxnuimdnf.supabase.co/storage/v1/object/public/family-photos/uploadrecent/kyniemdangnho.jpg",
  "https://vaotrlttfbkoxnuimdnf.supabase.co/storage/v1/object/public/family-photos/uploadrecent/luubut.jpg"
];

/* ---------- FLYING STARS ---------- */
function createFlyingStar() {
  const star = document.createElement("div");
  star.className = "flying-star twinkle";

  const offset = 50;
  const startX = Math.random()*window.innerWidth;
  const startY = Math.random()*window.innerHeight;

  // bay chéo
  const endX = startX + (Math.random()*400-200);
  const endY = startY + (Math.random()*400-200);

  star.style.left = startX + "px";
  star.style.top = startY + "px";

  const duration = 6 + Math.random()*3; // bay chậm

  star.onclick = (e)=>{
    e.stopPropagation();
    const file = starLinks[Math.floor(Math.random()*starLinks.length)];
    openViewer([file]);
    star.remove();
  };

  document.getElementById("star-layer").appendChild(star);

  // bay
  setTimeout(()=>{
    star.style.transition = `all ${duration}s linear`;
    star.style.left = endX + "px";
    star.style.top = endY + "px";
    star.style.opacity = 0;
  },50);

  setTimeout(()=>star.remove(), duration*1000);
}

// tạo liên tục
setInterval(createFlyingStar, 400);

// Xem hình hoặc videos
window.openViewer = function (files) {
  const viewer = document.getElementById("viewer");
  const img = document.getElementById("viewerImg");
  const prevImg = document.getElementById("prevImg");
  const nextImg = document.getElementById("nextImg");

  let video = document.getElementById("viewerVideo");
  if (!video) {
    video = document.createElement("video");
    video.id = "viewerVideo";
    video.controls = true;
    video.style.maxWidth = "90%";
    video.style.maxHeight = "80vh";
    video.style.display = "none";
    viewer.appendChild(video);
  }

  let index = 0;

  function show() {
    const f = files[index];
    if (f.endsWith(".mp4")) {
      video.src = f;
      video.style.display = "block";
      img.style.display = "none";
    } else {
      img.src = f;
      img.style.display = "block";
      video.style.display = "none";
    }
  }

  show();
  viewer.classList.remove("hidden");

  prevImg.onclick = () => {
    index = (index - 1 + files.length) % files.length;
    show();
  };
  nextImg.onclick = () => {
    index = (index + 1) % files.length;
    show();
  };

  window.closeViewer = () => viewer.classList.add("hidden");
};


