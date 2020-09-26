class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }
  off(event, listener) {
    const idx = this.events[event].indexOf(listener);
    if (idx > -1) {
      this.events[event].splice(idx, 1);
    }
  }
  emit(event, ...args) {
    this.events[event].forEach((listener) => listener.apply(this, args));
  }
  once(event, listener) {
    const remove = this.on(event, (...args) => {
      remove();
      listener.apply(this.args);
    });
  }
}

var eventEmitter = new EventEmitter();

function responseToEvent(msg) {
  console.log(msg);
}
eventEmitter.on("pramp", responseToEvent);
//eventEmitter.once('pramp', function (msg) { console.log(msg + ' just once!'); });
eventEmitter.emit("pramp", "1st");
eventEmitter.emit("pramp", "2nd");
//eventEmitter.once('pramp', function (msg) { console.log(msg + ' just once!'); });
// eventEmitter.off('pramp', responseToEvent);
eventEmitter.emit("pramp", "3rd");
eventEmitter.emit("pramp", "1st");
