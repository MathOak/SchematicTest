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

    window.addEventListener("message", function (event) {
        if (event.data.functionName === 'OnBoot') {
            var jsonData = event.data.data;
            unityInstance.SendMessage("Generator", "GenerateFromJson", jsonData);
        }
    }, false);

    document.body.appendChild(script);
}

function OnGeneratorBootListener()
{
    window.parent.postMessage('booted', '*');
}

function OnBase64Generated(base64) {
    result = base64;
    window.parent.postMessage('base64:' + result, '*');
}

function OnGeneratorQuitListener()
{
    window.parent.postMessage('quit', '*');
}
