// Template.productDetailNew.helpers({
//   quantityFormSchema: function() {
//     var QuantitySchema, qtySchema;
//     QuantitySchema = new SimpleSchema({
//       addToCartQty: {
//         label: "Quantity:",
//         type: Number,
//         min: 1,
//         max: 99
//       }
//     });
//     qtySchema = new AutoForm(QuantitySchema);
//     return qtySchema;
//   },
//   tags: function() {
//     var i, len, product, ref, tagCollection, tagId;
//     product = currentProduct.get("product");
//     tagCollection = [];
//     if (product != null ? product.hashtags : void 0) {
//       ref = product.hashtags;
//       for (i = 0, len = ref.length; i < len; i++) {
//         tagId = ref[i];
//         tagCollection.push(Tags.findOne(tagId));
//       }
//       return tagCollection;
//     } else {
//       return [];
//     }
//   },
//   tagsComponent: function() {
//     if (Meteor.app.hasOwnerAccess()) {
//       return Template.productTagInputForm;
//     } else {
//       return Template.productDetailTags;
//     }
//   },
//   actualPrice: function() {
//     var ref;
//     return (ref = currentProduct.get("variant")) != null ? ref.price : void 0;
//   },
//   fieldComponent: function(field) {
//     if (Meteor.app.hasOwnerAccess()) {
//       return Template.productDetailEdit;
//     } else {
//       return Template.productDetailField;
//     }
//   },
//   metaComponent: function() {
//     if (Meteor.app.hasOwnerAccess()) {
//       return Template.productMetaFieldForm;
//     } else {
//       return Template.productMetaField;
//     }
//   }
// });
//
// Template.productDetailNew.events({
//   "click #price": function() {
//     var id;
//     id = currentProduct.get("variant")._id;
//     return $('#variant-edit-form-' + id).fadeIn();
//   },
//   "click #add-to-cart-quantity": function(event, template) {
//     event.preventDefault();
//     return event.stopPropagation();
//   },
//   "change #add-to-cart-quantity": function(event, template) {
//     var quantity, variant;
//     event.preventDefault();
//     event.stopPropagation();
//     if (currentProduct.get("variant")) {
//       variant = currentProduct.get("variant");
//       quantity = $(event.target).parent().parent().find('input[name="addToCartQty"]').val();
//       if (quantity < 1) {
//         quantity = 1;
//       }
//       if (variant.inventoryPolicy && quantity > variant.inventoryQuantity) {
//         $(event.target).parent().parent().find('input[name="addToCartQty"]').val(variant.inventoryQuantity);
//       }
//     }
//   },
//   "click #add-to-cart": function(event, template) {
//     var cartSession, currentProduct, currentVariant, now, options, quantity, variant;
//     now = new Date();
//     currentVariant = window.currentProduct.get("variant");
//     currentProduct = window.currentProduct.get("product");
//     if (currentVariant) {
//       if (currentVariant.parentId == null) {
//         options = (function() {
//           var i, len, ref, results1;
//           ref = currentProduct.variants;
//           results1 = [];
//           for (i = 0, len = ref.length; i < len; i++) {
//             variant = ref[i];
//             if (variant.parentId === currentVariant._id) {
//               results1.push(variant);
//             }
//           }
//           return results1;
//         })();
//         if (options.length > 0) {
//           Alerts.add("Please choose options before adding to cart");
//           return;
//         }
//       }
//       if (currentVariant.inventoryPolicy && currentVariant.inventoryQuantity < 1) {
//         Alerts.add("Sorry, this item is out of stock!");
//         return;
//       }
//       cartSession = {
//         sessionId: Session.get("sessionId"),
//         userId: Meteor.userId()
//       };
//       quantity = $(event.target).parent().parent().find('input[name="addToCartQty"]').val();
//       if (quantity < 1) {
//         quantity = 1;
//       }
//       CartWorkflow.addToCart(cartSession, currentProduct._id, currentVariant, quantity);
//       $('.variant-list-item #' + currentVariant._id).removeClass("variant-detail-selected");
//       $(event.target).parent().parent().find('input[name="addToCartQty"]').val(1);
//       if (!Session.get("displayCart")) {
//         return toggleSession("displayCart");
//       }
//     } else {
//       return Alerts.add("Select an option before adding to cart");
//     }
//   },
//   "click .toggle-product-isVisible-link": function(event, template) {
//     return Products.update(template.data._id, {
//       $set: {
//         isVisible: !template.data.isVisible
//       }
//     });
//   },
//   "click .fa-facebook": function() {
//     if (Meteor.app.hasOwnerAccess()) {
//       $(".facebookMsg-edit").fadeIn();
//       return $(".facebookMsg-edit-input").focus();
//     }
//   },
//   "click .fa-twitter": function() {
//     if (Meteor.app.hasOwnerAccess()) {
//       $(".twitterMsg-edit").fadeIn();
//       return $(".twitterMsg-edit-input").focus();
//     }
//   },
//   "click .fa-pinterest": function() {
//     if (Meteor.app.hasOwnerAccess()) {
//       $(".pinterestMsg-edit").fadeIn();
//       return $(".pinterestMsg-edit-input").focus();
//     }
//   },
//   "click .fa-instagram": function() {
//     if (Meteor.app.hasOwnerAccess()) {
//       $(".instagramMsg-edit").fadeIn();
//       return $(".instagramMsg-edit-input").focus();
//     }
//   },
//   "focusout .facebookMsg-edit-input,.twitterMsg-edit-input,.pinterestMsg-edit-input": function() {
//     Session.set("editing-" + this.field, false);
//     return $('.social-media-inputs > *').hide();
//   }
// });
//
// Template.productDetailEdit.events({
//   "change input,textarea": function(event, template) {
//     Meteor.call("updateProductField", (currentProduct.get("product"))._id, this.field, $(event.currentTarget).val(), function(error, results) {
//       if (results) {
//         return $(event.currentTarget).animate({
//           backgroundColor: "#e2f2e2"
//         }).animate({
//           backgroundColor: "#fff"
//         });
//       }
//     });
//     if (this.type === "textarea") {
//       $(event.currentTarget).trigger('autosize.resize');
//     }
//     return Session.set("editing-" + this.field, false);
//   }
// });
//
// Template.productDetailField.events({
//   "click .product-detail-field": function(event, template) {
//     var fieldClass;
//     if (Meteor.app.hasOwnerAccess()) {
//       fieldClass = "editing-" + this.field;
//       Session.set(fieldClass, true);
//       Deps.flush();
//       return $('.' + this.field + '-edit-input').focus();
//     }
//   }
// });
//
// Template.productDetailEdit.rendered = function() {
//   return $('textarea').autosize();
// };
//
// // ---
// // generated by coffee-script 1.9.2
