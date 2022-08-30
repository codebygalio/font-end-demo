// 获得页面的元素
let lis = document.querySelector(".up").querySelectorAll("li");
const divs = document.querySelector(".down").querySelectorAll("div");
let timer = null;

function clearAllAttribute(){
    for(let i = 0;i<lis.length;i++){
        lis[i].removeAttribute("class");
        divs[i].removeAttribute("class")
      
    }
}


for(let i = 0;i<lis.length;i++){
        lis[i].onmouseover = function(e){
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(function(){
                clearAllAttribute()
                lis[i].setAttribute("class",'select');
                divs[i].setAttribute("class","div_select")
            },300)
        }
}

