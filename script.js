function home(){
    var body = document.getElementById("mybody");
    body.innerHTML = "<div class='note'>This is my home.</div>";
}

function notes(){
    var notes = document.getElementById("mybody");
    notes.innerHTML = "<div class='note'>This is my notes.</div>";
}

function about(){
    var about = document.getElementById("mybody");
    about.innerHTML = "<div class='note'>About me.</div>";
}

console.log("JS loaded.");