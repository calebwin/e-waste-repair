/*
TODO
- Removing electronics from electronics[] should not break the game
*/

var widths, heights;
var imgx = 80;
var imgy = 80;

var brokencamera1, brokenflipphone1, brokenfridge1, brokenipad, brokenipod1, brokenlaptop2, brokenmac2, brokenmicrowave1, brokenphone1, brokenPhone2, brokenradio1, brokenspeaker1, brokenTV1, brokenwm1, brokenCPU, brokenipad2, BrokenKeyboard, BrokenMouse, brokenoven;
var electronicsData;
var loseScreenY,loseScreenYTo;
var fR;    
var electronics;
var fixingStations;

var mouseIsClicked;

function spawnElectronics() {
    var eDI = electronicsData[floor(random(0,electronicsData.length))];
    electronics.push({
        x : width*9/10-40-30,
        toX : width*9/10-40-30,
        y : -60,
        toY : -60,
        w : eDI.width,
        h : eDI.height,
        state : "onBelt",
        name : eDI.name,
		image : eDI.image,
        damage : eDI.damage,
        toxinCount : eDI.toxinCount,
        counts : eDI.counts,
        peopleDamage : eDI.peopleDamage,
        timeToFix : eDI.timeToFix-(peopleCount-3)>2?eDI.timeToFix-(peopleCount-3):2,
        value : eDI.value,
        fixCost : eDI.fixCost,
        manualRequired : eDI.manualRequired,
        fixingStation : -1
    });
}
var fixingStationsOpen;
var recycleStationOpen;

var SPAWN_RATE;

var health, money, toolCount, manualCount, peopleCount, toxinCount;
var counts;
var toolBuyOn = true;

var conveyorBeltSpeed;

var message;
var messageY;
var messageToY;
var messageTime;
function postMessage(messageToSet) {
	message=messageToSet;
	messageY = -50;
	messageToY = 65;
	messageTime = 240;
}
function postMessage(messageToSet, time) {
	message=messageToSet;
	messageY = -50;
	messageToY = 65;
	messageTime = time;
}

var messages;
function addMessage(x,y,msg) {
    messages.push({
        x : x,
        y : y,
        msg : msg,
        alpha : 355
    });
}

var tutorial;
var tutorialIndex;
var paused;

var popups;

var finalmessagegroups;
function preload() {
    //alert(4);
	brokencamera1 = loadImage("assets/brokencamera1.png");
	brokenflipphone1 = loadImage("assets/brokenflipphone1.png");
	brokenfridge1 = loadImage("assets/brokenfridge1.png");
	brokenipad = loadImage("assets/brokenipad.png");
	brokenipod1 = loadImage("assets/brokenipod1.png");
	brokenlaptop2 = loadImage("assets/brokenlaptop2.png");
	brokenmac2 = loadImage("assets/brokenmac2.png");
	brokenmicrowave1 = loadImage("assets/brokenmicrowave1.png");
	brokenphone1 = loadImage("assets/brokenphone1.png");
	brokenPhone2 = loadImage("assets/brokenPhone2.png");
	brokenradio1 = loadImage("assets/brokenradio.png");
	brokenspeaker1 = loadImage("assets/brokenspeaker1.png");
	brokenTV1 = loadImage("assets/brokenTV1.png");
	brokenwm1 = loadImage("assets/brokenwm1.png");
    //brokenCPU = loadImage("assets/brokenCPU.png");
    brokenipad2 = loadImage("assets/brokenipad2.png");
    BrokenKeyboard = loadImage("assets/BrokenKeyboard.png");
    BrokenMouse = loadImage("assets/BrokenMouse.png");
    brokenoven = loadImage("assets/brokenoven.png");
}

function setup() {
    //alert(5);
    width = windowWidth;
    height = windowHeight;
    createCanvas(width, height);
	electronicsData = [
		{
			name : "Canon Powershot",
			image : brokencamera1,
			width : 70,
			height : 40,
			damage : 20,
			peopleDamage : 0,
			timeToFix : 3,
			value : 680,
			fixCost : 160,
			manualRequired: 1,
            toxinCount: 5,
            counts: [
                {
                    countName : "Lead",
                    count : 639
                },
                {
                    countName : "Cadmium",
                    count : 7
                }
            ]
		},
		{
			name : "Nokia 6350",
			image : brokenflipphone1,
			width : 40,
			height : 70,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 6,
			value : 300,
			fixCost : 140,
			manualRequired: 3,
            toxinCount: 5,
            counts: [
                {
                    countName : "Lead",
                    count : 800
                },
                {
                    countName : "Cadmium",
                    count : 31
                }
            ]
		},
		{
			name : "iPod Classic",
			image : brokenipod1,
			width : 40,
			height : 60,
			damage : 50,
			peopleDamage : 0,
			timeToFix : 5,
			value : 420,
			fixCost : 100,
			manualRequired: 3,
            toxinCount: 10,
            counts: [
                {
                    countName : "Lead",
                    count : 375
                },
                {
                    countName : "Cadmium",
                    count : 5
                }
            ]
		},
		{
			name : "Blackberry MHz GSM/GPRS",
			image : brokenphone1,
			width : 25,
			height : 50,
			damage : 50,
			peopleDamage : 1,
			timeToFix : 4,
			value : 100,
			fixCost : 20,
			manualRequired: 5,
            toxinCount: 10,
            counts: [
                {
                    countName : "Lead",
                    count : 800
                },
                {
                    countName : "Cadmium",
                    count : 31
                }
            ]
		},
		{
			name : "Galaxy Portal",
			image : brokenPhone2,
			width : 30,
			height : 50,
			damage : 50,
			peopleDamage : 0,
			timeToFix : 6,
			value : 620,
			fixCost : 130,
			manualRequired: 7,
            toxinCount: 10,
            counts: [
                {
                    countName : "Lead",
                    count : 470
                },
                {
                    countName : "Cadmium",
                    count : 70
                }
            ]
		},
		{
			name : "Logitech S120",
			image : brokenspeaker1,
			width : 30,
			height : 60,
			damage : 50,
			peopleDamage : 0,
			timeToFix : 7,
			value : 80,
			fixCost : 40,
			manualRequired: 7,
            toxinCount: 5,
            counts: [
                {
                    countName : "Lead",
                    count : 260
                },
                {
                    countName : "Cadmium",
                    count : 21
                }
            ]
		},
		{
			name : "iPad 2",
			image : brokenipad,
			width : 150,
			height : 70,
			damage : 50,
			peopleDamage : 2,
			timeToFix : 10,
			value : 150,
			fixCost : 70,
			manualRequired: 9,
            toxinCount: 10,
            counts: [
                {
                    countName : "Lead",
                    count : 470
                },
                {
                    countName : "Cadmium",
                    count : 76
                }
            ]
		},
		{
			name : "Hamilton Beach Microwave",
			image : brokenmicrowave1,
			width : 120,
			height : 40,
			damage : 50,
			peopleDamage : 0,
			timeToFix : 12,
			value : 150,
			fixCost : 80,
			manualRequired: 11,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 2.5
                },
                {
                    countName : "Cadmium",
                    count : 105
                }
            ]
		},
		{
			name : "Toshiba Satellite",
			image : brokenlaptop2,
			width : 130,
			height : 70,
			damage : 5,
			peopleDamage : 1,
			timeToFix : 14,
			value : 800,
			fixCost : 250,
			manualRequired: 11,
            toxinCount: 10,
            counts: [
                {
                    countName : "Lead",
                    count : 780
                },
                {
                    countName : "Cadmium",
                    count : 29
                }
            ]
		},
		{
			name : "iMac Pro",
			image : brokenmac2,
			width : 130,
			height : 70,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 16,
			value : 1200,
			fixCost : 500,
			manualRequired: 13,
            toxinCount: 10,
            counts: [
                {
                    countName : "Lead",
                    count : 500
                },
                {
                    countName : "Cadmium",
                    count : 98
                }
            ]
		},
		{
			name : "Whirlpool Refrigerator",
			image : brokenfridge1,
			width : 130,
			height : 160,
			damage : 15,
			peopleDamage : 1,
			timeToFix : 18,
			value : 800,
			fixCost : 300,
			manualRequired: 15,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 500
                },
                {
                    countName : "Cadmium",
                    count : 16
                }
            ]
		},
		{
			name : "Quantum FX Radio",
			image : brokenradio1,
			width : 60,
			height : 65,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 6,
			value : 70,
			fixCost : 30,
			manualRequired: 15,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 24
                },
                {
                    countName : "Cadmium",
                    count : 6
                }
            ]
		}, // Adjust
		{
			name : "Samsung Smart TV",
			image : brokenTV1,
			width : 140,
			height : 80,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 4,
			value : 700,
			fixCost : 250,
			manualRequired: 17,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 557
                },
                {
                    countName : "Cadmium",
                    count : 78
                }
            ]
		}, // Adjust
		{
			name : "Kenmore Washing Machine",
			image : brokenwm1,
			width : 120,
			height : 160,
			damage : 15,
			peopleDamage : 2,
			timeToFix : 7,
			value : 400,
			fixCost : 150,
			manualRequired: 19,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 991
                },
                {
                    countName : "Cadmium",
                    count : 9
                }
            ]
		}, // Adjust
		/*{
			name : "Dell Inspiron",
			image : brokenCPU,
			width : 40,
			height : 70,
			damage : 15,
			peopleDamage : 1,
			timeToFix : 6,
			value : 950,
			fixCost : 300,
			manualRequired: 19,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 600
                },
                {
                    countName : "Cadmium",
                    count : 57
                }
            ]
		},*/ // Adjust
		{
			name : "iPad Pro",
			image : brokenipad2,
			width : 80,
			height : 80,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 5,
			value : 650,
			fixCost : 150,
			manualRequired: 21,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 477
                },
                {
                    countName : "Cadmium",
                    count : 76
                }
            ]
		}, // Adjust
		{
			name : "Magic Keyboard",
			image : BrokenKeyboard,
			width : 25,
			height : 15,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 3,
			value : 50,
			fixCost : 15,
			manualRequired: 23,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 50
                },
                {
                    countName : "Cadmium",
                    count : 23
                }
            ]
		}, // Adjust
		{
			name : "Magic Mouse",
			image : BrokenMouse,
			width : 12,
			height : 30,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 2,
			value : 50,
			fixCost : 15,
			manualRequired: 23,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 40
                },
                {
                    countName : "Cadmium",
                    count : 28
                }
            ]
		}, // Adjust
		{
			name : "Kenmore Elite 49113",
			image : brokenoven,
			width : 70,
			height : 40,
			damage : 15,
			peopleDamage : 0,
			timeToFix : 4,
			value : 500,
			fixCost : 180,
			manualRequired: 25,
            toxinCount: 2,
            counts: [
                {
                    countName : "Lead",
                    count : 456
                },
                {
                    countName : "Cadmium",
                    count : 13
                }
            ]
		}, // Adjust
	];
    loseScreenY = -height;
    loseScreenYTo = -height;
    fR = 0;
    electronics = [];
    fixingStations = [
        {
            open : true
        },
        {
            open : true
        },
        {
            open : true
        }
    ];
    mouseIsClicked = false;
    fixingStationsOpen = 3;
    recycleStationOpen = true;
    SPAWN_RATE = 170
    health = 250;
    money = 750;
    toolCount = 5;
    manualCount = 5;
    peopleCount = 3;
    toxinCount = 0;
    conveyorBeltSpeed = 2;
    message = "";
    messageY = -50;
    messageToY = -50;
    messageTime = 180;
    messages = [];
    counts = [
        {
            countName : "Lead",
            count : 0
        },
        {
            countName : "Cadmium",
            count : 0
        }
    ];
    tutorial = [
        "Welcome to Salvage, a game about e-waste prevention!",
        "Did you know that 40 million tons of electronic devices are thrown away each year?",
        "These electronic devices contain harmful materials, like lead, cadmium, and mercury.",
        "60% of these end up in landfills, where these toxins leach into the soil and water.",
        "The easiest way to fix this is by repairing or recycling old electronics instead of trashing them",
        "See that conveyor belt below and those 4 fixing stations? No? \n We'll get to that. But for now FYI : \nYou are running an electronics repair shop.",
        "By fixing devices, you are reducing the number of\ndevices that either end up in a landfill or are shipped to developing countries.",
        "These devices are often burned in unsafe conditions, releasing toxins into \nthe environment. This has numerous effects on human health,\n wildlife health, air quality, water quality, etc.",
        "Be part of the solution by repairing electronics and increasing their lifespan or by \nsending them to formal recycling plants where they \ncan be safely dismantled and the materials can be resold.",
        "At the start of this game, you will see electronics falling onto the conveyor belt. \nClick the items to send them to one of the open fixing stations below the conveyor belt.",
        "There are 3 fixing stations and a fourth station for recycling the electronics you don't \nhave time to fix. You can send electronics to the recycling stations when all your \nother stations are full.",
        "By the way, sending your e-waste to the recycle station to be taken to a recycling \ncenter earns you money and doesn't reduce your health but does temporarily slow down your fixing stations.",
        "If you don't send the e-waste to a fixing station or the recycling station, it will be sent \nto a landfill once it exits the conveyor belt.",
        "Sending an item to the landfill decreases your health (shown on the top left) as well as \na count of the number of toxins the e-waste you have trashed has released into the environment.",
        "To speed up your fixing stations, you can buy tools or hire people. Your goal is simply\n to earn as much money up to $1500 without losing all your health.",
        "There is one more thing you need to know.",
        "Before you fix something, you have to know how to fix it. So you have to first own the manual\n for a device before you can fix it.",
        "At first, you only own the first 5 manuals. You can always buy more by clicking the button \nat the bottom. As you buy manuals you will be able to fix more electronics.",
        "As buy more tools and hire more people, you fix electronics faster.",
        "Alright.",
        "Quick recap : Click things to start fixing them. Buy tools and hire people to fix things faster. \nBuy manuals to be able to fix more electronics. Earn up to $1500 without losing all your health.",
        "Are you ready?",
    ];
    tutorialIndex = 0;
    paused = true;
    postMessage(tutorial[tutorialIndex] +"\n(Click to continue)", Math.POSITIVE_INFINITY);
    popups = [
        "You caused 10 people to be hospitalized after drinking chromium contaminated water.",
        "You have caused 5 fish to die due to flame retardants leaching into pond water.",
        "You have increased the risk of babies to be born with impaired brain function due to lead poisoning.",
        "You have increased the risk of lung cancer due to arsenic poisoning.",
        "You have increased the risk of kidney disease due to increased cadmium in rice.",
        "You have increased the risk for babies to be born with growth  defects due to mercury poisoning.",
        "You have increased the risk of lung damage due to lithium being released into the air.",
        "Your plants are decaying due to brominated flame retardants leaching into the soil.",
        "There is less mutton in stores as cows die after consuming PCBs in livestock feed.",
    ];
    finalmessagegroups = [
        [
            "No fish died due to toxins leaching into aquatic environments.",
            "Nobody experienced adverse health effects due to drinking contaminated water.",
            "Fewer children are suffering from birth defects and neurological conditions due to lead and mercury in the environment.",
            "The air quality has improved and lung cancer incidence has decreased.",
        ],
        [
            "You caused 10 fish to die due to toxins leaching into aquatic environments.",
            "You caused 5 people to become sick after drinking contaminated water.",
            "You increased the risk by 2% for children to suffer from birth defects and neurological conditions due to lead and mercury in the environment.",
            "You caused the air quality to decrease by 2%, and lung cancer incidence has increased.",
        ],
        [
            "You caused 20 fish to die due to toxins leaching into aquatic environments.",
            "You caused 10 people to become sick after drinking contaminated water.",
            "You increased the risk by 5% for children to suffer from birth defects and neurological conditions due to lead and mercury in the environment.",
            "You caused the air quality to decrease by 5%, and lung cancer incidence has increased."
        ]
    ];
}

function draw() {
    background(204, 177, 130);
    textFont("serif");
    fR++;
	
    if(mouseIsClicked&&paused) {
        tutorialIndex++;
        postMessage(tutorial[tutorialIndex] +"\n(Click to continue)", Math.POSITIVE_INFINITY);
        if(tutorialIndex===tutorial.length) {
            paused=false;
            postMessage("Let's begin.");
        }
    }
    
    for(var i = 0; i < messages.length; i++) {
        messages[i].y-=0.5;
        messages[i].alpha-=5;
        fill(73, 63, 46, messages[i].alpha);
        text(messages[i].msg,messages[i].x,messages[i].y);
        if(messages[i].alpha<0) {
            messages.splice(i,1);
        }
    }
    
    textSize(20);
	textAlign(CENTER, CENTER);
	messageY+=(messageToY-messageY)/10;
	text(message, width/2, messageY);
	messageTime--;
	if(messageTime<0) {
		messageToY = -50;
	}
    
    textSize(30);
	fill(73, 63, 46);
    
    textAlign(LEFT,CENTER);
    text(health + " HP", 50, 50);
    text(toxinCount + " Toxins (PPM)", 50, 80);
    textAlign(RIGHT,CENTER);
    text(money + "$", width-50, 50);
    
    // Draw conveyor belt
    rect(width/10, height/2-100, width*8/10, 30);
    
    if(fR % SPAWN_RATE === 0 && health>0 && !paused) {
        spawnElectronics();
    }
    
    // Draw fixing stations
	fill(168, 145, 106);
    rect(width*1/5-75,height/2-70+40,150,150);
    rect(width*2/5-75,height/2-70+40,150,150);
    rect(width*3/5-75,height/2-70+40,150,150);
    rect(width*4/5-75,height/2-70+40,150,150);
    
	fill(73, 63, 46);
	
    // Draw electronics
    for(var i = 0; i < electronics.length; i++) {
        var eI = electronics[i];
        // Move electronics
        textAlign(CENTER,CENTER);
        image(eI.image,eI.x,eI.y,eI.w,eI.h);
        textSize(15);
        text(eI.name,eI.x+eI.w/2,eI.y-15);
        if(health>0 && !paused) {
            eI.x+=(eI.toX-eI.x)/5;
            eI.y+=(eI.toY-eI.y)/5;
            if(eI.state==="toTrash" || eI.state==="inTrash" || eI.state==="onBelt") {
                if(eI.y+eI.h>=height/2-100) {
                    if(eI.x+eI.w<width/10) {
                        eI.toY += 5;
                        if(eI.state === "toTrash" || eI.state === "inTrash") {
                            eI.state = "inTrash";
                        } else {
                            eI.state = "toTrash";
                        }
                        if(eI.state==="toTrash") {
                            addMessage(eI.x+eI.w/2,eI.y-40,"Sent to landfill");
                            health -= eI.damage;
                            peopleCount -= eI.peopleDamage;
                            toxinCount += eI.toxinCount;
                            for(var j = 0; j < eI.counts.length; j++) {
                                counts[j].count+=eI.counts[j].count;
                            }
                            if(toxinCount%15<5) {
                                var countToChoose = counts[floor(random(0,counts.length))];
                                postMessage("You let 1 " + eI.name + " be sent to an e-waste dump contributing \n" + toxinCount + " toxins (PPM) and " + countToChoose.count + " grams of " + countToChoose.countName + " to the environment.\n" + popups[floor(random(0,popups.length))]);
                            }
                            if(peopleCount<0) {
                                peopleCount=0;
                            }
                        }
                        if(eI.x+eI.w<0) {
                            electronics.splice(i,1);
                        }
                    } else {
                        eI.toY=height/2-100-eI.h;
                    }
                    eI.toX -= conveyorBeltSpeed;
                } else {
                    eI.toY+=5;
                }
            }
        
            // Electronics interaction
            if(mouseIsClicked && mouseOver(eI.x,eI.y,eI.w,eI.h)) {
                if(eI.state==="onBelt") {
                    if(fixingStationsOpen > 0) {
                        if(eI.manualRequired<=manualCount) {
                            if(peopleCount>0) {
                                eI.state="onFixingStation";
                                if(fixingStations[0].open) {
                                    eI.toX=width*1/5-eI.w/2;
                                    eI.toY=height/2+40-eI.h/2;
                                    fixingStations[0].open = false;
                                    eI.fixingStation = 0;
                                } else if(fixingStations[1].open) {
                                    eI.toX=width*2/5-eI.w/2;
                                    eI.toY=height/2+40-eI.h/2;
                                    fixingStations[1].open = false;
                                    eI.fixingStation = 1;
                                } else if(fixingStations[2].open) {
                                    eI.toX=width*3/5-eI.w/2;
                                    eI.toY=height/2+40-eI.h/2;
                                    fixingStations[2].open = false;
                                    eI.fixingStation = 2;
                                }
                                fixingStationsOpen--;
                            } else {
                                // you don't have any people
                                postMessage("You don't have any people to fix that. \nGo hire more people.")
                            }
                        } else {
                            // you don't have the manual
                            postMessage("You don't have manual #"+eI.manualRequired+" to fix "+eI.name+". \nGo buy more manuals");
                        }
                    } else {
                        if(recycleStationOpen) {
                            for(var j = 0; j < electronics.length; j++) {
                                electronics[j].timeToFix++;
                            }
                            eI.toX=width*4/5-eI.w/2;
                            eI.toY=height/2+40-eI.h/2;
                            eI.state = "recycling";
                            eI.timeToFix = 2;
                            recycleStationOpen=false;
                        } else {
                            // you don't have any stations open
                            postMessage("You don't have any open fixing stations. \nGo buy more workers and tools to get electronics fixed faster.");
                        }
                    }
                }
            }
        }
        
        // Electronics fixing
        textSize(15);
        textAlign(CENTER,CENTER);
        if(eI.state==="onFixingStation") {
            if(fR % 120 === 0 && health > 0) {
                eI.timeToFix--;
                if(eI.timeToFix <= 0) {
                    eI.state="fixed";
                    eI.toY = height+30;
                    fixingStations[eI.fixingStation].open=true;
                    eI.fixingStation = -1;
                    fixingStationsOpen++;
                    money += eI.fixCost;
                }
            }
            text(round(eI.timeToFix) + " hours to fix", eI.toX+eI.w/2, height/2-70+40 + 150 + 30)
        }
        
        if(eI.state==="recycling") {
            if(fR % 120 === 0 && health > 0) {
                eI.timeToFix--;
                if(eI.timeToFix <= 0) {
                    eI.state="recycled";
                    eI.toY = height+30;
                    recycleStationOpen=true;
                    money += eI.value*10/100;
                }
            }
            text(round(eI.timeToFix) + " hours to recycle", eI.toX + eI.w/2, height/2-70+40 + 150 + 30)
        }
    
        if(eI.y>height) {
            electronics.splice(i,1);
        }
    }
        
    // Draw buttons
    textAlign(CENTER,CENTER);
    textSize(20);
    // Tool/People buy buttons
	fill(73, 63, 46);
    rect(width*1/5-75,height/2-70+40+220,width*1/5+150,50);
    fill(214, 183, 130);

    if(toolBuyOn) {
        text("Buy tools (1 for $75 )",width*1/5-75+width*1/10+75,height/2-70+40+220+25);
        if(mouseOver(width*1/5-75,height/2-70+40+220,width*1/5+150,50)) {
            if(mouseIsClicked) {
                if(money-75>=0) {
                    money -= 75;
                    toolCount += 1;
					toolBuyOn=false;
					for(var j = 0; j < electronicsData.length; j++) {
						if(electronicsData[j].timeToFix>2) {
							electronicsData[j].timeToFix-=0.3;
						}
					}
					for(var j = 0; j < electronics.length; j++) {
						if(electronics[j].timeToFix>2) {
							electronics[j].timeToFix-=0.3;
						}
					}
                }
            }
        }
    } else {
        text("Hire people (1 for $200 )",width*1/5-75+width*1/10+75,height/2-70+40+220+25);
        if(mouseOver(width*1/5-75,height/2-70+40+220,width*1/5+150,50)) {
            if(mouseIsClicked) {
                if(money-200>=0) {
                    money -= 200;
                    peopleCount += 1;
					toolBuyOn=true;
                }
            }
        }
    }
    // Manual buy buttons
	fill(73, 63, 46);
    rect(width*3/5-75,height/2-70+40+220,width*1/5+150,50);
    fill(214, 183, 130);
    if(manualCount<13) {
        text("Buy manuals (1 for $65)",width*3/5-75+width*1/10+75,height/2-70+40+220+25);
    } else {
        text("Buy manuals (1 for $95)",width*3/5-75+width*1/10+75,height/2-70+40+220+25);
    }
    
	fill(73, 63, 46);
    textSize(15);
    text("You have " + toolCount + " tools and " + peopleCount + " people",width*1/5-75+width*1/10+75,height/2-70+40+220+65);
    text("You have " + manualCount + " manuals",width*3/5-75+width*1/10+75,height/2-70+40+220+65);
    if(mouseOver(width*3/5-75,height/2-70+40+220,width*1/5+150,50)) {
        if(mouseIsClicked) {
            if(manualCount < 13) {
                if(money-65>=0) {
                    money -= 65;
                    manualCount += 1;
                }
            } else {
                if(money-95>=0) {
                    money -= 95;
                    manualCount += 1;
                }
            }
        }
    }
    
    if(health<=0 || money > 1500) {
        health=0;
        loseScreenYTo = 0;
        randomSeed(frameCount);
    }
    loseScreenY+=(loseScreenYTo-loseScreenY)/10;
    push();
    translate(0,loseScreenY);
    fill(73, 63, 46, 230);
    rect(width/7,height/7,width*5/7,height*5/7)
    textSize(50);
    fill(204, 177, 130);
    if(money-750>1500) {
        text("You earned " + (money-750)>0?(money-750):money + "$ (You won!)", width/2, height/2 - 100);
    } else {
        text("You earned " + (money-750)>0?(money-750):money + "$", width/2, height/2 - 100);
    }
    textSize(15);
    text("(...out of $1500) In the process...", width/2, height/2 - 70)
    textSize(20);
    text("You contributed " + toxinCount + " toxins (PPM) to the environments surrounding e-waste dumps \nincluding Agbogbloshie in Ghana and Guiya in Guangdong, China", width/2, height/2-20);
    for(var i = 0; i < counts.length; i++) {
        text("You added " + counts[i].count + " grams of " + counts[i].countName + " to the environment", width/2, height/2+30+20*i);
    }
    if(toxinCount<15) {
        text("Wow, you did a great job repairing or recycling broken electronics!",width/2,height/2+30+20+40);
        text(finalmessagegroups[0][floor(random(0,finalmessagegroups[0].length))],width/2,height/2+30+20+60);
    } else if(toxinCount<30) {
        text("Oh no! You need to repair and recycle your electronics instead of sending them to the landfill.",width/2,height/2+30+20+40);
        text(finalmessagegroups[1][floor(random(0,finalmessagegroups[1].length))],width/2,height/2+30+20+60);
    } else {
        text("Oh no! You sent too much e-waste to the landfill. You need to repair and recycle your electronics more.",width/2,height/2+30+20+40);
        text(finalmessagegroups[2][floor(random(0,finalmessagegroups[2].length))],width/2,height/2+30+20+60);
    }
    pop();
    
    mouseIsClicked = false;
}

function mouseOver(x,y,w,h) {
    return mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h;
}

function mouseClicked() {
    mouseIsClicked = true;
}
