var lastOp = false;


function addEventToClass(arr, event, func){
    for(let i=0;i<arr.length;i++){
        arr[i].addEventListener(event, func);
    }
}

let keyBlock = document.getElementsByClassName("calcCols");
addEventToClass(keyBlock, "click", calcClick);

document.addEventListener('keydown', (event)=>{
    var num = event.key;
    click = new Event("click");
    l = ['+', '-', '*', '.', '/'];
    if((num >= "0" && num <= "9" ) || l.includes(num)){
        document.getElementById(num).parentElement.dispatchEvent(click);
    }else{
        f = true;
        if(num == "Enter" || num == "="){
            num = "ans";
        }else if(num == "Backspace"){
            num = "C";
        }else if(num == "Delete"){
            num = "D";
        }else if(num == "S" || num == "s"){
            num = "root";
        }else{
            f = false;
        }
        if(f){
            document.getElementById(num).parentElement.dispatchEvent(click);
        }
    }
}, false);


function check(val){
    let pres = document.getElementById("out");
    let present = pres.innerHTML;
    
    other = ["C", "D", "ans", "root", "+-"];
    spl = ["+", "-", "*", "/"];
    if(!other.includes(val)){
        let len = present.length;
        let last = present[len-1];
        if(spl.includes(last) && spl.includes(val)){
            present = present.replace(/.$/, val); // Replace Last Element in the String
        }else{
            if(!spl.includes(val) && lastOp){
                present = "";
            }
            if(present == "0" || present == "ERROR"){
                present = val;
            }else{
                present += val;
            }
        }
        pres.innerHTML = present;
    }else{
        if(val == "ans"){
            if(present == ""){
                present = "0";
            }else{
                let k = present;
                try {    
                    present = parseFloat(eval(present)).toPrecision(6);
                    present = Number(present);
                    present = String(present);
                } catch (error) {
                    present = "ERROR";
                }
                if(present == "undefined"){
                    present = "ERROR";
                }else{
                    let histele = document.createElement("div");
                    histele.classList.add("history-data");
                    histele.classList.add("history-hidden");
                    histele.innerText = k + " = " + present;
                    document.getElementsByClassName("history")[0].append(histele);
                }
            }
        }else if(val == "C"){
            if(present == "ERROR"){
                present = "";
            }else{
                present = present.substring(0, present.length-1);
            }
            if(present == "" || (present[0] == "-" && present.length==1)){
                present = "0";
            }
        }else if(val == "D"){
            present = "0";
        }else if(val == "root"){
            let ok = present;
            let k = present[present.length-1];
            if(!spl.includes(k)){
                present = parseFloat(String(Math.sqrt(Number(present)))).toPrecision(6);
                if(present == "NaN"){
                    present = "ERROR";
                }else{
                    let histele = document.createElement("div");
                    histele.classList.add("history-data");
                    histele.classList.add("history-hidden");
                    histele.innerText = "sqrt( " + ok + " ) = " + present;
                    document.getElementsByClassName("history")[0].append(histele);
                }
            }
        }else if(val == "+-"){
            present = String(-1*Number(present));
        }

    }
    if(val == "ans" || val == "root"){
        lastOp = true;
    }else{
        lastOp = false;
    }
    pres.innerHTML = present;
}

function calcClick(){
    let clickedon = this.childNodes[1].id;
    check(clickedon);
    toggle(1);
}

let hist = document.getElementsByClassName("hist")[0];
hist.addEventListener("click", () => {
    let gjs = $(".history");
    if(gjs.hasClass("history-hidden")){
        toggle(0);
    }else{
        toggle(1);
    }
})

function toggle(k){
    let gjs = $(".history");
    let i = document.getElementsByTagName("i")[0];
    if(k == 0){
        gjs.removeClass("history-hidden");
        i.classList.remove("fa-arrow-down");
        i.classList.add("fa-arrow-up");
        $(".history-data").removeClass("history-hidden");
        $(".calcBody").addClass("mt-20");
        let k = document.getElementsByClassName("history")[0];
        k.scrollTop = k.scrollHeight;
    }else{
        gjs.addClass("history-hidden");
        i.classList.remove("fa-arrow-up");
        i.classList.add("fa-arrow-down");
        $(".history-data").addClass("history-hidden");
        $(".calcBody").removeClass("mt-20");
    }
}