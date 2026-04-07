
# Order


## Properties

Name | Type
------------ | -------------
`id` | number
`orderNumber` | string
`status` | string
`totalAmount` | number
`taxAmount` | number
`shippingAmount` | number
`discountAmount` | number
`notes` | string
`billingAddress` | [Address](Address.md)
`shippingAddress` | [Address](Address.md)
`userId` | number
`orderItems` | [Array&lt;OrderItem&gt;](OrderItem.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Order } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "orderNumber": null,
  "status": null,
  "totalAmount": null,
  "taxAmount": null,
  "shippingAmount": null,
  "discountAmount": null,
  "notes": null,
  "billingAddress": null,
  "shippingAddress": null,
  "userId": null,
  "orderItems": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Order

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Order
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


