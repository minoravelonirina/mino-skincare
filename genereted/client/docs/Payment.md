
# Payment


## Properties

Name | Type
------------ | -------------
`id` | number
`orderId` | number
`amount` | number
`method` | string
`status` | string
`transactionId` | string
`paymentDate` | Date
`notes` | string

## Example

```typescript
import type { Payment } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "orderId": null,
  "amount": null,
  "method": null,
  "status": null,
  "transactionId": null,
  "paymentDate": null,
  "notes": null,
} satisfies Payment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Payment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


