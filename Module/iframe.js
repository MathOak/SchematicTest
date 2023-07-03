function RunGenerator(canvas) {
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
            window.unityInstance = instance;
        }).catch((message) => {
            alert(message);
        });
    };

    document.body.appendChild(script);
}

function OnGeneratorBootListener() {
    iframe.contentWindow.unityInstance.SendMessage("Generator", "GenerateFromJson", jsonData);
}

function OnBase64Generated(base64) {
    document.body.removeChild(iframe);
    callback(base64);
}