var expect = require("chai").expect;
var configurazione = require("../lib/configurazione.js");

describe("Configurazione", function() {

	describe("#defaults", function() {

		it("should store an object with default values", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2'
			};

			// call the defaults method
			configurazione.defaults(defaults);

			// expect the result
			expect(configurazione.mergedOptions).to.equal(defaults);

		});

		it("should store an object with nested objects of default values", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2',
				nested: {
					nested1: 'nested 1',
					nested2: 'nested 2'
				}
			};

			// call the defaults method
			configurazione.defaults(defaults);

			// expect the result
			expect(configurazione.mergedOptions).to.equal(defaults);

		});

	});

	describe("#options", function() {

		it("should merge a flat object of options with a flat object of defaults", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2'
			};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {
				key1: 'custom value 1',
				key3: 'new custom value 3'
			}

			// call the options method
			configurazione.options(options);

			// expect the result
			expect(configurazione.mergedOptions.key1).to.equal(options.key1);
			expect(configurazione.mergedOptions.key2).to.equal(defaults.key2);
			expect(configurazione.mergedOptions.key3).to.equal(options.key3);

		});

		it("should merge a flat object of options with a nested object of defaults", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2',
				nested: {
					nested1: 'nested 1',
					nested2: 'nested 2'
				}
			};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {
				key1: 'custom value 1',
				key3: 'new custom value 3'
			}

			// call the options method
			configurazione.options(options);

			// expect the result
			expect(configurazione.mergedOptions.key1).to.equal(options.key1);
			expect(configurazione.mergedOptions.key2).to.equal(defaults.key2);
			expect(configurazione.mergedOptions.key3).to.equal(options.key3);
			expect(configurazione.mergedOptions.nested.nested1).to.equal(defaults.nested.nested1);
			expect(configurazione.mergedOptions.nested.nested2).to.equal(defaults.nested.nested2);

		});

		it("should merge a nested object of options with a flat object of defaults", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2'
			};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {
				key1: 'custom value 1',
				nested: {
					nested1: 'nested 1',
					nested2: 'nested 2'
				}
			}

			// call the options method
			configurazione.options(options);

			// expect the result
			expect(configurazione.mergedOptions.key1).to.equal(options.key1);
			expect(configurazione.mergedOptions.key2).to.equal(defaults.key2);
			expect(configurazione.mergedOptions.key3).to.equal(options.key3);
			expect(configurazione.mergedOptions.nested.nested1).to.equal(options.nested.nested1);
			expect(configurazione.mergedOptions.nested.nested2).to.equal(options.nested.nested2);

		});

		// it("should merge a nested object of object with a nested object of defaults", function() {

		// 	var defaults = {
		// 		key1: 'value 1',
		// 		key2: 'value 2',
		// 		nested: {
		// 			nested1: 'nested 1',
		// 			nested2: 'nested 2'
		// 		}
		// 	};

		// 	// call the defaults method
		// 	configurazione.defaults(defaults);

		// 	var options = {
		// 		key1: 'custom value 1',
		// 		nested: {
		// 			nested2: 'custom nested 2'
		// 		}
		// 	}

		// 	// call the options method
		// 	configurazione.options(options);

		// 	// expect the result
		// 	expect(configurazione.mergedOptions.key1).to.equal(options.key1);
		// 	expect(configurazione.mergedOptions.key2).to.equal(defaults.key2);
		// 	expect(configurazione.mergedOptions.key3).to.equal(options.key3);
		// 	expect(configurazione.mergedOptions.nested.nested1).to.equal(options.nested.nested1);
		// 	expect(configurazione.mergedOptions.nested.nested2).to.equal(defaults.nested.nested2);

		// });

		it("should be the same if no defaults are set", function() {

			// call the defaults method
			configurazione.defaults({});

			var options = {
				key1: 'custom value 1',
				key3: 'new custom value 3'
			}

			// call the options method
			configurazione.options(options);

			// expect the result
			expect(configurazione.mergedOptions.key1).to.equal(options.key1);
			expect(configurazione.mergedOptions).to.not.have.property('key2');
			expect(configurazione.mergedOptions.key3).to.equal(options.key3);

		});


	});

	describe("#get", function() {

		it("should return the default value when no option value is given", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2'
			};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {
				key1: 'custom value 1',
				key3: 'new custom value 3'
			}

			// call the options method
			configurazione.options(options);

			// call the get method
			var value = configurazione.get('key2');

			expect(value).to.equal(defaults.key2);

		});

		it("should return the option value when an option is specified instead of the default value", function() {

			var defaults = {
				key1: 'value 1',
				key2: 'value 2'
			};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {
				key1: 'custom value 1',
				key3: 'new custom value 3'
			}

			// call the options method
			configurazione.options(options);

			// call the get method
			var value1 = configurazione.get('key1');
			var value3 = configurazione.get('key3');

			expect(value1).to.equal(options.key1);
			expect(value3).to.equal(options.key3);

		});

		it("should return false when no option is given and no default exists", function() {

			var defaults = {};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {}

			// call the options method
			configurazione.options(options);

			// call the get method
			var value = configurazione.get('key1');

			expect(value).to.be.false;

		});

		// add test to get nested through dot notation


	});

	describe("#set", function() {

		it("Should set a configuration value if it doesn't exist yet", function() {

			var defaults = {};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {}

			// call the options method
			configurazione.options(options);

			// call the set value
			configurazione.set('key1', 'this is key 1');

			expect(configurazione.mergedOptions.key1).to.equal('this is key 1');

		});

		it("Should overwrite a configuration value if it is set as a default", function() {

			var defaults = {
				key1: 'default key 1'
			};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {}

			// call the options method
			configurazione.options(options);

			// call the set value
			configurazione.set('key1', 'this is key 1.1');

			expect(configurazione.mergedOptions.key1).to.equal('this is key 1.1');

		});

		it("Should overwrite a configuration value if it is set as an options", function() {

			var defaults = {};

			// call the defaults method
			configurazione.defaults(defaults);

			var options = {
				key1: 'option key 1.2'
			}

			// call the options method
			configurazione.options(options);

			// call the set value
			configurazione.set('key1', 'this is key 1.2');

			expect(configurazione.mergedOptions.key1).to.equal('this is key 1.2');

		});

		// add test to set nested through dot notitation

	});

});