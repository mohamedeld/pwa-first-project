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

self.addEventListener("activate",async ()=>{
    // console.log("activated");
    let allCaches = await caches.keys();
    for(let i=0;i<allCaches.length;i++){
        if(allCaches[i] != cacheName){
            await caches.delete(allCaches[i]);
        }
    }
}); // end of activate

self.addEventListener("fetch",async (event)=>{
    // console.log("fetched",event.request);
    return await event.respondWith(caches.match(event.request));
}); //end of fetch 