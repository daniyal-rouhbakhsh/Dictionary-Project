let searchBtn = document.querySelector("#search-btn")
let resultContainer = document.querySelector(".result-container")
let searchInput = document.querySelector("#search-input")
let resultError = document.querySelector('.result-error')
let wordContainer = document.querySelector(".word-container");

let apiInfo = {
  api: `https://api.dictionaryapi.dev/api/v2/entries/en/`,
};

searchBtn.addEventListener('click',() => {
    fetch(`${apiInfo.api}${searchInput.value}`)
    .then(res => res.json()).then(data => {
      if(data.title !== "No Definitions Found"){
        console.log(data)
        resultError.classList.remove('visible')
        resultContainer.classList.add('visible')
        resultContainer.innerHTML = ''
        resultContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="word-container">
                <div class="word">
                    <h2 class="main-word">${data[0].word}</h2>
                    <h6 class="word-text-phonetic">${data[0].meanings[0].partOfSpeech} /${data[0].phonetics[1].text}/</h6>
                </div>
                <audio src="${data[0].phonetics[1].audio}" id="audio"></audio>
                <button onclick="playAudio()" class="audio-btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <p class="word-text">${data[0].meanings[0].definitions[0].definition}</p>`
        );
      }
      else{
        resultContainer.innerHTML = ''
        resultError.classList.add('visible')
        searchInput.disabled = true
        setTimeout(() => {
            resultError.classList.remove('visible')
            searchInput.disabled = false
            searchInput.value = ''
        },3000)
      }
    })
})

const playAudio = () => {
    let audio = document.getElementById('audio')
    audio.play()
}