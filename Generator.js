function GenerateSchematic(canvas, json) {
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
        createUnityInstance(canvas, config).catch((message) => {
            alert(message);
        });
    };

    document.body.appendChild(script);
}
