class SharkFish extends Fish {

  constructor(options) {
    super(options); // Call super to run the code inside `Fish`'s constructor
    this.imageUri = '/images/happy-shark.png'; // Set the image
    this.maxSwimSpeed = 100;
    this.makeNewVelocity();
    this.isTasty = false;
    this.height = 256;
    this.width = 256;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    // console.log(this.tank.denizens)
    // Check all fish in the tank
    const tankDenizens = Object.values(this.tank.denizens);
    for (const denizen of tankDenizens) {
      // Ignore fish that aren't tasty/edible
      if (denizen.isTasty === false) {
        continue;
      }
      // console.log(`found a tasty fish!`)
      // Found a tasty fish! Check if we are close enough to eat it!
      const sharkPositionX = this.position.x;
      const sharkPositionY = this.position.y;
      const distanceFromTastyFishX = Math.abs(sharkPositionX - denizen.position.x);
      const distanceFromTastyFishY = Math.abs(sharkPositionY - denizen.position.y);
      const killZone = 1;
      if (distanceFromTastyFishX <= killZone || distanceFromTastyFishY <= denizen.killZone) {
        denizen.kill();
      }
    }
  }

}