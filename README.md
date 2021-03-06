# twojs
A 2D scene graph library in JavaScript based on the three.js API.

# Import

```html
<script type="text/javascript" src="path/to/two.js"></script>
```

# Example
```html
<!-- Creates a static blue square -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <canvas id="canvas" width="960px" height="540px" style="border: 5px solid black;"> </canvas>
    <script type="text/javascript" src="path/to/two.js"></script>
    <script type="text/javascript">
        var scene = new TWO.Scene();

        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        var renderer = new TWO.Renderer(ctx);

        var geometry = new TWO.RectGeometry(100, 100);
        var material = new TWO.Material({ color: 0x0000ff });
        var mesh = new TWO.Mesh(geometry, material);

        scene.add(mesh);

        function animate() {
            renderer.render(scene);
        }

        setInterval(animate, 1);
    </script>
</body>

</html>
```

# Minification
For convenience I am providing a minified/obfuscated version `two.min.js` that is being generated with uglify.js.