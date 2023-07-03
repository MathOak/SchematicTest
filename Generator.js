var jsonData = "";
var callback = null;
var iframe = null;

function GenerateSchematic(json, generatorCallback) {
    var gameUrl = "your-game.html";

    iframe = document.createElement('iframe');
    iframe.id = "unity-iframe";
    iframe.width = 32;
    iframe.height = 32;
    iframe.src = gameUrl;
    document.body.appendChild(iframe);

    jsonData = json;
    callback = generatorCallback;
}

function OnGeneratorBootListener() {
    iframe.contentWindow.unityInstance.SendMessage("Generator", "GenerateFromJson", jsonData);
}

function OnBase64Generated(base64) {
    document.body.removeChild(iframe);
    callback(base64);
}
