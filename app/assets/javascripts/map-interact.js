function isTouchEnabled() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

$(function(){
	addEvent('af_1');addEvent('af_2');addEvent('af_3');addEvent('af_4');addEvent('af_5');addEvent('af_6');addEvent('af_7');addEvent('af_8');addEvent('af_9');addEvent('af_10');addEvent('af_11');addEvent('af_12');addEvent('af_13');addEvent('af_14');addEvent('af_15');addEvent('af_16');addEvent('af_17');addEvent('af_18');addEvent('af_19');addEvent('af_20');addEvent('af_21');addEvent('af_22');addEvent('af_23');addEvent('af_24');addEvent('af_25');addEvent('af_26');addEvent('af_27');addEvent('af_28');addEvent('af_29');addEvent('af_30');addEvent('af_31');addEvent('af_32');addEvent('af_33');addEvent('af_34');addEvent('af_35');addEvent('af_36');addEvent('af_37');addEvent('af_38');addEvent('af_39');addEvent('af_40');addEvent('af_41');addEvent('af_42');addEvent('af_43');addEvent('af_44');addEvent('af_45');addEvent('af_46');addEvent('af_47');addEvent('af_48');addEvent('af_49');addEvent('af_50');addEvent('af_51');addEvent('af_52');addEvent('af_53');addEvent('af_54');
})
function addEvent(id,relationId){
	var _obj = $('#'+id);
	var _Textobj = $('#'+id+','+'#'+af_config[id]['iso']);

	$('#abbs').attr({'fill':af_config['default']['shortNames']});

	_obj.attr({'fill':af_config[id]['upColor'],'stroke':af_config['default']['borderColor']});
	_Textobj.attr({'cursor':'default'});
	if(af_config[id]['enable'] == true){
		if (isTouchEnabled()) {
			_Textobj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':af_config[id]['downColor']});
				$('#map-tip').show().html(af_config[id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			if(af_config[id]['zoom'] == 'no'){
				_Textobj.mouseup(function(){
					$('#'+id).css({'fill':af_config[id]['overColor']});
					if(af_config[id]['target'] == 'new_window'){
						window.open(af_config[id]['url']);	
					}else if(af_config[id]['target'] == 'same_window'){
						window.parent.location.href=af_config[id]['url'];
					}
				})
			}
		}
		_Textobj.attr({'cursor':'pointer'});
		_Textobj.hover(function(){
			$('#map-tip').show().html(af_config[id]['hover']);
			_obj.css({'fill':af_config[id]['overColor']})
		},function(){
			$('#map-tip').hide();
			$('#'+id).css({'fill':af_config[id]['upColor']});
		})
		_Textobj.mousedown(function(){
			$('#'+id).css({'fill':af_config[id]['downColor']});
		})
		if(af_config[id]['zoom'] == 'no'){
			_Textobj.mouseup(function(){
				$('#'+id).css({'fill':af_config[id]['overColor']});
				if(af_config[id]['target'] == 'new_window'){
					window.open(af_config[id]['url']);	
				}else if(af_config[id]['target'] == 'same_window'){
					window.parent.location.href=af_config[id]['url'];
				}
			})
		} else {
			_Textobj.mouseup(function(){
				$('#'+id).css({'fill':af_config[id]['overColor']});
				$('#afc-01, #afc-02, #afc-03, #afc-04, #afc-05, #afc-06, #afc-07, #afc-08, #afc-09, #afc-10, #afc-11, #afc-12, #afc-13, #afc-14, #afc-15, #afc-16, #afc-17, #afc-18, #afc-19, #afc-20, #afc-21, #afc-22, #afc-23, #afc-24, #afc-25, #afc-26, #afc-27, #afc-28, #afc-29, #afc-30, #afc-31, #afc-32, #afc-33, #afc-34, #afc-35, #afc-36, #afc-37, #afc-38, #afc-39, #afc-40, #afc-41, #afc-42, #afc-43, #afc-44, #afc-45, #afc-46, #afc-47, #afc-48, #afc-49, #afc-50, #afc-51, #afc-52, #afc-53, #afc-54').hide().animate({'opacity':'0'}, 100);
				$('#af-map').hide().animate({'opacity':'0'}, 1000);
				$('#'+af_config[id]['id']).show().animate({'opacity':'1'}, 1000);
			})
		}
		_Textobj.mousemove(function(e){
			var x=e.pageX+10, y=e.pageY+15;
			var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
			x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
			y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
			$('#map-tip').css({left:x, top:y})
		})
	}
}

$(document).ready(function(){
	$('#afc-01, #afc-02, #afc-03, #afc-04, #afc-05, #afc-06, #afc-07, #afc-08, #afc-09, #afc-10, #afc-11, #afc-12, #afc-13, #afc-14, #afc-15, #afc-16, #afc-17, #afc-18, #afc-19, #afc-20, #afc-21, #afc-22, #afc-23, #afc-24, #afc-25, #afc-26, #afc-27, #afc-28, #afc-29, #afc-30, #afc-31, #afc-32, #afc-33, #afc-34, #afc-35, #afc-36, #afc-37, #afc-38, #afc-39, #afc-40, #afc-41, #afc-42, #afc-43, #afc-44, #afc-45, #afc-46, #afc-47, #afc-48, #afc-49, #afc-50, #afc-51, #afc-52, #afc-53, #afc-54').hide().animate({'opacity':'0'}, 1000);
	if (isTouchEnabled()) {
		$('.back_btn').on('touchstart', function(){
			$(this).css({'fill' : '#f00'});
		});
	}
	$('.back_btn').on('click', function(){
		$('#afc-01, #afc-02, #afc-03, #afc-04, #afc-05, #afc-06, #afc-07, #afc-08, #afc-09, #afc-10, #afc-11, #afc-12, #afc-13, #afc-14, #afc-15, #afc-16, #afc-17, #afc-18, #afc-19, #afc-20, #afc-21, #afc-22, #afc-23, #afc-24, #afc-25, #afc-26, #afc-27, #afc-28, #afc-29, #afc-30, #afc-31, #afc-32, #afc-33, #afc-34, #afc-35, #afc-36, #afc-37, #afc-38, #afc-39, #afc-40, #afc-41, #afc-42, #afc-43, #afc-44, #afc-45, #afc-46, #afc-47, #afc-48, #afc-49, #afc-50, #afc-51, #afc-52, #afc-53, #afc-54').hide().animate({'opacity':'0'}, 1000);
		$('#af-map').show().animate({'opacity':'1'}, 1000);
	});
});
/*======================================================================================*/
/*======================================== PINS ========================================*/
/*======================================================================================*/
$(function(){
	var pins_len = af_pins['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("af_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (af_pins['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", af_pins['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", af_pins['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", af_pins['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", af_pins['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'af_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", af_pins['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", af_pins['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", af_pins['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", af_pins['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",af_pins['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'af_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				afDynamicAddEvent(i);
			}
			else if(af_pins['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", af_pins['pins'][i]['pos_X']- af_pins['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", af_pins['pins'][i]['pos_Y']- af_pins['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", af_pins['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", af_pins['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", af_pins['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'af_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", af_pins['pins'][i]['pos_X']- af_pins['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", af_pins['pins'][i]['pos_Y']- af_pins['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", af_pins['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", af_pins['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", af_pins['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",af_pins['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'af_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				afDynamicAddEvent(i);
			}
		}
	}
});

function afDynamicAddEvent(id){
	var obj = $('#af_map_pins_'+id);

	if(af_pins['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':af_pins['pins'][id]['downColor']});
				$('#map-tip').show().html(af_pins['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':af_pins['pins'][id]['upColor']});
				if(af_pins['pins'][id]['target'] == 'new_window'){
					window.open(af_pins['pins'][id]['url']);
				}else if(af_pins['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=af_pins['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(af_pins['pins'][id]['hover']);
			obj.css({'fill':af_pins['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':af_pins['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':af_pins['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':af_pins['pins'][id]['overColor']});
			if(af_pins['pins'][id]['target'] == 'new_window'){
				window.open(af_pins['pins'][id]['url']);
			}else if(af_pins['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=af_pins['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.1 ======================================*/
$(function(){
	$('#afc-01').find('path').attr({'fill':config_01['default']['landColor']}).css({'stroke':config_01['default']['borderColor']});
	$('#afc-01').find('text').attr({'fill':config_01['default']['shortName']});
	var pins_len = config_01['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c01_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_01['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_01['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_01['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_01['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_01['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c01_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_01['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_01['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_01['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_01['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_01['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c01_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c01DynAddE(i);
			}
			else if(config_01['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_01['pins'][i]['pos_X']- config_01['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_01['pins'][i]['pos_Y']- config_01['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_01['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_01['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_01['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c01_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_01['pins'][i]['pos_X']- config_01['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_01['pins'][i]['pos_Y']- config_01['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_01['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_01['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_01['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_01['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c01_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c01DynAddE(i);
			}
		}
	}
});

function c01DynAddE(id){
	var obj = $('#c01_map_pins_'+id);

	if(config_01['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_01['pins'][id]['downColor']});
				$('#map-tip').show().html(config_01['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_01['pins'][id]['upColor']});
				if(config_01['pins'][id]['target'] == 'new_window'){
					window.open(config_01['pins'][id]['url']);
				}else if(config_01['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_01['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_01['pins'][id]['hover']);
			obj.css({'fill':config_01['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_01['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_01['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_01['pins'][id]['overColor']});
			if(config_01['pins'][id]['target'] == 'new_window'){
				window.open(config_01['pins'][id]['url']);
			}else if(config_01['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_01['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.2 ======================================*/
$(function(){
	$('#afc-02').find('path').attr({'fill':config_02['default']['landColor']}).css({'stroke':config_02['default']['borderColor']});
	$('#afc-02').find('text').attr({'fill':config_02['default']['shortName']});
	var pins_len = config_02['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c02_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_02['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_02['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_02['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_02['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_02['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c02_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_02['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_02['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_02['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_02['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_02['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c02_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c02DynAddE(i);
			}
			else if(config_02['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_02['pins'][i]['pos_X']- config_02['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_02['pins'][i]['pos_Y']- config_02['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_02['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_02['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_02['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c02_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_02['pins'][i]['pos_X']- config_02['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_02['pins'][i]['pos_Y']- config_02['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_02['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_02['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_02['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_02['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c02_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c02DynAddE(i);
			}
		}
	}
});

function c02DynAddE(id){
	var obj = $('#c02_map_pins_'+id);

	if(config_02['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_02['pins'][id]['downColor']});
				$('#map-tip').show().html(config_02['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_02['pins'][id]['upColor']});
				if(config_02['pins'][id]['target'] == 'new_window'){
					window.open(config_02['pins'][id]['url']);
				}else if(config_02['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_02['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_02['pins'][id]['hover']);
			obj.css({'fill':config_02['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_02['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_02['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_02['pins'][id]['overColor']});
			if(config_02['pins'][id]['target'] == 'new_window'){
				window.open(config_02['pins'][id]['url']);
			}else if(config_02['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_02['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.3 ======================================*/
$(function(){
	$('#afc-03').find('path').attr({'fill':config_03['default']['landColor']}).css({'stroke':config_03['default']['borderColor']});
	$('#afc-03').find('text').attr({'fill':config_03['default']['shortName']});
	var pins_len = config_03['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c03_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_03['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_03['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_03['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_03['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_03['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c03_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_03['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_03['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_03['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_03['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_03['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c03_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c03DynAddE(i);
			}
			else if(config_03['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_03['pins'][i]['pos_X']- config_03['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_03['pins'][i]['pos_Y']- config_03['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_03['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_03['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_03['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c03_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_03['pins'][i]['pos_X']- config_03['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_03['pins'][i]['pos_Y']- config_03['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_03['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_03['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_03['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_03['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c03_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c03DynAddE(i);
			}
		}
	}
});

function c03DynAddE(id){
	var obj = $('#c03_map_pins_'+id);

	if(config_03['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_03['pins'][id]['downColor']});
				$('#map-tip').show().html(config_03['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_03['pins'][id]['upColor']});
				if(config_03['pins'][id]['target'] == 'new_window'){
					window.open(config_03['pins'][id]['url']);
				}else if(config_03['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_03['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_03['pins'][id]['hover']);
			obj.css({'fill':config_03['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_03['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_03['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_03['pins'][id]['overColor']});
			if(config_03['pins'][id]['target'] == 'new_window'){
				window.open(config_03['pins'][id]['url']);
			}else if(config_03['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_03['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.4 ======================================*/
$(function(){
	$('#afc-04').find('path').attr({'fill':config_04['default']['landColor']}).css({'stroke':config_04['default']['borderColor']});
	$('#afc-04').find('text').attr({'fill':config_04['default']['shortName']});
	var pins_len = config_04['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c04_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_04['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_04['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_04['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_04['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_04['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c04_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_04['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_04['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_04['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_04['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_04['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c04_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c04DynAddE(i);
			}
			else if(config_04['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_04['pins'][i]['pos_X']- config_04['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_04['pins'][i]['pos_Y']- config_04['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_04['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_04['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_04['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c04_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_04['pins'][i]['pos_X']- config_04['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_04['pins'][i]['pos_Y']- config_04['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_04['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_04['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_04['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_04['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c04_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c04DynAddE(i);
			}
		}
	}
});

function c04DynAddE(id){
	var obj = $('#c04_map_pins_'+id);

	if(config_04['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_04['pins'][id]['downColor']});
				$('#map-tip').show().html(config_04['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_04['pins'][id]['upColor']});
				if(config_04['pins'][id]['target'] == 'new_window'){
					window.open(config_04['pins'][id]['url']);
				}else if(config_04['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_04['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_04['pins'][id]['hover']);
			obj.css({'fill':config_04['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_04['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_04['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_04['pins'][id]['overColor']});
			if(config_04['pins'][id]['target'] == 'new_window'){
				window.open(config_04['pins'][id]['url']);
			}else if(config_04['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_04['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.5 ======================================*/
$(function(){
	$('#afc-05').find('path').attr({'fill':config_05['default']['landColor']}).css({'stroke':config_05['default']['borderColor']});
	$('#afc-05').find('text').attr({'fill':config_05['default']['shortName']});
	var pins_len = config_05['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c05_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_05['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_05['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_05['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_05['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_05['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c05_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_05['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_05['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_05['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_05['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_05['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c05_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c05DynAddE(i);
			}
			else if(config_05['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_05['pins'][i]['pos_X']- config_05['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_05['pins'][i]['pos_Y']- config_05['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_05['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_05['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_05['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c05_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_05['pins'][i]['pos_X']- config_05['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_05['pins'][i]['pos_Y']- config_05['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_05['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_05['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_05['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_05['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c05_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c05DynAddE(i);
			}
		}
	}
});

function c05DynAddE(id){
	var obj = $('#c05_map_pins_'+id);

	if(config_05['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_05['pins'][id]['downColor']});
				$('#map-tip').show().html(config_05['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_05['pins'][id]['upColor']});
				if(config_05['pins'][id]['target'] == 'new_window'){
					window.open(config_05['pins'][id]['url']);
				}else if(config_05['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_05['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_05['pins'][id]['hover']);
			obj.css({'fill':config_05['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_05['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_05['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_05['pins'][id]['overColor']});
			if(config_05['pins'][id]['target'] == 'new_window'){
				window.open(config_05['pins'][id]['url']);
			}else if(config_05['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_05['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.6 ======================================*/
$(function(){
	$('#afc-06').find('path').attr({'fill':config_06['default']['landColor']}).css({'stroke':config_06['default']['borderColor']});
	$('#afc-06').find('text').attr({'fill':config_06['default']['shortName']});
	var pins_len = config_06['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c06_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_06['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_06['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_06['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_06['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_06['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c06_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_06['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_06['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_06['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_06['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_06['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c06_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c06DynAddE(i);
			}
			else if(config_06['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_06['pins'][i]['pos_X']- config_06['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_06['pins'][i]['pos_Y']- config_06['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_06['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_06['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_06['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c06_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_06['pins'][i]['pos_X']- config_06['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_06['pins'][i]['pos_Y']- config_06['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_06['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_06['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_06['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_06['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c06_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c06DynAddE(i);
			}
		}
	}
});

function c06DynAddE(id){
	var obj = $('#c06_map_pins_'+id);

	if(config_06['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_06['pins'][id]['downColor']});
				$('#map-tip').show().html(config_06['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_06['pins'][id]['upColor']});
				if(config_06['pins'][id]['target'] == 'new_window'){
					window.open(config_06['pins'][id]['url']);
				}else if(config_06['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_06['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_06['pins'][id]['hover']);
			obj.css({'fill':config_06['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_06['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_06['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_06['pins'][id]['overColor']});
			if(config_06['pins'][id]['target'] == 'new_window'){
				window.open(config_06['pins'][id]['url']);
			}else if(config_06['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_06['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.7 ======================================*/
$(function(){
	$('#afc-07').find('path').attr({'fill':config_07['default']['landColor']}).css({'stroke':config_07['default']['borderColor']});
	$('#afc-07').find('text').attr({'fill':config_07['default']['shortName']});
	var pins_len = config_07['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c07_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_07['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_07['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_07['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_07['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_07['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c07_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_07['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_07['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_07['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_07['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_07['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c07_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c07DynAddE(i);
			}
			else if(config_07['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_07['pins'][i]['pos_X']- config_07['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_07['pins'][i]['pos_Y']- config_07['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_07['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_07['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_07['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c07_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_07['pins'][i]['pos_X']- config_07['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_07['pins'][i]['pos_Y']- config_07['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_07['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_07['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_07['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_07['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c07_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c07DynAddE(i);
			}
		}
	}
});

function c07DynAddE(id){
	var obj = $('#c07_map_pins_'+id);

	if(config_07['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_07['pins'][id]['downColor']});
				$('#map-tip').show().html(config_07['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_07['pins'][id]['upColor']});
				if(config_07['pins'][id]['target'] == 'new_window'){
					window.open(config_07['pins'][id]['url']);
				}else if(config_07['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_07['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_07['pins'][id]['hover']);
			obj.css({'fill':config_07['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_07['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_07['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_07['pins'][id]['overColor']});
			if(config_07['pins'][id]['target'] == 'new_window'){
				window.open(config_07['pins'][id]['url']);
			}else if(config_07['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_07['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.8 ======================================*/
$(function(){
	$('#afc-08').find('path').attr({'fill':config_08['default']['landColor']}).css({'stroke':config_08['default']['borderColor']});
	$('#afc-08').find('text').attr({'fill':config_08['default']['shortName']});
	var pins_len = config_08['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c08_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_08['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_08['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_08['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_08['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_08['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c08_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_08['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_08['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_08['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_08['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_08['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c08_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c08DynAddE(i);
			}
			else if(config_08['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_08['pins'][i]['pos_X']- config_08['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_08['pins'][i]['pos_Y']- config_08['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_08['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_08['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_08['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c08_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_08['pins'][i]['pos_X']- config_08['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_08['pins'][i]['pos_Y']- config_08['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_08['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_08['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_08['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_08['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c08_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c08DynAddE(i);
			}
		}
	}
});

function c08DynAddE(id){
	var obj = $('#c08_map_pins_'+id);

	if(config_08['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_08['pins'][id]['downColor']});
				$('#map-tip').show().html(config_08['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_08['pins'][id]['upColor']});
				if(config_08['pins'][id]['target'] == 'new_window'){
					window.open(config_08['pins'][id]['url']);
				}else if(config_08['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_08['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_08['pins'][id]['hover']);
			obj.css({'fill':config_08['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_08['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_08['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_08['pins'][id]['overColor']});
			if(config_08['pins'][id]['target'] == 'new_window'){
				window.open(config_08['pins'][id]['url']);
			}else if(config_08['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_08['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.9 ======================================*/
$(function(){
	$('#afc-09').find('path').attr({'fill':config_09['default']['landColor']}).css({'stroke':config_09['default']['borderColor']});
	$('#afc-09').find('text').attr({'fill':config_09['default']['shortName']});
	var pins_len = config_09['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c09_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_09['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_09['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_09['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_09['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_09['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c09_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_09['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_09['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_09['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_09['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_09['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c09_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c09DynAddE(i);
			}
			else if(config_09['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_09['pins'][i]['pos_X']- config_09['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_09['pins'][i]['pos_Y']- config_09['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_09['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_09['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_09['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c09_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_09['pins'][i]['pos_X']- config_09['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_09['pins'][i]['pos_Y']- config_09['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_09['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_09['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_09['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_09['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c09_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c09DynAddE(i);
			}
		}
	}
});

function c09DynAddE(id){
	var obj = $('#c09_map_pins_'+id);

	if(config_09['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_09['pins'][id]['downColor']});
				$('#map-tip').show().html(config_09['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_09['pins'][id]['upColor']});
				if(config_09['pins'][id]['target'] == 'new_window'){
					window.open(config_09['pins'][id]['url']);
				}else if(config_09['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_09['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_09['pins'][id]['hover']);
			obj.css({'fill':config_09['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_09['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_09['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_09['pins'][id]['overColor']});
			if(config_09['pins'][id]['target'] == 'new_window'){
				window.open(config_09['pins'][id]['url']);
			}else if(config_09['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_09['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.10 ======================================*/
$(function(){
	$('#afc-10').find('path').attr({'fill':config_10['default']['landColor']}).css({'stroke':config_10['default']['borderColor']});
	$('#afc-10').find('text').attr({'fill':config_10['default']['shortName']});
	var pins_len = config_10['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c10_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_10['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_10['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_10['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_10['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_10['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c10_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_10['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_10['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_10['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_10['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_10['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c10_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c10DynAddE(i);
			}
			else if(config_10['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_10['pins'][i]['pos_X']- config_10['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_10['pins'][i]['pos_Y']- config_10['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_10['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_10['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_10['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c10_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_10['pins'][i]['pos_X']- config_10['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_10['pins'][i]['pos_Y']- config_10['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_10['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_10['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_10['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_10['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c10_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c10DynAddE(i);
			}
		}
	}
});

function c10DynAddE(id){
	var obj = $('#c10_map_pins_'+id);

	if(config_10['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_10['pins'][id]['downColor']});
				$('#map-tip').show().html(config_10['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_10['pins'][id]['upColor']});
				if(config_10['pins'][id]['target'] == 'new_window'){
					window.open(config_10['pins'][id]['url']);
				}else if(config_10['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_10['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_10['pins'][id]['hover']);
			obj.css({'fill':config_10['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_10['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_10['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_10['pins'][id]['overColor']});
			if(config_10['pins'][id]['target'] == 'new_window'){
				window.open(config_10['pins'][id]['url']);
			}else if(config_10['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_10['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.11 ======================================*/
$(function(){
	$('#afc-11').find('path').attr({'fill':config_11['default']['landColor']}).css({'stroke':config_11['default']['borderColor']});
	$('#afc-11').find('text').attr({'fill':config_11['default']['shortName']});
	var pins_len = config_11['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c11_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_11['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_11['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_11['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_11['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_11['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c11_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_11['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_11['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_11['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_11['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_11['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c11_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c11DynAddE(i);
			}
			else if(config_11['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_11['pins'][i]['pos_X']- config_11['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_11['pins'][i]['pos_Y']- config_11['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_11['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_11['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_11['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c11_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_11['pins'][i]['pos_X']- config_11['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_11['pins'][i]['pos_Y']- config_11['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_11['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_11['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_11['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_11['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c11_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c11DynAddE(i);
			}
		}
	}
});

function c11DynAddE(id){
	var obj = $('#c11_map_pins_'+id);

	if(config_11['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_11['pins'][id]['downColor']});
				$('#map-tip').show().html(config_11['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_11['pins'][id]['upColor']});
				if(config_11['pins'][id]['target'] == 'new_window'){
					window.open(config_11['pins'][id]['url']);
				}else if(config_11['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_11['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_11['pins'][id]['hover']);
			obj.css({'fill':config_11['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_11['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_11['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_11['pins'][id]['overColor']});
			if(config_11['pins'][id]['target'] == 'new_window'){
				window.open(config_11['pins'][id]['url']);
			}else if(config_11['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_11['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.12 ======================================*/
$(function(){
	$('#afc-12').find('path').attr({'fill':config_12['default']['landColor']}).css({'stroke':config_12['default']['borderColor']});
	$('#afc-12').find('text').attr({'fill':config_12['default']['shortName']});
	var pins_len = config_12['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c12_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_12['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_12['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_12['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_12['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_12['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c12_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_12['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_12['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_12['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_12['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_12['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c12_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c12DynAddE(i);
			}
			else if(config_12['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_12['pins'][i]['pos_X']- config_12['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_12['pins'][i]['pos_Y']- config_12['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_12['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_12['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_12['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c12_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_12['pins'][i]['pos_X']- config_12['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_12['pins'][i]['pos_Y']- config_12['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_12['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_12['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_12['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_12['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c12_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c12DynAddE(i);
			}
		}
	}
});

function c12DynAddE(id){
	var obj = $('#c12_map_pins_'+id);

	if(config_12['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_12['pins'][id]['downColor']});
				$('#map-tip').show().html(config_12['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_12['pins'][id]['upColor']});
				if(config_12['pins'][id]['target'] == 'new_window'){
					window.open(config_12['pins'][id]['url']);
				}else if(config_12['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_12['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_12['pins'][id]['hover']);
			obj.css({'fill':config_12['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_12['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_12['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_12['pins'][id]['overColor']});
			if(config_12['pins'][id]['target'] == 'new_window'){
				window.open(config_12['pins'][id]['url']);
			}else if(config_12['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_12['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.13 ======================================*/
$(function(){
	$('#afc-13').find('path').attr({'fill':config_13['default']['landColor']}).css({'stroke':config_13['default']['borderColor']});
	$('#afc-13').find('text').attr({'fill':config_13['default']['shortName']});
	var pins_len = config_13['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c13_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_13['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_13['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_13['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_13['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_13['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c13_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_13['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_13['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_13['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_13['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_13['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c13_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c13DynAddE(i);
			}
			else if(config_13['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_13['pins'][i]['pos_X']- config_13['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_13['pins'][i]['pos_Y']- config_13['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_13['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_13['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_13['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c13_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_13['pins'][i]['pos_X']- config_13['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_13['pins'][i]['pos_Y']- config_13['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_13['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_13['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_13['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_13['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c13_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c13DynAddE(i);
			}
		}
	}
});

function c13DynAddE(id){
	var obj = $('#c13_map_pins_'+id);

	if(config_13['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_13['pins'][id]['downColor']});
				$('#map-tip').show().html(config_13['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_13['pins'][id]['upColor']});
				if(config_13['pins'][id]['target'] == 'new_window'){
					window.open(config_13['pins'][id]['url']);
				}else if(config_13['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_13['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_13['pins'][id]['hover']);
			obj.css({'fill':config_13['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_13['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_13['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_13['pins'][id]['overColor']});
			if(config_13['pins'][id]['target'] == 'new_window'){
				window.open(config_13['pins'][id]['url']);
			}else if(config_13['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_13['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.14 ======================================*/
$(function(){
	$('#afc-14').find('path').attr({'fill':config_14['default']['landColor']}).css({'stroke':config_14['default']['borderColor']});
	$('#afc-14').find('text').attr({'fill':config_14['default']['shortName']});
	var pins_len = config_14['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c14_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_14['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_14['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_14['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_14['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_14['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c14_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_14['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_14['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_14['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_14['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_14['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c14_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c14DynAddE(i);
			}
			else if(config_14['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_14['pins'][i]['pos_X']- config_14['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_14['pins'][i]['pos_Y']- config_14['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_14['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_14['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_14['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c14_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_14['pins'][i]['pos_X']- config_14['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_14['pins'][i]['pos_Y']- config_14['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_14['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_14['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_14['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_14['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c14_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c14DynAddE(i);
			}
		}
	}
});

function c14DynAddE(id){
	var obj = $('#c14_map_pins_'+id);

	if(config_14['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_14['pins'][id]['downColor']});
				$('#map-tip').show().html(config_14['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_14['pins'][id]['upColor']});
				if(config_14['pins'][id]['target'] == 'new_window'){
					window.open(config_14['pins'][id]['url']);
				}else if(config_14['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_14['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_14['pins'][id]['hover']);
			obj.css({'fill':config_14['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_14['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_14['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_14['pins'][id]['overColor']});
			if(config_14['pins'][id]['target'] == 'new_window'){
				window.open(config_14['pins'][id]['url']);
			}else if(config_14['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_14['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.15 ======================================*/
$(function(){
	$('#afc-15').find('path').attr({'fill':config_15['default']['landColor']}).css({'stroke':config_15['default']['borderColor']});
	$('#afc-15').find('text').attr({'fill':config_15['default']['shortName']});
	var pins_len = config_15['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c15_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_15['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_15['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_15['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_15['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_15['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c15_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_15['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_15['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_15['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_15['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_15['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c15_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c15DynAddE(i);
			}
			else if(config_15['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_15['pins'][i]['pos_X']- config_15['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_15['pins'][i]['pos_Y']- config_15['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_15['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_15['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_15['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c15_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_15['pins'][i]['pos_X']- config_15['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_15['pins'][i]['pos_Y']- config_15['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_15['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_15['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_15['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_15['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c15_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c15DynAddE(i);
			}
		}
	}
});

function c15DynAddE(id){
	var obj = $('#c15_map_pins_'+id);

	if(config_15['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_15['pins'][id]['downColor']});
				$('#map-tip').show().html(config_15['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_15['pins'][id]['upColor']});
				if(config_15['pins'][id]['target'] == 'new_window'){
					window.open(config_15['pins'][id]['url']);
				}else if(config_15['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_15['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_15['pins'][id]['hover']);
			obj.css({'fill':config_15['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_15['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_15['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_15['pins'][id]['overColor']});
			if(config_15['pins'][id]['target'] == 'new_window'){
				window.open(config_15['pins'][id]['url']);
			}else if(config_15['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_15['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.16 ======================================*/
$(function(){
	$('#afc-16').find('path').attr({'fill':config_16['default']['landColor']}).css({'stroke':config_16['default']['borderColor']});
	$('#afc-16').find('text').attr({'fill':config_16['default']['shortName']});
	var pins_len = config_16['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c16_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_16['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_16['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_16['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_16['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_16['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c16_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_16['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_16['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_16['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_16['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_16['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c16_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c16DynAddE(i);
			}
			else if(config_16['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_16['pins'][i]['pos_X']- config_16['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_16['pins'][i]['pos_Y']- config_16['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_16['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_16['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_16['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c16_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_16['pins'][i]['pos_X']- config_16['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_16['pins'][i]['pos_Y']- config_16['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_16['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_16['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_16['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_16['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c16_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c16DynAddE(i);
			}
		}
	}
});

function c16DynAddE(id){
	var obj = $('#c16_map_pins_'+id);

	if(config_16['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_16['pins'][id]['downColor']});
				$('#map-tip').show().html(config_16['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_16['pins'][id]['upColor']});
				if(config_16['pins'][id]['target'] == 'new_window'){
					window.open(config_16['pins'][id]['url']);
				}else if(config_16['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_16['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_16['pins'][id]['hover']);
			obj.css({'fill':config_16['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_16['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_16['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_16['pins'][id]['overColor']});
			if(config_16['pins'][id]['target'] == 'new_window'){
				window.open(config_16['pins'][id]['url']);
			}else if(config_16['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_16['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.17 ======================================*/
$(function(){
	$('#afc-17').find('path').attr({'fill':config_17['default']['landColor']}).css({'stroke':config_17['default']['borderColor']});
	$('#afc-17').find('text').attr({'fill':config_17['default']['shortName']});
	var pins_len = config_17['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c17_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_17['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_17['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_17['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_17['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_17['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c17_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_17['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_17['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_17['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_17['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_17['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c17_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c17DynAddE(i);
			}
			else if(config_17['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_17['pins'][i]['pos_X']- config_17['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_17['pins'][i]['pos_Y']- config_17['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_17['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_17['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_17['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c17_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_17['pins'][i]['pos_X']- config_17['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_17['pins'][i]['pos_Y']- config_17['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_17['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_17['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_17['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_17['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c17_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c17DynAddE(i);
			}
		}
	}
});

function c17DynAddE(id){
	var obj = $('#c17_map_pins_'+id);

	if(config_17['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_17['pins'][id]['downColor']});
				$('#map-tip').show().html(config_17['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_17['pins'][id]['upColor']});
				if(config_17['pins'][id]['target'] == 'new_window'){
					window.open(config_17['pins'][id]['url']);
				}else if(config_17['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_17['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_17['pins'][id]['hover']);
			obj.css({'fill':config_17['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_17['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_17['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_17['pins'][id]['overColor']});
			if(config_17['pins'][id]['target'] == 'new_window'){
				window.open(config_17['pins'][id]['url']);
			}else if(config_17['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_17['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.18 ======================================*/
$(function(){
	$('#afc-18').find('path').attr({'fill':config_18['default']['landColor']}).css({'stroke':config_18['default']['borderColor']});
	$('#afc-18').find('text').attr({'fill':config_18['default']['shortName']});
	var pins_len = config_18['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c18_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_18['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_18['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_18['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_18['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_18['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c18_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_18['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_18['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_18['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_18['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_18['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c18_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c18DynAddE(i);
			}
			else if(config_18['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_18['pins'][i]['pos_X']- config_18['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_18['pins'][i]['pos_Y']- config_18['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_18['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_18['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_18['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c18_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_18['pins'][i]['pos_X']- config_18['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_18['pins'][i]['pos_Y']- config_18['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_18['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_18['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_18['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_18['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c18_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c18DynAddE(i);
			}
		}
	}
});

function c18DynAddE(id){
	var obj = $('#c18_map_pins_'+id);

	if(config_18['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_18['pins'][id]['downColor']});
				$('#map-tip').show().html(config_18['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_18['pins'][id]['upColor']});
				if(config_18['pins'][id]['target'] == 'new_window'){
					window.open(config_18['pins'][id]['url']);
				}else if(config_18['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_18['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_18['pins'][id]['hover']);
			obj.css({'fill':config_18['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_18['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_18['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_18['pins'][id]['overColor']});
			if(config_18['pins'][id]['target'] == 'new_window'){
				window.open(config_18['pins'][id]['url']);
			}else if(config_18['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_18['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.19 ======================================*/
$(function(){
	$('#afc-19').find('path').attr({'fill':config_19['default']['landColor']}).css({'stroke':config_19['default']['borderColor']});
	$('#afc-19').find('text').attr({'fill':config_19['default']['shortName']});
	var pins_len = config_19['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c19_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_19['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_19['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_19['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_19['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_19['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c19_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_19['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_19['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_19['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_19['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_19['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c19_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c19DynAddE(i);
			}
			else if(config_19['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_19['pins'][i]['pos_X']- config_19['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_19['pins'][i]['pos_Y']- config_19['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_19['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_19['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_19['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c19_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_19['pins'][i]['pos_X']- config_19['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_19['pins'][i]['pos_Y']- config_19['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_19['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_19['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_19['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_19['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c19_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c19DynAddE(i);
			}
		}
	}
});

function c19DynAddE(id){
	var obj = $('#c19_map_pins_'+id);

	if(config_19['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_19['pins'][id]['downColor']});
				$('#map-tip').show().html(config_19['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_19['pins'][id]['upColor']});
				if(config_19['pins'][id]['target'] == 'new_window'){
					window.open(config_19['pins'][id]['url']);
				}else if(config_19['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_19['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_19['pins'][id]['hover']);
			obj.css({'fill':config_19['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_19['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_19['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_19['pins'][id]['overColor']});
			if(config_19['pins'][id]['target'] == 'new_window'){
				window.open(config_19['pins'][id]['url']);
			}else if(config_19['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_19['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.20 ======================================*/
$(function(){
	$('#afc-20').find('path').attr({'fill':config_20['default']['landColor']}).css({'stroke':config_20['default']['borderColor']});
	$('#afc-20').find('text').attr({'fill':config_20['default']['shortName']});
	var pins_len = config_20['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c20_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_20['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_20['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_20['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_20['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_20['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c20_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_20['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_20['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_20['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_20['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_20['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c20_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c20DynAddE(i);
			}
			else if(config_20['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_20['pins'][i]['pos_X']- config_20['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_20['pins'][i]['pos_Y']- config_20['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_20['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_20['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_20['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c20_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_20['pins'][i]['pos_X']- config_20['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_20['pins'][i]['pos_Y']- config_20['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_20['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_20['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_20['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_20['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c20_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c20DynAddE(i);
			}
		}
	}
});

function c20DynAddE(id){
	var obj = $('#c20_map_pins_'+id);

	if(config_20['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_20['pins'][id]['downColor']});
				$('#map-tip').show().html(config_20['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_20['pins'][id]['upColor']});
				if(config_20['pins'][id]['target'] == 'new_window'){
					window.open(config_20['pins'][id]['url']);
				}else if(config_20['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_20['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_20['pins'][id]['hover']);
			obj.css({'fill':config_20['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_20['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_20['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_20['pins'][id]['overColor']});
			if(config_20['pins'][id]['target'] == 'new_window'){
				window.open(config_20['pins'][id]['url']);
			}else if(config_20['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_20['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.21 ======================================*/
$(function(){
	$('#afc-21').find('path').attr({'fill':config_21['default']['landColor']}).css({'stroke':config_21['default']['borderColor']});
	$('#afc-21').find('text').attr({'fill':config_21['default']['shortName']});
	var pins_len = config_21['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c21_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_21['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_21['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_21['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_21['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_21['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c21_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_21['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_21['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_21['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_21['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_21['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c21_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c21DynAddE(i);
			}
			else if(config_21['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_21['pins'][i]['pos_X']- config_21['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_21['pins'][i]['pos_Y']- config_21['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_21['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_21['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_21['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c21_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_21['pins'][i]['pos_X']- config_21['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_21['pins'][i]['pos_Y']- config_21['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_21['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_21['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_21['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_21['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c21_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c21DynAddE(i);
			}
		}
	}
});

function c21DynAddE(id){
	var obj = $('#c21_map_pins_'+id);

	if(config_21['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_21['pins'][id]['downColor']});
				$('#map-tip').show().html(config_21['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_21['pins'][id]['upColor']});
				if(config_21['pins'][id]['target'] == 'new_window'){
					window.open(config_21['pins'][id]['url']);
				}else if(config_21['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_21['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_21['pins'][id]['hover']);
			obj.css({'fill':config_21['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_21['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_21['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_21['pins'][id]['overColor']});
			if(config_21['pins'][id]['target'] == 'new_window'){
				window.open(config_21['pins'][id]['url']);
			}else if(config_21['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_21['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.22 ======================================*/
$(function(){
	$('#afc-22').find('path').attr({'fill':config_22['default']['landColor']}).css({'stroke':config_22['default']['borderColor']});
	$('#afc-22').find('text').attr({'fill':config_22['default']['shortName']});
	var pins_len = config_22['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c22_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_22['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_22['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_22['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_22['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_22['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c22_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_22['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_22['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_22['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_22['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_22['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c22_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c22DynAddE(i);
			}
			else if(config_22['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_22['pins'][i]['pos_X']- config_22['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_22['pins'][i]['pos_Y']- config_22['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_22['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_22['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_22['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c22_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_22['pins'][i]['pos_X']- config_22['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_22['pins'][i]['pos_Y']- config_22['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_22['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_22['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_22['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_22['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c22_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c22DynAddE(i);
			}
		}
	}
});

function c22DynAddE(id){
	var obj = $('#c22_map_pins_'+id);

	if(config_22['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_22['pins'][id]['downColor']});
				$('#map-tip').show().html(config_22['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_22['pins'][id]['upColor']});
				if(config_22['pins'][id]['target'] == 'new_window'){
					window.open(config_22['pins'][id]['url']);
				}else if(config_22['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_22['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_22['pins'][id]['hover']);
			obj.css({'fill':config_22['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_22['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_22['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_22['pins'][id]['overColor']});
			if(config_22['pins'][id]['target'] == 'new_window'){
				window.open(config_22['pins'][id]['url']);
			}else if(config_22['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_22['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.23 ======================================*/
$(function(){
	$('#afc-23').find('path').attr({'fill':config_23['default']['landColor']}).css({'stroke':config_23['default']['borderColor']});
	$('#afc-23').find('text').attr({'fill':config_23['default']['shortName']});
	var pins_len = config_23['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c23_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_23['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_23['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_23['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_23['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_23['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c23_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_23['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_23['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_23['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_23['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_23['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c23_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c23DynAddE(i);
			}
			else if(config_23['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_23['pins'][i]['pos_X']- config_23['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_23['pins'][i]['pos_Y']- config_23['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_23['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_23['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_23['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c23_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_23['pins'][i]['pos_X']- config_23['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_23['pins'][i]['pos_Y']- config_23['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_23['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_23['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_23['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_23['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c23_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c23DynAddE(i);
			}
		}
	}
});

function c23DynAddE(id){
	var obj = $('#c23_map_pins_'+id);

	if(config_23['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_23['pins'][id]['downColor']});
				$('#map-tip').show().html(config_23['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_23['pins'][id]['upColor']});
				if(config_23['pins'][id]['target'] == 'new_window'){
					window.open(config_23['pins'][id]['url']);
				}else if(config_23['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_23['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_23['pins'][id]['hover']);
			obj.css({'fill':config_23['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_23['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_23['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_23['pins'][id]['overColor']});
			if(config_23['pins'][id]['target'] == 'new_window'){
				window.open(config_23['pins'][id]['url']);
			}else if(config_23['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_23['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.24 ======================================*/
$(function(){
	$('#afc-24').find('path').attr({'fill':config_24['default']['landColor']}).css({'stroke':config_24['default']['borderColor']});
	$('#afc-24').find('text').attr({'fill':config_24['default']['shortName']});
	var pins_len = config_24['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c24_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_24['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_24['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_24['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_24['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_24['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c24_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_24['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_24['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_24['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_24['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_24['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c24_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c24DynAddE(i);
			}
			else if(config_24['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_24['pins'][i]['pos_X']- config_24['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_24['pins'][i]['pos_Y']- config_24['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_24['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_24['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_24['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c24_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_24['pins'][i]['pos_X']- config_24['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_24['pins'][i]['pos_Y']- config_24['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_24['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_24['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_24['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_24['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c24_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c24DynAddE(i);
			}
		}
	}
});

function c24DynAddE(id){
	var obj = $('#c24_map_pins_'+id);

	if(config_24['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_24['pins'][id]['downColor']});
				$('#map-tip').show().html(config_24['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_24['pins'][id]['upColor']});
				if(config_24['pins'][id]['target'] == 'new_window'){
					window.open(config_24['pins'][id]['url']);
				}else if(config_24['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_24['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_24['pins'][id]['hover']);
			obj.css({'fill':config_24['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_24['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_24['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_24['pins'][id]['overColor']});
			if(config_24['pins'][id]['target'] == 'new_window'){
				window.open(config_24['pins'][id]['url']);
			}else if(config_24['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_24['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.25 ======================================*/
$(function(){
	$('#afc-25').find('path').attr({'fill':config_25['default']['landColor']}).css({'stroke':config_25['default']['borderColor']});
	$('#afc-25').find('text').attr({'fill':config_25['default']['shortName']});
	var pins_len = config_25['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c25_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_25['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_25['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_25['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_25['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_25['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c25_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_25['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_25['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_25['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_25['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_25['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c25_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c25DynAddE(i);
			}
			else if(config_25['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_25['pins'][i]['pos_X']- config_25['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_25['pins'][i]['pos_Y']- config_25['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_25['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_25['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_25['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c25_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_25['pins'][i]['pos_X']- config_25['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_25['pins'][i]['pos_Y']- config_25['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_25['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_25['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_25['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_25['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c25_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c25DynAddE(i);
			}
		}
	}
});

function c25DynAddE(id){
	var obj = $('#c25_map_pins_'+id);

	if(config_25['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_25['pins'][id]['downColor']});
				$('#map-tip').show().html(config_25['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_25['pins'][id]['upColor']});
				if(config_25['pins'][id]['target'] == 'new_window'){
					window.open(config_25['pins'][id]['url']);
				}else if(config_25['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_25['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_25['pins'][id]['hover']);
			obj.css({'fill':config_25['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_25['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_25['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_25['pins'][id]['overColor']});
			if(config_25['pins'][id]['target'] == 'new_window'){
				window.open(config_25['pins'][id]['url']);
			}else if(config_25['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_25['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.26 ======================================*/
$(function(){
	$('#afc-26').find('path').attr({'fill':config_26['default']['landColor']}).css({'stroke':config_26['default']['borderColor']});
	$('#afc-26').find('text').attr({'fill':config_26['default']['shortName']});
	var pins_len = config_26['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c26_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_26['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_26['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_26['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_26['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_26['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c26_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_26['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_26['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_26['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_26['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_26['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c26_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c26DynAddE(i);
			}
			else if(config_26['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_26['pins'][i]['pos_X']- config_26['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_26['pins'][i]['pos_Y']- config_26['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_26['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_26['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_26['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c26_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_26['pins'][i]['pos_X']- config_26['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_26['pins'][i]['pos_Y']- config_26['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_26['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_26['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_26['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_26['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c26_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c26DynAddE(i);
			}
		}
	}
});

function c26DynAddE(id){
	var obj = $('#c26_map_pins_'+id);

	if(config_26['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_26['pins'][id]['downColor']});
				$('#map-tip').show().html(config_26['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_26['pins'][id]['upColor']});
				if(config_26['pins'][id]['target'] == 'new_window'){
					window.open(config_26['pins'][id]['url']);
				}else if(config_26['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_26['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_26['pins'][id]['hover']);
			obj.css({'fill':config_26['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_26['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_26['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_26['pins'][id]['overColor']});
			if(config_26['pins'][id]['target'] == 'new_window'){
				window.open(config_26['pins'][id]['url']);
			}else if(config_26['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_26['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.27 ======================================*/
$(function(){
	$('#afc-27').find('path').attr({'fill':config_27['default']['landColor']}).css({'stroke':config_27['default']['borderColor']});
	$('#afc-27').find('text').attr({'fill':config_27['default']['shortName']});
	var pins_len = config_27['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c27_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_27['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_27['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_27['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_27['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_27['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c27_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_27['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_27['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_27['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_27['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_27['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c27_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c27DynAddE(i);
			}
			else if(config_27['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_27['pins'][i]['pos_X']- config_27['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_27['pins'][i]['pos_Y']- config_27['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_27['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_27['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_27['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c27_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_27['pins'][i]['pos_X']- config_27['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_27['pins'][i]['pos_Y']- config_27['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_27['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_27['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_27['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_27['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c27_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c27DynAddE(i);
			}
		}
	}
});

function c27DynAddE(id){
	var obj = $('#c27_map_pins_'+id);

	if(config_27['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_27['pins'][id]['downColor']});
				$('#map-tip').show().html(config_27['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_27['pins'][id]['upColor']});
				if(config_27['pins'][id]['target'] == 'new_window'){
					window.open(config_27['pins'][id]['url']);
				}else if(config_27['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_27['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_27['pins'][id]['hover']);
			obj.css({'fill':config_27['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_27['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_27['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_27['pins'][id]['overColor']});
			if(config_27['pins'][id]['target'] == 'new_window'){
				window.open(config_27['pins'][id]['url']);
			}else if(config_27['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_27['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.28 ======================================*/
$(function(){
	$('#afc-28').find('path').attr({'fill':config_28['default']['landColor']}).css({'stroke':config_28['default']['borderColor']});
	$('#afc-28').find('text').attr({'fill':config_28['default']['shortName']});
	var pins_len = config_28['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c28_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_28['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_28['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_28['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_28['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_28['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c28_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_28['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_28['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_28['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_28['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_28['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c28_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c28DynAddE(i);
			}
			else if(config_28['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_28['pins'][i]['pos_X']- config_28['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_28['pins'][i]['pos_Y']- config_28['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_28['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_28['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_28['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c28_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_28['pins'][i]['pos_X']- config_28['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_28['pins'][i]['pos_Y']- config_28['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_28['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_28['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_28['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_28['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c28_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c28DynAddE(i);
			}
		}
	}
});

function c28DynAddE(id){
	var obj = $('#c28_map_pins_'+id);

	if(config_28['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_28['pins'][id]['downColor']});
				$('#map-tip').show().html(config_28['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_28['pins'][id]['upColor']});
				if(config_28['pins'][id]['target'] == 'new_window'){
					window.open(config_28['pins'][id]['url']);
				}else if(config_28['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_28['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_28['pins'][id]['hover']);
			obj.css({'fill':config_28['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_28['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_28['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_28['pins'][id]['overColor']});
			if(config_28['pins'][id]['target'] == 'new_window'){
				window.open(config_28['pins'][id]['url']);
			}else if(config_28['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_28['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.29 ======================================*/
$(function(){
	$('#afc-29').find('path').attr({'fill':config_29['default']['landColor']}).css({'stroke':config_29['default']['borderColor']});
	$('#afc-29').find('text').attr({'fill':config_29['default']['shortName']});
	var pins_len = config_29['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c29_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_29['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_29['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_29['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_29['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_29['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c29_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_29['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_29['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_29['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_29['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_29['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c29_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c29DynAddE(i);
			}
			else if(config_29['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_29['pins'][i]['pos_X']- config_29['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_29['pins'][i]['pos_Y']- config_29['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_29['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_29['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_29['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c29_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_29['pins'][i]['pos_X']- config_29['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_29['pins'][i]['pos_Y']- config_29['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_29['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_29['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_29['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_29['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c29_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c29DynAddE(i);
			}
		}
	}
});

function c29DynAddE(id){
	var obj = $('#c29_map_pins_'+id);

	if(config_29['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_29['pins'][id]['downColor']});
				$('#map-tip').show().html(config_29['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_29['pins'][id]['upColor']});
				if(config_29['pins'][id]['target'] == 'new_window'){
					window.open(config_29['pins'][id]['url']);
				}else if(config_29['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_29['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_29['pins'][id]['hover']);
			obj.css({'fill':config_29['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_29['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_29['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_29['pins'][id]['overColor']});
			if(config_29['pins'][id]['target'] == 'new_window'){
				window.open(config_29['pins'][id]['url']);
			}else if(config_29['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_29['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.30 ======================================*/
$(function(){
	$('#afc-30').find('path').attr({'fill':config_30['default']['landColor']}).css({'stroke':config_30['default']['borderColor']});
	$('#afc-30').find('text').attr({'fill':config_30['default']['shortName']});
	var pins_len = config_30['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c30_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_30['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_30['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_30['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_30['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_30['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c30_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_30['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_30['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_30['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_30['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_30['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c30_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c30DynAddE(i);
			}
			else if(config_30['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_30['pins'][i]['pos_X']- config_30['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_30['pins'][i]['pos_Y']- config_30['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_30['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_30['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_30['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c30_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_30['pins'][i]['pos_X']- config_30['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_30['pins'][i]['pos_Y']- config_30['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_30['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_30['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_30['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_30['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c30_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c30DynAddE(i);
			}
		}
	}
});

function c30DynAddE(id){
	var obj = $('#c30_map_pins_'+id);

	if(config_30['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_30['pins'][id]['downColor']});
				$('#map-tip').show().html(config_30['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_30['pins'][id]['upColor']});
				if(config_30['pins'][id]['target'] == 'new_window'){
					window.open(config_30['pins'][id]['url']);
				}else if(config_30['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_30['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_30['pins'][id]['hover']);
			obj.css({'fill':config_30['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_30['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_30['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_30['pins'][id]['overColor']});
			if(config_30['pins'][id]['target'] == 'new_window'){
				window.open(config_30['pins'][id]['url']);
			}else if(config_30['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_30['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.31 ======================================*/
$(function(){
	$('#afc-31').find('path').attr({'fill':config_31['default']['landColor']}).css({'stroke':config_31['default']['borderColor']});
	$('#afc-31').find('text').attr({'fill':config_31['default']['shortName']});
	var pins_len = config_31['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c31_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_31['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_31['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_31['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_31['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_31['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c31_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_31['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_31['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_31['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_31['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_31['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c31_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c31DynAddE(i);
			}
			else if(config_31['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_31['pins'][i]['pos_X']- config_31['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_31['pins'][i]['pos_Y']- config_31['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_31['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_31['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_31['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c31_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_31['pins'][i]['pos_X']- config_31['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_31['pins'][i]['pos_Y']- config_31['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_31['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_31['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_31['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_31['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c31_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c31DynAddE(i);
			}
		}
	}
});

function c31DynAddE(id){
	var obj = $('#c31_map_pins_'+id);

	if(config_31['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_31['pins'][id]['downColor']});
				$('#map-tip').show().html(config_31['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_31['pins'][id]['upColor']});
				if(config_31['pins'][id]['target'] == 'new_window'){
					window.open(config_31['pins'][id]['url']);
				}else if(config_31['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_31['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_31['pins'][id]['hover']);
			obj.css({'fill':config_31['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_31['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_31['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_31['pins'][id]['overColor']});
			if(config_31['pins'][id]['target'] == 'new_window'){
				window.open(config_31['pins'][id]['url']);
			}else if(config_31['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_31['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.32 ======================================*/
$(function(){
	$('#afc-32').find('path').attr({'fill':config_32['default']['landColor']}).css({'stroke':config_32['default']['borderColor']});
	$('#afc-32').find('text').attr({'fill':config_32['default']['shortName']});
	var pins_len = config_32['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c32_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_32['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_32['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_32['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_32['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_32['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c32_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_32['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_32['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_32['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_32['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_32['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c32_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c32DynAddE(i);
			}
			else if(config_32['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_32['pins'][i]['pos_X']- config_32['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_32['pins'][i]['pos_Y']- config_32['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_32['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_32['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_32['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c32_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_32['pins'][i]['pos_X']- config_32['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_32['pins'][i]['pos_Y']- config_32['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_32['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_32['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_32['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_32['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c32_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c32DynAddE(i);
			}
		}
	}
});

function c32DynAddE(id){
	var obj = $('#c32_map_pins_'+id);

	if(config_32['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_32['pins'][id]['downColor']});
				$('#map-tip').show().html(config_32['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_32['pins'][id]['upColor']});
				if(config_32['pins'][id]['target'] == 'new_window'){
					window.open(config_32['pins'][id]['url']);
				}else if(config_32['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_32['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_32['pins'][id]['hover']);
			obj.css({'fill':config_32['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_32['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_32['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_32['pins'][id]['overColor']});
			if(config_32['pins'][id]['target'] == 'new_window'){
				window.open(config_32['pins'][id]['url']);
			}else if(config_32['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_32['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.33 ======================================*/
$(function(){
	$('#afc-33').find('path').attr({'fill':config_33['default']['landColor']}).css({'stroke':config_33['default']['borderColor']});
	$('#afc-33').find('text').attr({'fill':config_33['default']['shortName']});
	var pins_len = config_33['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c33_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_33['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_33['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_33['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_33['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_33['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c33_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_33['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_33['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_33['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_33['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_33['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c33_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c33DynAddE(i);
			}
			else if(config_33['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_33['pins'][i]['pos_X']- config_33['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_33['pins'][i]['pos_Y']- config_33['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_33['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_33['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_33['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c33_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_33['pins'][i]['pos_X']- config_33['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_33['pins'][i]['pos_Y']- config_33['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_33['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_33['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_33['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_33['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c33_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c33DynAddE(i);
			}
		}
	}
});

function c33DynAddE(id){
	var obj = $('#c33_map_pins_'+id);

	if(config_33['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_33['pins'][id]['downColor']});
				$('#map-tip').show().html(config_33['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_33['pins'][id]['upColor']});
				if(config_33['pins'][id]['target'] == 'new_window'){
					window.open(config_33['pins'][id]['url']);
				}else if(config_33['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_33['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_33['pins'][id]['hover']);
			obj.css({'fill':config_33['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_33['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_33['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_33['pins'][id]['overColor']});
			if(config_33['pins'][id]['target'] == 'new_window'){
				window.open(config_33['pins'][id]['url']);
			}else if(config_33['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_33['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.34 ======================================*/
$(function(){
	$('#afc-34').find('path').attr({'fill':config_34['default']['landColor']}).css({'stroke':config_34['default']['borderColor']});
	$('#afc-34').find('text').attr({'fill':config_34['default']['shortName']});
	var pins_len = config_34['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c34_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_34['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_34['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_34['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_34['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_34['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c34_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_34['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_34['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_34['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_34['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_34['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c34_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c34DynAddE(i);
			}
			else if(config_34['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_34['pins'][i]['pos_X']- config_34['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_34['pins'][i]['pos_Y']- config_34['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_34['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_34['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_34['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c34_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_34['pins'][i]['pos_X']- config_34['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_34['pins'][i]['pos_Y']- config_34['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_34['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_34['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_34['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_34['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c34_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c34DynAddE(i);
			}
		}
	}
});

function c34DynAddE(id){
	var obj = $('#c34_map_pins_'+id);

	if(config_34['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_34['pins'][id]['downColor']});
				$('#map-tip').show().html(config_34['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_34['pins'][id]['upColor']});
				if(config_34['pins'][id]['target'] == 'new_window'){
					window.open(config_34['pins'][id]['url']);
				}else if(config_34['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_34['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_34['pins'][id]['hover']);
			obj.css({'fill':config_34['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_34['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_34['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_34['pins'][id]['overColor']});
			if(config_34['pins'][id]['target'] == 'new_window'){
				window.open(config_34['pins'][id]['url']);
			}else if(config_34['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_34['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.35 ======================================*/
$(function(){
	$('#afc-35').find('path').attr({'fill':config_35['default']['landColor']}).css({'stroke':config_35['default']['borderColor']});
	$('#afc-35').find('text').attr({'fill':config_35['default']['shortName']});
	var pins_len = config_35['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c35_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_35['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_35['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_35['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_35['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_35['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c35_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_35['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_35['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_35['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_35['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_35['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c35_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c35DynAddE(i);
			}
			else if(config_35['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_35['pins'][i]['pos_X']- config_35['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_35['pins'][i]['pos_Y']- config_35['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_35['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_35['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_35['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c35_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_35['pins'][i]['pos_X']- config_35['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_35['pins'][i]['pos_Y']- config_35['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_35['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_35['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_35['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_35['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c35_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c35DynAddE(i);
			}
		}
	}
});

function c35DynAddE(id){
	var obj = $('#c35_map_pins_'+id);

	if(config_35['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_35['pins'][id]['downColor']});
				$('#map-tip').show().html(config_35['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_35['pins'][id]['upColor']});
				if(config_35['pins'][id]['target'] == 'new_window'){
					window.open(config_35['pins'][id]['url']);
				}else if(config_35['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_35['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_35['pins'][id]['hover']);
			obj.css({'fill':config_35['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_35['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_35['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_35['pins'][id]['overColor']});
			if(config_35['pins'][id]['target'] == 'new_window'){
				window.open(config_35['pins'][id]['url']);
			}else if(config_35['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_35['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.36 ======================================*/
$(function(){
	$('#afc-36').find('path').attr({'fill':config_36['default']['landColor']}).css({'stroke':config_36['default']['borderColor']});
	$('#afc-36').find('text').attr({'fill':config_36['default']['shortName']});
	var pins_len = config_36['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c36_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_36['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_36['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_36['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_36['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_36['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c36_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_36['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_36['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_36['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_36['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_36['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c36_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c36DynAddE(i);
			}
			else if(config_36['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_36['pins'][i]['pos_X']- config_36['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_36['pins'][i]['pos_Y']- config_36['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_36['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_36['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_36['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c36_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_36['pins'][i]['pos_X']- config_36['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_36['pins'][i]['pos_Y']- config_36['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_36['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_36['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_36['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_36['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c36_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c36DynAddE(i);
			}
		}
	}
});

function c36DynAddE(id){
	var obj = $('#c36_map_pins_'+id);

	if(config_36['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_36['pins'][id]['downColor']});
				$('#map-tip').show().html(config_36['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_36['pins'][id]['upColor']});
				if(config_36['pins'][id]['target'] == 'new_window'){
					window.open(config_36['pins'][id]['url']);
				}else if(config_36['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_36['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_36['pins'][id]['hover']);
			obj.css({'fill':config_36['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_36['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_36['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_36['pins'][id]['overColor']});
			if(config_36['pins'][id]['target'] == 'new_window'){
				window.open(config_36['pins'][id]['url']);
			}else if(config_36['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_36['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.37 ======================================*/
$(function(){
	$('#afc-37').find('path').attr({'fill':config_37['default']['landColor']}).css({'stroke':config_37['default']['borderColor']});
	$('#afc-37').find('text').attr({'fill':config_37['default']['shortName']});
	var pins_len = config_37['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c37_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_37['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_37['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_37['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_37['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_37['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c37_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_37['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_37['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_37['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_37['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_37['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c37_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c37DynAddE(i);
			}
			else if(config_37['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_37['pins'][i]['pos_X']- config_37['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_37['pins'][i]['pos_Y']- config_37['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_37['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_37['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_37['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c37_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_37['pins'][i]['pos_X']- config_37['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_37['pins'][i]['pos_Y']- config_37['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_37['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_37['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_37['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_37['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c37_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c37DynAddE(i);
			}
		}
	}
});

function c37DynAddE(id){
	var obj = $('#c37_map_pins_'+id);

	if(config_37['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_37['pins'][id]['downColor']});
				$('#map-tip').show().html(config_37['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_37['pins'][id]['upColor']});
				if(config_37['pins'][id]['target'] == 'new_window'){
					window.open(config_37['pins'][id]['url']);
				}else if(config_37['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_37['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_37['pins'][id]['hover']);
			obj.css({'fill':config_37['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_37['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_37['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_37['pins'][id]['overColor']});
			if(config_37['pins'][id]['target'] == 'new_window'){
				window.open(config_37['pins'][id]['url']);
			}else if(config_37['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_37['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.38 ======================================*/
$(function(){
	$('#afc-38').find('path').attr({'fill':config_38['default']['landColor']}).css({'stroke':config_38['default']['borderColor']});
	$('#afc-38').find('text').attr({'fill':config_38['default']['shortName']});
	var pins_len = config_38['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c38_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_38['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_38['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_38['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_38['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_38['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c38_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_38['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_38['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_38['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_38['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_38['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c38_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c38DynAddE(i);
			}
			else if(config_38['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_38['pins'][i]['pos_X']- config_38['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_38['pins'][i]['pos_Y']- config_38['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_38['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_38['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_38['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c38_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_38['pins'][i]['pos_X']- config_38['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_38['pins'][i]['pos_Y']- config_38['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_38['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_38['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_38['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_38['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c38_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c38DynAddE(i);
			}
		}
	}
});

function c38DynAddE(id){
	var obj = $('#c38_map_pins_'+id);

	if(config_38['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_38['pins'][id]['downColor']});
				$('#map-tip').show().html(config_38['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_38['pins'][id]['upColor']});
				if(config_38['pins'][id]['target'] == 'new_window'){
					window.open(config_38['pins'][id]['url']);
				}else if(config_38['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_38['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_38['pins'][id]['hover']);
			obj.css({'fill':config_38['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_38['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_38['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_38['pins'][id]['overColor']});
			if(config_38['pins'][id]['target'] == 'new_window'){
				window.open(config_38['pins'][id]['url']);
			}else if(config_38['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_38['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.39 ======================================*/
$(function(){
	$('#afc-39').find('path').attr({'fill':config_39['default']['landColor']}).css({'stroke':config_39['default']['borderColor']});
	$('#afc-39').find('text').attr({'fill':config_39['default']['shortName']});
	var pins_len = config_39['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c39_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_39['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_39['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_39['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_39['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_39['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c39_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_39['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_39['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_39['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_39['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_39['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c39_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c39DynAddE(i);
			}
			else if(config_39['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_39['pins'][i]['pos_X']- config_39['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_39['pins'][i]['pos_Y']- config_39['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_39['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_39['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_39['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c39_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_39['pins'][i]['pos_X']- config_39['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_39['pins'][i]['pos_Y']- config_39['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_39['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_39['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_39['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_39['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c39_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c39DynAddE(i);
			}
		}
	}
});

function c39DynAddE(id){
	var obj = $('#c39_map_pins_'+id);

	if(config_39['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_39['pins'][id]['downColor']});
				$('#map-tip').show().html(config_39['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_39['pins'][id]['upColor']});
				if(config_39['pins'][id]['target'] == 'new_window'){
					window.open(config_39['pins'][id]['url']);
				}else if(config_39['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_39['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_39['pins'][id]['hover']);
			obj.css({'fill':config_39['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_39['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_39['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_39['pins'][id]['overColor']});
			if(config_39['pins'][id]['target'] == 'new_window'){
				window.open(config_39['pins'][id]['url']);
			}else if(config_39['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_39['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.40 ======================================*/
$(function(){
	$('#afc-40').find('path').attr({'fill':config_40['default']['landColor']}).css({'stroke':config_40['default']['borderColor']});
	$('#afc-40').find('text').attr({'fill':config_40['default']['shortName']});
	var pins_len = config_40['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c40_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_40['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_40['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_40['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_40['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_40['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c40_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_40['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_40['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_40['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_40['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_40['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c40_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c40DynAddE(i);
			}
			else if(config_40['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_40['pins'][i]['pos_X']- config_40['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_40['pins'][i]['pos_Y']- config_40['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_40['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_40['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_40['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c40_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_40['pins'][i]['pos_X']- config_40['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_40['pins'][i]['pos_Y']- config_40['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_40['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_40['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_40['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_40['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c40_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c40DynAddE(i);
			}
		}
	}
});

function c40DynAddE(id){
	var obj = $('#c40_map_pins_'+id);

	if(config_40['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_40['pins'][id]['downColor']});
				$('#map-tip').show().html(config_40['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_40['pins'][id]['upColor']});
				if(config_40['pins'][id]['target'] == 'new_window'){
					window.open(config_40['pins'][id]['url']);
				}else if(config_40['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_40['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_40['pins'][id]['hover']);
			obj.css({'fill':config_40['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_40['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_40['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_40['pins'][id]['overColor']});
			if(config_40['pins'][id]['target'] == 'new_window'){
				window.open(config_40['pins'][id]['url']);
			}else if(config_40['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_40['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.41 ======================================*/
$(function(){
	$('#afc-41').find('path').attr({'fill':config_41['default']['landColor']}).css({'stroke':config_41['default']['borderColor']});
	$('#afc-41').find('text').attr({'fill':config_41['default']['shortName']});
	var pins_len = config_41['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c41_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_41['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_41['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_41['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_41['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_41['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c41_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_41['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_41['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_41['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_41['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_41['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c41_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c41DynAddE(i);
			}
			else if(config_41['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_41['pins'][i]['pos_X']- config_41['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_41['pins'][i]['pos_Y']- config_41['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_41['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_41['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_41['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c41_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_41['pins'][i]['pos_X']- config_41['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_41['pins'][i]['pos_Y']- config_41['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_41['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_41['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_41['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_41['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c41_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c41DynAddE(i);
			}
		}
	}
});

function c41DynAddE(id){
	var obj = $('#c41_map_pins_'+id);

	if(config_41['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_41['pins'][id]['downColor']});
				$('#map-tip').show().html(config_41['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_41['pins'][id]['upColor']});
				if(config_41['pins'][id]['target'] == 'new_window'){
					window.open(config_41['pins'][id]['url']);
				}else if(config_41['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_41['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_41['pins'][id]['hover']);
			obj.css({'fill':config_41['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_41['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_41['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_41['pins'][id]['overColor']});
			if(config_41['pins'][id]['target'] == 'new_window'){
				window.open(config_41['pins'][id]['url']);
			}else if(config_41['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_41['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.42 ======================================*/
$(function(){
	$('#afc-42').find('path').attr({'fill':config_42['default']['landColor']}).css({'stroke':config_42['default']['borderColor']});
	$('#afc-42').find('text').attr({'fill':config_42['default']['shortName']});
	var pins_len = config_42['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c42_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_42['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_42['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_42['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_42['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_42['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c42_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_42['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_42['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_42['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_42['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_42['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c42_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c42DynAddE(i);
			}
			else if(config_42['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_42['pins'][i]['pos_X']- config_42['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_42['pins'][i]['pos_Y']- config_42['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_42['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_42['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_42['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c42_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_42['pins'][i]['pos_X']- config_42['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_42['pins'][i]['pos_Y']- config_42['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_42['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_42['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_42['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_42['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c42_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c42DynAddE(i);
			}
		}
	}
});

function c42DynAddE(id){
	var obj = $('#c42_map_pins_'+id);

	if(config_42['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_42['pins'][id]['downColor']});
				$('#map-tip').show().html(config_42['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_42['pins'][id]['upColor']});
				if(config_42['pins'][id]['target'] == 'new_window'){
					window.open(config_42['pins'][id]['url']);
				}else if(config_42['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_42['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_42['pins'][id]['hover']);
			obj.css({'fill':config_42['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_42['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_42['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_42['pins'][id]['overColor']});
			if(config_42['pins'][id]['target'] == 'new_window'){
				window.open(config_42['pins'][id]['url']);
			}else if(config_42['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_42['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.43 ======================================*/
$(function(){
	$('#afc-43').find('path').attr({'fill':config_43['default']['landColor']}).css({'stroke':config_43['default']['borderColor']});
	$('#afc-43').find('text').attr({'fill':config_43['default']['shortName']});
	var pins_len = config_43['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c43_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_43['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_43['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_43['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_43['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_43['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c43_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_43['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_43['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_43['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_43['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_43['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c43_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c43DynAddE(i);
			}
			else if(config_43['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_43['pins'][i]['pos_X']- config_43['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_43['pins'][i]['pos_Y']- config_43['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_43['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_43['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_43['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c43_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_43['pins'][i]['pos_X']- config_43['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_43['pins'][i]['pos_Y']- config_43['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_43['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_43['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_43['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_43['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c43_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c43DynAddE(i);
			}
		}
	}
});

function c43DynAddE(id){
	var obj = $('#c43_map_pins_'+id);

	if(config_43['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_43['pins'][id]['downColor']});
				$('#map-tip').show().html(config_43['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_43['pins'][id]['upColor']});
				if(config_43['pins'][id]['target'] == 'new_window'){
					window.open(config_43['pins'][id]['url']);
				}else if(config_43['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_43['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_43['pins'][id]['hover']);
			obj.css({'fill':config_43['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_43['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_43['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_43['pins'][id]['overColor']});
			if(config_43['pins'][id]['target'] == 'new_window'){
				window.open(config_43['pins'][id]['url']);
			}else if(config_43['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_43['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.44 ======================================*/
$(function(){
	$('#afc-44').find('path').attr({'fill':config_44['default']['landColor']}).css({'stroke':config_44['default']['borderColor']});
	$('#afc-44').find('text').attr({'fill':config_44['default']['shortName']});
	var pins_len = config_44['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c44_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_44['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_44['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_44['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_44['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_44['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c44_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_44['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_44['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_44['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_44['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_44['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c44_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c44DynAddE(i);
			}
			else if(config_44['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_44['pins'][i]['pos_X']- config_44['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_44['pins'][i]['pos_Y']- config_44['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_44['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_44['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_44['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c44_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_44['pins'][i]['pos_X']- config_44['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_44['pins'][i]['pos_Y']- config_44['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_44['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_44['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_44['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_44['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c44_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c44DynAddE(i);
			}
		}
	}
});

function c44DynAddE(id){
	var obj = $('#c44_map_pins_'+id);

	if(config_44['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_44['pins'][id]['downColor']});
				$('#map-tip').show().html(config_44['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_44['pins'][id]['upColor']});
				if(config_44['pins'][id]['target'] == 'new_window'){
					window.open(config_44['pins'][id]['url']);
				}else if(config_44['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_44['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_44['pins'][id]['hover']);
			obj.css({'fill':config_44['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_44['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_44['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_44['pins'][id]['overColor']});
			if(config_44['pins'][id]['target'] == 'new_window'){
				window.open(config_44['pins'][id]['url']);
			}else if(config_44['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_44['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.45 ======================================*/
$(function(){
	$('#afc-45').find('path').attr({'fill':config_45['default']['landColor']}).css({'stroke':config_45['default']['borderColor']});
	$('#afc-45').find('text').attr({'fill':config_45['default']['shortName']});
	var pins_len = config_45['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c45_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_45['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_45['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_45['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_45['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_45['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c45_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_45['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_45['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_45['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_45['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_45['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c45_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c45DynAddE(i);
			}
			else if(config_45['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_45['pins'][i]['pos_X']- config_45['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_45['pins'][i]['pos_Y']- config_45['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_45['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_45['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_45['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c45_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_45['pins'][i]['pos_X']- config_45['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_45['pins'][i]['pos_Y']- config_45['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_45['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_45['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_45['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_45['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c45_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c45DynAddE(i);
			}
		}
	}
});

function c45DynAddE(id){
	var obj = $('#c45_map_pins_'+id);

	if(config_45['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_45['pins'][id]['downColor']});
				$('#map-tip').show().html(config_45['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_45['pins'][id]['upColor']});
				if(config_45['pins'][id]['target'] == 'new_window'){
					window.open(config_45['pins'][id]['url']);
				}else if(config_45['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_45['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_45['pins'][id]['hover']);
			obj.css({'fill':config_45['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_45['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_45['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_45['pins'][id]['overColor']});
			if(config_45['pins'][id]['target'] == 'new_window'){
				window.open(config_45['pins'][id]['url']);
			}else if(config_45['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_45['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.46 ======================================*/
$(function(){
	$('#afc-46').find('path').attr({'fill':config_46['default']['landColor']}).css({'stroke':config_46['default']['borderColor']});
	$('#afc-46').find('text').attr({'fill':config_46['default']['shortName']});
	var pins_len = config_46['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c46_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_46['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_46['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_46['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_46['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_46['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c46_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_46['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_46['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_46['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_46['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_46['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c46_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c46DynAddE(i);
			}
			else if(config_46['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_46['pins'][i]['pos_X']- config_46['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_46['pins'][i]['pos_Y']- config_46['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_46['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_46['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_46['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c46_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_46['pins'][i]['pos_X']- config_46['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_46['pins'][i]['pos_Y']- config_46['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_46['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_46['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_46['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_46['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c46_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c46DynAddE(i);
			}
		}
	}
});

function c46DynAddE(id){
	var obj = $('#c46_map_pins_'+id);

	if(config_46['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_46['pins'][id]['downColor']});
				$('#map-tip').show().html(config_46['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_46['pins'][id]['upColor']});
				if(config_46['pins'][id]['target'] == 'new_window'){
					window.open(config_46['pins'][id]['url']);
				}else if(config_46['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_46['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_46['pins'][id]['hover']);
			obj.css({'fill':config_46['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_46['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_46['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_46['pins'][id]['overColor']});
			if(config_46['pins'][id]['target'] == 'new_window'){
				window.open(config_46['pins'][id]['url']);
			}else if(config_46['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_46['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.47 ======================================*/
$(function(){
	$('#afc-47').find('path').attr({'fill':config_47['default']['landColor']}).css({'stroke':config_47['default']['borderColor']});
	$('#afc-47').find('text').attr({'fill':config_47['default']['shortName']});
	var pins_len = config_47['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c47_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_47['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_47['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_47['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_47['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_47['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c47_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_47['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_47['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_47['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_47['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_47['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c47_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c47DynAddE(i);
			}
			else if(config_47['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_47['pins'][i]['pos_X']- config_47['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_47['pins'][i]['pos_Y']- config_47['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_47['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_47['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_47['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c47_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_47['pins'][i]['pos_X']- config_47['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_47['pins'][i]['pos_Y']- config_47['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_47['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_47['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_47['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_47['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c47_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c47DynAddE(i);
			}
		}
	}
});

function c47DynAddE(id){
	var obj = $('#c47_map_pins_'+id);

	if(config_47['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_47['pins'][id]['downColor']});
				$('#map-tip').show().html(config_47['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_47['pins'][id]['upColor']});
				if(config_47['pins'][id]['target'] == 'new_window'){
					window.open(config_47['pins'][id]['url']);
				}else if(config_47['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_47['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_47['pins'][id]['hover']);
			obj.css({'fill':config_47['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_47['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_47['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_47['pins'][id]['overColor']});
			if(config_47['pins'][id]['target'] == 'new_window'){
				window.open(config_47['pins'][id]['url']);
			}else if(config_47['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_47['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.48 ======================================*/
$(function(){
	$('#afc-48').find('path').attr({'fill':config_48['default']['landColor']}).css({'stroke':config_48['default']['borderColor']});
	$('#afc-48').find('text').attr({'fill':config_48['default']['shortName']});
	var pins_len = config_48['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c48_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_48['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_48['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_48['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_48['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_48['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c48_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_48['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_48['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_48['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_48['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_48['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c48_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c48DynAddE(i);
			}
			else if(config_48['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_48['pins'][i]['pos_X']- config_48['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_48['pins'][i]['pos_Y']- config_48['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_48['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_48['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_48['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c48_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_48['pins'][i]['pos_X']- config_48['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_48['pins'][i]['pos_Y']- config_48['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_48['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_48['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_48['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_48['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c48_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c48DynAddE(i);
			}
		}
	}
});

function c48DynAddE(id){
	var obj = $('#c48_map_pins_'+id);

	if(config_48['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_48['pins'][id]['downColor']});
				$('#map-tip').show().html(config_48['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_48['pins'][id]['upColor']});
				if(config_48['pins'][id]['target'] == 'new_window'){
					window.open(config_48['pins'][id]['url']);
				}else if(config_48['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_48['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_48['pins'][id]['hover']);
			obj.css({'fill':config_48['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_48['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_48['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_48['pins'][id]['overColor']});
			if(config_48['pins'][id]['target'] == 'new_window'){
				window.open(config_48['pins'][id]['url']);
			}else if(config_48['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_48['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.49 ======================================*/
$(function(){
	$('#afc-49').find('path').attr({'fill':config_49['default']['landColor']}).css({'stroke':config_49['default']['borderColor']});
	$('#afc-49').find('text').attr({'fill':config_49['default']['shortName']});
	var pins_len = config_49['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c49_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_49['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_49['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_49['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_49['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_49['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c49_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_49['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_49['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_49['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_49['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_49['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c49_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c49DynAddE(i);
			}
			else if(config_49['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_49['pins'][i]['pos_X']- config_49['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_49['pins'][i]['pos_Y']- config_49['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_49['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_49['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_49['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c49_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_49['pins'][i]['pos_X']- config_49['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_49['pins'][i]['pos_Y']- config_49['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_49['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_49['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_49['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_49['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c49_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c49DynAddE(i);
			}
		}
	}
});

function c49DynAddE(id){
	var obj = $('#c49_map_pins_'+id);

	if(config_49['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_49['pins'][id]['downColor']});
				$('#map-tip').show().html(config_49['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_49['pins'][id]['upColor']});
				if(config_49['pins'][id]['target'] == 'new_window'){
					window.open(config_49['pins'][id]['url']);
				}else if(config_49['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_49['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_49['pins'][id]['hover']);
			obj.css({'fill':config_49['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_49['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_49['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_49['pins'][id]['overColor']});
			if(config_49['pins'][id]['target'] == 'new_window'){
				window.open(config_49['pins'][id]['url']);
			}else if(config_49['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_49['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.50 ======================================*/
$(function(){
	$('#afc-50').find('path').attr({'fill':config_50['default']['landColor']}).css({'stroke':config_50['default']['borderColor']});
	$('#afc-50').find('text').attr({'fill':config_50['default']['shortName']});
	var pins_len = config_50['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c50_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_50['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_50['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_50['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_50['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_50['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c50_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_50['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_50['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_50['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_50['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_50['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c50_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c50DynAddE(i);
			}
			else if(config_50['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_50['pins'][i]['pos_X']- config_50['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_50['pins'][i]['pos_Y']- config_50['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_50['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_50['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_50['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c50_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_50['pins'][i]['pos_X']- config_50['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_50['pins'][i]['pos_Y']- config_50['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_50['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_50['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_50['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_50['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c50_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c50DynAddE(i);
			}
		}
	}
});

function c50DynAddE(id){
	var obj = $('#c50_map_pins_'+id);

	if(config_50['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_50['pins'][id]['downColor']});
				$('#map-tip').show().html(config_50['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_50['pins'][id]['upColor']});
				if(config_50['pins'][id]['target'] == 'new_window'){
					window.open(config_50['pins'][id]['url']);
				}else if(config_50['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_50['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_50['pins'][id]['hover']);
			obj.css({'fill':config_50['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_50['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_50['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_50['pins'][id]['overColor']});
			if(config_50['pins'][id]['target'] == 'new_window'){
				window.open(config_50['pins'][id]['url']);
			}else if(config_50['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_50['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.51 ======================================*/
$(function(){
	$('#afc-51').find('path').attr({'fill':config_51['default']['landColor']}).css({'stroke':config_51['default']['borderColor']});
	$('#afc-51').find('text').attr({'fill':config_51['default']['shortName']});
	var pins_len = config_51['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c51_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_51['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_51['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_51['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_51['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_51['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c51_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_51['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_51['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_51['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_51['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_51['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c51_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c51DynAddE(i);
			}
			else if(config_51['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_51['pins'][i]['pos_X']- config_51['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_51['pins'][i]['pos_Y']- config_51['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_51['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_51['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_51['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c51_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_51['pins'][i]['pos_X']- config_51['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_51['pins'][i]['pos_Y']- config_51['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_51['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_51['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_51['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_51['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c51_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c51DynAddE(i);
			}
		}
	}
});

function c51DynAddE(id){
	var obj = $('#c51_map_pins_'+id);

	if(config_51['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_51['pins'][id]['downColor']});
				$('#map-tip').show().html(config_51['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_51['pins'][id]['upColor']});
				if(config_51['pins'][id]['target'] == 'new_window'){
					window.open(config_51['pins'][id]['url']);
				}else if(config_51['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_51['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_51['pins'][id]['hover']);
			obj.css({'fill':config_51['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_51['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_51['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_51['pins'][id]['overColor']});
			if(config_51['pins'][id]['target'] == 'new_window'){
				window.open(config_51['pins'][id]['url']);
			}else if(config_51['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_51['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.52 ======================================*/
$(function(){
	$('#afc-52').find('path').attr({'fill':config_52['default']['landColor']}).css({'stroke':config_52['default']['borderColor']});
	$('#afc-52').find('text').attr({'fill':config_52['default']['shortName']});
	var pins_len = config_52['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c52_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_52['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_52['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_52['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_52['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_52['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c52_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_52['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_52['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_52['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_52['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_52['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c52_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c52DynAddE(i);
			}
			else if(config_52['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_52['pins'][i]['pos_X']- config_52['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_52['pins'][i]['pos_Y']- config_52['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_52['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_52['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_52['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c52_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_52['pins'][i]['pos_X']- config_52['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_52['pins'][i]['pos_Y']- config_52['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_52['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_52['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_52['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_52['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c52_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c52DynAddE(i);
			}
		}
	}
});

function c52DynAddE(id){
	var obj = $('#c52_map_pins_'+id);

	if(config_52['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_52['pins'][id]['downColor']});
				$('#map-tip').show().html(config_52['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_52['pins'][id]['upColor']});
				if(config_52['pins'][id]['target'] == 'new_window'){
					window.open(config_52['pins'][id]['url']);
				}else if(config_52['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_52['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_52['pins'][id]['hover']);
			obj.css({'fill':config_52['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_52['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_52['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_52['pins'][id]['overColor']});
			if(config_52['pins'][id]['target'] == 'new_window'){
				window.open(config_52['pins'][id]['url']);
			}else if(config_52['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_52['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.53 ======================================*/
$(function(){
	$('#afc-53').find('path').attr({'fill':config_53['default']['landColor']}).css({'stroke':config_53['default']['borderColor']});
	$('#afc-53').find('text').attr({'fill':config_53['default']['shortName']});
	var pins_len = config_53['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c53_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_53['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_53['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_53['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_53['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_53['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c53_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_53['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_53['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_53['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_53['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_53['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c53_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c53DynAddE(i);
			}
			else if(config_53['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_53['pins'][i]['pos_X']- config_53['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_53['pins'][i]['pos_Y']- config_53['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_53['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_53['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_53['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c53_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_53['pins'][i]['pos_X']- config_53['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_53['pins'][i]['pos_Y']- config_53['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_53['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_53['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_53['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_53['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c53_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c53DynAddE(i);
			}
		}
	}
});

function c53DynAddE(id){
	var obj = $('#c53_map_pins_'+id);

	if(config_53['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_53['pins'][id]['downColor']});
				$('#map-tip').show().html(config_53['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_53['pins'][id]['upColor']});
				if(config_53['pins'][id]['target'] == 'new_window'){
					window.open(config_53['pins'][id]['url']);
				}else if(config_53['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_53['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_53['pins'][id]['hover']);
			obj.css({'fill':config_53['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_53['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_53['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_53['pins'][id]['overColor']});
			if(config_53['pins'][id]['target'] == 'new_window'){
				window.open(config_53['pins'][id]['url']);
			}else if(config_53['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_53['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}
/*======================================== Pins for Country No.54 ======================================*/
$(function(){
	$('#afc-54').find('path').attr({'fill':config_54['default']['landColor']}).css({'stroke':config_54['default']['borderColor']});
	$('#afc-54').find('text').attr({'fill':config_54['default']['shortName']});
	var pins_len = config_54['pins'].length;
	if( pins_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("c54_map_pins");
		var svg_circle,svg_rect;
		for(var i=0;i<pins_len;i++){
			if (config_54['pins'][i]['shape']=="circle"){
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_54['pins'][i]['pos_X']+1);
				svg_circle.setAttributeNS(null, "cy", config_54['pins'][i]['pos_Y']+1);
				svg_circle.setAttributeNS(null, "r", config_54['pins'][i]['diameter']/2+1);
				svg_circle.setAttributeNS(null, "fill", config_54['default']['pinsShadow']);
				svg_circle.setAttributeNS(null, "id",'c54_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_circle);
				svg_circle = document.createElementNS(xmlns, "circle");
				svg_circle.setAttributeNS(null, "cx", config_54['pins'][i]['pos_X']);
				svg_circle.setAttributeNS(null, "cy", config_54['pins'][i]['pos_Y']);
				svg_circle.setAttributeNS(null, "r", config_54['pins'][i]['diameter']/2);
				svg_circle.setAttributeNS(null, "fill", config_54['pins'][i]['upColor']);
				svg_circle.setAttributeNS(null, "stroke",config_54['pins'][i]['outline']);
				svg_circle.setAttributeNS(null, "id",'c54_map_pins_'+i);
				tsvg_obj.appendChild(svg_circle);
				c54DynAddE(i);
			}
			else if(config_54['pins'][i]['shape']=="rectangle"){
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_54['pins'][i]['pos_X']- config_54['pins'][i]['width']/2+1);
				svg_rect.setAttributeNS(null, "y", config_54['pins'][i]['pos_Y']- config_54['pins'][i]['height']/2+1);
				svg_rect.setAttributeNS(null, "width", config_54['pins'][i]['width']+1);
				svg_rect.setAttributeNS(null, "height", config_54['pins'][i]['height']+1);
				svg_rect.setAttributeNS(null, "fill", config_54['default']['pinsShadow']);
				svg_rect.setAttributeNS(null, "id",'c54_pins_shadow_'+i);
				tsvg_obj.appendChild(svg_rect);
				svg_rect = document.createElementNS(xmlns, "rect");
				svg_rect.setAttributeNS(null, "x", config_54['pins'][i]['pos_X']- config_54['pins'][i]['width']/2);
				svg_rect.setAttributeNS(null, "y", config_54['pins'][i]['pos_Y']- config_54['pins'][i]['height']/2);
				svg_rect.setAttributeNS(null, "width", config_54['pins'][i]['width']);
				svg_rect.setAttributeNS(null, "height", config_54['pins'][i]['height']);
				svg_rect.setAttributeNS(null, "fill", config_54['pins'][i]['upColor']);
				svg_rect.setAttributeNS(null, "stroke",config_54['pins'][i]['outline']);
				svg_rect.setAttributeNS(null, "id",'c54_map_pins_'+i);
				tsvg_obj.appendChild(svg_rect);
				c54DynAddE(i);
			}
		}
	}
});

function c54DynAddE(id){
	var obj = $('#c54_map_pins_'+id);

	if(config_54['pins'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':config_54['pins'][id]['downColor']});
				$('#map-tip').show().html(config_54['pins'][id]['hover']);
				$('#map-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':config_54['pins'][id]['upColor']});
				if(config_54['pins'][id]['target'] == 'new_window'){
					window.open(config_54['pins'][id]['url']);
				}else if(config_54['pins'][id]['target'] == 'same_window'){
					window.parent.location.href=config_54['pins'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#map-tip').show().html(config_54['pins'][id]['hover']);
			obj.css({'fill':config_54['pins'][id]['overColor']})
		},function(){
			$('#map-tip').hide();
			obj.css({'fill':config_54['pins'][id]['upColor']});
		})
		obj.mousedown(function(){
			obj.css({'fill':config_54['pins'][id]['downColor']});
		})
		obj.mouseup(function(){
			obj.css({'fill':config_54['pins'][id]['overColor']});
			if(config_54['pins'][id]['target'] == 'new_window'){
				window.open(config_54['pins'][id]['url']);
			}else if(config_54['pins'][id]['target'] == 'same_window'){
				window.parent.location.href=config_54['pins'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#map-tip').outerWidth(), tiph=$('#map-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#map-tip').css({left:x, top:y})
		})
	}
}