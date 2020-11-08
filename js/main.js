var canvas, ctx;

var form = {
    albumTitle: document.createElement("input"),
    albumArtist: document.createElement("input"),
    text: document.createElement("textarea"),
    imageURL: document.createElement("input"),
    updateButton: document.createElement("input")
}

/* COLORS */
const GENIUS_YELLOW = "rgb(247, 242, 109)";
const BLACK = "rgb(0, 0, 0)";

function UpdateButtonAction() {
    const PADDING = 30;

    ctx.fillStyle = GENIUS_YELLOW;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (form.imageURL.value != "") {
        var image = new Image();
        image.src = form.imageURL.value;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.width);
    }

    ctx.fillStyle = BLACK;

    if (form.albumTitle.value != "") {
        ctx.font = "48px FreeSet Bold Cyrillic"
        ctx.fillText(form.albumTitle.value, PADDING, canvas.width + PADDING + 30);
    }

    if (form.albumArtist.value != "") {
        ctx.font = "20px FreeSet Bold Cyrillic"
        ctx.fillText(form.albumArtist.value, PADDING, canvas.width + PADDING * 3);
    }

    if (form.text.value != "") {
        ctx.font = "26px FreeSet Bold Cyrillic"
        
        var words = form.text.value.split(" ");

        console.log(words);
        var line = words[0] + " ", newLineCount = 0;
        
        if (words.length == 1) {
            ctx.fillText(line, PADDING, canvas.width + PADDING * 5);
        }

        var last_else = false;
        
        for (var w = 0; w < words.length - 1; w++) {
            var currentWidth = ctx.measureText(line + words[w + 1]).width;
            if (currentWidth > canvas.width - PADDING * 2) {
                console.log(line);

                ctx.fillText(line, PADDING, canvas.width + PADDING * 5 + PADDING * newLineCount);

                ctx.fillStyle
                
                newLineCount++;
                line = words[w + 1] + " ";
            }
            else {
                line += words[w + 1] + " ";
                console.log("else");

                if (w == words.length - 2) {
                    last_else = true;
                }
            }

            ctx.fillText(line, PADDING, canvas.width + PADDING * 5 + PADDING * newLineCount);
            //line += " ";
        }

        //ctx.fillText(form.text.value, PADDING, canvas.width + PADDING * 5);
    }
}

function Main() {
    canvas = document.getElementById("canvas");
    canvas.width = 640;
    canvas.height = 900;

    if (canvas.getContext) ctx = canvas.getContext("2d");
    ctx.fillStyle = GENIUS_YELLOW;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* form initialization */
    form.albumTitle = document.getElementById("album_title");
    form.albumArtist = document.getElementById("album_artist");
    form.text = document.getElementById("text");
    form.imageURL = document.getElementById("image_url");

    form.updateButton = document.getElementById("update_button");
    form.updateButton.onclick = UpdateButtonAction;
}