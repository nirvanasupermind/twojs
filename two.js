var TWO = (function () {
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }

        set(x, y) {
            this.x = x;
            this.y = y;

            return this;
        }

        _getTopLeftX(ctx) {
            return ctx.canvas.offsetWidth / 2 + (this.x);
        }

        _getTopLeftY(ctx) {
            return ctx.canvas.offsetHeight / 2 - (this.y);
        }
    }

    class Object2D {
        constructor(mesh = new Mesh(), child = []) {
            this.mesh = mesh;
            this.children = child;
        }

        add(child) {
            this.children.push(child);
        }
    }

    class Scene extends Object2D {
        constructor() {
            super();
        }

        add(child) {
            super.add(new Object2D(mesh));
        }
    }

    class PointGeometry {
        constructor() { 
        
        }
    }

    class LineGeometry {
        constructor(l = 1) {
            this.l = l;
        }
    }

    class RectGeometry {
        constructor(w = 1, h = 1) {
            this.w = w;
            this.h = h;
        }
    }

    class Material {
        constructor(options) {
            this.options = {
                color: options.color || 0xffffff
            };
        }

        _getRGB() {
            var color = this.options.color;

            var r = Math.floor(color / 65536);
            var g = Math.floor((color % 65536) / 256);
            var b = color % 256;

            return 'rgb('+[r, g, b].join(',')+')';
        }
    }


    class Mesh {
        constructor(geometry = null, material = null) {
            this.geometry = geometry;
            this.material = material;
            this.position = new Vector2();
        }
    }
    
    // class Group extends Mesh {
    //     constructor() {
    //         super(null, null);
    //     }

    //     add(child){ 
    //         super.add(child);
    //         this.position = child.position;
    //     }
    // }

    class Renderer {
        constructor(ctx) {
            this.ctx = ctx;
        }

        render(scene) {
            this._renderGroup(scene);
        }

        _renderGroup(group) {
            this.ctx.canvas.width = this.ctx.canvas.width; //clear canvas

            for (var i = 0; i < group.children.length; i++) {
                this._renderMesh(group.children[i].mesh);
            }   
        }

        _renderMesh(mesh) {          
            switch (mesh.geometry.constructor) {
                case PointGeometry:
                    var topLeftX = mesh.position._getTopLeftX(this.ctx);
                    var topLeftY = mesh.position._getTopLeftY(this.ctx);

                    this.ctx.fillStyle = mesh.material._getRGB();
                    this.ctx.lineWidth = 1;

                    this.ctx.beginPath();
                    this.ctx.moveTo(topLeftX, topLeftY);
                    this.ctx.lineTo(topLeftX + 1, topLeftY);
                    this.ctx.stroke();

                    break;
                case LineGeometry:
                    var topLeftX = mesh.position._getTopLeftX(this.ctx) - mesh.geometry.l / 2;
                    var topLeftY = mesh.position._getTopLeftY(this.ctx);

                    this.ctx.fillStyle = mesh.material._getRGB();
                    this.ctx.lineWidth = 1;

                    this.ctx.beginPath();
                    this.ctx.moveTo(topLeftX, topLeftY);
                    this.ctx.lineTo(topLeftX + mesh.geometry.l, topLeftY);
                    this.ctx.stroke();

                    break;
                case RectGeometry:
                    var topLeftX = mesh.position._getTopLeftX(this.ctx) - mesh.geometry.w / 2;
                    var topLeftY = mesh.position._getTopLeftY(this.ctx) - mesh.geometry.h / 2;

                    this.ctx.fillStyle = mesh.material._getRGB();

                    
                    this.ctx.fillRect(
                        topLeftX, 
                        topLeftY, 
                        mesh.geometry.w,
                        mesh.geometry.h
                    );

                    break;
                default:
                    throw 'Unknown geometry';
            }
        }
    }

    return {
        Vector2,
        Scene,
        PointGeometry,
        LineGeometry,
        RectGeometry,
        Material,
        Mesh,
        Renderer
    }
})();

if (typeof module === "object" && module.exports) {
    module.exports = TWO;
} else if (typeof define === "function" && define.amd) {
    define([], function () { return TWO; })
}