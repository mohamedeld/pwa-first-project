let cacheName ="static-cache";
let cacheAssets = [
    "./index.html",
    "./about.html",
    "./contact.html",
    "./services.html",
    "./style.css",
    "./images/team3.jpg",
    "./images/team6.jpg",
    "./images/team8.jpg"
]
self.addEventListener("install",async ()=>{
    console.log("installed");
    let createdCache = await caches.open(cacheName);
    await createdCache.addAll(cacheAssets)
}); // end of install

self.addEventListener("activate",()=>{
    console.log("activated");
}); // end of activate

self.addEventListener("fetch",(event)=>{
    console.log("fetched",event.request);
}); //end of fetch 