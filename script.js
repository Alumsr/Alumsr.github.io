console.log("JS loaded.");
var pageStack = ["index.html"];
var crtPage = "index.html";

window.onload = function(){
    document.getElementById("home").classList.add("active");
    loadPage("home.html");
}

function loadPage(path_to_file){
    // var converter = new showdown.Converter();
    var page = document.getElementById("mybody");
    fetch(path_to_file)
    .then(response => response.text())
    .then(data => {
        // htmlRes = converter.makeHtml(data);
        htmlRes = data;
        page.innerHTML = htmlRes;
        pageStack.push(crtPage);
        crtPage = path_to_file;
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
        if (crtPage != "index.html")
        {
            document.getElementById("home").classList.add("active");
            document.getElementById("about").classList.remove("active");
            document.getElementById("notes").classList.remove("active");
            loadPage("home.html");
        }
    }
    else if (navid == "about"){
        if (crtPage != "about.html"){
        loadPage('about.html')
            document.getElementById("home").classList.remove("active");
            document.getElementById("about").classList.add("active");
            document.getElementById("notes").classList.remove("active");
        }
    }
    else if (navid == "notes"){
        if (crtPage != "notes.html"){
            loadPage('notes.html')
            document.getElementById("home").classList.remove("active");
            document.getElementById("about").classList.remove("active");
            document.getElementById("notes").classList.add("active");
        }
    }
    else{
        console.log("Error: Unknown nav bar id");
    }
}

// function backBtn(){
//     if (pageStack.length == 0){
//         var btn = document.getElementsByClassName("backBtn");
//         btn.style.display = "none";
//     }
//     else{
//         var prePage = pageStack.pop();
//         loadPage(prePage);
//         pageStack.pop()
//         crtPage = prePage;
//     }
// }