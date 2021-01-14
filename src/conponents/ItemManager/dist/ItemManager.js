"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var TableCell_1 = require("@material-ui/core/TableCell");
var MyDevision_1 = require("../../entities/MyDevision");
var TextField_1 = require("@material-ui/core/TextField");
var MyControls_1 = require("../../entities/MyControls");
var validateControl_1 = require("../../validateFormControls/validateControl");
var validateForm_1 = require("../../validateFormControls/validateForm");
var IconButton_1 = require("@material-ui/core/IconButton");
var Save_1 = require("@material-ui/icons/Save");
var Delete_1 = require("@material-ui/icons/Delete");
var pickers_1 = require("@material-ui/pickers");
var date_fns_1 = require("@date-io/date-fns");
require("./ItemDevision.css");
var capitalize_1 = require("../../appFunctions/capitalize");
var ItemManager = function (_a) {
    var manager = _a.manager, id = _a.id, deleteManager = _a.deleteManager, saveManager = _a.saveManager;
    var _b = react_1.useState(false), isFormValid = _b[0], setIsFormValid = _b[1];
    var _c = react_1.useState({
        name: new MyControls_1.MyControlText({ required: true }, '', 'Имя'),
        lastName: new MyControls_1.MyControlText({ required: true }, '', 'Фамилия'),
        devision: new MyControls_1.MyControlSelectDevision(null, 'Выбирите подразделение'),
        date: new MyControls_1.MyControlDate({ required: false }, new Date(), 'Дата регистрации')
    }), controls = _c[0], setControls = _c[1];
    function changeHandler(value, controlName) {
        var newControls = controls;
        var control = newControls[controlName];
        control.value = value;
        control.touched = true;
        control.valid = validateControl_1.validateControl(control);
        var formValid = validateForm_1.formValidateControl(controls);
        setControls(__assign({}, newControls));
        setIsFormValid(formValid);
    }
    function changeManager() {
        var upManager = new MyDevision_1.MyDevision(controls.name.value, controls.date.value || manager.date);
        upManager.setId = manager.id;
        saveManager(upManager);
        setIsFormValid(false);
    }
    if (id === manager.id) {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(TableCell_1["default"], { align: "center" }, manager.id),
            react_1["default"].createElement(TableCell_1["default"], { align: "center" }, manager.uuid),
            react_1["default"].createElement(TableCell_1["default"], { align: "center" },
                react_1["default"].createElement(TextField_1["default"], { className: 'ItemDevision__input', value: controls.lastName.value, onChange: function (e) { return changeHandler(e.target.value, 'lastName'); }, error: !controls.lastName.valid && controls.lastName.touched, helperText: !controls.lastName.valid && controls.lastName.touched
                        ? controls.lastName.errorMessage
                        : null })),
            react_1["default"].createElement(TableCell_1["default"], { align: "center" },
                react_1["default"].createElement(TextField_1["default"], { className: 'ItemDevision__input', value: controls.name.value, onChange: function (e) { return changeHandler(e.target.value, 'name'); }, error: !controls.name.valid && controls.name.touched, helperText: !controls.name.valid && controls.name.touched
                        ? controls.name.errorMessage
                        : null })),
            react_1["default"].createElement(TableCell_1["default"], { align: "center" },
                react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1["default"] },
                    react_1["default"].createElement(pickers_1.DateTimePicker, { format: "dd/MM/yyyy HH:mm:ss", label: controls.date.label, className: 'ItemDevision__input', value: controls.date.value, onChange: function (value) { return changeHandler(value, 'date'); } }))),
            react_1["default"].createElement(TableCell_1["default"], { align: "left" },
                react_1["default"].createElement("div", { className: 'ItemDevision__buttonWrapper' },
                    react_1["default"].createElement("div", { className: 'ItemDevision__buttonWrapper__button' },
                        react_1["default"].createElement(IconButton_1["default"], { color: "inherit", disabled: !isFormValid, onClick: changeManager },
                            react_1["default"].createElement(Save_1["default"], null)),
                        react_1["default"].createElement(IconButton_1["default"], { color: "secondary", onClick: function () { return deleteManager(); } },
                            react_1["default"].createElement(Delete_1["default"], null)))))));
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(TableCell_1["default"], { align: "center" }, manager.id),
        react_1["default"].createElement(TableCell_1["default"], { align: "center" }, manager.uuid),
        react_1["default"].createElement(TableCell_1["default"], { id: "lastName-" + manager.id, align: "center" }, capitalize_1.capitalizeFirstLetter(manager.lastName)),
        react_1["default"].createElement(TableCell_1["default"], { id: "name-" + manager.id, align: "center" }, capitalize_1.capitalizeFirstLetter(manager.name)),
        react_1["default"].createElement(TableCell_1["default"], { id: "date-" + manager.id, align: "center" }, manager.formatDate),
        react_1["default"].createElement(TableCell_1["default"], { align: "center" })));
};
exports["default"] = ItemManager;
