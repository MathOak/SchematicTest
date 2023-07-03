var iframe = null;

function GenerateSchematic(json, generatorCallback) {
    var gameUrl = "Module/Generator.html";

    iframe = document.createElement('iframe');
    iframe.id = "unity-iframe";
    iframe.src = gameUrl;

    iframe.jsonData = json;
    iframe.callback = generatorCallback;

    document.body.appendChild(iframe);
}
