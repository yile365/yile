
// NPC/怪物配置

var PREFIX_DATA = {
    atk:{
        name:'[狂暴]',
        buff:0.5,
    },
    agile:{
        name:'[灵敏] ',
        buff:0.5,
    },
    fat:{
        name:'[强壮] ',
        buff:0.5,
    },
    magic:{
        name:'[抗魔] ',
        buff:0.5,
    },
    def:{
        name:'[高防] ',
        buff:0.5,
    },
    upper:{
        name:'[强大] ',
    },
}
var UPPER_CHANCE = 0.1;

var MST_DATA = {
    robber_1:{
        maxHp:195,
        name:'菜鸟盗贼',
        damage:14,
        range:14,
        reward:{traces:1},
        chanceGet:{part_1:0.1},
        chaseChance:0.5,
    },
    robber_2:{
        maxHp:305,
        name:'老鸟盗贼',
        damage:14,
        range:24,
        reward:{traces:2},
        chanceGet:{part_2:0.5},
        chaseChance:0.5,
    },
    robber_3:{
        maxHp:425,
        name:'奸诈盗贼',
        damage:44,
        range:54,
        reward:{traces:3},
        chanceGet:{part_3:1},
        chaseChance:0.5,
    },

    maou:{
        hpMul:1,
        maxHp:1,
        name:'邪恶大魔王',
        damage:1,
        range:10,
        reward:{},
        chaseChance:100,
    },
    thief:{
        maxHp:95,
        name:'覆面忍者',
        damage:14,
        range:14,
        reward:{gold:20,ancientStaff:1},
        chaseChance:100,
    },
    fire:{
        maxHp:155,
        name:'法师学徒',
        damage:20,
        range:15,
        reward:{fireGet:1,gold:2},
        chanceGet:{staff:0.5},
        chaseChance:0.7,
    },
    fireSage:{
        maxHp:255,
        name:'影子法师',
        damage:20,
        range:20,
        reward:{fireGet:1,gold:10,darkDust:2},
        chanceGet:{magicHat:0.5},
        chaseChance:0.7,
    },
    fireMaster:{
        maxHp:1000,
        name:'黑衣贤者',
        damage:35,
        range:20,
        reward:{fireGet:1,gold:30,lightHat:1},
        chaseChance:0.7,
    },
    ice:{
        maxHp:233,
        name:'食人魔',
        damage:16,
        range:1,
        reward:{iceGet:1,gold:2},
        chanceGet:{axe:0.5,foolHammer:0.05},
        chaseChance:0.6,
    },
    iceNinja:{
        maxHp:245,
        name:'食人魔忍者',
        damage:14,
        range:9,
        reward:{iceGet:1,gold:2},
        chanceGet:{axe:0.5,ninjaShoe:0.1,ninjaHat:0.1},
        chaseChance:0.6,
    },
    iceMaster:{
        maxHp:2450,
        name:'食人魔族长',
        damage:19,
        range:4,
        reward:{iceGet:1,gold:30,blueHat:1},
        chaseChance:0.6,
    },

    polarBear:{
        maxHp:2550,
        name:'北极熊',
        damage:20,
        range:2,
        reward:{meat:10,fur:2,bile:3},
        chanceGet:{meat:1,iceHeart:0.4},
        chaseChance:0.6,
    },
    penguin:{
        maxHp:550,
        name:'企鹅',
        damage:5,
        range:1,
        reward:{meat:1,wing:1,water:1},
        chanceGet:{iceHeart:0.1},
    },
    rabbit:{
        maxHp:250,
        name:'兔子',
        damage:2,
        range:1,
        reward:{meat:1},
        chanceGet:{fur:0.5}
    },
    scaryFlower:{
        maxHp:350,
        name:'藤鞭怪',
        damage:4,
        range:3,
        reward:{fruit:2,seed:2,cirrus:2},
        chanceGet:{fruit:0.5,meat:0.5,cirrus:1},
        chaseChance:0.1,
    },
    crow:{
        maxHp:450,
        name:'乌鸦',
        damage:4,
        range:24,
        reward:{meat:2,wing:2},
        chanceGet:{feather:0.5}
    },
    bear:{
        maxHp:1050,
        name:'灰熊',
        damage:30,
        range:2,
        reward:{meat:5,bile:1,fur:2},
        chanceGet:{fur:0.7},
        chaseChance:0.6,
    },
    wolf:{
        maxHp:600,
        name:'鬼狼',
        damage:17,
        range:2,
        reward:{meat:2,teeth:2,fur:1},
        chanceGet:{meat:0.5,fur:0.7},
        chaseChance:0.9,
    },
    eagle:{
        maxHp:170,
        name:'老鹰',
        damage:15,
        range:16,
        reward:{meat:4,wing:2,feather:1,eagleEye:1},
        chanceGet:{wing:0.5,feather:0.7},
        chaseChance:0.7,
    },
    vulture:{
        maxHp:135,
        name:'秃鹫',
        damage:9,
        range:14,
        reward:{meat:2,wing:2,feather:1},
        chanceGet:{feather:0.5},
    },
    butterFly:{
        maxHp:132,
        name:'麻雀',
        damage:2,
        range:10,
        reward:{wing:1,feather:1,seed:2},
        chanceGet:{meat:0.5},
    },
    spider:{
        maxHp:175,
        name:'蛛魔',
        damage:25,
        range:10,
        reward:{spiderEgg:2,silk:1},
        chanceGet:{silk:0.7},
        chaseChance:0.6,
    },
    bigSpider:{
        maxHp:830,
        name:'蛛魔之后',
        damage:22,
        range:12,
        reward:{spiderHead:1,spiderEgg:3,silk:10,meat:2},
        chanceGet:{silk:0.7},
        chaseChance:0.4,
    },
    robber:{
        maxHp:145,
        name:'强盗',
        damage:15,
        range:3,
        reward:{humanMeat:1,gold :1},
        chanceGet:{gold:0.5},
        chaseChance:0.6,
    },
    robberHead:{
        maxHp:340,
        name:'强盗头目',
        damage:23,
        range:15,
        reward:{humanMeat:1,gold :10,misteryPot:1},
        chaseChance:0.4,
    },
    idolum :{
        maxHp:1000,
        name:'神秘雕像',
        damage:20,
        range:22,
        reward:{part:10,iron:5},
        chanceGet:{ironStatue:0.5},
        chaseChance:0.3,
    },
    bull :{
        maxHp:11000,
        name:'野牛',
        damage:20,
        range:1,
        reward:{meat:4,horn:1},
        chanceGet:{meat:0.5},
        chaseChance:0.3,
    },
    darkSoul:{
        maxHp:1200,
        name:'黑影',
        damage:55,
        range:9,
        reward:{misteryBox:1,darkDust:2,soul:20},
        chaseChance:100,
    },

    dragon:{
        maxHp:1000,
        hpMul:2,
        name:'幼龙',
        damage:35,
        range:4,
        reward:{dragonBone:2,soul:1},
        chanceGet:{dragonScale:0.2},
        chaseChance:0.7,
    },
    lightDragon:{
        maxHp:1500,
        hpMul:2,
        name:'光龙',
        damage:45,
        range:10,
        reward:{dragonBone:2,soul:1,dust:4},
        chanceGet:{dragonScale:0.2},
        chaseChance:0.7,
    },
    darkDragon:{
        maxHp:1250,
        hpMul:2,
        name:'暗龙',
        damage:65,
        range:6,
        reward:{dragonBone:2,soul:1,darkDust:1},
        chanceGet:{dragonScale:0.2},
        chaseChance:0.7,
    },
    dragonKing:{
        maxHp:10000,
        hpMul:5,
        name:'龙王',
        damage:80,
        range:6,
        reward:{dragonScale:3,dragonHead:1,soul:20},
        chaseChance:0,
    },

    pirate:{
        maxHp:3000,
        hpMul:2,
        name:'海盗',
        damage:45,
        range:1,
        reward:{gold:2,gem:3},
        chanceGet:{pirateHat:0.2},
        chaseChance:0.9,
    },
    siren:{
        maxHp:2000,
        hpMul:3,
        name:'海妖',
        damage:35,
        range:15,
        reward:{fish:2,crystal:2},
        chanceGet:{trident:0.1},
        chaseChance:0.6,
    },
    seaSnake:{
        maxHp:1000,
        hpMul:2,
        name:'海蛇',
        damage:85,
        range:2,
        reward:{teeth:2,snakeSkin:2},
        chanceGet:{trident:0.1},
        chaseChance:0.6,
    },
///==================================================================
//第1层
    woodMan :{
        maxHp:440,
        name:'木偶',
        damage:8,
        range:1,
        reward:{wood:4,gold:1},
        chanceGet:{soul:1},
        chaseChance:0.2,
    },
    skeleton:{
        maxHp:460,
        name:'骷髅',
        damage:12,
        range:1,
        reward:{bone:3,gold:1},
        chanceGet:{soul:0.5},
        chaseChance:0.3,
    },
    creeper:{
        maxHp:550,
        name:'匍匐怪',
        damage:8,
        range:1,
        reward:{meat:2,water:1},
        chanceGet:{teeth:0.8},
        chaseChance:0.3,
    },
    dust :{
        maxHp:440,
        name:'尘妖',
        damage:5,
        range:1,
        reward:{dust:4,soul:1},
        chanceGet:{fur:0.5},
        chaseChance:0.2,
    },

//===========
//第2层

    bat:{
        maxHp:535,
        name:'蝙蝠',
        damage:10,
        range:75,
        reward:{wing:2,teeth:2,gold:1},
        chanceGet:{meat:0.5},
        chaseChance:0.3,
    },
    skeletonShooter:{
        maxHp:546,
        name:'骷髅射手',
        damage:15,
        range:20,
        reward:{bone:2,arrow:8,gold:2,soul:1},
        chanceGet:{},
        chaseChance:0.3,
    },
    witch :{
        maxHp:580,
        name:'女巫学徒',
        damage:24,
        range:10,
        reward:{dust:2,crystal:2,gold:2},
        chanceGet:{staff:0.05},
        chaseChance:0.3,
    },
    magicPlant:{
        maxHp:680,
        name:'魔界盆栽',
        damage:25,
        range:12,
        reward:{teeth:1,flower:2,soul:1},
        chanceGet:{horn:0.6,darkDust:0.2},
        chaseChance:0.2,
    },
    fishman:{
        maxHp:655,
        name:'满潮鱼人',
        damage:12,
        range:1,
        reward:{fish:2},
        chanceGet:{
            jellyfish:0.5,
        },
        chaseChance:0.6,
    },
//===========
//第3层
    witch_2 :{
        maxHp:625,
        name:'火女巫',
        hpMul:3,
        damage:68,
        range:20,
        reward:{gem:1,crystal:2,soul:1,gold:2},
        chanceGet:{fireHeart:1,bloodHat:0.2},
        chaseChance:0.6,
    },
    witch_3 :{
        maxHp:635,
        name:'冰女巫',
        hpMul:3,
        damage:55,
        range:25,
        reward:{gem:1,crystal:2,soul:1,gold:2},
        chanceGet:{iceHeart:1,iceHat:0.2},
        chaseChance:0.6,
    },
    machine:{
        maxHp:760,
        name:'机械士兵',
        hpMul:8,
        damage:13,
        range:5,
        reward:{part:3,iron:8,soul:1,gold:2},
        chanceGet:{ironArm:0.05,mithril:0.1},
        chaseChance:0.6,
    },
    snake:{
        maxHp:710,
        name:'妖蛇',
        damage:55,
        range:1,
        reward:{teeth:2,poizon:2,meat:1,snakeSkin:1},
        chanceGet:{fireHeart:0.3},
        chaseChance:0.6,
    },
    griffin:{
        maxHp:750,
        name:'幻之狮鹫',
        hpMul:2,
        damage:35,
        range:12,
        reward:{fur:3,darkGold:1,meat:1,gold:2},
        chanceGet:{windKnife:0.2},
        chaseChance:0.6,
    },

//===========
//第4层
    woodMan_2 :{
        maxHp:840,
        name:'恶魔树根',
        hpMul:2,
        damage:50,
        range:1,
        reward:{wood:2,bark:2,soul:1,gold:3},
        chanceGet:{curseKnife:0.2},
        chaseChance:0.8,
    },
    metalBat:{
        maxHp:845,
        name:'机械蝙蝠',
        hpMul:2,
        damage:25,
        range:80,
        reward:{part:2,iron:2,soul:1,gold:3},
        chaseChance:0.6,
    },
    plant:{
        maxHp:800,
        name:'邪恶盆栽',
        hpMul:4,
        damage:45,
        range:5,
        reward:{soul:3,flower:8,gold:3},
        chanceGet:{darkDust:0.2},
        chaseChance:0.2,
    },
    springSprite:{
        maxHp:840,
        name:'泉之精灵',
        damage:35,
        range:1,
        reward:{soul:3,water:3,gold:3},
        chanceGet:{
            boneBar:0.1,
            spear:0.1,
            longSword:0.1,
            foolHammer:0.01,
            lightHammer:0.01,
        },
        chaseChance:0.2,
    },
    fireSnake:{
        maxHp:860,
        name:'烈焰妖蛇',
        damage:88,
        range:1,
        reward:{teeth:1,poizon:2,meat:2,snakeSkin:1},
        chanceGet:{meat:0.5,fireHeart:0.6},
        chaseChance:0.4,
    },
    mithrilSmith:{
        maxHp:818,
        name:'矮人铁匠',
        hpMul:3,
        damage:34,
        range:1,
        reward:{iron:8,gold:2},
        chanceGet:{
            mithril:0.5,
        },
        chaseChance:0.4,
    },

//===========
//第5层
    magicFrog:{
        maxHp:965,
        name:'蛤蟆术士',
        hpMul:2,
        damage:65,
        range:32,
        reward:{dust:4,crystal:2,water:2,gold:4},
        chanceGet:{
            healOverhang:0.1,
            blueHat:0.1,
        },
        chaseChance:0.4,
    },
    darkBat:{
        maxHp:1000,
        name:'暗影蝙蝠',
        hpMul:4,
        damage:55,
        range:200,
        reward:{wing:2,darkDust:2,soul:1,gold:4},
        chanceGet:{darkDust:0.5},
        chaseChance:0.8,
    },
    shootSnake:{
        maxHp:930,
        name:'深渊巨蟒',
        hpMul:2,
        damage:98,
        range:10,
        reward:{teeth:2,poizon:2,meat:3},
        chanceGet:{darkDust:0.2},
        chaseChance:0.7,
    },
    woodMan_3 :{
        maxHp:920,
        name:'木偶剑士',
        hpMul:17,
        damage:80,
        range:5,
        reward:{wood:2,bark:2,soul:4,gold:4},
        chanceGet:{
            magicSword:0.1
        },
        chaseChance:0.7,
    },
    witch_4 :{
        maxHp:1200,
        name:'魅惑女王',
        hpMul:20,
        damage:99,
        range:35,
        reward:{gem:4,crystal:4,soul:4,gold:8},
        chanceGet:{
            lightHat:0.05,
            starStaff:0.05,
        },
        chaseChance:0.2,
    },
    group:{
        maxHp:1150,
        name:'恶魔守卫',
        hpMul:20,
        damage:75,
        range:15,
        reward:{darkDust:4,soul:4,gold:8},
        chanceGet:{
            evilSword:0.1,
            misteryBox:0.1,
        },
        chaseChance:0.2,
    },

    mithril:{
        maxHp:0150,
        name:'银色骑手',
        hpMul:8,
        damage:75,
        range:15,
        reward:{mithril:2,gold:2},
        chanceGet:{
            mithril:0.5,
        },
        chaseChance:0.4,
    },

//===========
//第6层
    magicSkeleton:{
        maxHp:1100,
        name:'骷髅法师',
        hpMul:20,
        damage:326,
        range:25,
        reward:{crystal:3,bone:4,soul:1,gold:8},
        chanceGet:{
            poizonStaff:0.1,
            iceStaff:0.1,
            fireStaff:0.1,
        },
        chaseChance:0.6,
    },
    warriorSkeleton:{
        maxHp:1200,
        hpMul:20,
        name:'骷髅剑士',
        damage:196,
        range:5,
        reward:{crystal:3,bone:4,soul:1,gold:8},
        chanceGet:{
            blockAxe:0.03,
            darkGoldAxe:0.03,
            lightHammer:0.03,
            teethAxe:0.03,
        },
        chaseChance:0.6,
    },
    waterLord:{
        maxHp:1300,
        name:'潮汐领主',
        hpMul:10,
        damage:326,
        range:25,
        reward:{iceHeart:2,crystal:3,gold:8},
        chanceGet:{
            frostStaff:0.1,
        },
        chaseChance:0.5,
    },
    fireLord:{
        maxHp:1300,
        name:'火焰领主',
        hpMul:10,
        damage:426,
        range:35,
        reward:{fireHeart:2,crystal:3,gold:8},
        chanceGet:{
            fireSword:0.1,
        },
        chaseChance:0.5,
    },
    abyssLord:{
        maxHp:1450,
        name:'深渊领主',
        hpMul:10,
        damage:526,
        range:28,
        reward:{darkDust:2,crystal:3,gold:8},
        chanceGet:{
            darkGun:0.1,
        },
        chaseChance:0.5,
    },
    skyLord:{
        maxHp:1500,
        name:'天空领主',
        hpMul:10,
        damage:426,
        range:15,
        reward:{gem:2,crystal:5,gold:8},
        chanceGet:{
            lightBow:0.1,
        },
        chaseChance:0.5,
    },

//===========
//第7层
    punchSkeleton:{
        maxHp:1500,
        name:'骷髅拳师',
        hpMul:10,
        damage:700,
        range:1,
        reward:{crystal:10,bone:4,soul:1,gold:12},
        chanceGet:{
            dexGlove:0.1,
        },
        chaseChance:0.6,
    },
    lordSkeleton:{
        maxHp:1500,
        name:'骷髅领主',
        hpMul:10,
        damage:500,
        range:5,
        reward:{crystal:8,bone:4,soul:1,gold:12},
        chanceGet:{
            skSowrd:0.1,
        },
        chaseChance:0.6,
    },
    queenSkeleton:{
        maxHp:1350,
        name:'骷髅女王',
        hpMul:20,
        damage:700,
        range:25,
        reward:{crystal:8,bone:4,soul:1,gold:12},
        chanceGet:{
            skStaff:0.1,
            charmRing:0.1,
        },
        chaseChance:0.6,
    },
    blackMist:{
        maxHp:1400,
        hpMul:100,
        name:'黑雾',
        damage:2000,
        range:100,
        reward:{darkGold:10},
        chanceGet:{
            evilSpear:0.2,
        },
        chaseChance:0,
    },
    whiteMist:{
        maxHp:1400,
        hpMul:100,
        name:'白雾',
        damage:2000,
        range:100,
        reward:{gem:10},
        chanceGet:{
            blessingOverhang:0.2,
        },
        chaseChance:0,
    },

//===========
//第8层
    fireDragon:{
        maxHp:1620,
        name:'炼狱龙',
        hpMul:10,
        damage:800,
        range:1,
        reward:{crystal:8,dragonBone:8,fireHeart:1,gold:8},
        chanceGet:{
            dragonScale:0.5,
        },
        chaseChance:0.6,
    },
    iceDragon:{
        maxHp:1620,
        name:'寒霜龙',
        hpMul:10,
        damage:680,
        range:6,
        reward:{crystal:8,dragonBone:8,iceHeart:1,gold:8},
        chanceGet:{
            dragonScale:0.5,
        },
        chaseChance:0.6,
    },
//===========
//第9层
    vampire:{
        maxHp:1720,
        name:'吸血鬼',
        hpMul:20,
        damage:1000,
        range:1,
        reward:{gold:20},
        chanceGet:{
            curseSword:0.02,
            countJacket:0.1,
        },
        chaseChance:0.6,
    },
    vampireGirl:{
        maxHp:1725,
        name:'吸血鬼妖女',
        hpMul:22,
        damage:1100,
        range:1,
        reward:{gold:30},
        chanceGet:{
            curlLance:0.1,
        },
        chaseChance:0.6,
    },
//===========
//第10层
    uang:{
        maxHp:1845,
        name:'独角仙',
        hpMul:22,
        damage:2000,
        range:1,
        reward:{gold:80},
        chanceGet:{
            uangKnife:0.3,
        },
        chaseChance:0.6,
    },
    singleEye:{
        maxHp:1846,
        name:'独眼鬼',
        hpMul:22,
        damage:2000,
        range:1,
        reward:{gold:80},
        chanceGet:{
            concentrateHat:0.1,
        },
        chaseChance:0.6,
    },
    superMan:{ 
        maxHp:1834,
        name:'假面人',
        hpMul:22,
        damage:2400,
        range:1,
        reward:{gold:80},
        chanceGet:{
            smCloak:0.2,
        },
        chaseChance:0.6,
    },
//===========
//第11层
    titan:{
        maxHp:2000,
        name:'泰坦',
        hpMul:24,
        damage:3000,
        range:1,
        reward:{gold:120},
        chanceGet:{
            superGlove:0.1,
        },
        chaseChance:0.4,
    },
    bomberman:{
        maxHp:2600,
        name:'炸弹突袭者',
        hpMul:10,
        damage:5000,
        range:10,
        reward:{gold:120},
        chanceGet:{
            bumbHat:0.1,
        },
        chaseChance:0.2,
    },
    rainbowPeacock:{ 
        maxHp:2540,
        name:'彩虹孔雀',
        hpMul:22,
        damage:2400,
        range:20,
        reward:{gold:120},
        chanceGet:{
            rainbowBow:0.1,
        },
        chaseChance:0.6,
    },

//===========
//第12层
    hundredGiant:{
        maxHp:2800,
        name:'百眼巨人',
        hpMul:22,
        damage:4500,
        range:1,
        reward:{gold:200},
        chanceGet:{
            giantBrassart:0.1,
        },
        chaseChance:0.5,
    },
    iceMustache:{
        maxHp:2860,
        name:'冰胡子',
        hpMul:8,
        damage:4000,
        range:80,
        reward:{gold:150},
        chanceGet:{
            iceGlove:0.1,
        },
        chaseChance:0.2,
    },

    seaDragon:{
        maxHp:2866,
        name:'海之龙',
        hpMul:16,
        damage:5000,
        range:8,
        reward:{gold:150,fish:5,water:2},
        chanceGet:{
            waterHorn:0.1,
        },
        chaseChance:0.2,
    },

//===========
//第13层
    degeneratePaladin:{
        maxHp:3100,
        name:'堕落骑士',
        hpMul:62,
        damage:12000,
        range:1,
        reward:{gold:300},
        chanceGet:{
            shelter:0.05,
            blessingHammer:0.05
        },
        chaseChance:0.5,
    },
    kiteHawk:{
        maxHp:3200,
        name:'夜隼',
        hpMul:40,
        damage:15000,
        range:10,
        reward:{gold:300},
        chanceGet:{
            chargeShirt:0.1,
        },
        chaseChance:0.5,
    },
    mandara:{
        maxHp:3300,
        name:'曼陀罗草',
        hpMul:100,
        damage:15000,
        range:1,
        reward:{gold:300},
        chanceGet:{
            bass:0.2,
        },
        chaseChance:0.5,
    },

//===========
//第14层
    chimera:{
        maxHp:3400,
        name:'奇美拉',
        hpMul:200,
        damage:49000,
        range:22,
        reward:{gold:400},
        chanceGet:{
            emeraldJade:0.1,
        },
        chaseChance:0.5,
    },
    hellGladiator:{
        maxHp:3500,
        name:'地狱角斗士',
        hpMul:200,
        damage:59000,
        range:3,
        reward:{gold:400},
        chanceGet:{
            breakSword:0.05,
            shootShoe:0.05,
        },
        chaseChance:0.5,
    },
    fuseGiant:{
        maxHp:3600,
        name:'冰霜守护者',
        hpMul:300,
        damage:28000,
        range:1,
        reward:{gold:400},
        chanceGet:{
            iceShoe:0.1,
        },
        chaseChance:0.5,
    },

//===========
//第15层
    chaos:{
        maxHp:3720,
        name:'混沌',
        hpMul:200,
        damage:45000,
        range:50,
        reward:{gold:400},
        chanceGet:{
            chaos:0.2,
        },
        chaseChance:0,
    },
    vanity:{
        maxHp:3820,
        name:'虚无',
        hpMul:200,
        damage:45000,
        range:50,
        reward:{gold:400},
        chanceGet:{
            vanity:0.2,
        },
        chaseChance:0,
    },
    nightmare:{
        maxHp:3920,
        name:'噩梦',
        hpMul:200,
        damage:45000,
        range:50,
        reward:{gold:400},
        chanceGet:{
            nightmare:0.2,
        },
        chaseChance:0,
    },
    ///

//===========
//第16层
    ethereal:{
        maxHp:4100,
        name:'星尘歼灭者',
        hpMul:200,
        damage:45000,
        range:50,
        reward:{gold:400},
        chanceGet:{
            forgetClaw:0.2,
        },
        chaseChance:0,
    },
    guard:{
        maxHp:4200,
        name:'星尘守卫者',
        hpMul:200,
        damage:45000,
        range:50,
        reward:{gold:400},
        chanceGet:{
            forgetCoat:0.2,
        },
        chaseChance:0,
    },
    stardustFish:{
        maxHp:4300,
        name:'星尘鱼',
        hpMul:10,
        damage:36000,
        range:12,
        reward:{gold:600},
        chanceGet:{
            forgetShoe:0.2,
        },
        chaseChance:0.5,
    },
    ///

    _robber:{
        maxHp:10000,
        name:'盗贼',
        damage:5,
        range:1,
        chanceGet:{
        },
        chaseChance:100,
    }

}
