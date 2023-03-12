import setFocus from "./setFocus";

let focusIndex = null;

function saveFocusData(focusElement, el) {
    const classList = focusElement.$el
        ? focusElement.$el.classList
        : focusElement.classList;
    el.value = [...classList].find(item => item.match("focus-"));
}

function getAllFocusElementArray(el) {
    return [...el.querySelectorAll(".switch-focus")].filter(
        el => !el.__vue__ || !el.__vue__.disabled
    );
}

export default {
    inserted: function (el, { value }) {
        const { initial } = value;
        if (initial) {
            const allFocusElementArray = getAllFocusElementArray(el);
            const focusElement = el.querySelector(`.switch-focus.${initial}`);
            if (focusElement) {
                saveFocusData(focusElement, el);
                setFocus(focusElement);
                focusIndex = allFocusElementArray.indexOf(focusElement);
            }
        }
        el.addEventListener(
            "focus",
            function (event) {
                // 兼容处理
                const path = event.path || (event.composedPath && event.composedPath());
                // 获取非disabled的focus
                const allFocusElementArray = getAllFocusElementArray(el);
                path.forEach(element => {
                    if (element.className && element.className.includes("switch-focus")) {
                        focusIndex = allFocusElementArray.indexOf(element);
                        saveFocusData(element, el);
                    }
                });
            },
            true
        );
    },
    update: function (el, { value, oldValue }) {
        const { type, updateIndex, initial } = value;
        const { updateIndex: oldUpdateIndex } = oldValue;
        if (updateIndex !== oldUpdateIndex) {
            if (!type) {
                if (!initial) {
                    const curFocusElement = el.querySelector(":focus");
                    if (curFocusElement) {
                        curFocusElement.blur();
                    }
                } else {
                    const focusElement = el.querySelector(`.switch-focus.${initial}`);
                    const allFocusElementArray = getAllFocusElementArray(el);
                    if (focusElement) {
                        saveFocusData(focusElement, el);
                        setFocus(focusElement);
                        focusIndex = allFocusElementArray.indexOf(focusElement);
                    }
                }
            } else {
                const allFocusElementArray = getAllFocusElementArray(el);
                switch (type) {
                    case "up":
                        focusIndex--;
                        if (!allFocusElementArray[focusIndex]) {
                            focusIndex = allFocusElementArray.length - 1;
                        }

                        break;
                    case "down":
                        focusIndex++;
                        if (!allFocusElementArray[focusIndex]) {
                            focusIndex = 0;
                        }
                        break;
                    case "keep":
                        focusIndex =
                            allFocusElementArray.indexOf(el.querySelector(`.${el.value}`)) ||
                            0;
                        break;
                    default:
                }
                const curFocusElement = allFocusElementArray[focusIndex];
                saveFocusData(curFocusElement, el);
                setFocus(curFocusElement);
            }
        }
    }
}
