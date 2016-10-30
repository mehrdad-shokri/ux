"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var aurelia_loader_1 = require('aurelia-loader');
var aurelia_templating_1 = require('aurelia-templating');
var dynamic_styles_1 = require('./styles/dynamic-styles');
var aurelia_templating_binding_1 = require('aurelia-templating-binding');
var XpConfiguration = (function () {
    function XpConfiguration(loader, viewEngine) {
        this.loader = loader;
        this.viewEngine = viewEngine;
    }
    XpConfiguration.prototype.defaultConfiguration = function () {
        this.styleLoaderPlugin();
        this.commandHandler();
        return this;
    };
    XpConfiguration.prototype.styleLoaderPlugin = function () {
        this.viewEngine.addResourcePlugin('.css#xp', {
            fetch: function (address) {
                return Promise.resolve(dynamic_styles_1.createDynamicStyleModule(address.replace('.css#xp', '.css')));
            }
        });
        this.loader.addPlugin('xp-styles', {
            fetch: function (address) {
                return Promise.resolve(dynamic_styles_1.createDynamicStyleModule(address + '.css'));
            }
        });
        return this;
    };
    XpConfiguration.prototype.commandHandler = function () {
        var proto = aurelia_templating_binding_1.SyntaxInterpreter.prototype;
        var original = proto.handleUnknownCommand;
        proto.handleUnknownCommand = function (r, e, i, ei, c) {
            if (i.attrName === 'styles') {
                i.attrName = 'class';
                i.attrValue = '$styles.' + i.command;
                return this['one-way'](r, e, i, ei, c);
            }
            else {
                return original.call(this, r, e, i, ei, c);
            }
        };
        return this;
    };
    XpConfiguration = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_loader_1.Loader, aurelia_templating_1.ViewEngine)
    ], XpConfiguration);
    return XpConfiguration;
}());
exports.XpConfiguration = XpConfiguration;
