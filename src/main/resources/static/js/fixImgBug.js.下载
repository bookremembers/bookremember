document.addEventListener("DOMNodeInserted",function(event) {
    if (!event.target.querySelectorAll) return;
    var nodeList = event.target.querySelectorAll("div[block_type='8'],[block_type='12'] img.ubook_content_image");
    for (var i=0;i<nodeList.length;i++){
        var node = nodeList[i];
        if(node.style.width!='100%' && node.style.height!='100%'){
            if(node.complete && node.getAttribute('src') != null){
                imageRepair(node);
            }else{
                node.onload = function(){
                    imageRepair(this);
                }
            }

        }
    }})

function imageOnLoad(event){
    console.log(event.target);
    event.currentTarget.removeEventListener("load",imageOnLoad);
    imageRepair(event.currentTarget);
}

function imageRepair(image){
    if (image.style.width != "100%" && image.style.height != "100%") {
        var w1 = image.naturalWidth;
        var h1 = image.naturalHeight;
        var w2 = image.parentNode.offsetWidth;
        var h2 = image.parentNode.offsetHeight;
        if (w1 != 0 && h1 != 0 && w2 != 0 && h2 != 0) {
            var r1 = w1/h1;
            var r2 = w2/h2;
            if (r1 > r2) {
                image.style.width = "auto";
                image.style.height = "100%";
                image.style.left = -(h2 * r1 - w2) / w2 / 2 *100 +"%";
                image.style.top = "0%";
            } else {
                image.style.height = "auto";
                image.style.width = "100%";
                image.style.left = "0%";
                image.style.top = -(w2 / r1 - h2) / h2 / 2 *100 +"%";
            }
        }
    }
}
