var GetLocalStorage = (function(){
		function GetLocalStorage($ct){
			this.$ct = $ct;

			this.init();
			this.renderHistoryList();
			this.bindEvent();
		}

		GetLocalStorage.prototype.init = function(){
			this.$historyList = this.$ct.find('.historyRecord');
			this.$input = this.$ct.find('input');
			this.value = null;
			this.songs = (localStorage.getItem('songs') == null ? [] : JSON.parse(localStorage.getItem('songs')));//页面加载获取localStorage
		}

		GetLocalStorage.prototype.bindEvent = function(){
			var _this = this;
			
			this.$input.on('keypress',function(e){
				if(e.which === 13){ 
					_this.value= $(this).val().trim();
					if(_this.value === '' || _this.value ===_this.songs[_this.songs.length-1]){
						return false;
					}
					_this.songs.push(_this.value);

					localStorage.setItem('songs',JSON.stringify(_this.songs));

					_this.$historyList.empty();

					_this.renderHistoryList();
				}
			}),
			this.$historyList.on('click','.remove',function(e){
				e.stopPropagation(); //阻止时间冒泡，即阻止触发$historyList中的li点击事件
				//更新songs
				var beRemoved = $(this).parent().text();

				for(var i=_this.songs.length-1;i>=0;i--){
					if(_this.songs[i] === beRemoved){
						_this.songs.splice(i,1);
						break;
					}
				}
				//更新localStorage
				localStorage.setItem('songs',JSON.stringify(_this.songs));
				_this.$historyList.empty();
				_this.renderHistoryList();
			})			
		}

		GetLocalStorage.prototype.renderHistoryList = function(){
			var _this = this;

			if(this.songs.length !== 0){
				this.songs.forEach(function(song,index){
					var html = '<li>'+song+'<span class="remove"><span></li>';
					_this.$historyList.prepend(html);
				})
			}
		}

	return GetLocalStorage;
})()

// new GetLocalStorage($('body'));