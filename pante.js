var color = "#000000";
var s = '';
var grid=true;
var scale=32;
var colorHistory = [];
var maxColors=16;
var gridHeight = 32;
var gridWidth = 32;
var maxScale = 512;
var minScale = 8;
var btn = 0;

function addColor(newColor)
{

	color=newColor;
	
	var t ='';
	var tempColor = '';
	t = $('<div></div>').appendTo($('body'));
	t.css("color",newColor);
	tempColor = t.css("color");
	
	for(var i=0;i<colorHistory.length;i++){
		if(tempColor==colorHistory[i]){
				colorHistory=colorHistory.slice(0,i).concat(colorHistory.slice(i+1,colorHistory.length))
		}
	}
	colorHistory.unshift(tempColor);
	if (colorHistory.length>maxColors){
			colorHistory=colorHistory.slice(0,maxColors);
	}
	$(".color").remove();
	for(var i=0;i<colorHistory.length;i++){
		s = $('<div class="button color">XX</div>').appendTo($(".header"));
		s.css("background-color",colorHistory[i]);
		s.css("color",colorHistory[i]);
	}
	$(".color").click(function(){
		addColor($(this).css("color"));
	}
	
	);
}

function rejigger(){
			if(grid){
					$(".box").css("border","1px solid black");
			}
			else {
					$(".box").css("border","none");
			}
		if (grid) {
			$(".box").css("width",scale-2);
			$(".box").css("height",scale-2);		
		}
		else {
		$(".box").css("width",scale);
		$(".box").css("height",scale);
		}
}

function newImage(){

	$(".row").remove();
	$(".box").remove();

	for (var y=0;y<gridHeight;y++) {
		s = $('<div class="row"></div>').appendTo($("body"));
		for (var x=0;x<gridWidth;x++) {	
			s.append('<div class="box" id="y' + y + 'x' + x + '"></div>');
		};
		rejigger();

	};
	
	$(".box").click(function(){
		$(this).css("background-color",color);
	});
	$(".box").mouseover(function(){
			if(btn){
			$(this).css("background-color",color);
			}
		});
	$(".box").mouseleave(function(){
			if(btn){
			$(this).css("background-color",color);
			}
		});		

}

$(document).ready(function(){

	newImage();
	
	addColor('brown');
	addColor('red');
	addColor('yellow');
	addColor('green');
	addColor('blue');
	addColor('white');
	addColor('gray');
	addColor('black');
	
	
	
	$(document).mousedown(function(){
		btn=1;
	});
	$(document).mouseup(function(){
		btn=0;
	});

	$("#color").click(function(){
			addColor(prompt("color",color));
		});
	$("#grid").click(function(){
			grid=!grid;
			rejigger();
		});
	$("#zoomin").click(function(){
		if(scale<maxScale)
			{
				scale*=2
			}
		rejigger();
		});
	$("#zoomout").click(function(){
		if(scale>minScale)
			{
				scale/=2
			}
		rejigger();
		});
	$("#new").click(function(){
		s = gridWidth + "x" + gridHeight;
		var s = prompt("size",s);
		if (!s.match(/[0-9]+x[0-9]+/))
			{
				alert('fail');
				return;
			}

			if (s.split('x')[0] > '64' || s.split('x')[1] > '64')
			{
				alert("too big for me son");
				return;
			}
			gridWidth = s.split('x')[0];
			gridHeight = s.split('x')[1];
			newImage();
		
	
	});
});