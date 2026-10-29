/* Pagine dei singoli libri: ingrandimento delle pagine e video YouTube caricato solo al clic (nessun cookie prima) */
const IMGS = [...document.querySelectorAll("#pagine img")];
const Z = document.getElementById("zoom"), ZI = Z.querySelector("img");
let zi = 0;
function mostra(){ ZI.src = IMGS[zi].src; ZI.alt = IMGS[zi].alt; }
document.getElementById("pagine").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  zi = IMGS.indexOf(b.querySelector("img")); mostra(); Z.classList.add("on");
});
Z.addEventListener("click", e => {
  if (e.target.classList.contains("prev")) { zi = (zi + IMGS.length - 1) % IMGS.length; mostra(); }
  else if (e.target.classList.contains("next")) { zi = (zi + 1) % IMGS.length; mostra(); }
  else if (e.target !== ZI) Z.classList.remove("on");
});
document.addEventListener("keydown", e => {
  if (!Z.classList.contains("on")) return;
  if (e.key === "Escape") Z.classList.remove("on");
  if (e.key === "ArrowRight") { zi = (zi + 1) % IMGS.length; mostra(); }
  if (e.key === "ArrowLeft") { zi = (zi + IMGS.length - 1) % IMGS.length; mostra(); }
});
document.querySelectorAll(".yt").forEach(b => b.addEventListener("click", () => {
  const f = document.createElement("iframe");
  f.src = "https://www.youtube-nocookie.com/embed/" + b.dataset.id + "?autoplay=1&rel=0";
  f.title = b.getAttribute("aria-label");
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  b.replaceWith(f);
}, { once: true }));
