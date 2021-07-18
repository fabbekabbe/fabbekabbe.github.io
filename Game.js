var player = {
    update_interval: 20,

    money: 0,
    increase: 1,
    per_second: 0,
    
    generator_1_unlocked: false,
    generator_1_cost: 10,
    generator_1_effect: 0.1,
    generator_1_bought: 0,

    generator_2_unlocked: false,

    generator_3_unlocked: false,

    generator_4_unlocked: false,

    generator_5_unlocked: false,

}
    
var mdisplay = document.getElementById("mdisplay");
mdisplay.style.display = "block";
mdisplay.innerHTML = "$" + player.money;

var generator_1 = document.getElementById("generator_1");
generator_1.style.display = "none";
generator_1.innerHTML = "[" + player.generator_1_bought + "] Generator - $" + player.generator_1_cost;

function onMoneyClick() {
    player.money = player.money + player.increase;
    mdisplay.innerHTML = "$" + player.money;
}

function onUpgradeClick(type, index) {
    if (type == "generator") {
        if (index == 1) {
            if (player.money >= player.generator_1_cost) {
                player.per_second = player.per_second + player.generator_1_effect;
                player.money = player.money - player.generator_1_cost
                player.generator_1_bought = player.generator_1_bought + 1
                generator_1.innerHTML = "[" + player.generator_1_bought + "] Generator - $" + player.generator_1_cost;
            }
        }
    }
}

setInterval(onTimerTick, player.update_interval);

var tick = 0;

function onTimerTick() {
    player.money = Math.round(player.money * 10) / 10;
    mdisplay.innerHTML = "$" + player.money;

    var max_tick = ((1000/player.update_interval) / player.per_second) / 10;
    tick++;
    if (tick >= max_tick) {
        tick = 0;
        player.money = player.money + player.per_second / ((1000 / player.update_interval) / max_tick);
    }

    if (player.generator_1_unlocked == false && player.money >= player.generator_1_cost) {
        generator_1.style.display = "block";
        player.generator_1_unlocked = true;
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}