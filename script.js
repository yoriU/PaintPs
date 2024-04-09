window.onload = function() {
    var canvas = document.getElementById("paintCanvas");
    var context = canvas.getContext("2d");
    var painting = false;
    var pencilButton = document.getElementById("pencil");
    var eraserButton = document.getElementById("eraser");
    var fillButton = document.getElementById("fill");
    var colorPicker = document.getElementById("colorPicker");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", endPosition);

    pencilButton.addEventListener("click", function() {
        context.globalCompositeOperation = "source-over";
    });

    eraserButton.addEventListener("click", function() {
        context.globalCompositeOperation = "destination-out";
    });

    fillButton.addEventListener("click", function() {
        context.fillStyle = colorPicker.value;
        context.fillRect(0, 0, canvas.width, canvas.height);
    });

    colorPicker.addEventListener("change", function() {
        context.strokeStyle = colorPicker.value;
        context.fillStyle = colorPicker.value;
    });

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        context.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        context.lineWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = colorPicker.value;

        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;

        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }
};
