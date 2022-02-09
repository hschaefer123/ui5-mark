/*global Mark */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"mark.js/dist/mark.min"
], function (Controller, JSONModel, Mark) {
	"use strict";

	return Controller.extend("udina.sample.ui5mark.controller.App", {

		// https://markjs.io/
		_oMark: undefined,
		_sMarkSelectors: undefined,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function () {
			this.getView().setModel(new JSONModel({
				text: "Lorem ipsum dolor sit amet",
				formattedText: "<strong>Lorem</strong> ipsum dolor sit amet"
			}), "ui")

			this._markInitialize();
		},

		onAfterRendering: function () {
			this._mark();
		},

		/* =========================================================== */
		/* event handler                                               */
		/* =========================================================== */

		onSearch: function (oEvent) {
			//var sQuery = oEvent.getParameter("value");
			this._mark();
		},

		onMark: function () {
			this._mark();
		},

		onUnmark: function () {
			this._oMark.unmark();
		},

		// refresh marks on tab select (rerenders DOM content)
		onTabSelectMark: function () {
			this._mark();
		},

		/* =========================================================== */
		/* private methods                                             */
		/* =========================================================== */

		_markInitialize: function () {
			var sBaseClass = ".ucUiMark",
				aJoinQueries = [
					".sapMTitle",
					".sapMText",
					" .sapMSLITitle",
					" .sapMSLIDescription",
					" .sapMSLIInfo",
					" .sapMDLIValue",
					".sapMFT"
				];

			this._sMarkSelectors = sBaseClass + aJoinQueries.join("," + sBaseClass);
		},

		_mark: function () {
			var sQuery = this.getView().byId("query").getValue().trim();

			// remove former marks
			this._unmark();

			// mark search query
			if (!!sQuery && sQuery.length > 1) {
				this._oMark = new Mark(
					document.querySelectorAll(this._sMarkSelectors)
				);

				// delay DOM operation
				window.setTimeout(function () {
					this._oMark.mark(sQuery);
				}.bind(this), 100);
			}
		},

		_unmark: function () {
			if (this._oMark) {
				this._oMark.unmark();
			}
		}

	});
});
