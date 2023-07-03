var unityInstance = null;
var jsonData = "";
var callback = null

function GenerateSchematic(canvas, json, generatorCallback) {
    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/UnityModule.loader.js";
    var config = {
        dataUrl: buildUrl + "/UnityModule.data",
        frameworkUrl: buildUrl + "/UnityModule.framework.js",
        codeUrl: buildUrl + "/UnityModule.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Schematics",
        productVersion: "1.0",
    };

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config).then((instance) => {
            unityInstance = instance;

        }).catch((message) => {
            alert(message);
        });
    };

    jsonData = json;
    callback = generatorCallback;
    document.body.appendChild(script);
}

function OnGeneratorBootListener() {
    unityInstance.SendMessage("Generator","GenerateFromJson", jsonData)
}

function OnBase64Generated(base64) {
    callback(base64);
}