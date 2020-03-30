/*$.getScript("../config/conf.js", function () {
    //alert("Script (config) loaded but not necessarily executed.");
});
$.getScript("../lib/rest/rest.js", function () {
    //alert("Script (rest) loaded but not necessarily executed.");
});
$.getScript(".../model/Player.js", function () {
    //alert("Script (player) loaded but not necessarily executed.");
});*/

function savePlayer() {
    //var player = new Player();

    var player = {"login": $("#login__username").val(), "lvl": config.level, "score": 0, "pwd": $("#login__password").val()};
    // player.login = $("#login").val();
    // player.lvl = config.level;
    // player.score = 0;
    // player.pwd = $("#passWord").val();

    $.ajax({
        url: config.env == "PROD" ? config.server.urlServer + "/save/player" : config.server.urlLocalHost + "/save/player",
        data: JSON.stringify(player),
        type: 'POST',

        success: function (response) {

            dataToJson = JSON.parse(response);

            if (dataToJson.err_msg == "") {
                sessionStorage.setItem("id", dataToJson.player.id);
                sessionStorage.setItem("login", dataToJson.player.login);
                sessionStorage.setItem("level", dataToJson.player.lvl );
                //TODO fix level when player connex
                window.location.href = config.env == "PROD" ? config.server.urlServer + "/x/html/espace_game.html" : config.server.urlLocalHost + "/x/html/espace_game.html";
            } else {
                $("#alert").html(dataToJson.err_msg);
            }
        }
    });
}

function updateplayer() {
    // var player = new Player();
    // player.id = parseInt(sessionStorage.getItem("id"));
    // player.login = sessionStorage.getItem("login");
    // player.lvl = config.level;
    // player.score = 0;
    var player = {
        "id": parseInt(sessionStorage.getItem("id")),
        "login": sessionStorage.getItem("login"),
        "lvl": parseInt(sessionStorage.getItem("level")),
        "score": 0
    };
    $.ajax({
        url: config.env == "PROD" ? config.server.urlServer  + "/update/player" : config.server.urlLocalHost + "/update/player",
        data: JSON.stringify(player),
        type: 'POST',

        success: function (jsondata) {

        }
    });
}

function getPlayersHighLevel() {
    $.ajax({
        url: config.env == "PROD" ? config.server.urlServer  + "/players" : config.server.urlLocalHost + "/players",
        type: 'GET',

        success: function (jsondata) {
            var columns = ["Login", "Level"];
            var tb = js.CreateTable(JSON.parse(jsondata), columns);
            $("#tbPlayers").html(tb);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError)
        }
    });

}


function refreshResultHighLevel() {

    setInterval(function () {
        getPlayersHighLevel();
    }, 4000);

}

function getLevelBy() {

}
