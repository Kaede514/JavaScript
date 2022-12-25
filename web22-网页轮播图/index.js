window.addEventListener('load', function () {
    // 1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    var banner = document.querySelector('.banner');
    banner.addEventListener('mouseenter', function () {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        // 6.鼠标经过轮播图模块，自动播放停止
        clearInterval(timer);
        timer = null;
    });
    banner.addEventListener('mouseleave', function () {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        // 鼠标离开，自动开始播放
        timer = setInterval(function () {
            arrowR.click();
        }, 2000);
    });
    var ul = document.querySelector('ul');
    var ol = document.querySelector('ol');
    ol.style.width = 28 * ul.children.length+ 'px';
    var length = ul.children.length;
    for (var i = 0; i < length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('mouseenter', function () {
            for (var j = 0; j < length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            // 2.点击小圆圈，可以播放相应图片
            var index = this.getAttribute('index');
            animate(ul, -800 * index);
            // 当触摸圆圈时，将索引号赋给num和circle
            num = index;
            circle = index;
        });
    }
    ol.firstElementChild.className = 'current';
    // 克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 3.点击右侧按钮一次，图片往左播放一张，以此类推，左侧按钮同理
    // 4.图片播放的同时，下面小圆圈模块跟随一起变化
    var num = 0;
    var circle = 0;
    var flag = true;
    arrowR.addEventListener('click', function () {
        if (flag === false) return;
        flag = false;
        // 如果走到了最后复制的一张图片，此时ul要快速复原到left=0
        if (num === length) {
            ul.style.left = 0 + 'px';
            num = 0;
        }
        num++;
        animate(ul, -num * 800, function () {flag = true;});
        circle++;
        if (circle === length) circle = 0;
        for (var i = 0; i < length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });
    arrowL.addEventListener('click', function () {
        if (flag === false) return;
        flag = false;
        if (num == 0) {
            num = length;
            ul.style.left = -length * 800 + 'px';
        }
        num--;
        animate(ul, -num * 800, function () {flag = true;});
        circle--;
        if (circle < 0) circle = length - 1;
        for (var i = 0; i < length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });
    // 5.鼠标不经过轮播图，轮播图也会自动播放图片
    var timer = setInterval(function () {
        // 手动调用事件
        arrowR.click();
    }, 2000);
});
    