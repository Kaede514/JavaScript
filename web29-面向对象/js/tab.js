window.addEventListener('load', function () {
    var that = null;
    class Tab {
       constructor(id) {
           that = this;
           this.main = document.querySelector(id);
           this.add = this.main.querySelector('.tabadd');
           this.ul = this.main.querySelector('.firstnav ul:first-child');
           this.tabScon = this.main.querySelector('.tabscon');
           this.remove = this.main.querySelectorAll('.icon-guanbi');
           this.init();
       }
       // 初始化操作，让相关的元素绑定事件
       init() {
           this.updateNode();
           for (var i = 0; i < this.lis.length; i++) {
               this.lis[i].index = i;
               this.lis[i].addEventListener('click', this.toggleTab);
               this.remove[i].addEventListener('click', this.removeTab);
               // 双击事件
               this.spans[i].addEventListener('dblclick', this.editTab);
           }
           this.add.addEventListener('click', this.addTab);
       }
       clearClass() {
           for (var i = 0; i < this.lis.length; i++) {
               this.lis[i].className = '';
               this.sections[i].className = '';
           }
       }
       updateNode() {
           that.lis = that.main.querySelectorAll('li');
           that.sections = that.main.querySelectorAll('section');
           that.remove = this.main.querySelectorAll('.icon-guanbi');
           that.spans = this.main.querySelectorAll('.firstnav li span:first-child');
       }
       // 切换功能
       toggleTab() {
           that.clearClass();
           this.className = 'liactive';
           that.sections[this.index].className = 'conactive';
       }
       // 添加功能
       addTab() {
           that.clearClass();
           var li = '<li class="liactive"><span>Tab</span><span class="iconfont icon-guanbi"></span></li>';
           var section = '<section class="conactive">Content</section>';
           that.ul.insertAdjacentHTML('beforeend', li);
           that.tabScon.insertAdjacentHTML('beforeend', section);
           that.init();
       }
       // 删除功能
       removeTab(e) {
           var index = this.parentNode.index;
           // 阻止冒泡
           e.stopPropagation();
           // remove()方法可以直接删除元素
           that.lis[index].remove();
           that.sections[index].remove();
           // 当删除选的状态的li时，让它的前一个li处于选定状态
           that.init();
           if (this.parentNode.className != '' && --index >= 0) {
               that.lis[index].click();
           }
       }
       // 修改功能
       editTab() {
           var str = this.innerHTML;
           this.innerHTML = '<input type="text"/>';
           this.children[0].value = str;
           // 让文本中的文字处于选定状态
           this.children[0].select();
           this.children[0].addEventListener('blur', function () {
               this.parentNode.innerText = this.value;
           });
           // 按下回车也可以把文本框中的值赋给span
           this.children[0].addEventListener('keyup', function (e) {
               if (e.key == 'Enter') this.blur();
           });
       }
   }
   new Tab('#tab');
});