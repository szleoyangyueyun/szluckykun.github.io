define([], function(){

	var Tips = (function(){

		var $tipBox = $(".tips-box");

		return {
			show: function(){
				$tipBox.removeClass("hide");
			},
			hide: function(){
				$tipBox.addClass("hide");
			},
			init: function(){

			}
		}
	})();

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var num = tags.eq(i).html().length % 5 +1;
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var slide = function(idx){
		var $wrap = $(".switch-wrap");
		$wrap.css({
			"transform": "translate(-"+idx*100+"%, 0 )"
		});
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
	}

	var bind = function(){
		var switchBtn = $("#myonoffswitch");
		var tagcloud = $(".second-part");
		var navDiv = $(".first-part");
		switchBtn.click(function(){
			if(switchBtn.hasClass("clicked")){
				switchBtn.removeClass("clicked");
				tagcloud.removeClass("turn-left");
				navDiv.removeClass("turn-left");
			}else{
				switchBtn.addClass("clicked");
				tagcloud.addClass("turn-left");
				navDiv.addClass("turn-left");
				resetTags();
			}
		});

		var timeout;
		var isEnterBtn = false;
		var isEnterTips = false;

		$(".icon").bind("mouseenter", function(){
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterBtn = false;
			setTimeout(function(){
				if(!isEnterTips){
					Tips.hide();
				}
			}, 100);
		});

		$('.profilepic').bind("mouseover", function() {
			$(this).addClass('hover-profile');
		}).bind("mouseout", function() {
			$(this).removeClass('hover-profile');
		});

		$(".tips-box").bind("mouseenter", function(){
			isEnterTips = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterTips = false;
			setTimeout(function(){
				if(!isEnterBtn){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-inner li").bind("click", function(){
			var idx = $(this).index();
			slide(idx);
			Tips.hide();
		});
	}



	return {
		init: function(){
			resetTags();
			bind();
			Tips.init();

			// $.ajax({
			// 	url: '//jarson7426.duoshuo.com/api/posts/list.json?nonce=5769559c76989',
			// 	type: 'get',
			// 	success: function(data) {
			//
			// 	},
			// 	error: function() {
			// 		console.log('error1');
			// 	}
			// });
			$('.welcome-info .comments').text(153);

			if(location.pathname == '/' && !sessionStorage.overviews) {  //????????????????????????????????????overview
				$('#overviews').show();
				$('body').css('overflow', 'hidden');
				require(['/js/reSlider.js'], function(pc){
					var slider = new reSlider({
						elem: 'slider-wrap',
						allowAuto: true
					});
				});
				var timer = setInterval(function() {
					var num = parseInt($('#busuanzi_value_site_uv').text());
					if(num != 0) {
						clearInterval(timer);
						$('#container').show();
						$('.welcome-info .visitors').text(num);  //????????????????????????
					}
				}, 60);
			} else {
				$('#container').show();
			}
			$('#btn-begin-blog').click(function() {
				sessionStorage.overviews = true;
				$('body').css('overflow', 'auto');
				$('#overviews').hide();
			});
		}
	}
});
