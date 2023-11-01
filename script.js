/**
 * 这是一个简单的 Markdown 阅读器，使用了 marked.js 库来解析 Markdown 文件。
 * 下面是html中的DOM结构：
 *  <ul id="fileList">
        <!-- 这里将使用JavaScript来动态添加文件列表 -->
    </ul>

    <div id="markdownContent">
        <!-- 这里将显示Markdown文件的内容 -->
    </div>
 */

window.addEventListener('load', function () {
    // 获取DOM元素
    var fileList = document.getElementById('fileList');
    var markdownContent = document.getElementById('markdownContent');

    // 获取所有的Markdown文件
    var markdownFiles = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://alumsr.github.io/mdfiles/');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var html = xhr.responseText;
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var links = doc.querySelectorAll('a');
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                if (link.href.endsWith('.md')) {
                    markdownFiles.push(link.href);
                }
            }
            // 添加文件列表
            for (var i = 0; i < markdownFiles.length; i++) {
                var markdownFile = markdownFiles[i];
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = '#';
                a.innerHTML = markdownFile;
                a.onclick = function () {
                    // 获取Markdown文件的内容
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', this.innerHTML);
                    xhr.send();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            markdownContent.innerHTML = marked(xhr.responseText);
                        }
                    };
                };
                li.appendChild(a);
                fileList.appendChild(li);
            }
        }
    };
});

// Path: Alumsr.github.io/Markdown/README.md