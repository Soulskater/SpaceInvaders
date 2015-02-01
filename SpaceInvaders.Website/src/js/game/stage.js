/**
 * Created by MCG on 2015.02.01..
 */
registerNamespace("Game");
Game.Stage = inject("Utils")
    .class(function (utils) {

        this.players = [];
        this.stage = new RenderJs.Canvas.Stage({
            container: "viewport",
            width: 1200,
            height: 800
        });
        var backgroundlayer = this.stage.createLayer(true);
        var gameLayer = this.stage.createLayer(true);
        var getSpawnPosition = function () {
            return new RenderJs.Vector(Math.floor((Math.random() * 1000) + 1), Math.floor((Math.random() * 500) + 1));
        };

        this.addPlayer = function (name, isOwnPlayer) {
            var player = {
                name: name,
                ship: new Game.Models.Spaceship(getSpawnPosition(), gameLayer)
            };
            this.players.push(player);

            if(isOwnPlayer){
                player.ship.initEvents();
                this.initOwnPlayer(player);
            }
            return player;
        };

        this.removePlayer = function (name) {
            throw Error("Not Implemented!");
        };

        this.initOwnPlayer = function (player){
            var ship= player.ship;
            var self = this;
            var animation = new RenderJs.Canvas.Animation(function (frameData) {
                if ((ship.acceleration > 0 && ship.friction < 0) || (ship.acceleration < 0 && ship.friction > 0)) {
                    ship.acceleration = 0;
                    ship.friction = 0;
                }
                else {
                    ship.acceleration -= ship.friction;
                }
                ship.canvasObject.angle += (ship.angle * (frameData.time - frameData.lastTime));
                var dx = (ship.acceleration * (frameData.time - frameData.lastTime)) * Math.sin(utils.convertToRad(ship.canvasObject.angle * -1));
                var dy = (ship.acceleration * (frameData.time - frameData.lastTime)) * Math.cos(utils.convertToRad(ship.canvasObject.angle * -1));
                ship.canvasObject.updatePosition(dx, dy);


                /*var pos = ship.canvasObject.pos.sub(self.stage.position);
                //
                //Follow object
                if (pos.x >= 1000 && dx > 0) {
                    self.stage.position = self.stage.position.add(new RenderJs.Vector(dx, 0));
                }
                if (pos.x <= 200 && dx < 0) {
                    self.stage.position = self.stage.position.add(new RenderJs.Vector(dx, 0));
                }
                if (pos.y <= 200 && dy < 0) {
                    self.stage.position = self.stage.position.add(new RenderJs.Vector(0, dy));
                }
                if (pos.y >= 600 && dy > 0) {
                    self.stage.position = self.stage.position.add(new RenderJs.Vector(0, dy));
                }*/
            }, gameLayer);
            animation.start();
        }

    });