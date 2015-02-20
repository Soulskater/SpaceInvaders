/**
 * Created by MCG on 2015.02.01..
 */
registerNamespace("Game.Models");

Game.Models.Player = inject().class(function (name, position, layer) {

    this.name = name;
    this.planet = new RenderJs.Canvas.Shapes.Circle({
        x: position.x,
        y: position.y,
        radius: 100,
        collision: true
    });
    this.acceleration = 0;
    this.friction = 0;

    layer.addObject(this.planet);

    this.initAmination= function () {

    };

    this.initEvents = function () {

    };
});