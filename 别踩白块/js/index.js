let flag = false;
let clock = null;
let speed = 6;

function $(id) {
    return document.getElementById(id);
}

function createDiv(name) {
    let div = document.createElement("div");
    div.className = name;
    return div;
}

function createCell() {
    let temp = ["white_cell", "white_cell", "white_cell", "white_cell"];
    let position = Math.floor(Math.random() * 4);
    temp[position] = "black_cell";
    return temp;
}

function createRow() {
    let con = $("con");
    let row = createDiv("row");
    let arr = createCell();
    for (let i = 0; i < 4; ++i) {
        let cell = createDiv(arr[i]);
        row.appendChild(cell);
    }
    if (con.firstChild == null) con.appendChild(row);
    else                        con.insertBefore(row, con.firstChild);
}

function deleteRow() {
    let con = $("con");
    if (con.childNodes.length == 6) {
        con.removeChild(con.lastChild);
    }
}

function start() {
    if (!flag) init();
    else alert("游戏已经开始!");
}

function init() {
    flag = true;
    for (let i = 0; i < 4; ++i) createRow();
    $("main").onclick = function (ev) {
        ev = ev || event;
        judge(ev);
    }
    clock = window.setInterval("move()", 30);
}

function judge(ev) {
    if (ev.target.className == "black_cell") {
        ev.target.className = "white_cell";
        ev.target.parentNode.pass = 200;//黑块被点击
        score();
    }
    else if (ev.target.className == "white_cell") {
        ev.target.parentNode.pass = 404;//白块被点击
    }
}

function checkState() {
    let con = $("con");
    let rows = con.childNodes;
    if (rows.length == 5 && rows[rows.length - 1].pass != 200) gameOver();
    for (let i = 0; i < rows.length; ++i) {
        if (rows[i].pass == 404) gameOver();
    }
}

function score() {
    let newScore = parseInt($("score").innerHTML) + 1;
    $("score").innerHTML = newScore;
}

function move() {
    let con = $("con");
    let top = parseInt(window.getComputedStyle(con, null)["top"]);
    if (top + speed > 0) top = 0;
    else top += speed;
    con.style.top = top + "px";
    checkState();
    if (top == 0) {
        createRow();
        con.style.top = "-102px";
        deleteRow();
    }
}

function gameOver() {
    clearInterval(clock);
    flag = false;
    confirm("你的最终得分为" + $("score").innerHTML);
    var con = $("con");
    con.innerHTML = "";
    $("score").innerHTML = 0;
    con.style.top = "-408px";
}
