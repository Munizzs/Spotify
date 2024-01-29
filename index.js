window.addEventListener("load", () => {
    function handleScroll(elementId) {
      let scrollableDiv = document.getElementById(elementId);
      let shadow_component = document.getElementById("shadow-component");
  
      scrollableDiv.addEventListener("scroll", function () {
        if (scrollableDiv.scrollTop > 0) {
          shadow_component.classList.add("shadow__div");
        } else {
          shadow_component.classList.remove("shadow__div");
        }
      });
    }
    handleScroll("scrollableDiv_library");
  });
  
  const searchInput = document.getElementById("search-input");
  const resultArtist = document.getElementById("result-artist");
  const resultPlaylist = document.getElementById("result-playlists");
  const playlistContainer = document.getElementById("result-playlists");
  
  async function requestApi() {
    const response = await fetch(`http://localhost:3000/artists`);
    return response.json();
    // .then((results) => displayResults(results));
  }
  
  async function displayResults(searchTerm) {
    hidePlaylists();
    let results = await requestApi();
    const artistsContainer = document.getElementById("artists-container");
    const artistImage = document.getElementById("artist-img");
    const artistName = document.getElementById("artist-name");
  
    const filteredArtists = results.filter(
      (artist) => artist.name.toLowerCase().indexOf(searchTerm) !== -1
    );
    displayNotFound(filteredArtists.length == 0, searchTerm);
  
    artistsContainer.innerHTML = '';
    filteredArtists.forEach((element) => {
      let cardHtml = `
      <div class="artist-card" id="">
        <div class="card-img">
          <img id="artist-img" class="artist-img" src="${element.urlImg}"/>
          <div class="play">
            <span class="fa fa-solid fa-play"></span>
          </div>
        </div>
        <div class="card-text">
          <a title="Foo Fighters" class="vst" href="">
            <span class="artist-name" id="artist-name">${element.name}</span>
            <span class="artist-categorie">Artista</span>
          </a>
        </div>
      </div>
      `
      artistsContainer.innerHTML = artistsContainer.innerHTML.concat(cardHtml);
    });
    resultArtist.classList.remove("hidden");
  }
  
  function displayNotFound(show, searchTerm) {
    const notFound = document.getElementById('not-found');
    if(show) {
      notFound.classList.remove('hidden');
      notFound.firstElementChild.innerHTML = `Não foram encontrados resultados para "${searchTerm}"`;
    } else {
      notFound.classList.add('hidden');
    }
  }
  
  function hidePlaylists() {
    playlistContainer.classList.add("hidden");
  }
  
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === "") {
      resultArtist.classList.add("hidden");
      playlistContainer.classList.remove("hidden");
      return;
    }
    displayResults(searchTerm);
  });