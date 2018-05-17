var $box = $('#warp .box');
var $warp = $('#warp');
var boxJson = [];
//pitch 布局初始化
(function () {
    var top, left
    $box.each(function (i) {
        top = parseInt(i / 3) * 140;
        left = parseInt(i % 3) * 220;
        $(this).css({
            top: top + 'px',
            left: left + 'px'
        });
        boxJson[i] = {top: top, left: left};
    });
})();
(function () {
    $(document).mousedown(function (ev) {
        var coor = $warp.offset();
        ev = ev || window.event;
        ev.preventDefault();
        var mouseX = parseInt(ev.clientX - coor.left);
        var mouseY = parseInt(ev.clientY - coor.top);
        var width = 200;
        var height = 120;
        var ol,ot;
        $box.each(function () {
            var  aX = parseInt($(this).position().left);
            var  aY = parseInt($(this).position().top);
            var  aW = aX + width;
            var  aH = aY + height;
            if ((mouseX > aX && mouseX < aW) && (mouseY > aY && mouseY < aH)) {
                ol = $(this).position().left;
                ot = $(this).position().top;
                $(document).on('mousemove', {This: $(this)}, dragElements);
            };
        });
        function dragElements(ev) {
            var wW = $warp.width();
            var wH = $warp.height();
            var This = ev.data.This;
            ev = ev || window.event;
            //控制边框处理 最大不能超过屏幕
            mouseX = Math.min($(document).width() - coor.left - width / 2 - 10, parseInt(ev.clientX - coor.left));
            mouseY = Math.min($(document).height() - coor.top - height / 2 - 10, parseInt(ev.clientY - coor.top));
            // console.log(mouseX,mouseY)
            //left top控制被选中的图片的中心是鼠标的位置
            var Left = mouseX - (width / 2);
            var Top = mouseY - (height / 2);
            ev.preventDefault();
            This.css({
                left: Left,
                top: Top
            });
            var index = This.index();
            $box.each(function () {
                var  bX =parseInt($(this).css('left'));
                var  bY =parseInt($(this).css('top'));
                var  bW = bX + width;
                var  bH = bY + height;
                if (($(this).index() != index) && (mouseX > bX && mouseX < bW) && (mouseY > bY && mouseY < bH)) {
                    var nt=amg(parseInt($(this).css('top')),0)
                    var nl=amg(parseInt($(this).css('left')),1)
                    $(this).css({
                        top:amg(parseInt(ot),0)+'px',
                        left:amg(parseInt(ol),1)+'px',
                    });
                    ot=nt;
                    ol=nl;
                };
            });
        };
    });
})();
//抢空位

//吸附计算amg am
function amg(x,b) {
    if(b){
        var l = [0, 220, 440];
        return am(x, l)
    }else{
        var t = [0, 140, 280];
        return am(x, t)
    }

}
;
function am(num, l) {
    var A = [];
    for (var i = 0; i < l.length; i++) {
        A[i] = l[i] - num;
        A[i] = Math.abs(A[i]);
    }
    ;
    min = Math.min.apply(null, A), index = 0;
    var len = A.length;
    for (var i = 0; i < len; i++) {
        if (A[i] == min) {
            index = i;
            break;
        };
    };
    return l[index];
}
/*if(parseInt($box.eq(i).css('top'))==ot) {
 if(parseInt($box.eq(i).css('left'))>ol+220){
 var left=parseInt($box.eq(i).css('left'));
 $box.eq(i).stop().animate({'left': amg(left - 220)[0] + 'px'}, 300, function () {
 ol = bX;
 ot = bY;
 });
 }else {
 var left=parseInt($box.eq(i).css('left'));
 $box.eq(i).stop().animate({'left': amg(left + 220)[0] + 'px'}, 300, function () {
 ol = bX;
 ot = bY;
 });
 }
 };*/
/*else if ((mouseX < 0 || mouseY < 0 )||( mouseX > wW || mouseY > wH)) {
 for (var i = 0; i < $box.length; i++) {
 if (i != index) {
 $box.eq(i).css({
 left: boxJson[i].left+'px',
 top: boxJson[i].top+'px',
 });
 ol=amg(parseInt($box.eq(index).css('left')))[0];

 };
 };
 };*/