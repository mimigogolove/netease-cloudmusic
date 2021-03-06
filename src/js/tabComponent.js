
import $ from '../lib/jquery.min';

module.exports = (function(){
      var Tab = function(ct){
        this.ct = ct;
        this.init();
        this.bind();
      }

      //初始化变量
      Tab.prototype.init = function(){
        this.menuList = this.ct.querySelectorAll('.globalTabs ul>li');
        this.contentList = this.ct.querySelectorAll('.tabContent>li');     
      }

      //绑定事件
      Tab.prototype.bind = function(){
          var self = this;

          this.menuList = [].slice.call(this.menuList);
          
          this.menuList.forEach(function(menu,i){
            menu.onclick = function(e){
              // $(window).scrollTop(0);//每次切换tab都让滚动条滚到顶端
              document.body.scrollTop = document.documentElement.scrollTop = 0;
              var target = e.target;
              var index = [].indexOf.call(self.menuList,target);
              self.menuList.forEach(function(menu,i){
                menu.classList.remove('active');
                self.contentList[i].classList.remove('active');
              })
              this.classList.add('active');
              self.contentList[index].classList.add('active');
            }
          });         
      }  

      return Tab;
})();








