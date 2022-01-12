var $t;
function updateCart(){
	NProgress.start();
	$("#main").animate({opacity:"0.9"});
	initAjax({
		url:"ajax/update-cart",
		data:$("#box-shopcart form").serialize(),
		success:function(data){
			refreshCart();
		}
	})
	
}
function refreshCart(){
	$.post("gio-hang",function(data){
		$("#box-shopcart").html(data);
		NProgress.done();
		$("#main").animate({opacity:1});
		updateCartNumber();
	})	
}
function deleteCart(id){
		if(confirm(bancochacchanxoasp)){
		NProgress.start();
		$("#main_content").animate({opacity:".9"});
			initAjax({
				url:"ajax/delete-cart",
				data:{id:id},
				success:function(data){
					refreshCart();
				}
			})
		}
	}
function clearCart(){
		if(confirm(bancomuonxoatoanbogiohang)){
		NProgress.start();
		$("#main_content").animate({opacity:".9"});
		initAjax({
			url:"ajax/clear-cart",
			success:function(data){
				refreshCart();
			}
		})
		}
	}
function updateCartNumber(){
	$.post("ajax/get-cart-num",function(data){
		$("#soluongmua").html(data);
		$('#cart-total').html(data);
	})
}

function doAddCart($name,$id,$qty,$color,$size,$status){
	//NProgress.start();
	initAjax({
		url:"ajax/add-cart",
		data:{id:$id,qty:$qty,color:$color,size:$size},
		success:function(data){
			$("#soluongmua").html(data);
			$('#cart-count2').html(data);
			//showMsg("success",themsanpham+" "+$name+" "+ vaogiohangthanhcong);
			//NProgress.done();
			if($status=='buynow'){
				window.location.href='gio-hang';
			}else if($status=='add'){
				$('#popupCartModal2').modal('toggle');
				showMsg("success",themsanpham+" "+$name+" "+ vaogiohangthanhcong);
			}else if($status==''){
				showCartMini($name,$id,$qty,$color,$size);
			}
		}
	})
return false;		
}

function addCart(){
	$("#add-cart,#buynow").click(function(){
		$color = 0;
		$size = 0;
		$id = $(this).data("id");
		$qty = parseInt($("#qty").val());
		$status = $(this).data("status");
		if($(".wrap-color").length){
			if($(".wrap-color .item_color.active").length){
				$color = $(".wrap-color .item_color.active").data("color");
			}else{
				alert('Vui lòng chọn màu sắc sản phẩm');
				return false;
			}
		}
		if($(".wrap-size").length){
			if($(".wrap-size .item_size.active").length){
				$size = $(".wrap-size .item_size.active").data("size");
			}else{
				alert('Vui lòng chọn kích thước sản phẩm');
				return false;
			}
		}
		doAddCart($(this).data("name"),$id,$qty,$color,$size,$status);
		return false;
	});  
}
function hideCartMini(){
	$("#cart_mini").animate({right:"-100%"},1000);
}
function showCartMini($name,$id,$qty,$color,$size){
	$('#popupCartModal').modal('show');
	initAjax({
		url:"ajax/cart_mini.php",
		data:{id:$id,qty:$qty,color:$color,size:$size},
		success:function(data){	
			$('#popupCartModal').html(data);
		}
	})
}
function showCart($id){
	$('#popupCartModal2').modal('show');
	initAjax({
		url:"ajax/add.php",
		data:{id:$id},
		success:function(data){	
			$('#popupCartModal2').html(data);
		}
	})
}
//Thông báo khi mua
function showMsg(type,msg){
		Lobibox.notify(type, {
		size: 'mini',
		msg: msg,
		delay: 3000,
		showClass: 'zoomIn',
		hideClass: 'zoomOut',
		});    
	}

function delorder_gh(id){
	if(confirm(xacnhanxoasp)){
	$.ajax({
		type:'post',
		url:"ajax/delete-cart.php",
		data:{id:id},
		dataType:"json",
		success:function(data){
				$("#"+id).animate({height:0,opacity:0},function(){
					$(this).remove();
					$("#gio_hang_tong").html(data.total);
					$('#soluongmua').html(data.sl);
					if(data.qty==0){
						$(".empty-cart").removeClass("hide");
						$(".cart-enter, p.total").hide();
					}
					
				})

		}
	})
	}
	return false;
}
function initAjax(options){
  var defaults = { 
    url:      '', 
    type:    'post', 
	data:null,
    dataType:  'html', 
    error:  function(e){console.log(e)},
	success:function(){return false;},
	beforeSend:function(){},
  }; 
  var options = $.extend({}, defaults, options); 
	$.ajax({
		url:options.url,
		data:options.data,
		success:options.success,
		error:options.error,
		type:options.type,
		dataType:options.dataType,
		
	})
}
$().ready(function(){
	$("#cart_mini .close").click(function(){
		$("#cart_mini").animate({right:"-100%"},1000);
	})
});
$.fn.mousehold = function(timeout, f) {
  if (timeout && typeof timeout == 'function') {
    f = timeout;
    timeout = 100;
  }
  if (f && typeof f == 'function') {
    var timer = 0;
    var fireStep = 0;
    return this.each(function() {
      $(this).mousedown(function() {
        fireStep = 1;
        var ctr = 0;
        var t = this;
        timer = setInterval(function() {
          ctr++;
          f.call(t, ctr);
          fireStep = 2;
        }, timeout);
      })

      clearMousehold = function() {
        clearInterval(timer);
        if (fireStep == 1) f.call(this, 1);
        fireStep = 0;
      }
      
      $(this).mouseout(clearMousehold);
      $(this).mouseup(clearMousehold);
    })
  }
}
function controlProductQty(){
  $("button.add-cart").unbind("click");
  $("button.add-cart").click(function(){
    p = $(this).parents(".product-qty");
    return false; 
  })
  
  $(".product-qty .controls button").unbind("mousehold");
  $(".product-qty .controls button").mousehold(function(){

    a = $(this);
    c = $(this).parent().find("input");
    v = parseInt(c.val());
    
    if(a.hasClass("is-up")){
      v++;
    }else{
    v--;
    }
    if(v <1 ){
      v=1;
    }
    
    c.val(v);
    
  })
}

function controlProductQty2(){

  $(".variant-qty .controls button").unbind("mousehold");
  $(".variant-qty .controls button").mousehold(function(){
    a = $(this);
    c = $(this).parent().find("input");
    v = parseInt(c.val());


    if(a.hasClass("is-up2")){
      v++;
    }else{
    v--;
    }
    if(v <1 ){
      v=1;
    }
    
    c.val(v);
    var sizeprice = 0;
    var price_pro = 0;
    if($('.size-add.active').length){
    	sizeprice = $('.size-add.active').attr('data-pricesize');
    }else{
    	var price_pro = $('.product-title').attr('data-price');
    }

    if($('.size-add.active').length){
	    if(sizeprice==0 || sizeprice<0){
	    	$('.product-new-price span').text('Liên hệ');
	    }else if(sizeprice > 0){
	    	var price_New = sizeprice*v;
	    	$('.product-new-price span').text(formatNumber(price_New, '.', '.'));
	    }
	}else{
	    if(price_pro==0 || price_pro<0){
	    	$('.product-new-price span').text('Liên hệ');
	    }else if(price_pro > 0){
	    	var price_New = price_pro*v;
	    	$('.product-new-price span').text(formatNumber(price_New, '.', '.'));
	    }
	}

    
  })
}
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}
$(document).ready(function(e) {
	controlProductQty();
	controlProductQty2();
    addCart();
    $(".item-httt").click(function(){
      var httt=$(this).find(".label-httt").data("httt");
      $(".item-httt .label-httt, .info-httt").removeClass("active");
      $(this).find(".label-httt").addClass("active");
      $(".info-httt-"+httt).addClass("active");
  });
    $('.item_size').click(function(){
    	$('.item_size').removeClass('active');
    	$(this).addClass('active');
    	var price = parseInt($(this).attr('data-price'));
    	var priceold = parseInt($(this).attr('data-priceold'));
    	if(price < 0 || price == 0){
    		$('.price-detail').text('Liên hệ');
    	}else{
    		$('.price-detail').text(formatNumber(price, '.', '.')+'đ');
    	}

    	if(priceold < 0 || priceold == 0){
    		$('.price-detail-old del').text('');
    	}else{
    		$('.price-detail-old del').text(formatNumber(priceold, '.', '.')+'đ');
    	}
    });

    $('body').on('click', '.size-add', function(){
    	$('.size-add').removeClass('active');
    	$(this).addClass('active');
    	var priceSize = $('.size-add.active').attr('data-pricesize');
    	if(priceSize==0){
    		$('.product-new-price span').text('Liên hệ');
	    }else{
	    	var v = $('#qty2').val();
	    	var price_New = priceSize*v;
	    	$('.product-new-price span').text(formatNumber(price_New, '.', '.'));
	    }
    });

    $('body').on('click','.checkout_button_add', function(){
    	var size = 0;
    	if($(".variant-size").length){
			if($(".variant-size .size-add.active").length){
				var size = $(".variant-size .size-add.active").attr("data-id");
			}else{
				alert('Vui lòng chọn thuộc tính sản phẩm');
				return false;
			}
		}
		var id = $('.product-title').attr('data-id');
		var name = $('.product-title').attr('data-name');
		var qty = $('#qty2').val();
		doAddCart(name,id,qty,0,size,'add');
    });
    
});

