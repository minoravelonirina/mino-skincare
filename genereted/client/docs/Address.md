
# Address


## Properties

Name | Type
------------ | -------------
`id` | number
`userId` | number
`type` | string
`street` | string
`city` | string
`state` | string
`postalCode` | string
`country` | string
`isDefault` | boolean

## Example

```typescript
import type { Address } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "type": null,
  "street": null,
  "city": null,
  "state": null,
  "postalCode": null,
  "country": null,
  "isDefault": null,
} satisfies Address

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Address
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


