window.addEventListener("load",async ()=>{
    if(navigator.serviceWorker){
        console.log("worked");
        try{
            await navigator.serviceWorker.register("./sw.js");
            console.log("serviceWorker is registered");
        }catch(err){
            console.log(`service worker is not registered ${err}`);
        }
    }else{
        console.log("not worked")
    }
})