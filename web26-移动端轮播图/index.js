window.addEventListener('load', function () {
    var ul = document.querySelector('ul');
    var first = ul.children[0].cloneNode(true);
    var last = ul.children[ul.children.length-1].cloneNode(true);
    var ol = document.querySelector('ol');
    ul.appendChild(first);
    ul.insertBefore(last, ul.firstElementChild);
    var banner = document.querySelector('.banner');
    var index = 0;
    var timer = setInterval(function () {
        index++;
        ul.style.transform = 'translateX(' + -index*100 + 'vw)';
        ul.style.transition = 'all 0.3s';
    }, 2000);
    // 过渡结束后判断，监听过渡完成的事件transitioned
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + -index*100 + 'vw)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + -index*100 + 'vw)';
        }
        // 小圆点跟随变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸时停止定时器
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function (e) {
        flag = true;
        e.preventDefault();
        moveX = (e.targetTouches[0].pageX - startX) * 100 / document.body.clientWidth;
        var translateX = -index * 100 + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'vw)';
    });
    ul.addEventListener('touchend', function (e) {
        if (!flag) return;
        if (moveX > 50) {
            index--;
        } else if (moveX < -50) {
            index++;
        }
        ul.style.transition = 'all 0.3s';
        ul.style.transform = 'translateX(' + -index*100 + 'vw)';
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            ul.style.transform = 'translateX(' + -index*100 + 'vw)';
            ul.style.transition = 'all 0.3s';
        }, 2000);
    });
});
    