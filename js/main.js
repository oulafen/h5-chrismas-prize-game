Zepto(function () {
    lottery.init('lottery');

    $(".J-shake").click(function () {
        if (lottery.rolling) {
            return false;
        } else {
            lottery.start();
            lottery.prize = 4; //中奖号
            return false;
        }
    });

    $('.tip-box .J-close').on('click',function(){
        notice.hide();
    });
});

var prize = {
    0: '2G流量',
    1: '谢谢参与',
    2: 'ipad一台',
    3: '10M流量',
    4: '音响一个',
    5: '200M流量',
    6: '100元话费',
    7: '1元话费',
    8: '移动硬盘一个',
    9: '5M流量',
    10: '电影票一张',
    11: '谢谢参与',
    12: '金立1000元购机券',
    13: '100M流量',
    14: '3元话费',
    15: 'vivo耳机一只',
    16: '500M流量',
    17: '谢谢参与',
    18: '苹果nano一个',
    19: '2元话费',
    20: '海信800元购机券',
    21: '20元话费',
    22: '50元话费',
    23: '苹果1000元购机券',
    24: '谢谢参与',
    25: '1G流量',
    26: '魅族1000元购机券',
    27: '50M流量',
    28: '5元话费',
    29: 'ViVo1000元购机券',
    30: '10元话费',
    31: '30M流量'
};

var lottery = {
    index: -1,	//当前转动到哪个位置，起点位置
    count: 0,	//总共有多少个位置
    timer: 0,	//setTimeout的ID，用clearTimeout清除
    speed: 20,	//初始转动速度
    times: 0,	//转动次数
    cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1,	//中奖位置
    rolling: false,  //记录在转奖的状态
    init: function (id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
        }
    },
    roll: function () {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        }
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },

    stop: function () {
        clearTimeout(lottery.timer);
        notice.show(prize[lottery.prize]);

        lottery.prize = -1;
        lottery.times = 0;
        lottery.rolling = false;
    },

    start: function(){
        this.speed = 10;
        roll();
        this.rolling = true;
    }
};

function roll() {
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        lottery.stop();
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            //var index = Math.random() * (lottery.count) | 0;
            //lottery.prize = prizeIndex;
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        }
        lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
}

function shaking(type) {
    if (type == 'add') {
        $('.J-shake').addClass('shaking');
    }
    if (type == 'hide') {
        $('.J-shake').removeClass('shaking');
    }
}

var notice = {
    show: function (prizeDesc) {
        if (prizeDesc) {
            $('.tip-box .notice-box').html(prizeDesc);
        }
        $('.tip-box').show();
    },
    hide: function () {
        $('.tip-box').hide();
    }
};




