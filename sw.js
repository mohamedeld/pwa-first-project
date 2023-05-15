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
    await createdCache.addAll(cacheAssets);
    await self.skipWaiting();
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
    // return await event.respondWith(caches.match(event.request));
    if(!navigator.online){
        // return await event.respondWith(caches.match(event.request))
        return await cacheFirst(event.request);
    }else{
        // return await event.respondWith(fetch(event.request));
        return await networkFirst(event.request); 
    }
}); //end of fetch 

async function cacheFirst(request){
    return await caches.match(request)
};

async function networkFirst(request){
    let dynamicCaches = await caches.open("dynamic-cache");
    let response = await fetch(request);
    await dynamicCaches.put(request,response.clone());
    return response;
}