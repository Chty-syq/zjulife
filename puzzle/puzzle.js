var time = 0;
var status = 0;
/* 游戏状态
 * 0：未开始
 * 1：进行中
 * 2：暂停中
 */
var set_timer;
var d = new Array(10);
var nextpos;//相邻格子编号
var realpos;//实际位置

function move(id) {
    if (status != 1) return;
    var cur = 0;
    for (let i = 1; i <= 9; ++i) if (d[i] == id) { cur = i; break; }
    for (let i = 0; i < nextpos[cur].length; ++i) {
        if (d[nextpos[cur][i]] == 0) {
            let y = nextpos[cur][i];
            document.getElementById("d" + id).style.left = realpos[y][0] + "px";
            document.getElementById("d" + id).style.top = realpos[y][1] + "px";
            d[cur] = 0; d[y] = id;
            break;
        }
    }
    var flag = true;
    for (let i = 1; i <= 8; ++i) if (d[i] != i) { flag = false; break; }
    if (flag == true) {
        status = 0;
        document.getElementById("start").innerHTML = "开始";
        clearInterval(set_timer);
        alert("Congratulation!");
    }
}

function timer() {
    time += 1;
    var m = parseInt(time / 60);
    var s = parseInt(time % 60);
    document.getElementById("timer").innerHTML = m + "分" + s + "秒";
}

function start() {
    if (status == 0) {
        document.getElementById("start").innerHTML = "暂停";
        status = 1;
        set_timer = setInterval(timer, 1000);
        reset();
    }
    else if (status == 1) {
        document.getElementById("start").innerHTML = "开始";
        status = 2;
        clearInterval(set_timer);
    }
    else if (status == 2) {
        document.getElementById("start").innerHTML = "暂停";
        status = 1;
        set_timer = setInterval(timer, 1000);
    }
}

function reset() {
    time = 0;
    document.getElementById("timer").innerHTML = 0 + "分" + 0 + "秒";
    nextpos = new Array(
        [0], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [2, 4, 6, 8], [3, 5, 9], [4, 8], [5, 7, 9], [6, 8]
    );
    realpos = new Array(
        [0], [0, 0], [150, 0], [300, 0], [0, 150], [150, 150], [300, 150], [0, 300], [150, 300], [300, 300]
    );
    for (let i = 1; i <= 8; ++i) d[i] = i; d[9] = 0;
    for (let i = 1; i <= 100; ++i) {
        var x = parseInt(Math.random() * 8 + 1);
        var y = parseInt(Math.random() * 8 + 1);
        if (x == y) {i--; continue;}
        if (d[x] != 0) {
            document.getElementById("d" + d[x]).style.left = realpos[y][0] + "px";
            document.getElementById("d" + d[x]).style.top = realpos[y][1] + "px";
        }
        if (d[y] != 0) {
            document.getElementById("d" + d[y]).style.left = realpos[x][0] + "px";
            document.getElementById("d" + d[y]).style.top = realpos[x][1] + "px";
        }
        d[x] ^= d[y];
        d[y] ^= d[x];
        d[x] ^= d[y];
    }
}
