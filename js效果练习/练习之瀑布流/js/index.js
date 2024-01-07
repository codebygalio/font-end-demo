window.onload = function(){
    // 确保资源加载完成
    waterFlow("container","box");

    var dataImage = {
        data:[
            {
                src:'1.jpeg'
            },
            {
                src:'2.jpeg'
            },
            {
                src:'3.jpeg'
            },
            {
                src:'4.jpeg'
            },
            {
                src:'5.jpeg'
            },
            {
                src:'6.jpeg'
            },
            {
                src:'7.jpeg'
            },
            {
                src:'8.jpeg'
            },
            {
                src:'9.jpeg'
            },
            {
                src:'10.jpeg'
            },
            {
                src:'11.jpg'
            },
        ]
    }

    window.onscroll = function(){
        if(checkFlag()){
            // 开始加载
            var oParent = document.getElementById("container");
            for(var i = 0;i<dataImage.data.length;i++){
                var oPin = document.createElement("div");
                oPin.className = "box";
                oParent.appendChild(oPin);
                var oBox = document.createElement("div");
                oBox.className = "boximg";
                oPin.appendChild(oBox);
                var oImg = document.createElement("img");
                oImg.src = "./img/" + dataImage.data[i].src
                oBox.appendChild(oImg);
            }
            waterFlow('container','box')
        }
    }
}

function checkFlag(){
    // 最后一个元素元素距离顶部的高度 < 滚动高度 + 视口的高度 = 加载更多
    var cParent = document.getElementById("container");
    var cContent = getAllChild(cParent,'box');
    // 找到最后一张子元素的高度
    var lastContentHeight = cContent[cContent.length-1].offsetTop;
    // 获得滚动高度
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    // 获得视口的高度
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if(lastContentHeight < scrollHeight + pageHeight){
        return true;
    }
}


function waterFlow(parent,child){
    // 获得父级div容器
    var wparent = document.getElementById(parent);
    // 获得所有的子元素
    var allArr = getAllChild(wparent,child);
    // 获得屏幕宽度
    var wscreenWidth = document.documentElement.clientWidth;
    // 获得每个box的宽度
    var wchildWdith = wparent.getElementsByTagName("*");
    // 获得一行排放的数量
    var num = Math.floor(wscreenWidth / wchildWdith[0].offsetWidth);
    wparent.style = "width:" + wchildWdith[0].offsetWidth * num + "px;margin:0 auto";
    getMinHeightOfCols(allArr,num);
}

function getAllChild(parent,classname){
    // 获得到所有的标签
    var wchild = parent.getElementsByTagName("*");
    // 创建数组存储图片容器
    var childArr = [];
    for(var i = 0;i<wchild.length;i++){
        // classname === box
        if(wchild[i].className == classname){
            childArr.push(wchild[i]);
        }
    }

    return childArr
}

function getMinHeightOfCols(childArr,num){
    // 存储高度的数组
    var onlyOneColsArr = [];
    for(var i = 0;i<childArr.length;i++){
        if(i<num){
            // 第一行所有的图片
            onlyOneColsArr[i] = childArr[i].offsetHeight;
        }else{
            // 获得数组中最小的值
            var minHeightOfCols = Math.min.apply(null,onlyOneColsArr);
            
            // 获得到最小值的下标
            var minHeightOfIndex = onlyOneColsArr.indexOf(minHeightOfCols)
            childArr[i].style.position = "absolute";
            childArr[i].style.top = minHeightOfCols + "px";
            childArr[i].style.left = childArr[minHeightOfIndex].offsetLeft + "px"
            // 合并新图片的高度和最小图片的高度，生成新的高度
            onlyOneColsArr[minHeightOfIndex] += childArr[i].offsetHeight;
         
        }
    }
}

function getMinIndex(onlyOneColsArr,min){
    for(var i in onlyOneColsArr){
        if(onlyOneColsArr[i] == min){
            return i
        }
    }
}