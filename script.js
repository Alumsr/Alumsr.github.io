console.log("JS loaded.");

function loadPage(path_to_file){
    var page = document.getElementById("mybody");
    fetch(path_to_file)
    .then(response => response.text())
    .then(data => {
        page.innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

function colorInv(parent,inv){
    var children = parent.children;
    for (var i = 0; i < children.length; i++){
        var child = children[i];
        child.style.filter = "invert("+inv+")";
    }
}

function switchNavbar(navid){
    if (navid == "home"){
        loadPage('home.html')
        document.getElementById("home").classList.add("active");
        document.getElementById("about").classList.remove("active");
        document.getElementById("notes").classList.remove("active");
        // colorInv(home,0);
        // colorInv(about,1);
        // colorInv(notes,1);

    }
    else if (navid == "about"){
        loadPage('about.html')
        document.getElementById("home").classList.remove("active");
        document.getElementById("about").classList.add("active");
        document.getElementById("notes").classList.remove("active");
        // colorInv(home,1);
        // colorInv(about,0);
        // colorInv(notes,1);
    }
    else if (navid == "notes"){
        loadPage('notes.html')
        document.getElementById("home").classList.remove("active");
        document.getElementById("about").classList.remove("active");
        document.getElementById("notes").classList.add("active");
        // colorInv(home,1);
        // colorInv(about,1);
        // colorInv(notes,0);
    }
    else{
        console.log("Error: Unknown nav bar id");
    }
}