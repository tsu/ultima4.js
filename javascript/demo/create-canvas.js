document.write("<body>");
canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 480;
document.body.appendChild(canvas);
g=canvas.getContext("2d");
g.strokeRect(0, 0, canvas.width, canvas.height);
