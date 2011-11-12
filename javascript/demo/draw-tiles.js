function drawTile(g, tile, x, y) {
    g.drawImage(img, (tile%16)*16, Math.floor(tile/16)*16, 16, 16, x, y, 32, 32);
}

function repaint() {
    g = canvas.getContext("2d");
    g.fillStyle = '#fff';
    g.strokeStyle = '#000';
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.strokeRect(0, 0, canvas.width, canvas.height);
    drawTile(g, 31, 10, 10);
}

document.write("<body>");
canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 480;
document.body.appendChild(canvas);
img = new Image();
img.src="../../data/tiles.png";
img.onload = function() {
    repaint();
}
