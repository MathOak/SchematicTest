var iframe = null;
var jsonData = "";
var callback = null;

function GenerateSchematic(json, generatorCallback) {
    var gameUrl = "Module/iframe.html";

    iframe = document.createElement('iframe');
    iframe.id = "unity-iframe";
    iframe.src = gameUrl;
    //iframe.style.display = "none"

    jsonData = json;
    callback = generatorCallback;

    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
        if (event.data === 'booted') {
            iframe.contentWindow.postMessage({ functionName: "OnBoot", data: jsonData }, '*');
        } else if (event.data.startsWith('base64:')) {
            var base64 = event.data.slice(7);
            document.body.removeChild(iframe);
            callback(base64);
        }
    }

    document.body.appendChild(iframe);
}