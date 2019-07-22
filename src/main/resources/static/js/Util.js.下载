var Util = (function Util(){
    function _getTop(target){
        var offset = target.offsetTop;
        if (target.offsetParent !== null) offset += _getTop(target.offsetParent);
        return offset;
    }
    function _getLeft(target){
        var offset = target.offsetLeft;
        if (target.offsetParent !== null) offset += _getLeft(target.offsetParent);
        return offset;
    }
    function _calBoundOffset(options,angle){
        var originArea  = _transform({top:0,left:0,width:options.width,height:options.height},0);
        var transArea =  _transform({top:0,left:0,width:options.width,height:options.height},angle);
        return {width:(transArea.width - originArea.width) / 2,height: (transArea.height - originArea.height) / 2};
    }
    function _transform(options,angle){
        var top = options.top ;
        var left = options.left ;
        var width = options.width ;
        var height = options.height ;
        var r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        var a = Math.atan(height / width) * 180 / Math.PI;
        var tlbra = 180 - angle - a;
        var trbla = a - angle;
        var ta = 90 - angle;
        var ra = angle;

        var halfWidth = width / 2;
        var halfHeight = height / 2;

        var middleX = left + halfWidth;
        var middleY = top + halfHeight;

        var topLeft = {
            left: Math.round(middleX + r * Math.cos(tlbra * Math.PI / 180)),
            top: Math.round(middleY - r * Math.sin(tlbra * Math.PI / 180)),
        };
        var top = {
            left: Math.round(middleX + halfHeight * Math.cos(ta * Math.PI / 180)),
            top: Math.round(middleY - halfHeight * Math.sin(ta * Math.PI / 180)),
        };
        var topRight = {
            left: Math.round(middleX + r * Math.cos(trbla * Math.PI / 180)),
            top: Math.round(middleY - r * Math.sin(trbla * Math.PI / 180)),
        };
        var right = {
            left: Math.round(middleX + halfWidth * Math.cos(ra * Math.PI / 180)),
            top: Math.round(middleY + halfWidth * Math.sin(ra * Math.PI / 180)),
        };
        var bottomRight = {
            left: Math.round(middleX - r * Math.cos(tlbra * Math.PI / 180)),
            top: Math.round(middleY + r * Math.sin(tlbra * Math.PI / 180)),
        };
        var bottom = {
            left: Math.round(middleX - halfHeight * Math.sin(ra * Math.PI / 180)),
            top: Math.round(middleY + halfHeight * Math.cos(ra * Math.PI / 180)),
        };
        var bottomLeft = {
            left: Math.round(middleX - r * Math.cos(trbla * Math.PI / 180)),
            top: Math.round(middleY + r * Math.sin(trbla * Math.PI / 180)),
        };
        var left = {
            left: Math.round(middleX - halfWidth * Math.cos(ra * Math.PI / 180)),
            top: Math.round(middleY - halfWidth * Math.sin(ra * Math.PI / 180)),
        };
        var minX = Math.min(topLeft.left, topRight.left, bottomRight.left, bottomLeft.left);
        var maxX = Math.max(topLeft.left, topRight.left, bottomRight.left, bottomLeft.left);
        var minY = Math.min(topLeft.top, topRight.top, bottomRight.top, bottomLeft.top);
        var maxY = Math.max(topLeft.top, topRight.top, bottomRight.top, bottomLeft.top);
        return {
            point: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left],
            width: maxX - minX,
            height: maxY - minY,
            left: minX,
            right: maxX,
            top: minY,
            bottom: maxY,
            v_center:minY + height / 2,
            h_center:minX + width / 2,
        }
    }
    function _clone(obj) {
        var o;
        if (typeof obj === "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(_clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = _clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    }
    //get photo inner image top left width height ;
    function _getInnerData(imageW,imageH,frameW,frameH){
        var imgW = imageW ;
        var imgH = imageH ;
        var frameR = frameW / frameH ;
        var imageR = imgW / imgH ;

        var width = "100%";
        var height = "auto";
        var left = "0%";
        var top = "0%";

        if (imageR <= frameR) {
            var ratio_height = frameW / imageR;
            width = "100%";
            height = "auto";
            left = '0%';
            top = '-' + (parseInt((ratio_height - frameH) / 2) * 100/frameH) + '%' ;
        }else {
            width = "auto";
            height = "100%";
            var ratio_width = frameH * imageR;
            top = '0%';
            left = '-' + (parseInt((ratio_width - frameW) / 2)* 100/frameW) + '%' ;
        }
        return {innerTop:top,innerLeft: left,innerWidth:width,innerHeight:height};
    };
    /**
     * @description 射线法判断点是否在多边形内部
     * @param {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }
     * @param {Array} poly 多边形顶点，数组成员的格式同 p
     * @return {String} 点 p 和多边形 poly 的几何关系
     */
    function _checkInRect (p,poly){
        var px = p.left,
            py = p.top,
            flag = false ;
        for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            var sx = poly[i].left,
                sy = poly[i].top,
                tx = poly[j].left,
                ty = poly[j].top;
            // 点与多边形顶点重合
            if((sx === px && sy === py) || (tx === px && ty === py)) {
                return 'on'
            }
            // 判断线段两端点是否在射线两侧
            if((sy < py && ty >= py) || (sy >= py && ty < py)) {
                // 线段上与射线 top 坐标相同的点的 left 坐标
                var left = sx + (py - sy) * (tx - sx) / (ty - sy) ;
                // 点在多边形的边上
                if(left === px) {
                    return 'on'
                }
                // 射线穿过多边形的边界
                if(left > px) {
                    flag = !flag
                }
            }
        }
        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag ? 'in' : 'out'
    }
    function _uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }
    function _getImageSize(url,callback){
        var image = new Image();
        image.onload = function(){
            var width = this.width ;
            var height = this.height ;
            callback(width,height);
        };
        image.src = url ;
    }
    function _readFileAsBinary(file, callback) {
        if (window.File && window.FileList && window.FileReader && window.Blob) {
            var type = file.type ;
            var reader = new FileReader();
            reader.onload = function () {
                var binary_string = reader.content || reader.result;
                callback(binary_string,type);
            };
            //读取文件内容
            reader.readAsBinaryString(file);
        } else {
            callback(null);
        }
    };
    return {
        getTop:function(target){ return _getTop(target)},
        getLeft:function(target){ return _getLeft(target)},
        transform:function(options,angle){ return _transform(options,angle)},
        calBoundOffset:function(options,angle){ return _calBoundOffset(options,angle)},
        getInnerData: function(imageW,imageH,frameW,frameH) {return _getInnerData(imageW,imageH,frameW,frameH)},
        cloneObject:function(obj){return _clone(obj)},
        checkInRect:function(p,poly){return _checkInRect(p,poly)},
        uuid:function(len, radix){return _uuid(len, radix)},
        getImageSize:function(url,callback){_getImageSize(url,callback)},
        readFileAsBinary:function(file, callback){_readFileAsBinary(file, callback)}
    }
})();