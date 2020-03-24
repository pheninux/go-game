var ctx;
var countClikc = [];
var levelRects = [];
var floorRects = [];
var enableClickInFloor = false;
var nbrErrorCase = 0;
var isDevice = false ;


/***
 * start programme
 */
$(document).ready(function () {

    /*** manage even window size ***/
    manageWindowSize();
    /*** get login and level ***/
    $("#login").html(sessionStorage.getItem("login"));
    $("#level").html(sessionStorage.getItem("level"));

    /*** load players high level ***/
    getPlayersHighLevel();
    refreshResultHighLevel();
    /*** creation des positions par defaut ***/
    createFloorDefaultPositions();
    /*** creation des rondom pour full positions  ***/
    createRondomFullRectPos(floorRects);
    /*** selection du nbr de case de jeux parmis le full rondom pos ***/
    createRondomLevelRectPos(floorRects);

    /*** initialisation de la canvas ***/
    cnv = document.getElementById("canv");
    ctx = cnv.getContext("2d");
    /*** add events to canvas ***/
    manageEventCanvas(ctx, cnv);
    // disignRectWithTimeOut(0 , p , ctx);
    disignfloor(floorRects, ctx, config.canvas.style.fillStyle,
        config.canvas.style.strokeStyle, config.canvas.style.textAlign,
        config.canvas.style.textBaseline, config.canvas.style.lineWidth);


});


/***
 * manage size for mobile devices
 */
function manageWindowSize() {
    window.addEventListener("resize", displayWindowSize());
}

/*** display canvas size ***/
function displayWindowSize() {
    if (js.IsMobile()) {
        $("#canv").attr("width","300");
        $("#canv").attr("height","300");
        isDevice = true ;
    }
}


/***
 * create a rondom  positions
 * @param p
 */
function createRondomFullRectPos(floorRects) {

    for (let i = floorRects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [floorRects[i], floorRects[j]] = [floorRects[j], floorRects[i]];
    }
}

/***
 * create rondom value of level case from a full floor case
 * @param tabFloorRects
 */
function createRondomLevelRectPos(floorRects) {

    levelRects = floorRects.slice(0, sessionStorage.getItem("level"));
    return levelRects;
}

/***
 * manage Event canvas
 * @param ctx
 * @param tabPos
 */
function manageEventCanvas(ctx, cnv) {
    cnv.addEventListener("mousedown", function () {

        if (enableClickInFloor) {
            (function () {
                var {x, y} = getCoordinatePointer();
                /*** si les coordonnées du pointeur de la sourie existe dans la liste des positions ***/
                /*** modifié la couleur du rectangle ***/
                checkResultat(levelRects, x, y, ctx, countClikc.length, config.rect.style.inCheck, config.rect.style.inCheck
                    , config.rect.style.textAlign, config.rect.style.textBaseline, config.rect.style.lineWidth);
            })(cnv, event, levelRects);
        }
    });
    cnv.addEventListener("mouseMoveOutside", function () {

        (function () {
            var {x, y} = getCoordinatePointer();
            /* for (let i=0 ; i < floorRects.length ; i++){
                 if (contains(x,floorRects,i,y)){
                  disignRect(ctx,floorRects,i , config.rect.style.hover.fillStyle , config.rect.style.hover.strokeStyle ,
                      config.rect.style.textAlign , config.rect.style.textBaseline , config.rect.style.hover.lineWidth) ;
                     break ;
                 }
                 continue ;
             }*/

        })(cnv, event, floorRects);

    });

}

/***
 * get coordinate pointer
 * @returns {{x: number, y: number}}
 */
function getCoordinatePointer() {
    var rect = cnv.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);
    return {x, y};
}

/***
 * manage design rectancle with time out
 * @param i
 * @param tabPos
 * @param ctx
 */
function disignRectWithTimeOut(idx, tabRectangles, ctx, fStyle, sStyle, tAlign, tBalign, lWidht, callback) {

    return new Promise(resolve => {
        setTimeout(function () {

            if (idx >= 0 && idx <= tabRectangles.length - 1) {
                disignRect(ctx, tabRectangles, idx, fStyle, sStyle, tAlign, tBalign, lWidht);
                idx++;
                disignRectWithTimeOut(idx, tabRectangles, ctx, fStyle, sStyle, tAlign, tBalign, lWidht);
            } else {
                resolve("success");
            }
        }, 2000);

        return resolve;
    });


}

/***
 * disign rectangle with de specific properties
 * @param ctx
 * @param tabRects
 * @param i
 * @param fStyle
 * @param sStyle
 * @param tAlign
 * @param tBalign
 * @param lWidht
 */
function disignRect(ctx, tabRects, i, fStyle, sStyle, tAlign, tBalign, lWidht) {

    ctx.fillStyle = fStyle;
    ctx.strokeStyle = sStyle;
    ctx.textAlign = tAlign;
    ctx.textBaseline = tBalign;
    ctx.lineWidth = lWidht;
    ctx.fillRect(tabRects[i].position.x, tabRects[i].position.y, tabRects[i].width, tabRects[i].height);
    ctx.strokeRect(tabRects[i].position.x, tabRects[i].position.y, tabRects[i].width, tabRects[i].height);
}

/***
 * disign floor canvas with the specific properties
 * @param tabRects
 * @param ctx
 * @param fStyle
 * @param sStyle
 * @param tAlign
 * @param tBalign
 * @param lWidht
 */
function disignfloor(tabRects, ctx, fStyle, sStyle, tAlign, tBalign, lWidht) {

    for (var i = 0; i < tabRects.length; i++) {
        disignRect(ctx, tabRects, i, fStyle, sStyle, tAlign, tBalign, lWidht);
    }
}


/***
 * init and create default position for game floor
 * @returns {[]}
 */
function createFloorDefaultPositions() {

    for (var i = 0; i < config.canvas.nbrRect; i++) {
        var rect = {};

        var canvaWith = isDevice ? config.canvas.deviceScreen.width : config.canvas.webScreen.width ;
        var canvaHeight = isDevice ? config.canvas.deviceScreen.height : config.canvas.webScreen.height ;

        if ((config.position.start.x < canvaWith) && (config.startLigne == 1)) {

            rect = {
                "width": isDevice ? config.rect.deviceScreen.width : config.rect.webScreen.width,
                "height": isDevice ? config.rect.deviceScreen.height : config.rect.webScreen.height,
                "position": {
                    "x": config.position.start.x,
                    "y": config.position.start.y,
                },
                "color": config.rect.style.inStart.fillStyle,
            };
            //var rect = new MyRectangle(config.rect.width, config.rect.height, new Position(config.position.start.x, config.position.start.y), config.rect.style.inStart.fillStyle);
            floorRects.push(rect);

        } else {
            // test if we arrive at the end of first line , we passe to second
            if (config.position.start.x ==  canvaHeight) {
                config.position.start.x = 0;
                config.startLigne++
            }

            config.position.start.y = isDevice ? config.rect.deviceScreen.width * (config.startLigne - 1) : config.rect.webScreen.width * (config.startLigne - 1);
            rect = {
                "width": isDevice ? config.rect.deviceScreen.width : config.rect.webScreen.width,
                "height": isDevice ? config.rect.deviceScreen.height : config.rect.webScreen.height,
                "position": {
                    "x": config.position.start.x,
                    "y": config.position.start.y,
                },
                "color": config.rect.style.inStart.fillStyle,
            };
            //var rect = new MyRectangle(config.rect.width, config.rect.height, new Position(config.position.start.x, config.position.start.y), "yellow");
            floorRects.push(rect);
            config.position.start.x += isDevice ? config.rect.deviceScreen.width : config.rect.webScreen.width;


        }
        if (config.startLigne == 1) {
            config.position.start.x += isDevice ? config.rect.deviceScreen.width : config.rect.webScreen.width;
        }

    }
    return floorRects;
}


/***
 * get a rondom for colors
 * @returns {string}
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/***
 * play a count dwon and show message to start memoring case
 */
function playCountDown() {

    /*** desabled play btn ***/
    $("#playBtn").addClass("disabled");
    // initialise enable click in canavas floor and nbr of errors

    nbrErrorCase = 0;
    //initialise variable count click
    i = 0;
    countClikc = [];
    disignfloor(floorRects, ctx, config.canvas.style.fillStyle,
        config.canvas.style.strokeStyle, config.canvas.style.textAlign,
        config.canvas.style.textBaseline, config.canvas.style.lineWidth);
    // re create new rondom suite
    createRondomFullRectPos(floorRects);
    createRondomLevelRectPos(floorRects);

    var downloadTimer = setInterval(function () {
        document.getElementById("countDown").innerHTML = config.countDown;
        config.countDown -= 1;
        if (config.countDown < 0) {
            config.countDown = 3;
            clearInterval(downloadTimer);
            document.getElementById("countDown").innerHTML = "Start memoring case";
            /*** enable the click in the floor game ***/
            enableClickInFloor = true;
            disignRectWithTimeOut(0, levelRects, ctx, config.rect.style.inStart.fillStyle, config.rect.style.inStart.strokeStyle,
                config.rect.style.textAlign, config.rect.style.textBaseline, config.rect.style.lineWidth);

        }


    }, 1000);


}

function test() {
    /*** enable the click in the floor game ***/
    enableClickInFloor = true;
    document.getElementById("countDown").innerHTML = "GO";
}

/***
 *  check if the coordiniate pointer exist in table of rectangle positions
 * @param x
 * @param tabRects
 * @param i
 * @param y
 * @returns {boolean|boolean}
 */
function contains(x, tabRects, i, y) {
    return x >= tabRects[i].position.x &&
        x <= tabRects[i].position.x + tabRects[i].width &&
        y >= tabRects[i].position.y &&
        y <= tabRects[i].position.y + tabRects[i].height;
}

/***
 *  check if we are clicked in the write rectangle suite
 * @param tabRects
 * @param x
 * @param y
 * @param ctx
 * @param i
 * @param fStyle
 * @param sStyle
 * @param tAlign
 * @param tBalign
 * @param lWidht
 */
function checkResultat(tabRects, x, y, ctx, i, fStyle, sStyle, tAlign, tBalign, lWidht) {

    if (contains(x, tabRects, i, y)) {
        disignRect(ctx, tabRects, i, fStyle.true.fillStyle, sStyle.true.strokeStyle
            , tAlign, tBalign, lWidht);
        countClikc.push(i++);
        if (countClikc.length == tabRects.length) {
            enableClickInFloor = false;
            if (nbrErrorCase == 0) {
                playSong("win");
                nextLevel();
                updateplayer();
                /*** enebled play btn***/
                $("#playBtn").removeClass("disabled");
            } else {
                playSong("lose");
            }
        }

    } else {
        disignRect(ctx, tabRects, i, fStyle.false.fillStyle, sStyle.false.strokeStyle
            , tAlign, tBalign, lWidht);
        countClikc.push(i++);
        playSong("lose");
        enableClickInFloor = false;
        /*** enebled play btn***/
        $("#playBtn").removeClass("disabled");
        /*nbrErrorCase ++ ;
        if (countClikc.length == tabRects.length){
            enableClickInFloor = false ;
                playSong("lose") ;

        }*/

    }


}

/***
 *   increment level
 */
function nextLevel() {
    config.level++;
    config.nbrRect++;
    $("#level").html(config.level);
    sessionStorage.setItem("level", config.level)

}

/***
 * play a song compared to the parametre
 * @param result
 */
function playSong(result) {
    switch (result) {
        case "win" :
            var audio = new Audio('http://soundbible.com/mp3/Ta%20Da-SoundBible.com-1884170640.mp3');
            audio.play();
            break;
        case "lose" :
            var audio = new Audio('http://soundbible.com/mp3/Sad_Trombone-Joe_Lamb-665429450.mp3');
            audio.play();
            break;
    }

}

/***
 * exit game and kill session
 */
function exitGame() {
    sessionStorage.clear();
    window.location.href = config.server.urlServer + "/x/espace_login.html"
}
