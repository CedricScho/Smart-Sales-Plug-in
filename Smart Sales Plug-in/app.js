/// <reference path="../lib/types/xrm/index.d.ts" />
var cluster_quote;
(function (cluster_quote) {
    function AcceptOrDeclineQuote(primaryControl, newStatusReason) {
        var formContext = primaryControl;
        var confirmString = { text: "", title: "" };
        var confirmOptions = { height: 200, width: 450 };
        if (newStatusReason == 2) { // Accepted
            confirmString = { text: "Do you want to mark this Quote as Accepted?", title: "Complete Quote" };
        }
        else if (newStatusReason == 180640000) { // Declined
            confirmString = { text: "Do you want to mark this Quote as Declined?", title: "Complete Quote" };
        }
        Xrm.Navigation.openConfirmDialog(confirmString, confirmOptions).then(function (success) {
            if (success.confirmed) {
                if (formContext.getAttribute("statecode") != null && formContext.getAttribute("statuscode") != null) {
                    var statecodeOld_1 = formContext.getAttribute("statecode").getValue();
                    var statuscodeOld_1 = formContext.getAttribute("statuscode").getValue();
                    formContext.getAttribute("statecode").setValue(1);
                    formContext.getAttribute("statuscode").setValue(newStatusReason);
                    formContext.data.save().then(function () {
                    }, function (error) {
                        formContext.getAttribute("statecode").setValue(statecodeOld_1);
                        formContext.getAttribute("statuscode").setValue(statuscodeOld_1);
                    });
                }
            }
            else {
                console.log("Dialog canceled");
            }
        });
    }
    cluster_quote.AcceptOrDeclineQuote = AcceptOrDeclineQuote;
})(cluster_quote || (cluster_quote = {}));
/// <reference path="../lib/types/xrm/index.d.ts" />
var cluster_opportunity;
(function (cluster_opportunity) {
    function WonOrLostOpportunity(primaryControl, newStatusReason) {
        var formContext = primaryControl;
        var confirmString = { text: "", title: "" };
        var confirmOptions = { height: 200, width: 450 };
        if (newStatusReason == 2) { // Won
            confirmString = { text: "Do you want to mark this Opportunity as Won?", title: "Complete Opportunity" };
        }
        else if (newStatusReason == 180640000) { // Lost
            confirmString = { text: "Do you want to mark this Opportunity as Lost?", title: "Complete Opportunity" };
        }
        Xrm.Navigation.openConfirmDialog(confirmString, confirmOptions).then(function (success) {
            if (success.confirmed) {
                if (formContext.getAttribute("statecode") != null && formContext.getAttribute("statuscode") != null) {
                    var statecodeOld_2 = formContext.getAttribute("statecode").getValue();
                    var statuscodeOld_2 = formContext.getAttribute("statuscode").getValue();
                    formContext.getAttribute("statecode").setValue(1);
                    formContext.getAttribute("statuscode").setValue(newStatusReason);
                    formContext.data.save().then(function () {
                    }, function (error) {
                        formContext.getAttribute("statecode").setValue(statecodeOld_2);
                        formContext.getAttribute("statuscode").setValue(statuscodeOld_2);
                    });
                }
            }
            else {
                console.log("Dialog canceled");
            }
        });
    }
    cluster_opportunity.WonOrLostOpportunity = WonOrLostOpportunity;
})(cluster_opportunity || (cluster_opportunity = {}));
/// <reference path="../lib/types/xrm/index.d.ts" />
var cluster_productposition;
(function (cluster_productposition) {
    function form_onload(executionContext) {
        var formContext = executionContext.getFormContext();
        var productIdLookupControl = formContext.getControl("cluster_product");
        productIdLookupControl.getAttribute().addOnChange(function () { GetValuesFromProduct(executionContext); });
    }
    cluster_productposition.form_onload = form_onload;
    function GetValuesFromProduct(executionContext) {
        var formContext = executionContext.getFormContext();
        var productIdLookupControl = formContext.getControl("cluster_product");
        if (productIdLookupControl != null) {
            if (productIdLookupControl.getAttribute().getValue() != null) {
                var productId = productIdLookupControl.getAttribute().getValue()[0].id.replace("{", "").replace("}", "");
                var productName = productIdLookupControl.getAttribute().getValue()[0].name;
                var productType = productIdLookupControl.getAttribute().getValue()[0].entityType;
                Xrm.WebApi.retrieveRecord(productType, productId, "?$select=cluster_price,cluster_name").then(function success(productRetrieve) {
                    if (formContext.getAttribute("cluster_price") != null && productRetrieve.cluster_price != null) {
                        if (formContext.getAttribute("cluster_price").getValue() == null) {
                            formContext.getAttribute("cluster_price").setValue(productRetrieve.cluster_price);
                        }
                    }
                    if (formContext.getAttribute("cluster_name") != null && productRetrieve.cluster_name != null) {
                        formContext.getAttribute("cluster_name").setValue(productRetrieve.cluster_name);
                    }
                }, function (error) {
                    console.log(error.message);
                });
            }
        }
    }
    cluster_productposition.GetValuesFromProduct = GetValuesFromProduct;
})(cluster_productposition || (cluster_productposition = {}));
//# sourceMappingURL=SmartSales.Crm.WebResource.Bundle.js.map