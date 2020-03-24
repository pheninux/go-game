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
    var player = {"login": $("#login").val() , "lvl" : config.level , "score" : 0 , "pwd" : $("#passWord").val()};
    // player.login = $("#login").val();
    // player.lvl = config.level;
    // player.score = 0;
    // player.pwd = $("#passWord").val();

    $.ajax({
        url: config.server.urlServer + "/save/player",
        headers: {'Access-Control-Allow-Origin': config.server.urlServer},
        data: JSON.stringify(player),
        type: 'POST',

        success: function (response) {
            console.log(response);
            dataToJson = JSON.parse(response);
            if (dataToJson.err_msg == "") {
                sessionStorage.setItem("id", dataToJson.player.ID);
                sessionStorage.setItem("login", dataToJson.player.login);
                sessionStorage.setItem("level", dataToJson.player.lvl);
                window.location.href = config.server.urlServer + "/x/html/espace_game.html";
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
    var player = {"id" :parseInt(sessionStorage.getItem("id")), "login": sessionStorage.getItem("login") , "lvl" : config.level , "score" : 0 };
    $.ajax({
        url: config.server.urlServer + "/update/player",
        headers: {'Access-Control-Allow-Origin': config.server.urlServer},
        data: JSON.stringify(player),
        type: 'POST',

        success: function (jsondata) {

        }
    });
}

function getPlayersHighLevel() {
    $.ajax({
        url: config.server.urlServer + "/players",
        headers: {'Access-Control-Allow-Origin': config.server.urlServer},
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
