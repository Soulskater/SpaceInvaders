/**
 * Created by MCG on 2015.02.01..
 */
registerNamespace("Game.Models");

Game.Models.Player = inject().class(function (name, position, layer) {

    this.name = name;
    this.ship = new RenderJs.Canvas.Shapes.Sprite({
        url: "src/images/ship-sprite.png",
        x: position.x,
        y: position.y,
        angle: 0,
        collision: true,
        defAnimation: "idle",
        animations: {
            idle: [
                [0, 0, 52, 44]
            ],
            move: [
                [52, 0, 52, 84],
                [104, 0, 52, 84],
                [156, 0, 52, 84],
                [208, 0, 52, 84]
            ]
        },
        frameCount: 6
    });
    this.acceleration = 0;
    this.friction = 0;
    this.angle = 0;

    layer.addObject(this.ship);
    this.ship.start();

    this.initAmination= function () {

    };

    this.initEvents = function () {
        var self = this;
        layer.on(RenderJs.Canvas.Events.keydown, function (event) {
            switch (event.keyCode) {
                case 38:
                    self.friction = 0;
                    self.acceleration = -0.5;
                    self.ship.setAnimation("move", true);
                    break;
                case 40:
                    self.friction = 0;
                    self.acceleration = 0.5;
                    self.ship.setAnimation("move", true);
                    break;
                case 37:
                    self.angle = -0.25;
                    break;
                case 39:
                    self.angle = 0.25;
                    break;
            }
        });

        layer.on(RenderJs.Canvas.Events.keyup, function (event) {
            if (event.keyCode === 38 || event.keyCode === 40) {
                if (event.keyCode === 38)
                    self.friction = -0.005;
                else
                    self.friction = 0.005;
                self.ship.setAnimation("idle", true);
            }
            if (event.keyCode === 37 || event.keyCode === 39) {
                self.angle = 0;
            }
        });
    };
});