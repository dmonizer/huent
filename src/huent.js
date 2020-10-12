/**
 Small "jquery like" object for creating and managing HTMLElements in fluent fashion - with minimal feature-set
 */

function Huent(tag) {
    this.element = tag instanceof HTMLElement ? tag : document.createElement(tag);
}

Huent.create = function (elem) {
    return new Huent(elem);
};

Huent.find = function (selector) {
    let el;
    switch (selector.slice(0, 1)) {
        case '.' :
            el = document.getElementsByClassName(selector.slice(1))[0];
            break;
        case '#' :
            el = document.getElementById(selector.slice(1));
            break;
        default:
            el = document.querySelector(selector);
    }
    if (!el) {
        throw Error(`Element ${el} not found. Searched with "${selector}".`)
    }
    return new Huent(el);
};


Huent.prototype.createFluentSetterGetter = function (htmlProperty) {
    function getElementDescriptor() {
        const el = this.element;
        return el.tagName
            + (el.className ? "." + el.className : "")
            + (el.id ? "#" + el.id : "")
    }
    Huent.prototype[htmlProperty] = function (value) {
        if (this.element[htmlProperty] === undefined) {
            throw new Error("incorrect getter/setter usage: element " + getElementDescriptor.call(this) + " does not have property \"" + htmlProperty+ "\"")
        }
        if (typeof value === "undefined") {
            return this.element[htmlProperty]
        }
        this.element[htmlProperty] = value;
        return this;
    };

    return Huent.prototype.createFluentSetterGetter;
};

Huent.prototype.createSpecialFluentSetterGetter = function(htmlProperty) {
    // label.for (and possibly others) require special handling
    // HTMLElement(label).for does not set for element, needs to be called as htmlFor
    // this chemistry is made for Huent consistency, so that it can still be set as
    // Huent.create("label").for("someElementId");
    const sentenceCase = (s = "") => {
        return s[0].toUpperCase() + s.slice(1, s.length);
    };
    Huent.prototype[htmlProperty] = function (value) {
        if (typeof value === "undefined") {
            return this.element["html"+sentenceCase(htmlProperty)]
        }
        this.element["html"+sentenceCase(htmlProperty)] = value;
        return this;
    };
    return Huent.prototype.createSpecialFluentSetterGetter;
};

Huent.prototype.createAllSettersGetters = function () {
    if (!Huent.prototype.name || typeof Huent.prototype.name !== "function") {
        this.createFluentSetterGetter("name")
        ("href")
        ("type")
        ("defaultChecked")
        ("id")
        ("innerText")
        ("innerHTML")
        ("src")
        ("onclick")
        ("onkeydown")
        ("onkeyup")
        ("selected")
        ("checked")
        ("value")
        ("parentNode")
        this.createSpecialFluentSetterGetter("for");
    }
};

Huent.prototype.classes = function (classes) {
    if (typeof classes === "undefined") {
        return this.element.classList
    }
    if (typeof classes === "string") {
        classes = [classes];
    }

    const that = this;
    classes.forEach(function (element) {
        that.element.classList.add(element);
    });
    return this;
};

Huent.prototype.classesRemove = function (classes) {
    if (typeof classes === "string") {
        classes = [classes];
    }

    const that = this;
    classes.forEach(function (element) {
        that.element.classList.remove(element);
    });
    return this;
};

Huent.prototype.styles = function (styles) {
    if (typeof styles === "undefined") {
        return this.element.style
    }

    if (typeof styles === "string") {
        styles = JSON.parse(styles);
    }

    Object.assign(this.element.style, styles);
    return this;
};

Huent.prototype.appendChild = function (child) {
    this.element.appendChild(child instanceof Huent ? child.done() : child);
    return this;
};

Huent.prototype.dataset = function (nameValuePairsObject) {
    Object.assign(this.element.dataset, nameValuePairsObject);
    return this;
};

Huent.prototype.appendToElement = function (parentElement) {
    (parentElement instanceof HTMLElement || parentElement instanceof Huent) && parentElement.appendChild
        ?
        parentElement.appendChild(this.element)
        :
        console.error(parentElement + "is not HTMLElement | Huent");
    return this;
};

Huent.prototype.insertToElementBeginning = function (containingElement) {
    const elementToInsertTo = containingElement instanceof Huent ? containingElement.done() : containingElement;
    elementToInsertTo.insertAdjacentElement('afterbegin', this.element);
    return this;
};

Huent.prototype.done = function () {
    return this.element;
};

Huent.prototype.selfDestruct = function () {
    this.element.parentElement.removeChild(this.element);
};

Huent.prototype.createAllSettersGetters();

module.exports = Huent;
