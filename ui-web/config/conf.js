var config  = {
    server :{
        urlServer :"http://localhost:4000",
        urlLocalHost :"http://localhost:63342/my-game/ui-web",
    },
    level : 1 ,
    countDown : 3 ,
    nbrPlayer : 1 ,
    nbrRect : 1 ,
    position : {
        start :{
            x : 0 ,
            y : 0,
        },
    },
    startLigne : 1,
    rect :{
        width : 100 ,
        height : 100 ,
        style :{
            hover : {
                fillStyle : "Gainsboro" ,
                strokeStyle : "Yellow",
                lineWidth : 1,
            },
            inStart :{
                fillStyle : "Gold" ,
                strokeStyle : "black",
            },
            inCheck :{
                true : {
                    fillStyle : "LimeGreen" ,
                    strokeStyle : "black",
                },
                false :{
                    fillStyle : "Red" ,
                    strokeStyle : "black",
                },
            },
            textAlign : "center",
            textBaseline : "middle",
            lineWidth : 0.5,
        },
    },
    canvas : {
        width : 400 ,
        height :400 ,
        nbrRect: 16 ,
        style :{
            fillStyle : "Gainsboro" ,
            strokeStyle : "black",
            textAlign : "center",
            textBaseline : "middle",
            lineWidth : 0.5,
        },
    },

} ;
