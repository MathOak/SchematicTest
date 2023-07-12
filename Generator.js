var iframe = null;
var jsonData = "";
var callback = null;
var generating = false;

function GenerateSchematicImage(json) {
    return new Promise(function (resolve, reject) {
        try {
            console.log("Generating Schematic...");
            RunGenerator(json, (generatorB64Callback) => {

                var img = new Image();
                img.onload = function () {
                    console.log("Schematic Generated!");
                    resolve(img);
                };

                img.onerror = function () {
                    reject(new Error("Erro ao processar a imagem"));
                };

                img.src = generatorB64Callback;
            });

        } catch (error) {
            reject(error);
        }
    });
}

function GenerateSchematicBase64(json) {
    return new Promise(function (resolve, reject) {
        try {
            console.log("Generating Schematic...");
            RunGenerator(json, (base64) => resolve(base64));

        } catch (error) {
            reject(error);
        }
    });
}

function RunGenerator(json, generatorCallback) {
    var gameUrl = "Module/iframe.html";

    iframe = document.createElement('iframe');
    iframe.id = "unity-iframe";
    iframe.src = gameUrl;
    iframe.style.display = "none"

    jsonData = json;
    callback = generatorCallback;

    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
        if (event.data === 'booted') {
            iframe.contentWindow.postMessage({ functionName: "OnBoot", data: jsonData }, '*');
        } else if (event.data.startsWith('base64:')) {
            var base64 = event.data.slice(7);
            console.log(base64);
            callback(base64);
        } else if (event.data === 'quit')
        {
            document.body.removeChild(iframe);
        }
    }

    console.log("Initilizing Unity Plugin...")
    document.body.appendChild(iframe);
}