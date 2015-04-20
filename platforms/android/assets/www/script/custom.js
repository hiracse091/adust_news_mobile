// JavaScript Document
$(window).load(function() {
	//homepage slider
	var slider = new Swipe(document.getElementById('slider'));
	//actual navigation
	if(localStorage.getItem('user-data') != null){

		loadLatestNewsItems();

		$('a.toggle-nav').show();
		$('div#register').hide();
		$('div#home').show();
		$('div#about').hide();
		$('div#notice').hide();
		$('div#contact').hide();
		/*$('.menu').animate({
			height: 'toggle'
	  	}, 0 );
		$('.toggle-nav-background-deco').hide(0);*/
		slider = new Swipe(document.getElementById('slider'));
	}
	else{
		$('a.toggle-nav').hide();
		$('div#register').show();
		$('div#home').hide();
		$('div#about').hide();
		$('div#notice').hide();
		$('div#contact').hide();
		$('.menu').css({
			height: 'toggle'
	  	});
		$('.toggle-nav-background-deco').hide(0);
	}
	$('.next-but-swipe').click(function(){
		slider.next();
		return false;
	});
	
	$('.prev-but-swipe').click(function(){
		slider.prev();
		return false;
	});

	// set menu to 0 height and background to transparent
	$('.menu').animate({
		height: 'toggle'
  	}, 0 );
	$('.toggle-nav-background-deco').hide(0);
	
	
	//top brodcast menu
	$('.close-brodcast').click(function(){
		 $(this).parent().parent().find('.brodcast').animate({
			marginTop: '-30px'
  		 }, 400);
	});

	//navigation button
	$('.toggle-nav').click(function(){
		$(this).parent().find('.menu').animate({
			height: 'toggle'
  		 }, 800, 'easeInOutExpo' );
		$('.toggle-nav-background-deco').fadeToggle();
	});
	
	$('.toggle-nav-background-deco').click(function(){
		$('.navigation .menu').animate({
			height: 'toggle'
  		 }, 800, 'easeInOutExpo' );
		 $('.toggle-nav-background-deco').fadeToggle();
	});
	
	
	
	$('.home').click(function(){
		loadLatestNewsItems();

		$(this).parent().parent().parent().parent().find('#home').show();
		$(this).parent().parent().parent().parent().find('#about').hide();
		$(this).parent().parent().parent().parent().find('#notice').hide();
		$(this).parent().parent().parent().parent().find('#contact').hide();
		$(this).parent().parent().parent().parent().find('#login').hide();
		$(this).parent().parent().parent().parent().find('.menu').animate({
			height: 'toggle'
  		 }, 800, 'easeInOutExpo' );
		$('.toggle-nav-background-deco').fadeToggle();
	});
	
	$('.about').click(function(){
		$(this).parent().parent().parent().parent().find('#home').hide();
		$(this).parent().parent().parent().parent().find('#about').show();
		$(this).parent().parent().parent().parent().find('#notice').hide();
		$(this).parent().parent().parent().parent().find('#contact').hide();	
		$(this).parent().parent().parent().parent().find('#login').hide();
		$(this).parent().parent().parent().parent().find('.menu').animate({
			height: 'toggle'
  		 }, 800, 'easeInOutExpo' );
		$('.toggle-nav-background-deco').fadeToggle();
	});
	
	$('.notice').click(function(){

		loadAllCategories();
		loadAllNewsItems();

		$(this).parent().parent().parent().parent().find('#home').hide();
		$(this).parent().parent().parent().parent().find('#about').hide();
		$(this).parent().parent().parent().parent().find('#notice').show();
		$(this).parent().parent().parent().parent().find('#contact').hide();	
		$(this).parent().parent().parent().parent().find('#login').hide();
		$(this).parent().parent().parent().parent().find('.menu').animate({
			height: 'toggle'
  		 }, 800, 'easeInOutExpo' );
		$('.toggle-nav-background-deco').fadeToggle();	
	});
	
	$('.contact').click(function(){
		$(this).parent().parent().parent().parent().find('#home').hide();
		$(this).parent().parent().parent().parent().find('#about').hide();
		$(this).parent().parent().parent().parent().find('#notice').hide();
		$(this).parent().parent().parent().parent().find('#contact').show();	
		$(this).parent().parent().parent().parent().find('#login').hide();
		$(this).parent().parent().parent().parent().find('.menu').animate({
			height: 'toggle'
  		 }, 800, 'easeInOutExpo' );
		$('.toggle-nav-background-deco').fadeToggle();		
	});
	
	//notification boxes
	$(".notification-quit-red").click(function(){
	  $(".notification-box-red").hide("slow");
	  return false;
	});
	
	$(".notification-quit-green").click(function(){
	  $(".notification-box-green").hide("slow");
	  return false;
	});
	
	$(".notification-quit-yellow").click(function(){
	  $(".notification-box-yellow").hide("slow");
	  return false;
	});
	
	$(".notification-quit-blue").click(function(){
	  $(".notification-box-blue").hide("slow");
	  return false;
	});
	
	var myPhotoSwipe = $("#gallery a").photoSwipe({ 
		enableMouseWheel: false, 
		enableKeyboard: false, 
		allowUserZoom: false, 
		loop:false, 
		cacheMode:Code.PhotoSwipe.Cache.Mode.aggressive 
	});

	
});

//var serverIP = "localhost/projects/";
//var serverIP = "http://192.168.1.32:8080/projects/";
var serverIP = "http://www.dcastalia.com/projects/web/"

function loadLatestNewsItems(){
	$.ajax({
	  url: serverIP + "newsportal/index.php/noticeDetail/Latest",
	  //data: dataArray,
	  success: function(res){
	  	latest = JSON.parse(res);
	  	html = "<p class=\"shadow heading\">Latest News</p>";
	  	if(latest.length < 1){
	  		html += "Sorry! There is nothing to display."
	  	}
	  	else{
	  		for(var i in latest){
		  		html += "<div class=\"project\">\
			                <img class=\"\" src=\"images/notice_icon.png\" alt=\"img\">\
			                <p class=\"shadow more\">\
			                    <b>" + latest[i].title + ":</b>" + $('<div/>').html(latest[i].details).text().replace(/(<([^>]+)>)/ig,"") + "\
			                </p>\
			            </div>";
			    html += "<div class=\"clear\"></div>";
		  	}
	  	}
	  	
	  	$("div#home>.full-width").html(html);

	  	var showChar = 100;
	  	var ellipsestext = "...";
	  	var moretext = "read more...";
    	var lesstext = "...read less";
	  	$(".more").each(function(){
	  		var content = $(this).html();
	  		if(content.length > showChar){
	  			var c = content.substr(0, showChar);
	            var h = content.substr(showChar, content.length - showChar);
	            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
	            $(this).html(html);
	  		}
	  	});
	  	$(".morelink").click(function(){
	        if($(this).hasClass("less")) {
	            $(this).removeClass("less");
	            $(this).html(moretext);
	        } else {
	            $(this).addClass("less");
	            $(this).html(lesstext);
	        }
	        $(this).parent().prev().toggle();
	        $(this).prev().slideToggle("slow");
	        return false;
	    });
	  }
	});
}

function loadAllNewsItems(){
	$.ajax({
	  url: serverIP + "newsportal/index.php/noticeDetail/All",
	  //data: dataArray,
	  success: function(res){
	  	all = JSON.parse(res);
	  	html = "";//"<p class=\"shadow heading\">Notice Board</p>";
	  	if(all.length < 1){
	  		html += "Sorry! There is nothing to display.";
	  	}
	  	else {
	  		for(var i in all){
		  		html += "<div class=\"project cat-" + all[i].category + "\">\
			                <img class=\"\" src=\"images/notice_icon.png\" alt=\"img\">\
			                <p class=\"shadow more\">\
			                    <b>" + all[i].title + ":</b>" + $('<div/>').html(all[i].details).text().replace(/(<([^>]+)>)/ig,"") + "\
			                </p>\
			            </div>";
			    html += "<div class=\"clear\"></div>";
		  	}
	  	}

	  	$("div#notice>.full-width:last").html(html);

	  	var showChar = 100;
	  	var ellipsestext = "...";
	  	var moretext = "read more...";
    	var lesstext = "...read less";
	  	$(".more").each(function(){
	  		var content = $(this).html();
	  		if(content.length > showChar){
	  			var c = content.substr(0, showChar);
	            var h = content.substr(showChar, content.length - showChar);
	            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
	            $(this).html(html);
	  		}
	  	});
	  	$(".morelink").click(function(){
	        if($(this).hasClass("less")) {
	            $(this).removeClass("less");
	            $(this).html(moretext);
	        } else {
	            $(this).addClass("less");
	            $(this).html(lesstext);
	        }
	        $(this).parent().prev().toggle();
	        $(this).prev().slideToggle("slow");
	        return false;
	    });
	  }
	});
}

function loadAllCategories(){
	$.ajax({
	  url: serverIP + "newsportal/index.php/noticeCategory/All",
	  //data: dataArray,
	  success: function(res){
	  	cat = JSON.parse(res);
	  	html = "<select name=\"category\" id=\"category\" style=\"float:right;\">";
  		html += "<option value=\"\">-Show All-</option>";
  		for(var i in cat){
	  		html += "<option value=\"" + cat[i].id + "\">" + cat[i].title + "</option>";
	  	}

	  	html += "</select>";

	  	$("div#notice>.full-width>.filter").html(html);

	  	var showChar = 100;
	  	var ellipsestext = "...";
	  	var moretext = "read more...";
    	var lesstext = "...read less";
	  	$(".more").each(function(){
	  		var content = $(this).html();
	  		if(content.length > showChar){
	  			var c = content.substr(0, showChar);
	            var h = content.substr(showChar, content.length - showChar);
	            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
	            $(this).html(html);
	  		}
	  	});
	  	$(".morelink").click(function(){
	        if($(this).hasClass("less")) {
	            $(this).removeClass("less");
	            $(this).html(moretext);
	        } else {
	            $(this).addClass("less");
	            $(this).html(lesstext);
	        }
	        $(this).parent().prev().toggle();
	        $(this).prev().slideToggle("slow");
	        return false;
	    });
	    $("#category").change(function(){
	    	if($(this).find('option:selected').text() == "-Show All-"){
	    		$("div#notice>.full-width:last>.project").each(function(){
	    			$(this).show(500);
	    		});
	    	}
	    	else
	    	{
	    		var cat = "cat-" + $(this).find('option:selected').text();
		    	$("div#notice>.full-width:last>.project").each(function(){
		    		if($(this).hasClass(cat)){
		    			$(this).show(500);
		    		}
		    		else{
		    			$(this).hide(500);
		    		}
		    	});
	    	}
	    });
	  }
	});
}

$(document).ready(function () {

});
	