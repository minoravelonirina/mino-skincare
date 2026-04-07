/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Connexion utilisateur
*
* loginRequest LoginRequest 
* returns AuthResponse
* */
const authLoginPOST = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        loginRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Inscription utilisateur
*
* registerRequest RegisterRequest 
* returns User
* */
const authRegisterPOST = ({ registerRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        registerRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des marques
*
* returns List
* */
const brandsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Supprimer un article du panier
*
* cartItemId Integer 
* no response value expected for this operation
* */
const cart_itemsCartItemIdDELETE = ({ cartItemId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cartItemId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Mettre à jour la quantité d'un panier
*
* cartItemId Integer 
* cartItemUpdate CartItemUpdate 
* returns CartItem
* */
const cart_itemsCartItemIdPATCH = ({ cartItemId, cartItemUpdate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cartItemId,
        cartItemUpdate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des articles du panier
*
* userId Integer 
* returns List
* */
const cart_itemsGET = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Ajouter un article au panier
*
* cartItemCreate CartItemCreate 
* returns CartItem
* */
const cart_itemsPOST = ({ cartItemCreate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cartItemCreate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Détails d'une catégorie
*
* categoryId Integer 
* returns Category
* */
const categoriesCategoryIdGET = ({ categoryId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        categoryId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des catégories
*
* returns List
* */
const categoriesGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des commandes
*
* userId Integer  (optional)
* returns List
* */
const ordersGET = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Détails d'une commande
*
* orderId Integer 
* returns Order
* */
const ordersOrderIdGET = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Mettre à jour le statut d'une commande
*
* orderId Integer 
* orderStatusUpdate OrderStatusUpdate 
* returns Order
* */
const ordersOrderIdPATCH = ({ orderId, orderStatusUpdate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId,
        orderStatusUpdate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Paiements d'une commande
*
* orderId Integer 
* returns List
* */
const ordersOrderIdPaymentsGET = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Ajouter un paiement à une commande
*
* orderId Integer 
* paymentCreate PaymentCreate 
* returns Payment
* */
const ordersOrderIdPaymentsPOST = ({ orderId, paymentCreate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId,
        paymentCreate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Livraisons d'une commande
*
* orderId Integer 
* returns List
* */
const ordersOrderIdShipmentsGET = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Créer une commande
*
* orderCreate OrderCreate 
* returns Order
* */
const ordersPOST = ({ orderCreate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        orderCreate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des produits
* Récupère la liste des produits avec filtres et pagination.
*
* categoryId Integer  (optional)
* brandId Integer  (optional)
* search String Recherche par nom ou description du produit. (optional)
* skinType String Filtre par type de peau (sensible, seche, grasse, mixte, normal). (optional)
* minPrice Float Prix minimum. (optional)
* maxPrice Float Prix maximum. (optional)
* featured Boolean Retourne seulement les produits mis en avant. (optional)
* onSale Boolean Retourne seulement les produits en promotion. (optional)
* sort String Tri des produits. (optional)
* page Integer Page de résultats. (optional)
* limit Integer Nombre de produits par page. (optional)
* returns ProductPage
* */
const productsGET = ({ categoryId, brandId, search, skinType, minPrice, maxPrice, featured, onSale, sort, page, limit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        categoryId,
        brandId,
        search,
        skinType,
        minPrice,
        maxPrice,
        featured,
        onSale,
        sort,
        page,
        limit,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Créer un produit
*
* productCreate ProductCreate 
* returns Product
* */
const productsPOST = ({ productCreate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productCreate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Supprimer un produit
*
* productId Integer 
* no response value expected for this operation
* */
const productsProductIdDELETE = ({ productId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Détails d'un produit
*
* productId Integer 
* returns Product
* */
const productsProductIdGET = ({ productId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Mettre à jour un produit
*
* productId Integer 
* productUpdate ProductUpdate 
* returns Product
* */
const productsProductIdPATCH = ({ productId, productUpdate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
        productUpdate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Avis d'un produit
*
* productId Integer 
* returns List
* */
const productsProductIdReviewsGET = ({ productId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Ajouter un avis produit
*
* productId Integer 
* reviewCreate ReviewCreate 
* returns Review
* */
const productsProductIdReviewsPOST = ({ productId, reviewCreate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
        reviewCreate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des utilisateurs
*
* returns List
* */
const usersGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Supprimer une adresse
*
* userId Integer 
* addressId Integer 
* no response value expected for this operation
* */
const usersUserIdAddressesAddressIdDELETE = ({ userId, addressId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        addressId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Mettre à jour une adresse
*
* userId Integer 
* addressId Integer 
* addressUpdate AddressUpdate 
* returns Address
* */
const usersUserIdAddressesAddressIdPATCH = ({ userId, addressId, addressUpdate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        addressId,
        addressUpdate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Liste des adresses d'un utilisateur
*
* userId Integer 
* returns List
* */
const usersUserIdAddressesGET = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Ajouter une adresse
*
* userId Integer 
* addressCreate AddressCreate 
* returns Address
* */
const usersUserIdAddressesPOST = ({ userId, addressCreate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        addressCreate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Détails d'un utilisateur
*
* userId Integer 
* returns User
* */
const usersUserIdGET = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Mettre à jour un utilisateur
*
* userId Integer 
* userUpdate UserUpdate 
* returns User
* */
const usersUserIdPATCH = ({ userId, userUpdate }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        userUpdate,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  authLoginPOST,
  authRegisterPOST,
  brandsGET,
  cart_itemsCartItemIdDELETE,
  cart_itemsCartItemIdPATCH,
  cart_itemsGET,
  cart_itemsPOST,
  categoriesCategoryIdGET,
  categoriesGET,
  ordersGET,
  ordersOrderIdGET,
  ordersOrderIdPATCH,
  ordersOrderIdPaymentsGET,
  ordersOrderIdPaymentsPOST,
  ordersOrderIdShipmentsGET,
  ordersPOST,
  productsGET,
  productsPOST,
  productsProductIdDELETE,
  productsProductIdGET,
  productsProductIdPATCH,
  productsProductIdReviewsGET,
  productsProductIdReviewsPOST,
  usersGET,
  usersUserIdAddressesAddressIdDELETE,
  usersUserIdAddressesAddressIdPATCH,
  usersUserIdAddressesGET,
  usersUserIdAddressesPOST,
  usersUserIdGET,
  usersUserIdPATCH,
};
