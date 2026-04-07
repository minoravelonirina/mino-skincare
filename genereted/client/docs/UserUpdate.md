
# UserUpdate


## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`phone` | string
`role` | string

## Example

```typescript
import type { UserUpdate } from ''

// TODO: Update the object below with actual values
const example = {
  "firstName": null,
  "lastName": null,
  "phone": null,
  "role": null,
} satisfies UserUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


