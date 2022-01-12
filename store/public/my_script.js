/*Search-mobile*/
function doEnter2(evt){
  var key;
  if(evt.keyCode == 13 || evt.which == 13){
    onSearch2(evt);
  }
}
function onSearch2(evt) {     
  var keyword2 = document.getElementById("keyword2").value;
  if(keyword2=='' || keyword2==nhaptukhoatimkiem)
  {
    alert(nhaptukhoatimkiem);
  }
  else{
    location.href = "tim-kiem&keywords="+keyword2;
    loadPage(document.location);      
  }
} 
var placeholderText = [nhaptukhoatimkiem];
$('.search-auto').placeholderTypewriter({text: placeholderText});
/*Search-Dektop*/
function doEnter1(evt){
  var key;
  if(evt.keyCode == 13 || evt.which == 13){
    onSearch1(evt);
  }
}
function onSearch1(evt) {     
  var keyword1 = document.getElementById("keyword1").value;
  if(keyword1=='' || keyword1==nhaptukhoatimkiem)
  {
    alert(nhaptukhoatimkiem);
  }
  else{
    location.href = "tim-kiem&keywords="+keyword1;
    loadPage(document.location);      
  }
} 

$(document).ready(function($) {
  $('.btn-search').click(function(){
    onSearch1();
  });
});
/*Photo-album*/
if(source=='album'){
  $(document).ready(function($) {
     !(function(){
          $('#photobox').photobox('a', { thumbs:true, loop:false });
      })();
  }); 
}

$(document).ready(function() {
  /*Menu-Mobile*/ 
  $('body').on('click', 'span.btn-dropdown-menu', function() {
    var o = $(this);
    if(!o.hasClass('active')){
      o.addClass('active');
      o.next('.sub-menu').stop().slideDown(300);
    }else{
      o.removeClass('active');
      o.next('.sub-menu').stop().slideUp(300);
    }
  }); 
  $('.menu-mobile').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.header-left-fixwidth').toggleClass('open-sidebar-menu');
    $('.opacity-menu').toggleClass('open-opacity');
  });
  $('.opacity-menu').click(function(e){
    $('.open-menu-header').removeClass('open-button');
    $('.header-left-fixwidth').removeClass('open-sidebar-menu');
    $('.opacity-menu').removeClass('open-opacity');
  });
  /*Menu-Sidebar*/ 
  if($('#menu').length){
    $('.aside--sticky').css({"top":$('#menu').height()+10});
  }
  $('.plus-nClick1').click(function(e) {
      e.preventDefault();
      $(this).parents('.level0').toggleClass('opened');
      $(this).parents('.level0').children('ul').slideToggle(200);
  });
  $('.plus-nClick2').click(function(e) {
      e.preventDefault();
      $(this).parents('.level1').toggleClass('opened');
      $(this).parents('.level1').children('ul').slideToggle(200);
  });
});
$(document).ready(function(){
  $('.slick_video a').click(function(){
      var $id = $(this).attr('href');
      if($id!=''){
        $(".content_video iframe").attr("src",$id);
    }
      return false;
  });
});
if(source=='product'){
  $(document).ready(function(e) {
      $('#tabs a').click(function(e) {
          var id = $(this).attr('href');
          $('#tabs li').removeClass('active');
          $(this).parent().addClass('active');
          $('.tab_detail_product').removeClass('active');
          $('#'+id).addClass("active");
          return false;
      });
  });
}
function isEmpty(el,text){
    //var el = document.getElementById(id);
    var str = el.value;
    
    if (str != "")
        while (str.charAt(0) == " ")
            str = str.substr(1, str.length);
    
    //return str == "" ? true : false;
    if(str != "") return false;
    if(typeof(text) != 'undefined') alert(text);
    el.value = '';
    el.focus();
    return true;
}

function isNumber(el, text){
    //var el = document.getElementById(id);
    var str = "0123456789";
    for(var j=0; j < el.val().length; j++){
        if(str.indexOf(el.val().charAt(j))==-1){
            if( typeof(text) != 'undefined' )
                alert(text);
            el.val() = '';
            el.focus(); 
            return false;
        }
    }
    return true;
}
function isPhone(str,text){
  if((str.length==10 && (str.substr(0,2)==08)) || (str.length==10 && (str.substr(0,2)==09)) || (str.length==10 && (str.substr(0,2)==07)) || (str.length==10 && (str.substr(0,2)==05)) || (str.length==10 && (str.substr(0,2)==03)))
    return true;
  if(typeof(text)!='undefined') alert(text);
}

function check_email(email)
{
    emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/;
    return emailRegExp.test(email);
}

function isEmail(el, text){
    //var el = document.getElementById(id);
    emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/;
    if(!emailRegExp.test(el.value)){
        if(typeof(text)!='undefined')   alert(text);
        el.focus();
        return false;
    }
    return true;
}

function compare(value_1, value_2){
    if(value_1 < value_2)
        return -1;
    if(value_1 > value_2)
        return 1;
    return 0; 
}
///kiemtra lienhe

if(com=='lien-he'){
	function submit_contact(){
		if(isEmpty(document.getElementById('ten'),xinnhaphoten)){
			document.getElementById('ten').focus();
			return false;
		}
		if(isEmpty(document.getElementById('diachi'), xinnhapdiachi)){
			document.getElementById('diachi').focus();
			return false;
		}
		
		if(isEmpty(document.getElementById('dienthoai'), xinnhapdienthoai)){
			document.getElementById('dienthoai').focus();
			return false;
		}
		
		if(!isPhone(($('#dienthoai').val()), checkdienthoai)){
			document.getElementById('dienthoai').focus();
			return false;
		}
		
		if(!check_email(document.frm.email.value)){
			alert(checkemail);
			document.frm.email.focus();
			return false;
		}
		
		if(isEmpty(document.getElementById('noidung'), xinnhapnoidung)){
			document.getElementById('noidung').focus();
			return false;
		}
		
		document.frm.submit();
	}
}

$(document).ready(function() {
  /*Loader*/
  setTimeout(function(){
    $(".loading-skeleton").addClass('none-after');
  },700);
  setTimeout(function(){
   $("#loader-wrapper").fadeOut(500);
  },400);
  /*FixMenu*/  

  $(window).scroll(function() {
      if($(window).scrollTop() > 560) {
          $('.w_menu').addClass('fixmenu');
          $('#left').addClass('fixdanhmuc'); 
      } else {
          $('.w_menu').removeClass('fixmenu');
          $('#left').removeClass('fixdanhmuc'); 
      }
  });  
  $('#left').hover(function (){ 
         $('#danhmuc').addClass('hienthimenu');
  },function(){
      $('#danhmuc').removeClass('hienthimenu');
  });   


  $('.danhmucli').hover(function(){
    var vitri = ($(this).position().top) -0;
    $('.danhmucli .menucap2').css({'top':vitri+'px'})
  }); 
  $('.danhmucli2').hover(function(){
    var vitri2 = $(this).position().top;
    $('.danhmucli2 .menucap3').css({'top':vitri2+'px'})
  }); 
  /*BackToTop*/
  $('body').append('<div id="gotop"><i class="fa fa-angle-double-up" aria-hidden="true"></i></div>');
  $(window).scroll(function() {
      if($(window).scrollTop() > 100) {
          $('#gotop').css({right:'15px'});
      } else {
          $('#gotop').css({right:'-55px'});
      }
  });
  $('#gotop').click(function() {
      $('html, body').animate({scrollTop:0},500);
  });
  /*HoverMenu*/
  $("#menu ul li").hover(function(){
    $(this).find('>a').addClass('active2'); 
  },function(){ 
    $(this).find('>a').removeClass('active2'); 
  }); 
  $("#danhmuc ul li").hover(function(){
    $(this).find('ul:first').css({visibility: "visible",display: "none"}).show(300); 
  },function(){ 
    $(this).find('ul:first').css({visibility: "hidden"});
  }); 
});