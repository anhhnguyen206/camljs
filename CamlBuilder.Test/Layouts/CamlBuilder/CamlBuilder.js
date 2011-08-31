﻿/// <reference name="MicrosoftAjax.js" /> 
/// <reference path="file://C:/Program Files/Common Files/Microsoft Shared/Web Server Extensions/14/TEMPLATE/LAYOUTS/SP.core.debug.js" />
/// <reference path="file://C:/Program Files/Common Files/Microsoft Shared/Web Server Extensions/14/TEMPLATE/LAYOUTS/SP.debug.js" />


CamlBuilder = function () {
    this.tree = new Array();
    this.unclosedTags = 0;
};

CamlBuilder.prototype = {

    IntegerField: function (name) {
        /// <summary>
        /// Specifies reference to the Integer field with given internal name
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "Integer");
    },

    NumberField: function (name) {
        /// <summary>
        /// Specifies reference to the Number field with given internal name
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "Number");
    },

    TextField: function (name) {
        /// <summary>
        /// Specifies reference to the Text field with given internal name
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "Text");
    },

    DateField: function (name) {
        /// <summary>
        /// Specifies reference to the DateTime field with given internal name, and specifies, that it's time value will not be included
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "DateTime");
    },

    DateTimeField: function (name) {
        /// <summary>
        /// Specifies reference to the datetime field with given internal name
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "DateTime");
    },

    UserField: function (name) {
        /// <summary>
        /// Specifies reference to the integer field with given internal name
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "User");
    },

    LookupField: function (name) {
        /// <summary>
        /// Specifies reference to a lookup field, using it's display value for further comparisons
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "Lookup");
    },

    LookupIdField: function (name) {
        /// <summary>
        /// Specifies reference to a lookup field, using it's ID for further comparisons
        /// </summary>
        return new CamlBuilder.FieldRef(this, name, "Integer", true);
    },

    DateRangesOverlap: function (eventDateField, EndDateField, RecurrenceIDField, dateTimeValue) {
        /// <summary>
        /// Used in queries to compare the dates in a recurring event with a specified DateTime value, to determine whether they overlap.
        /// </summary>

        // TODO: implementation

        return new CamlBuilder.Token(this, this.tree.length);
    }

};


// -------------------------------------------------------------------------------------------------------------------

CamlBuilder.FieldRef = function (camlBuilder, name, valueType, lookupId, includeTimeValue) {

    this.camlBuilder = camlBuilder;
    this.Membership.camlBuilder = camlBuilder;
    this.Membership.SPWeb.camlBuilder = camlBuilder;

    this.startIndex = camlBuilder.tree.length;
    this.Membership.startIndex = camlBuilder.tree.length;
    this.Membership.SPWeb.startIndex = camlBuilder.tree.length;

    this.valueType = valueType;

    this.camlBuilder.tree.push({ Element: 'FieldRef', Name: name, LookupId: lookupId });

};
CamlBuilder.FieldRef.prototype = {

    IsNull: function () {
        /// <summary>
        /// Used within a query to return items that are empty (Null).
        /// </summary>
        CamlBuilder.UnaryOperator(this.camlBuilder, this.startIndex, "IsNull");
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    IsNotNull: function () {
        /// <summary>
        /// Used within a query to return items that are not empty (Null).
        /// </summary>
        CamlBuilder.UnaryOperator(this.camlBuilder, this.startIndex, "IsNotNull");
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    EqualTo: function (value) {
        /// <summary>
        /// Arithmetic operator that means "equal to" and is used within a query.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Eq", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    GreaterThan: function (value) {
        /// <summary>
        /// Arithmetic operator that means "greater than" and is used within a query.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Gt", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    LessThan: function (value) {
        /// <summary>
        /// Arithmetic operator that means "less than" and is used within a query.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Lt", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    GreaterThanOrEqualTo: function (value) {
        /// <summary>
        /// Arithmetic operator that means "greater than or equal to" and is used within a query.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Geq", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    LessThanOrEqualTo: function (value) {
        /// <summary>
        /// Arithmetic operator that means "less than or equal to" and is used within a query.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Leq", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    NotEqualTo: function (value) {
        /// <summary>
        /// Arithmetic operator that means "not equal to" and is used within a query.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Neq", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    NotIncludes: function (value) {
        /// <summary>
        /// If the specified field is a Lookup field that allows multiple values, specifies that the Value element is included in the list item for the field that is specified by the FieldRef element.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "NotIncludes", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    Includes: function (value) {
        /// <summary>
        /// If the specified field is a Lookup field that allows multiple values, specifies that the Value element is excluded from the list item for the field that is specified by the FieldRef element.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Includes", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    Contains: function (value) {
        /// <summary>
        /// Searches for a string anywhere within a column that holds Text or Note field type values.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "Contains", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    BeginsWith: function (value) {
        /// <summary>
        /// Searches for a string at the start of a column that holds Text or Note field type values.
        /// </summary>
        CamlBuilder.BinaryOperator(this.camlBuilder, this.startIndex, "BeginsWith", this.valueType, value);
        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },
    In: function (arrayOfValues) {
        /// <summary>
        /// Specifies whether the value of a list item for the field specified by the FieldRef element is equal to one of the values specified by the Values element.
        /// </summary>

        this.camlBuilder.tree.splice(this.startIndex, 0, { Element: "Start", Name: "In" });
        this.camlBuilder.tree.push({ Element: "Start", Name: "Values" });

        for (var i = 0; i < arrayOfValues.length; i++) {
            this.camlBuilder.tree.push({ Element: "Value", ValueType: this.valueType, Value: arrayOfValues[i] });
        }

        this.camlBuilder.tree.push({ Element: "End" });
        this.camlBuilder.tree.push({ Element: "End" });

        return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
    },

    Membership: {

        SPWeb: {
            AllUsers: function () {
                CamlBuilder.Membership(this.camlBuilder, this.startIndex, "SPWeb.AllUsers");
                return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
            },
            Users: function () {
                CamlBuilder.Membership(this.camlBuilder, this.startIndex, "SPWeb.Users");
                return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
            },
            Groups: function () {
                CamlBuilder.Membership(this.camlBuilder, this.startIndex, "SPWeb.Groups");
                return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
            }
        },
        SPGroup: function () {
            CamlBuilder.Membership(this.camlBuilder, this.startIndex, "SPGroup");
            return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
        },
        CurrentUserGroups: function () {
            CamlBuilder.Membership(this.camlBuilder, this.startIndex, "CurrentUserGroups");
            return new CamlBuilder.Token(this.camlBuilder, this.startIndex);
        }

    }

}

// -------------------------------------------------------------------------------------------------------------------


CamlBuilder.Token = function (camlBuilder, startIndex) {
    this.camlBuilder = camlBuilder;
    this.startIndex = startIndex;
}

CamlBuilder.Token.prototype = {
    And: function () {
        /// <summary>
        /// And clause. Be aware! Operations sequence is always right-to-left, nomatter if there are Ands or Ors, or both.
        /// </summary>
        this.camlBuilder.tree.splice(this.startIndex, 0, { Element: "Start", Name: "And" });
        this.camlBuilder.unclosedTags++;
        return this.camlBuilder;
    },

    Or: function () {
        /// <summary>
        /// Or clause. Be aware! Operations sequence is always right-to-left, nomatter if there are Ands or Ors, or both.
        /// </summary>
        this.camlBuilder.tree.splice(this.startIndex, 0, { Element: "Start", Name: "Or" });
        this.camlBuilder.unclosedTags++;
        return this.camlBuilder;
    },

    ToString: function () {
        /// <summary>
        /// Convert to string with final CAML query XML
        /// </summary>
        var sb = new Sys.StringBuilder();
        var writer = new SP.XmlWriter.create(sb);
        for (var i = 0; i < this.camlBuilder.tree.length; i++) {
            if (this.camlBuilder.tree[i].Element == "FieldRef") {
                writer.writeStartElement("FieldRef");
                writer.writeAttributeString("Name", this.camlBuilder.tree[i].Name);
                if (this.camlBuilder.tree[i].LookupId)
                    writer.writeAttributeString("LookupId", "True");
                writer.writeEndElement();
            } else if (this.camlBuilder.tree[i].Element == "Start") {
                writer.writeStartElement(this.camlBuilder.tree[i].Name);
                if (this.camlBuilder.tree[i].Attributes) {
                    for (var a = 0; a < this.camlBuilder.tree[i].Attributes.length; a++) {
                        writer.writeAttributeString(
                            this.camlBuilder.tree[i].Attributes[a].Name,
                            this.camlBuilder.tree[i].Attributes[a].Value);
                    }
                }
            } else if (this.camlBuilder.tree[i].Element == "Value") {
                writer.writeStartElement("Value");
                writer.writeAttributeString("Type", this.camlBuilder.tree[i].ValueType);
                var value = this.camlBuilder.tree[i].Value.toString();
                if (value.slice(0, 1) == "{" && value.slice(-1) == "}")
                    writer.writeRaw("<" + value.slice(1, value.length - 1) + " />");
                else
                    writer.writeString(value);

                writer.writeEndElement();
            } else if (this.camlBuilder.tree[i].Element == "End") {
                writer.writeEndElement();
            }
        }

        while (this.camlBuilder.unclosedTags > 0) {
            this.camlBuilder.unclosedTags--;
            writer.writeEndElement();
        }

        writer.close();
        return sb.toString();
    }
}

// -------------------------------------------------------------------------------------------------------------------


CamlBuilder.Membership = function (camlBuilder, startIndex, type) {
    camlBuilder.tree.splice(startIndex, 0, { Element: "Start", Name: "Membership", Attributes: [{ Name: "Type", Value: type}] });
    camlBuilder.tree.push({ Element: "End" });
}
CamlBuilder.UnaryOperator = function (camlBuilder, startIndex, operation) {
    camlBuilder.tree.splice(startIndex, 0, { Element: "Start", Name: operation });
    camlBuilder.tree.push({ Element: "End" });
}
CamlBuilder.BinaryOperator = function (camlBuilder, startIndex, operation, valueType, value) {
    camlBuilder.tree.splice(startIndex, 0, { Element: "Start", Name: operation });
    camlBuilder.tree.push({ Element: "Value", ValueType: valueType, Value: value });
    camlBuilder.tree.push({ Element: "End" });
}
