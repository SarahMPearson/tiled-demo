var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, background, scenery, plants, ground, dude, cursors, money;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Desert', 'desert');

  // **** BRINGS IN THE LAYERS ***** ///
  background = map.createLayer('Background');
  background.resizeWorld(); ///RESIZES SO IT FITS YOUR WINDOW

  scenery = map.createLayer('Scenery');
  scenery.resizeWorld();

  plants = map.createLayer('Plants');
  plants.resizeWorld();

  ground = map.createLayer('Ground');
  ground.resizeWorld();

  map.setCollision(26, true, 'Ground');

  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  /// says what layer are you pulling from 'Money', what is the ID (gid in json, what spritesheet, which frame in the array, does it exsist, name of group)
  map.createFromObjects('Money', 49, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  dude = game.add.sprite(0,0, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.gravity.y = 300;
  game.camera.follow(dude);

  cursors = game.input.keyboard.createCursorKeys();

}

function update(){

  game.physics.arcade.collide(dude, ground);

    if(cursors.left.isDown){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }
    else if(cursors.right.isDown){
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }else{
      dude.body.velocity.x = 0;
      dude.animations.stop();
      dude.frame = 4;
    }

    if(cursors.up.isDown){
      dude.body.velocity.y = -350;
    }

    if(cursors.down.isDown){
      dude.body.velocity.y = 150;
    }

}
