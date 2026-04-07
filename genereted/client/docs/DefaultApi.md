# DefaultApi

All URIs are relative to *http://localhost:3000/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authLoginPost**](DefaultApi.md#authloginpost) | **POST** /auth/login | Connexion utilisateur |
| [**authRegisterPost**](DefaultApi.md#authregisterpost) | **POST** /auth/register | Inscription utilisateur |
| [**brandsGet**](DefaultApi.md#brandsget) | **GET** /brands | Liste des marques |
| [**cartItemsCartItemIdDelete**](DefaultApi.md#cartitemscartitemiddelete) | **DELETE** /cart-items/{cartItemId} | Supprimer un article du panier |
| [**cartItemsCartItemIdPatch**](DefaultApi.md#cartitemscartitemidpatch) | **PATCH** /cart-items/{cartItemId} | Mettre à jour la quantité d\&#39;un panier |
| [**cartItemsGet**](DefaultApi.md#cartitemsget) | **GET** /cart-items | Liste des articles du panier |
| [**cartItemsPost**](DefaultApi.md#cartitemspost) | **POST** /cart-items | Ajouter un article au panier |
| [**categoriesCategoryIdGet**](DefaultApi.md#categoriescategoryidget) | **GET** /categories/{categoryId} | Détails d\&#39;une catégorie |
| [**categoriesGet**](DefaultApi.md#categoriesget) | **GET** /categories | Liste des catégories |
| [**ordersGet**](DefaultApi.md#ordersget) | **GET** /orders | Liste des commandes |
| [**ordersOrderIdGet**](DefaultApi.md#ordersorderidget) | **GET** /orders/{orderId} | Détails d\&#39;une commande |
| [**ordersOrderIdPatch**](DefaultApi.md#ordersorderidpatch) | **PATCH** /orders/{orderId} | Mettre à jour le statut d\&#39;une commande |
| [**ordersOrderIdPaymentsGet**](DefaultApi.md#ordersorderidpaymentsget) | **GET** /orders/{orderId}/payments | Paiements d\&#39;une commande |
| [**ordersOrderIdPaymentsPost**](DefaultApi.md#ordersorderidpaymentspost) | **POST** /orders/{orderId}/payments | Ajouter un paiement à une commande |
| [**ordersOrderIdShipmentsGet**](DefaultApi.md#ordersorderidshipmentsget) | **GET** /orders/{orderId}/shipments | Livraisons d\&#39;une commande |
| [**ordersPost**](DefaultApi.md#orderspost) | **POST** /orders | Créer une commande |
| [**productsGet**](DefaultApi.md#productsget) | **GET** /products | Liste des produits |
| [**productsPost**](DefaultApi.md#productspost) | **POST** /products | Créer un produit |
| [**productsProductIdDelete**](DefaultApi.md#productsproductiddelete) | **DELETE** /products/{productId} | Supprimer un produit |
| [**productsProductIdGet**](DefaultApi.md#productsproductidget) | **GET** /products/{productId} | Détails d\&#39;un produit |
| [**productsProductIdPatch**](DefaultApi.md#productsproductidpatch) | **PATCH** /products/{productId} | Mettre à jour un produit |
| [**productsProductIdReviewsGet**](DefaultApi.md#productsproductidreviewsget) | **GET** /products/{productId}/reviews | Avis d\&#39;un produit |
| [**productsProductIdReviewsPost**](DefaultApi.md#productsproductidreviewspost) | **POST** /products/{productId}/reviews | Ajouter un avis produit |
| [**usersGet**](DefaultApi.md#usersget) | **GET** /users | Liste des utilisateurs |
| [**usersUserIdAddressesAddressIdDelete**](DefaultApi.md#usersuseridaddressesaddressiddelete) | **DELETE** /users/{userId}/addresses/{addressId} | Supprimer une adresse |
| [**usersUserIdAddressesAddressIdPatch**](DefaultApi.md#usersuseridaddressesaddressidpatch) | **PATCH** /users/{userId}/addresses/{addressId} | Mettre à jour une adresse |
| [**usersUserIdAddressesGet**](DefaultApi.md#usersuseridaddressesget) | **GET** /users/{userId}/addresses | Liste des adresses d\&#39;un utilisateur |
| [**usersUserIdAddressesPost**](DefaultApi.md#usersuseridaddressespost) | **POST** /users/{userId}/addresses | Ajouter une adresse |
| [**usersUserIdGet**](DefaultApi.md#usersuseridget) | **GET** /users/{userId} | Détails d\&#39;un utilisateur |
| [**usersUserIdPatch**](DefaultApi.md#usersuseridpatch) | **PATCH** /users/{userId} | Mettre à jour un utilisateur |



## authLoginPost

> AuthResponse authLoginPost(loginRequest)

Connexion utilisateur

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { AuthLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies AuthLoginPostRequest;

  try {
    const data = await api.authLoginPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Connexion réussie |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authRegisterPost

> User authRegisterPost(registerRequest)

Inscription utilisateur

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { AuthRegisterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // RegisterRequest
    registerRequest: ...,
  } satisfies AuthRegisterPostRequest;

  try {
    const data = await api.authRegisterPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **registerRequest** | [RegisterRequest](RegisterRequest.md) |  | |

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Utilisateur créé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## brandsGet

> Array&lt;Brand&gt; brandsGet()

Liste des marques

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { BrandsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.brandsGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;Brand&gt;**](Brand.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des marques |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cartItemsCartItemIdDelete

> cartItemsCartItemIdDelete(cartItemId)

Supprimer un article du panier

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CartItemsCartItemIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    cartItemId: 56,
  } satisfies CartItemsCartItemIdDeleteRequest;

  try {
    const data = await api.cartItemsCartItemIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cartItemId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Article supprimé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cartItemsCartItemIdPatch

> CartItem cartItemsCartItemIdPatch(cartItemId, cartItemUpdate)

Mettre à jour la quantité d\&#39;un panier

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CartItemsCartItemIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    cartItemId: 56,
    // CartItemUpdate
    cartItemUpdate: ...,
  } satisfies CartItemsCartItemIdPatchRequest;

  try {
    const data = await api.cartItemsCartItemIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cartItemId** | `number` |  | [Defaults to `undefined`] |
| **cartItemUpdate** | [CartItemUpdate](CartItemUpdate.md) |  | |

### Return type

[**CartItem**](CartItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Article modifié |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cartItemsGet

> Array&lt;CartItem&gt; cartItemsGet(userId)

Liste des articles du panier

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CartItemsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
  } satisfies CartItemsGetRequest;

  try {
    const data = await api.cartItemsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;CartItem&gt;**](CartItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Contenu du panier |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cartItemsPost

> CartItem cartItemsPost(cartItemCreate)

Ajouter un article au panier

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CartItemsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // CartItemCreate
    cartItemCreate: ...,
  } satisfies CartItemsPostRequest;

  try {
    const data = await api.cartItemsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cartItemCreate** | [CartItemCreate](CartItemCreate.md) |  | |

### Return type

[**CartItem**](CartItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Article ajouté |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## categoriesCategoryIdGet

> Category categoriesCategoryIdGet(categoryId)

Détails d\&#39;une catégorie

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CategoriesCategoryIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    categoryId: 56,
  } satisfies CategoriesCategoryIdGetRequest;

  try {
    const data = await api.categoriesCategoryIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **categoryId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Category**](Category.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Catégorie |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## categoriesGet

> Array&lt;Category&gt; categoriesGet()

Liste des catégories

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { CategoriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.categoriesGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;Category&gt;**](Category.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des catégories |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersGet

> Array&lt;Order&gt; ordersGet(userId)

Liste des commandes

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number (optional)
    userId: 56,
  } satisfies OrdersGetRequest;

  try {
    const data = await api.ordersGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Order&gt;**](Order.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des commandes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersOrderIdGet

> Order ordersOrderIdGet(orderId)

Détails d\&#39;une commande

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersOrderIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    orderId: 56,
  } satisfies OrdersOrderIdGetRequest;

  try {
    const data = await api.ordersOrderIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Order**](Order.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Commande |  -  |
| **404** | Commande non trouvée |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersOrderIdPatch

> Order ordersOrderIdPatch(orderId, orderStatusUpdate)

Mettre à jour le statut d\&#39;une commande

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersOrderIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    orderId: 56,
    // OrderStatusUpdate
    orderStatusUpdate: ...,
  } satisfies OrdersOrderIdPatchRequest;

  try {
    const data = await api.ordersOrderIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderId** | `number` |  | [Defaults to `undefined`] |
| **orderStatusUpdate** | [OrderStatusUpdate](OrderStatusUpdate.md) |  | |

### Return type

[**Order**](Order.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Statut mis à jour |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersOrderIdPaymentsGet

> Array&lt;Payment&gt; ordersOrderIdPaymentsGet(orderId)

Paiements d\&#39;une commande

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersOrderIdPaymentsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    orderId: 56,
  } satisfies OrdersOrderIdPaymentsGetRequest;

  try {
    const data = await api.ordersOrderIdPaymentsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Payment&gt;**](Payment.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des paiements |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersOrderIdPaymentsPost

> Payment ordersOrderIdPaymentsPost(orderId, paymentCreate)

Ajouter un paiement à une commande

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersOrderIdPaymentsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    orderId: 56,
    // PaymentCreate
    paymentCreate: ...,
  } satisfies OrdersOrderIdPaymentsPostRequest;

  try {
    const data = await api.ordersOrderIdPaymentsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderId** | `number` |  | [Defaults to `undefined`] |
| **paymentCreate** | [PaymentCreate](PaymentCreate.md) |  | |

### Return type

[**Payment**](Payment.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Paiement créé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersOrderIdShipmentsGet

> Array&lt;Shipment&gt; ordersOrderIdShipmentsGet(orderId)

Livraisons d\&#39;une commande

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersOrderIdShipmentsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    orderId: 56,
  } satisfies OrdersOrderIdShipmentsGetRequest;

  try {
    const data = await api.ordersOrderIdShipmentsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Shipment&gt;**](Shipment.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des livraisons |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ordersPost

> Order ordersPost(orderCreate)

Créer une commande

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { OrdersPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // OrderCreate
    orderCreate: ...,
  } satisfies OrdersPostRequest;

  try {
    const data = await api.ordersPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderCreate** | [OrderCreate](OrderCreate.md) |  | |

### Return type

[**Order**](Order.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Commande créée |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsGet

> ProductPage productsGet(categoryId, brandId, search, skinType, minPrice, maxPrice, featured, onSale, sort, page, limit)

Liste des produits

Récupère la liste des produits avec filtres et pagination.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number (optional)
    categoryId: 56,
    // number (optional)
    brandId: 56,
    // string | Recherche par nom ou description du produit. (optional)
    search: search_example,
    // string | Filtre par type de peau (sensible, seche, grasse, mixte, normal). (optional)
    skinType: skinType_example,
    // number | Prix minimum. (optional)
    minPrice: 3.4,
    // number | Prix maximum. (optional)
    maxPrice: 3.4,
    // boolean | Retourne seulement les produits mis en avant. (optional)
    featured: true,
    // boolean | Retourne seulement les produits en promotion. (optional)
    onSale: true,
    // 'price_asc' | 'price_desc' | 'newest' | 'popularity' | Tri des produits. (optional)
    sort: sort_example,
    // number | Page de résultats. (optional)
    page: 56,
    // number | Nombre de produits par page. (optional)
    limit: 56,
  } satisfies ProductsGetRequest;

  try {
    const data = await api.productsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **categoryId** | `number` |  | [Optional] [Defaults to `undefined`] |
| **brandId** | `number` |  | [Optional] [Defaults to `undefined`] |
| **search** | `string` | Recherche par nom ou description du produit. | [Optional] [Defaults to `undefined`] |
| **skinType** | `string` | Filtre par type de peau (sensible, seche, grasse, mixte, normal). | [Optional] [Defaults to `undefined`] |
| **minPrice** | `number` | Prix minimum. | [Optional] [Defaults to `undefined`] |
| **maxPrice** | `number` | Prix maximum. | [Optional] [Defaults to `undefined`] |
| **featured** | `boolean` | Retourne seulement les produits mis en avant. | [Optional] [Defaults to `undefined`] |
| **onSale** | `boolean` | Retourne seulement les produits en promotion. | [Optional] [Defaults to `undefined`] |
| **sort** | `price_asc`, `price_desc`, `newest`, `popularity` | Tri des produits. | [Optional] [Defaults to `undefined`] [Enum: price_asc, price_desc, newest, popularity] |
| **page** | `number` | Page de résultats. | [Optional] [Defaults to `1`] |
| **limit** | `number` | Nombre de produits par page. | [Optional] [Defaults to `20`] |

### Return type

[**ProductPage**](ProductPage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Page de produits |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsPost

> Product productsPost(productCreate)

Créer un produit

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // ProductCreate
    productCreate: ...,
  } satisfies ProductsPostRequest;

  try {
    const data = await api.productsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productCreate** | [ProductCreate](ProductCreate.md) |  | |

### Return type

[**Product**](Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Produit créé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsProductIdDelete

> productsProductIdDelete(productId)

Supprimer un produit

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsProductIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    productId: 56,
  } satisfies ProductsProductIdDeleteRequest;

  try {
    const data = await api.productsProductIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Produit supprimé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsProductIdGet

> Product productsProductIdGet(productId)

Détails d\&#39;un produit

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsProductIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    productId: 56,
  } satisfies ProductsProductIdGetRequest;

  try {
    const data = await api.productsProductIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Product**](Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Produit détaillé |  -  |
| **404** | Produit non trouvé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsProductIdPatch

> Product productsProductIdPatch(productId, productUpdate)

Mettre à jour un produit

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsProductIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    productId: 56,
    // ProductUpdate
    productUpdate: ...,
  } satisfies ProductsProductIdPatchRequest;

  try {
    const data = await api.productsProductIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productId** | `number` |  | [Defaults to `undefined`] |
| **productUpdate** | [ProductUpdate](ProductUpdate.md) |  | |

### Return type

[**Product**](Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Produit mis à jour |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsProductIdReviewsGet

> Array&lt;Review&gt; productsProductIdReviewsGet(productId)

Avis d\&#39;un produit

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsProductIdReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    productId: 56,
  } satisfies ProductsProductIdReviewsGetRequest;

  try {
    const data = await api.productsProductIdReviewsGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Review&gt;**](Review.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Avis du produit |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## productsProductIdReviewsPost

> Review productsProductIdReviewsPost(productId, reviewCreate)

Ajouter un avis produit

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { ProductsProductIdReviewsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    productId: 56,
    // ReviewCreate
    reviewCreate: ...,
  } satisfies ProductsProductIdReviewsPostRequest;

  try {
    const data = await api.productsProductIdReviewsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **productId** | `number` |  | [Defaults to `undefined`] |
| **reviewCreate** | [ReviewCreate](ReviewCreate.md) |  | |

### Return type

[**Review**](Review.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Avis créé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersGet

> Array&lt;User&gt; usersGet()

Liste des utilisateurs

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.usersGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;User&gt;**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des utilisateurs |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdAddressesAddressIdDelete

> usersUserIdAddressesAddressIdDelete(userId, addressId)

Supprimer une adresse

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersUserIdAddressesAddressIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
    // number
    addressId: 56,
  } satisfies UsersUserIdAddressesAddressIdDeleteRequest;

  try {
    const data = await api.usersUserIdAddressesAddressIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |
| **addressId** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Adresse supprimée |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdAddressesAddressIdPatch

> Address usersUserIdAddressesAddressIdPatch(userId, addressId, addressUpdate)

Mettre à jour une adresse

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersUserIdAddressesAddressIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
    // number
    addressId: 56,
    // AddressUpdate
    addressUpdate: ...,
  } satisfies UsersUserIdAddressesAddressIdPatchRequest;

  try {
    const data = await api.usersUserIdAddressesAddressIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |
| **addressId** | `number` |  | [Defaults to `undefined`] |
| **addressUpdate** | [AddressUpdate](AddressUpdate.md) |  | |

### Return type

[**Address**](Address.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Adresse mise à jour |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdAddressesGet

> Array&lt;Address&gt; usersUserIdAddressesGet(userId)

Liste des adresses d\&#39;un utilisateur

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersUserIdAddressesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
  } satisfies UsersUserIdAddressesGetRequest;

  try {
    const data = await api.usersUserIdAddressesGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Address&gt;**](Address.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Liste des adresses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdAddressesPost

> Address usersUserIdAddressesPost(userId, addressCreate)

Ajouter une adresse

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersUserIdAddressesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
    // AddressCreate
    addressCreate: ...,
  } satisfies UsersUserIdAddressesPostRequest;

  try {
    const data = await api.usersUserIdAddressesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |
| **addressCreate** | [AddressCreate](AddressCreate.md) |  | |

### Return type

[**Address**](Address.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Adresse créée |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdGet

> User usersUserIdGet(userId)

Détails d\&#39;un utilisateur

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersUserIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
  } satisfies UsersUserIdGetRequest;

  try {
    const data = await api.usersUserIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Utilisateur |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdPatch

> User usersUserIdPatch(userId, userUpdate)

Mettre à jour un utilisateur

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { UsersUserIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // number
    userId: 56,
    // UserUpdate
    userUpdate: ...,
  } satisfies UsersUserIdPatchRequest;

  try {
    const data = await api.usersUserIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `number` |  | [Defaults to `undefined`] |
| **userUpdate** | [UserUpdate](UserUpdate.md) |  | |

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Utilisateur mis à jour |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

