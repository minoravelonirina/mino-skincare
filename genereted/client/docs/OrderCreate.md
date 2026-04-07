
# OrderCreate


## Properties

Name | Type
------------ | -------------
`userId` | number
`orderItems` | [Array&lt;OrderItem&gt;](OrderItem.md)
`billingAddress` | [AddressCreate](AddressCreate.md)
`shippingAddress` | [AddressCreate](AddressCreate.md)
`notes` | string

## Example

```typescript
import type { OrderCreate } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "orderItems": null,
  "billingAddress": null,
  "shippingAddress": null,
  "notes": null,
} satisfies OrderCreate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrderCreate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


