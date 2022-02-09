/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"udinasample./ui5mark/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
