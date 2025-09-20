const CACHE = "poker-8max-v1";
const ASSETS = [
  "./appli_poker_8max_DEF_mtt_utg1_patch_v3_FIXED.html",
  "./manifest.webmanifest",
  "iconsicon-192.png",
  "iconsicon-512.png",
  "iconsmaskable-192.png",
  "iconsmaskable-512.png",
  "iconssplash-640x1136.png",
  // ajoute ici tes autres fichiers (images, css séparés, etc.)
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
