
# Shipment


## Properties

Name | Type
------------ | -------------
`id` | number
`orderId` | number
`trackingNumber` | string
`carrier` | string
`status` | string
`shippedAt` | Date
`deliveredAt` | Date
`estimatedDelivery` | Date

## Example

```typescript
import type { Shipment } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "orderId": null,
  "trackingNumber": null,
  "carrier": null,
  "status": null,
  "shippedAt": null,
  "deliveredAt": null,
  "estimatedDelivery": null,
} satisfies Shipment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Shipment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


