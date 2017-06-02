"use strict";
exports.__esModule = true;
var path_1 = require("path");
var default_1 = (function () {
    function default_1(parser) {
        this.parser = parser;
    }
    default_1.prototype.process = function () {
        var _a = this.parser, webpackConfig = _a.webpackConfig, userConfig = _a.userConfig, scripts = _a.scripts;
    };
    default_1.prototype._safePath = function (file) {
        if (file.startsWith('.')) {
            return path_1.join(this.parser.app, file);
        }
        else {
            return file;
        }
    };
    default_1.prototype.safePath = function () {
        var parser = this.parser;
        var app = parser.app;
        // user config source
        parser.userConfig.source = this._safePath(parser.userConfig.source);
        // entry
        var entry = parser.webpackConfig.entry;
        if (Array.isArray(entry)) {
            parser.webpackConfig.entry = entry.map(this._safePath);
        }
        else if (typeof entry !== 'string') {
            for (var name_1 in entry) {
                if (Array.isArray(entry[name_1])) {
                    parser.webpackConfig.entry[name_1] = Array.from(entry[name_1]).map(this._safePath);
                }
                else {
                    parser.webpackConfig.entry[name_1] = this._safePath(entry[name_1]);
                }
            }
        }
        else {
            parser.webpackConfig.entry = this._safePath(entry);
        }
        // output
        parser.webpackConfig.output.path = this._safePath(parser.webpackConfig.output.path);
    };
    default_1.prototype.ruleInclude = function () {
        var _this = this;
        var rules = this.parser.webpackConfig.module.rules || this.parser.webpackConfig.module.loaders;
        rules.forEach(function (rule) {
            if (!rule.include || (Array.isArray(rule.include) && rule.include.length === 0)) {
                rule.include = _this.parser.userConfig.source;
            }
        });
    };
    return default_1;
}());
exports["default"] = default_1;
