const TrafficLight = require('../traffic');
const assert = require('assert');

describe('TrafficLight', function () {
  describe('colors', function () {
    it('has 3 states', function () {
      const traffic = new TrafficLight();
      assert.equal(3, TrafficLight.colors.length);
    });

    it('colors are in order', function () {
      const expectedLightOrder = ['green', 'yellow', 'red'];
      const traffic = new TrafficLight();
      for (let i = 0; i < expectedLightOrder.length; i++) {
        assert.equal(expectedLightOrder[i], TrafficLight.colors[i]);
      }
    });
  });

  describe('next()', function () {
    it('changes lights in order', function () {
      const traffic = new TrafficLight();
      for (let i = 0; i < TrafficLight.colors.length; i++) {
        assert.equal(traffic.light, TrafficLight.colors[i]);
        traffic.next();
      }
    });
    it('loops back to green', function () {
      const traffic = new TrafficLight();
      // Change the light 3x to go from green -> yellow -> red -> green
      for (let i = 0; i < 3; i++) {
        traffic.next();
      }
      assert.equal(traffic.light, TrafficLight.colors[0]);
    });
  });
});
