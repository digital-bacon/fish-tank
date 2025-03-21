class BiteFish extends Fish {

  constructor(options) {
    super(options); // Call super to run the code inside `Fish`'s constructor
    this.imageUri = '/images/biteFish.gif'; // Set the image
    this.maxSwimSpeed = 100;
    this.makeNewVelocity();
    this.isTasty = false;
    this.width = 50;
    this.height = 45;
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
      if (denizen.isFish === false || denizen.isTasty === false || denizen.isShark === true) {
        continue;
      }
      // console.log(`found a tasty fish!`)
      // Found a tasty fish! Check if we are close enough to eat it!
      const biteFishPositionX = this.position.x;
      const biteFishPositionY = this.position.y;
      const distanceFromTastyFishX = Math.abs(biteFishPositionX - denizen.position.x);
      const distanceFromTastyFishY = Math.abs(biteFishPositionY - denizen.position.y);
      if (distanceFromTastyFishX <= this.width / 2 || distanceFromTastyFishY <= this.height / 2) {
        denizen.kill();
      }
    }
  }

}