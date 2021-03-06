import { __decorate } from "tslib";
import { customElement, useView, inject, TaskQueue, PLATFORM, bindable } from "aurelia-framework";
import { UxSidenavDrawer } from "../ux-sidenav-drawer/ux-sidenav-drawer";
import { StyleEngine, normalizeNumberAttribute } from "@aurelia-ux/core";
import { UxDefaultSidenavConfiguration } from "../ux-default-sidenav-configuration";
let UxSidenav = /** @class */ (() => {
    let UxSidenav = class UxSidenav {
        constructor(element, styleEngine, taskQueue, defaultConfig) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.taskQueue = taskQueue;
            this.defaultConfig = defaultConfig;
            this.backdrop = this.defaultConfig.backdrop;
            this._modalBreakpoint = this.defaultConfig.modalBreakpoint;
            this.modalBreakpoint = this.defaultConfig.modalBreakpoint;
            this.leftDrawerOpenChanged = () => this.updatePadding(this.leftDrawer);
            this.rightDrawerOpenChanged = () => this.updatePadding(this.rightDrawer);
            this.bottomDrawerOpenChanged = () => this.updatePadding(this.bottomDrawer);
        }
        modalBreakpointChanged() {
            var _a;
            this._modalBreakpoint = (_a = normalizeNumberAttribute(this.modalBreakpoint)) !== null && _a !== void 0 ? _a : 0;
        }
        themeChanged(newValue) {
            if (newValue !== null && !newValue.themeKey) {
                newValue.themeKey = 'sidenav';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        attached() {
            var _a, _b, _c;
            // todo: refactor this. In the combination of shadowDOM emulation and deeply nested sidenav
            // it's not guaranteeed to  have sidenav populated correctly. The only safe way is to react via children change
            this.leftDrawer = (_a = this.element.querySelector('ux-sidenav-drawer[side="left"]')) === null || _a === void 0 ? void 0 : _a.au.controller.viewModel;
            this.rightDrawer = (_b = this.element.querySelector('ux-sidenav-drawer[side="right"]')) === null || _b === void 0 ? void 0 : _b.au.controller.viewModel;
            this.bottomDrawer = (_c = this.element.querySelector('ux-sidenav-drawer[side="bottom"]')) === null || _c === void 0 ? void 0 : _c.au.controller.viewModel;
            if (this.leftDrawer) {
                this.updatePadding(this.leftDrawer);
                this.leftDrawer.element.addEventListener(UxSidenavDrawer.OPEN_CHANGED_EVENT, this.leftDrawerOpenChanged);
            }
            if (this.rightDrawer) {
                this.updatePadding(this.rightDrawer);
                this.rightDrawer.element.addEventListener(UxSidenavDrawer.OPEN_CHANGED_EVENT, this.rightDrawerOpenChanged);
            }
            if (this.bottomDrawer) {
                this.updatePadding(this.bottomDrawer);
                this.bottomDrawer.element.addEventListener(UxSidenavDrawer.OPEN_CHANGED_EVENT, this.bottomDrawerOpenChanged);
            }
            this.taskQueue.queueTask(() => this.element.classList.add('ux-sidenav--transition'));
        }
        detached() {
            if (this.leftDrawer) {
                this.leftDrawer.element.removeEventListener(UxSidenavDrawer.OPEN_CHANGED_EVENT, this.leftDrawerOpenChanged);
            }
            if (this.rightDrawer) {
                this.rightDrawer.element.removeEventListener(UxSidenavDrawer.OPEN_CHANGED_EVENT, this.rightDrawerOpenChanged);
            }
            if (this.bottomDrawer) {
                this.bottomDrawer.element.removeEventListener(UxSidenavDrawer.OPEN_CHANGED_EVENT, this.bottomDrawerOpenChanged);
            }
        }
        updatePadding(drawer) {
            var _a, _b, _c, _d, _e, _f;
            const isModal = this.width <= this._modalBreakpoint;
            const size = drawer.openBoolean && !drawer.isOver() && !isModal
                ? `${drawer.side === 'bottom' ? drawer.element.clientHeight : drawer.element.clientWidth}px`
                : '';
            switch (drawer.side) {
                case 'left':
                    this.element.style.paddingLeft = size;
                    break;
                case 'right':
                    this.element.style.paddingRight = size;
                    break;
                case 'bottom':
                    this.element.style.paddingBottom = size;
                    break;
            }
            this.backdrop = ((_a = this.leftDrawer) === null || _a === void 0 ? void 0 : _a.openBoolean) && (((_b = this.leftDrawer) === null || _b === void 0 ? void 0 : _b.isBackdrop()) || isModal)
                || ((_c = this.rightDrawer) === null || _c === void 0 ? void 0 : _c.openBoolean) && (((_d = this.rightDrawer) === null || _d === void 0 ? void 0 : _d.isBackdrop()) || isModal)
                || !!((_e = this.bottomDrawer) === null || _e === void 0 ? void 0 : _e.openBoolean) && (((_f = this.bottomDrawer) === null || _f === void 0 ? void 0 : _f.isBackdrop()) || isModal);
        }
        close() {
            const isModal = this.width <= this._modalBreakpoint;
            if (this.leftDrawer && (this.leftDrawer.isBackdrop() || isModal)) {
                this.leftDrawer.open = false;
            }
            if (this.rightDrawer && (this.rightDrawer.isBackdrop() || isModal)) {
                this.rightDrawer.open = false;
            }
            if (this.bottomDrawer && (this.bottomDrawer.isBackdrop() || isModal)) {
                this.bottomDrawer.open = false;
            }
        }
    };
    __decorate([
        bindable
    ], UxSidenav.prototype, "modalBreakpoint", void 0);
    __decorate([
        bindable
    ], UxSidenav.prototype, "theme", void 0);
    UxSidenav = __decorate([
        inject(Element, StyleEngine, TaskQueue, UxDefaultSidenavConfiguration),
        customElement('ux-sidenav'),
        useView(PLATFORM.moduleName('./ux-sidenav.html'))
    ], UxSidenav);
    return UxSidenav;
})();
export { UxSidenav };
//# sourceMappingURL=ux-sidenav.js.map