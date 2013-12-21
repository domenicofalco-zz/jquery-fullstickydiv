$.fn.fullstickydiv = function(options) {
		
		//default settings
		var settings = $.extend({
	     
		    effect			: 'swing',
		    delay			: 400,
		    timescroll		: 500,
		    keypress		: true,
		    disableUntil	: ''
		    
	    }, options );
		
		//var
		var $selector	= $(this);
		var $win		= $(window);
		var $reference	= $("html,body");
		var $body		= $('body');
		var $stickydiv	= '.stickydiv';
		var scrollEnd	= null;
		var fx			= settings.effect;
		var d			= settings.delay;
		var ts			= settings.timescroll;
		var k			= settings.keypress;
		var pl			= settings.preload;
		var du			= settings.disableUntil;
		
		function winResize(){
			
			if ($win.width() <= du) {
				
				if (!$body.hasClass('stickydiv-disabled')) {
					
					$body.addClass('stickydiv-disabled');
					
				}
					
			} else {
						
				$body.removeClass('stickydiv-disabled');
				
			}
			
			//get window dimension
			$selector.find($stickydiv).width($win.width());
			$selector.find($stickydiv).height($win.height());
			
			//start 'resize $win END'
			clearTimeout($win.resizeEnd);
			$win.resizeEnd = setTimeout(sticky, d);
			
		}
		
		function winScroll(){
			
			//start 'scroll $win END'
			clearTimeout(scrollEnd);
			scrollEnd = setTimeout(sticky, d);
			
		}
		
		function sticky(){
			
			if ($win.width() >= du) {
			
				var getScrollTop = $win.scrollTop();
				
				$selector.find($stickydiv).each(function(){
					
					$this		= $(this);
					getHeight	= $this.height();
					
					if (getScrollTop >= $this.position().top && getScrollTop < $this.position().top + getHeight/2) {
						
						$reference.animate({ scrollTop: $this.position().top+"px" }, ts, fx);
						
					} else if(getScrollTop >= $this.position().top + getHeight/2 && getScrollTop < $this.position().top + getHeight) {
						
						$reference.animate({ scrollTop: $this.next().position().top+"px" }, ts, fx);
						
					}
								
				});
				
			}
			
		}
		
		function keyDetect(e){
			
			if ((k) && ($win.width() >= du)) {
						
				var getScrollTop = $win.scrollTop();
				
				if (e.which == 40) {
					
					$selector.find($stickydiv).each(function(){
						
						$this = $(this);
						
						if (getScrollTop == $this.position().top && !$this.is(':last-child')) {
							
							$reference.animate({ scrollTop: $this.next().position().top+"px" }, ts, fx);
							
						}
									
					});
					
				} else if (e.which == 38) {
					
					$selector.find($stickydiv).each(function(){
						
						$this = $(this);
						
						if (getScrollTop == $this.position().top && !$this.is(':first-child')) {
							
							$reference.animate({ scrollTop: $this.prev().position().top+"px" }, ts, fx);
							
						}
									
					});
					
				}
			
			}
			
		}
		
		if(d<400) d=400; //delay value must be at least 400 for user usability
		if(ts<10) ts=10; //timescroll value must be at least 10 for user usability
		$selector.children().css('overflow', 'hidden').addClass('stickydiv');
		$body.css('overflow-x', 'hidden');			
		
		//window event	
		$win.on('load resize', winResize);
		$win.on('scroll', winScroll);
		$body.on('keydown', keyDetect);
	
}//end plugin
