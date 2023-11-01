window.addEventListener('DOMContentLoaded', function() {
  var fileList = document.getElementById('file-list');
  var markdownContent = document.getElementById('markdown-content');

  // 加载 Markdown 文件列表
  fetch('mdfiles/filelist.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.forEach(function(file) {
        var listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.addEventListener('click', function() {
          loadMarkdown(file.path);
          selectFile(listItem);
        });
        fileList.appendChild(listItem);
      });
    });

  // 加载并解析 Markdown 文件
  function loadMarkdown(path) {
    fetch(path)
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        markdownContent.innerHTML = marked(text);
      });
  }

  // 选中文件
  function selectFile(listItem) {
    var selectedItems = fileList.getElementsByClassName('selected');
    for (var i = 0; i < selectedItems.length; i++) {
      selectedItems[i].classList.remove('selected');
    }
    listItem.classList.add('selected');
  }
});