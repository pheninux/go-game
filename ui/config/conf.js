var config = {
    env : "DEV",
    server: {
        urlServer: "http://54.38.189.215:4001",
        urlLocalHost: "http://localhost:4001",
        //urlLocalHost: "http://localhost:63342/my-game/ui-web",
    },
    level: 1,
    countDown: 3,
    nbrPlayer: 1,
    nbrRect: 1,
    position: {
        start: {
            x: 0,
            y: 0,
        },
    },
    startLigne: 1,
    rect: {
        webScreen : {
            width: 100,
            height: 100,
        },
        deviceScreen :{
            width: 75,
            height: 75,
        },
        style: {
            hover: {
                fillStyle: "#F5EEF8",
                strokeStyle: "#FDFEFE",
                lineWidth: 1,
            },
            inStart: {
                fillStyle: "#F4D03F",
                strokeStyle: "#283747",
            },
            inCheck: {
                true: {
                    fillStyle: "#58D68D",
                    strokeStyle: "#283747",
                },
                false: {
                    fillStyle: "#EC7063",
                    strokeStyle: "#283747",
                },
            },
            textAlign: "center",
            textBaseline: "middle",
            lineWidth: 1,
        },
    },
    canvas: {
        webScreen : {
            width: 400,
            height: 400,
        },
        deviceScreen :{
            width: 300,
            height: 300,
        },
        nbrRect: 16,
        style: {
            fillStyle: "#F2F3F4",
            strokeStyle: "#283747",
            textAlign: "center",
            textBaseline: "middle",
            lineWidth: 1,
        },
    },

};
