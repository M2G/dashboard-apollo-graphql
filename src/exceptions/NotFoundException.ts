class NotFoundException extends Error {
  public constructor(msg = "404") {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export default NotFoundException;
