window.addEventListener("load",async ()=>{
    postSelect = document.querySelector("#post-select");
    postsContainer = document.querySelector("#posts-container");
    postSelect.addEventListener("change",await displayBothDetail);
    await fillSelect();
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
});

async function fillSelect(){
    let allPost = await fetch("https://jsonplaceholder.typicode.com/posts");
    let allPostAsJs = await allPost.json();
    postSelect.innerHTML = allPostAsJs.map(post =>{
        return `<option value="${post.id}">${post.title}</option>`
    })
};
async function displayBothDetail(event){
    let targetPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`);
    let targetPostAsJs = await targetPost.json();
    postsContainer.innerHTML = `
    <h2>${targetPostAsJs.title}</h2>
    <p>${targetPostAsJs.body}</p>`;
}