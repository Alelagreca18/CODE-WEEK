
/*const createCard = (title, desc, imgUrl, vote) => {
    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const parDescEl = document.createElement("p");
    const imgEl = document.createElement("img");
    const voteEl = document.createElement("p")

    divEl.classList.add("card");
    parDescEl.classList.add("description");

    imgEl.setAttribute("src", imgUrl);
    imgEl.setAttribute("alt", "img cosi");
    h3El.textContent =title;
    parDescEl.textContent = desc;
    voteEl.textContent = vote;

    divEl.append(h3El, parDescEl, imgEl);
    document.body.appendChild(divEl);
    document.querySelector(".cardsWrapper").appendChild(divEl);

};

let dataArray = [];

// CHIAMATA FETCH
fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1a2079b33da17fd8434aa19d53bbe1c7") 
  .then((res) => res.json())
  .then((data) => {
      const baseUrl = 'https://image.tmdb.org/t/p/w200'
      data.results.map(product => createCard(product.title, product.overview, baseUrl+product.poster_path))
  });
    
*/

const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1a2079b33da17fd8434aa19d53bbe1c7&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w200/";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=1a2079b33da17fd8434aa19d53bbe1c7&query=\""

//const MOST_POPULAR="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1a2079b33da17fd8434aa19d53bbe1c7";

const form=document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


getMovies(API_URL)
async function getMovies(url){
const res = await fetch(url)
const data = await res.json()
displayMovies(data.results)
console.log(data.results);
}
function displayMovies(movies){
    main.innerHTML=''
  movies.forEach((movie) =>{
    const {title, poster_path, vote_average, overview}=movie
    const moviesElement = document.createElement('div')
    moviesElement.classList.add('movie')
    moviesElement.innerHTML=`
    <img src="${IMAGE_PATH + poster_path}" alt="${title}" >

    <div class='movie-info'>
    <h3>${title}<h3>
    <span class="${getClassesByRating(vote_average)}">${vote_average}</span>
    <div class='overview'>
    <h3>Dettagli:</h3>
    ${overview}
    </div>
    </div>
    `
    main.appendChild(moviesElement)
  })
}

function getClassesByRating(rating){
    if(rating>=8){
        return'green'
    }else if(rating>=5){
        return 'orange'
    }else{
        return 'red'
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
     searchValue = search.value
    if(searchValue && searchValue !==''){
        getMovies(SEARCH_URL+searchValue)
        searchValue=''
    }else {
        window.location.reload()
    }
})


