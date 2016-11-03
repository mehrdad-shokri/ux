var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { styles, useStyles } from './decorators';
var nextThemeId = 0;
function getNextDynamicThemeId() {
    return 'DynamicTheme' + (++nextThemeId);
}
export function createDynamicStyleModule(styleUrl) {
    var DynamicTheme = (function () {
        function DynamicTheme() {
        }
        DynamicTheme = __decorate([
            styles(),
            useStyles(styleUrl)
        ], DynamicTheme);
        return DynamicTheme;
    }());
    return (_a = {},
        _a[getNextDynamicThemeId()] = DynamicTheme,
        _a
    );
    var _a;
}
