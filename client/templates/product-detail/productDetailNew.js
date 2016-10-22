/**
 * productDetail helpers
 */
Template.productDetailNew.helpers({
  // Return React component
  ProductDetail() {
    return ProductDetail
  },
  isOwner: function(){
    Roles.userIsInRole(Meteor.userId(), ['dashboard', 'owner', 'admin']);
  },
  tags: function () {
    let product = selectedProduct();
    if (product) {
      if (product.hashtags) {
        return _.map(product.hashtags, function (id) {
          return ReactionCore.Collections.Tags.findOne(id);
        });
      }
    }
  },
  tagsComponent: function () {
    if (ReactionCore.hasPermission("createProduct")) {
      return Template.productTagInputForm;
    }
    return Template.productDetailTags;
  },
  actualPrice: function () {
    let childVariants;
    let purchasable;
    let current = selectedVariant();
    let product = selectedProduct();
    if (product && current) {
      childVariants = (function () {
        let _results = [];
        for (let variant of product.variants) {
          if ((variant !== null ? variant.parentId : void 0) === current._id) {
            _results.push(variant);
          }
        }
        return _results;
      })();
      purchasable = childVariants.length > 0 ? false : true;
    }
    if (purchasable) {
      return current.price;
    }
    return getProductPriceRange();
  },
  fieldComponent: function () {
    if (ReactionCore.hasPermission("createProduct")) {
      return Template.productDetailEdit;
    }
    return Template.productDetailField;
  },
  metaComponent: function () {
    if (ReactionCore.hasPermission("createProduct")) {
      return Template.productMetaFieldForm;
    }
    return Template.productMetaField;
  }

});

/**
 * productDetail events
 */

Template.productDetailNew.events({

  "click #price": function () {
    let formName;
    if (ReactionCore.hasPermission("createProduct")) {
      let variant = selectedVariant();
      if (!variant) {
        return;
      }

      if (variant.parentId) {
        formName = variant.parentId;
      } else {
        formName = variant._id;
      }

      formName = "variant-form-" + formName;
      Session.set(formName, true);
      $(`#${formName}[name="price"]`).focus();
    }
  },
  "click #add-to-cart-quantity": function (event) {
    event.preventDefault();
    return event.stopPropagation();
  },
  "change #add-to-cart-quantity": function (event, template) {
    let currentVariant;
    let qtyField;
    let quantity;
    event.preventDefault();
    event.stopPropagation();
    currentVariant = selectedVariant();
    if (currentVariant) {
      qtyField = template.$('input[name="addToCartQty"]');
      quantity = qtyField.val();
      if (quantity < 1) {
        quantity = 1;
      }
      if (currentVariant.inventoryPolicy && quantity > currentVariant.inventoryQuantity) {
        qtyField.val(currentVariant.inventoryQuantity);
      }
    }
  },
  "click #add-to-cart": function (event, template) {
    let options;
    let productId;
    let qtyField;
    let quantity;
    let currentVariant = selectedVariant();
    let currentProduct = selectedProduct();

    if (currentVariant) {
      if (typeof currentVariant.parentId !== "string") {
        options = (function () {
          let _results = [];
          for (let variant of currentProduct.variants) {
            if (variant.parentId === currentVariant._id) {
              _results.push(variant);
            }
          }
          return _results;
        })();

        if (options.length > 0) {
          Alerts.add("Please choose options before adding to cart", "danger", {
            placement: "productDetail",
            i18nKey: "productDetail.chooseOptions",
            autoHide: 10000
          });
          return [];
        }
      }

      if (currentVariant.inventoryPolicy && currentVariant.inventoryQuantity < 1) {
        Alerts.add("Sorry, this item is out of stock!", "danger", {
          placement: "productDetail",
          i18nKey: "productDetail.outOfStock",
          autoHide: 10000
        });
        return [];
      }

      qtyField = template.$('input[name="addToCartQty"]');
      quantity = qtyField.val();

      if (quantity < 1) {
        quantity = 1;
      }

      if (!this.isVisible) {
        Alerts.add("Publish product before adding to cart.", "danger", {
          placement: "productDetail",
          i18nKey: "productDetail.publishFirst",
          autoHide: 10000
        });
      } else {
        productId = currentProduct._id;

        if (productId) {
          Meteor.call("cart/addToCart", productId, currentVariant._id, quantity,
            function (error) {
              if (error) {
                ReactionCore.Log.error("Failed to add to cart.", error);
                return error;
              }
            }
          );
        }

        template.$(".variant-select-option").removeClass("active");
        setCurrentVariant(null);
        qtyField.val(1);
        // scroll to top on cart add
        $("html,body").animate({
          scrollTop: 0
        }, 0);
        // slide out label
        let addToCartText = i18n.t("productDetail.addedToCart");
        let addToCartTitle = currentVariant.title;
        $(".cart-alert-text").text(`${quantity} ${addToCartTitle} ${addToCartText}`);
        return $(".cart-alert").toggle("slide", {
          direction: i18n.t("languageDirection") === "rtl" ? "left" : "right",
          width: currentVariant.title.length + 50 + "px"
        }, 600).delay(4000).toggle("slide", {
          direction: i18n.t("languageDirection") === "rtl" ? "left" : "right"
        });
      }
    } else {
      Alerts.add("Select an option before adding to cart", "danger", {
        placement: "productDetail",
        i18nKey: "productDetail.selectOption",
        autoHide: 8000
      });
    }
  },
  "click .toggle-product-isVisible-link": function (event, template) {
    let errorMsg = "";
    const self = this;
    if (!self.title) {
      errorMsg += "Product title is required. ";
      template.$(".title-edit-input").focus();
    }
    let variants = self.variants;
    for (let variant of variants) {
      let index = _.indexOf(variants, variant);
      if (!variant.title) {
        errorMsg += "Variant " + (index + 1) + " label is required. ";
      }
      if (!variant.price) {
        errorMsg += "Variant " + (index + 1) + " price is required. ";
      }
    }
    if (errorMsg.length > 0) {
      Alerts.add(errorMsg, "danger", {
        placement: "productManagement",
        i18nKey: "productDetail.errorMsg"
      });
    } else {
      Meteor.call("products/publishProduct", self._id, function (error) {
        if (error) {
          return Alerts.add(error.reason, "danger", {
            placement: "productManagement",
            id: self._id,
            i18nKey: "productDetail.errorMsg"
          });
        }
      });
    }
  },
  "click .delete-product-link": function () {
    maybeDeleteProduct(this);
  },
  "click .fa-facebook": function () {
    if (ReactionCore.hasPermission("createProduct")) {
      $(".facebookMsg-edit").fadeIn();
      return $(".facebookMsg-edit-input").focus();
    }
  },
  "click .fa-twitter": function () {
    if (ReactionCore.hasPermission("createProduct")) {
      $(".twitterMsg-edit").fadeIn();
      return $(".twitterMsg-edit-input").focus();
    }
  },
  "click .fa-pinterest": function () {
    if (ReactionCore.hasPermission("createProduct")) {
      $(".pinterestMsg-edit").fadeIn();
      return $(".pinterestMsg-edit-input").focus();
    }
  },
  "click .fa-google-plus": function () {
    if (ReactionCore.hasPermission("createProduct")) {
      $(".googleplusMsg-edit").fadeIn();
      return $(".googleplusMsg-edit-input").focus();
    }
  },
  "focusout .facebookMsg-edit-input,.twitterMsg-edit-input,.pinterestMsg-edit-input,.googleplusMsg-edit": function () {
    Session.set("editing-" + this.field, false);
    return $(".social-media-inputs > *").hide();
  },


});



Template.productDetail.rendered = function(){

  $('#add-to-cart').on('click', function(){
    sweetAlert('item added to cart');
  });

  //if the user is the owner/ admin then hide the link to that persons link
  if(Roles.userIsInRole(Meteor.userId(),['dashboard','owner','admin'])){
    $('.go-to-user').hide();
  } else{
    //if not the owner then hide the editable link
    $('.edit-user').hide();
    $('.copy-link').hide();
    //hides the user email
    $('.go-to-user').hide();
  }

  $('.copy-link').on('click',function(){
    var pathArray = window.location.pathname.split('/');
    var returnArray = pathArray[pathArray.length -1];
    sweetAlert({
      title: "Copy the following Link for verification on user closet",
      text: returnArray,
    });

  });
}

// Template.productDetailNew.rendered = function(){
//   var sellerEmail= $('.go-to-user .vendor').text().trim();
//   if (sellerEmail.length < 1){
//     alert('hello world');
//   }
// }

Template.sellerSection.onCreated(function(){
    var product = selectedProduct();
    Session.set('user', product.vendor);
    
    //should be subscribing to products, not userproducts
    //this.documents = this.subscribe('productsByUser', product.vendor);
    this.subscribe('sellerSection', product.vendor);

    this.documents = this.subscribe('sellerSectionProducts', product.vendor);
    
    //once directory subscribitions are all removed, must subscribe to the just selling user
    //this.user = this.subscribe('userById', product.vendor);
});

Template.sellerSection.helpers({
  //can switch to generic find statements once subscription issues are fixed
  subscription: function(){ 
    return Template.instance().documents.ready();
  },
  sellerName: function(){
    return Meteor.users.findOne({"_id": Session.get('user')}).profile.first_name;
  },
  /*
    not displayed on page, used to link to profile
    no usernames system set up, so trims everything after @ in email address
  */
  sellerEmail: function(){
    return Meteor.users.findOne({"_id": Session.get('user')}).emails[0].address;
  },
  sellerImage: function(){
    return Meteor.users.findOne({"_id": Session.get('user')}).profile.profile_pic;
  },
  sellerAbout: function(){
    return Meteor.users.findOne({"_id": Session.get('user')}).profile.about;
  },
  /*
    needs to return userproducts since that's where link_id and other things are stored
    need to find way to check which user products are published, then return those
    see if title changes to product also change in user product, then can check intersection that way
  */
  sellerProducts: function(){ //pretty sure this will return unpublished products
    //var publishedProducts = ReactionCore.Collections.Products.find({"vendor": Session.get('user')}).fetch();
    return userProducts.find({'userId': Session.get('user')}).fetch();
    //doesn't work don't have the same ids
    //_.intersection(publishedProducts._id, userProducts._id);
    
  },

  isListed: function(){
    return userProducts.findOne({_id:this._id}).link_id;
  }
});

Template.sellerSection.events({
  "click #visitProfile": function() {
    var user = Session.get('user');
    Router.go('profile', {userId: user});
  }
})