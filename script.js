function home(){
    fetch('home.html')
        .then(response => response.text())
        .then(data => {document.body.innerHTML = data;})
        .catch(error => console.error(error))
}

function notes(){
    fetch('notes/note1.html')
        .then(response => response.text())
        .then(data => {document.body.innerHTML = data;})
        .catch(error => console.error(error))
}