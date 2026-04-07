/**
 * The DefaultController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DefaultService');
const authLoginPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.authLoginPOST);
};

const authRegisterPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.authRegisterPOST);
};

const brandsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.brandsGET);
};

const cart_itemsCartItemIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.cart_itemsCartItemIdDELETE);
};

const cart_itemsCartItemIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.cart_itemsCartItemIdPATCH);
};

const cart_itemsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.cart_itemsGET);
};

const cart_itemsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.cart_itemsPOST);
};

const categoriesCategoryIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.categoriesCategoryIdGET);
};

const categoriesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.categoriesGET);
};

const ordersGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersGET);
};

const ordersOrderIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersOrderIdGET);
};

const ordersOrderIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersOrderIdPATCH);
};

const ordersOrderIdPaymentsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersOrderIdPaymentsGET);
};

const ordersOrderIdPaymentsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersOrderIdPaymentsPOST);
};

const ordersOrderIdShipmentsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersOrderIdShipmentsGET);
};

const ordersPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.ordersPOST);
};

const productsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsGET);
};

const productsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsPOST);
};

const productsProductIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsProductIdDELETE);
};

const productsProductIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsProductIdGET);
};

const productsProductIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsProductIdPATCH);
};

const productsProductIdReviewsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsProductIdReviewsGET);
};

const productsProductIdReviewsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.productsProductIdReviewsPOST);
};

const usersGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersGET);
};

const usersUserIdAddressesAddressIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersUserIdAddressesAddressIdDELETE);
};

const usersUserIdAddressesAddressIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersUserIdAddressesAddressIdPATCH);
};

const usersUserIdAddressesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersUserIdAddressesGET);
};

const usersUserIdAddressesPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersUserIdAddressesPOST);
};

const usersUserIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersUserIdGET);
};

const usersUserIdPATCH = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersUserIdPATCH);
};


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
