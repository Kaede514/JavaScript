function animate(obj, target, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function f1() {
        if (window.pageYOffset === target) {
            clearInterval(obj.timer);
            if (fn) fn();
        } else {
            var step = (target - window.pageYOffset) / 10;
            step = (step > 0) ? Math.ceil(step) : Math.floor(step);
             window.scroll(0, window.pageYOffset + step)
        }
    },15);
}