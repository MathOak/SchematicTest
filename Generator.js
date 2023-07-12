var iframe = null;
var jsonData = "";
var callback = null;
var generating = false;

function GenerateSchematicImage(json) {
    return new Promise(function (resolve, reject) {
        try {
            RunGenerator(json, (generatorB64Callback) => {
                var binaryString = window.atob(generatorB64Callback);
                var length = binaryString.length;
                var imageBytes = new Uint8Array(length);

                for (var i = 0; i < length; i++) {
                    imageBytes[i] = binaryString.charCodeAt(i);
                }

                var blob = new Blob([imageBytes], { type: 'image/png' });
                var imageUrl = URL.createObjectURL(blob);

                var img = new Image();
                img.onload = function () {
                    resolve(img);
                };

                img.onerror = function () {
                    reject(new Error("Erro ao processar a imagem"));
                };

                img.src = imageUrl;
            });

        } catch (error) {
            reject(error);
        }
    });
}

function GenerateSchematicBase64(json) {
    return new Promise(function (resolve, reject) {
        try {
            RunGenerator(json, (base64) => resolve(base64));

        } catch (error) {
            reject(error);
        }
    });
}

function RunGenerator(json, generatorCallback) {
    generating = true;
    console.log("Generating Schematic...");
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
            callback(base64);
        } else if (event.data === 'quit')
        {
            generating = false;
            console.log("Closing Unity Plugin.")
            document.body.removeChild(iframe);
        }
    }

    console.log("Initilizing Unity Plugin...")
    document.body.appendChild(iframe);
}