const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let btn = document.getElementById("search-btn");
let sound = document.getElementById("sound");
let speaker = document.getElementById("speaker");
let text = document.getElementById("text");
let pos = document.getElementById("pos");
let sample = document.getElementById("sample");
let meaning = document.querySelector(".word-meaning");
let example = document.querySelector(".word-example");

// Hide the speaker icon if the input field is empty
let inputWord = document.getElementById("search-input").value;
if (inputWord.length > 0) {
  speaker.style.display = "block";
} else {
  speaker.style.display = "none";
}

// Add event listener to the button
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let inputWord = document.getElementById("search-input").value;
  let finalURL = URL + inputWord;

  let res = await fetch(finalURL);
  let data = await res.json();

  console.log(data);
  if (data.title === "No Definitions Found") {
    meaning.innerHTML = "No Definitions Found";
    example.innerHTML = "";
    pos.innerHTML = "";
    sample.innerHTML = "";
    text.innerHTML = inputWord;
  } else {
    pos.innerHTML = data[0].meanings[0].partOfSpeech;
    sample.innerHTML =
      data[0].phonetics[0].text || "No phonetic sample available";
    meaning.innerHTML = data[0].meanings[0].definitions[0].definition;
    example.innerHTML =
      data[0].meanings[0].definitions[0].example || "No example available";
    text.innerHTML = inputWord.charAt(0).toUpperCase() + inputWord.slice(1);
    sound.setAttribute("src", data[0].phonetics[0].audio || "");
    speaker.style.display = "block";
  }
});

//event listener for sound icon click
speaker.addEventListener("click", () => {
  if (sound.src) {
    sound.play();
  } else {
    alert("No audio available for this word.");
  }
});
