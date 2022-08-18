import React, { Component } from "react";
import "./App.css";

const api_key = "?api_key=22602ead11e823f92fde34ec2e1a2ebb";
const APIURL =
  "https://api.themoviedb.org/3/movie/550?api_key=22602ead11e823f92fde34ec2e1a2ebb";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// URL + CHAVE + PESQUISA COM REGIÃO EN
const SEARCHPI = `https://api.themoviedb.org/3/search/movie${api_key}&region=EN&query=`;

async function getMovies(url, filme) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results, filme);
  console.log(respData);
}

function showMovies(movies, filme) {
  let content = document.getElementById("content");
  content.innerHTML = "";

  var i = 0;
  while (i < 1) {
    var movie = movies[0];
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <button id="${filme}">Excluir</button>
      <img src="${IMGPATH + poster_path}" alt="${title}" />
      <div class="movie-infos">
        <div class="movie-info">
          <h3>${title}</h3>
        </div>
        <div class="overview">
          <h3>${overview}</h3>
        </div>
        <div class="vote_average">
          <h3>Avaliação: ${vote_average}</h3>
        </div>
      </div>
    `;

    content.appendChild(movieEl);
    document.getElementById(filme).addEventListener("click", (e) => {
      listaFilmes.splice(listaFilmes.indexOf(e.target.id),1)
      alert("Excluido Com Sucesso")
      escolheFilme()
    })
    i++;
  }
}

var listaFilmes = [
  "Que horas ela volta", "Jurassic World Dominion", "amelia", "turning-red", "Downton Abbey"
]

function escolheFilme() {
  if(listaFilmes.length <= 0){
    document.getElementById("content").innerHTML="Nenhum filme cadastrado"
    alert("Não TEM NENHUM FILME")
  }else{
    const rdnInt = Math.floor(Math.random() * listaFilmes.length);
    var filme = listaFilmes[rdnInt];  
    getMovies(SEARCHPI + filme, filme);
    console.log(filme);
  }
}

function cadastrarFilme(){
  let filme = document.getElementById("pesquisaFilme").value
  listaFilmes.push(filme)
  alert("FILME CADASTRADO!")
}


const Content = () => {
  return <div id="content"></div>;
};

function BotaoEscolheFilme() {
  return (
    <div>
      <input id="pesquisaFilme"></input>
      <button onClick={cadastrarFilme}>Cadastrar</button>
      <button onClick={escolheFilme}>Clique aqui</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>Recomenda Filme</h2>
      <BotaoEscolheFilme />
      <Content />
    </div>
  );
}

export default App;
