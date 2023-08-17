const Api_key = "346dab14708449f186f871a63b4c70cd";
const url = "https://newsapi.org/v2/everything?q="; 

window.addEventListener('load',fetchNews("India"));

function reload(){
    window.location.reload();
}


async function fetchNews(query){

    const response = await fetch(`${url}${query}&apikey=${Api_key}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){

const cardscontainer = document.getElementById('cards-container');
const newscardtemplete = document.getElementById('templete-news-card');

cardscontainer.innerHTML ="";


// // this brings each and every news card from articles
// // and we are cloning sab ke sab ko 

articles.forEach(article => {
if(!article.urlToImage) return;
const cardclone = newscardtemplete.content.cloneNode(true);
filldataincard(cardclone,article);
cardscontainer.appendChild(cardclone);
 
});

}

function filldataincard(cardclone, article){
const newsImg = cardclone.querySelector('#newsimage');
const newstitle = cardclone.querySelector('#news-title');
const newssource = cardclone.querySelector('#news-source');
const newsdesc  = cardclone.querySelector('#news-desc');


newsImg.src = article.urlToImage;
newstitle.innerHTML= article.title;
const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
newssource.innerHTML = `${article.source.name} • ${date} `;
newsdesc.innerHTML = article.description;



cardclone.firstElementChild.addEventListener('click',()=>{
window.open(article.url,"_blank")


})


 }

 let curselectednav = null;
//here id is searchquery as well as id 
 function onNavItemClick(id){
  fetchNews(id);

 const NavItem = document.getElementById(id);
 curselectednav?.classList.remove('active');
 curselectednav =  NavItem;
 curselectednav.classList.add('active');

 }


const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');
searchbutton.addEventListener('click',()=>{

const query = searchtext.value;
if(!query) return;

fetchNews(query);
curselectednav?.classList.remove('active');
curselectednav = null;


})






let btn = document.getElementById('search-button');
   
//    // when the btn is clicked print info in console 
//    btn.addEventListener('click', (ev)=>{
//      console.log("Btn clicked");
//    });

   document.addEventListener('keypress', (event)=>{
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("search-button").click();
  
     }
       
   });





