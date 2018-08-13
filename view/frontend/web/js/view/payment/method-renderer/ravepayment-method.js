/*browser:true*/
/*global define*/
define([
  "jquery",
  "Magento_Checkout/js/view/payment/default",
  "Magento_Checkout/js/action/place-order",
  "Magento_Checkout/js/model/payment/additional-validators",
  "Magento_Checkout/js/model/quote",
  "Magento_Checkout/js/model/full-screen-loader",
  "Magento_Checkout/js/action/redirect-on-success"
], function(
  $,
  Component,
  placeOrderAction,
  additionalValidators,
  quote,
  fullScreenLoader,
  redirectOnSuccessAction
) {
  "use strict";

  return Component.extend({
    defaults: {
      template: "Rave_Payments/payment/ravepayment",
      customObserverName: null
    },

    redirectAfterPlaceOrder: false,

    initialize: function() {
      this._super();
      // Add Rave Gateway script to head
      var checkoutConfig = window.checkoutConfig;
      var raveConfiguration = checkoutConfig.payment.ravepayment;

      const endpoint = raveConfiguration.api_url;
      $("head").append('<script src="'+endpoint+'flwv3-pug/getpaidx/api/flwpbf-inline.js">');
      return this;
    },

    getCode: function() {
      return "ravepayment";
    },

    getData: function() {
      return {
        method: this.item.method,
        additional_data: {}
      };
    },

    isActive: function() {
      return true;
    },

    /**
     * @override
     */
    afterPlaceOrder: function() {
      var checkoutConfig = window.checkoutConfig;
      var paymentData = quote.billingAddress();
      var raveConfiguration = checkoutConfig.payment.ravepayment;

      if (checkoutConfig.isCustomerLoggedIn) {
        var customerData = checkoutConfig.customerData;
        paymentData.email = customerData.email;
      } else {
        var storageData = JSON.parse(
          localStorage.getItem("mage-cache-storage")
        )["checkout-data"];
        paymentData.email = storageData.validatedEmailValue;
      }

      var quoteId = checkoutConfig.quoteItemData[0].quote_id;

      var _this = this;
      _this.isPlaceOrderActionAllowed(false);
        var x = getpaidSetup({
          PBFPubKey: raveConfiguration.public_key,
          customer_email: paymentData.email,
          amount: quote.totals().grand_total,
          customer_phone: paymentData.telephone,
          currency: checkoutConfig.totalsData.quote_currency_code,
          country: raveConfiguration.country,
          payment_method: raveConfiguration.payment_method,
          txref: 'MAGE_'+Math.floor((Math.random() * 1000000000) + 1),
          meta: [{
            metaname: "QuoteId",
            metavalue: quoteId
            },
            {
              metaname: "Address",
              metavalue: paymentData.street[0] + ", " + paymentData.street[1]
            },
            {
              metaname: "Postal Code",
              metavalue: paymentData.postcode
            },
            {
              metaname: "City",
              metavalue: paymentData.city + ", " + paymentData.countryId
            }],
          onclose: function() {},
          callback: function(response) {
              var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
              if (response.tx.chargeResponseCode == "00" || response.tx.chargeResponseCode == "0" ) {
                // redirect to a success page
                $.post(raveConfiguration.api_url+ "flwv3-pug/getpaidx/api/v2/verify",
                {
                  SECKEY: raveConfiguration.secret_key,
                  txref
                },
                function(data, status){
                  var chargeResponsecode = data.data.chargecode;
                  var chargeAmount = data.data.amount;
                  var chargeCurrency = data.data.currency;

                  if ((chargeResponsecode == "00" || chargeResponsecode == "0") && (chargeAmount >= quote.totals().grand_total)  && (chargeCurrency == checkoutConfig.totalsData.quote_currency_code)) {
                    //Give Value and return to Success page
                    redirectOnSuccessAction.execute();
                    return;
                  } else {
                    _this.isPlaceOrderActionAllowed(true);
                    _this.messageContainer.addErrorMessage({
                      message: "Error, please try again"
                    });
                  }
                });
              }
              
              else {
                _this.isPlaceOrderActionAllowed(true);
                _this.messageContainer.addErrorMessage({
                  message: "Error, please try again"
                });
              }
              x.close(); // use this to close the modal immediately after payment.
          }
      });
    }
  });
});
