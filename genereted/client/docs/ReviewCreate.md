
# ReviewCreate


## Properties

Name | Type
------------ | -------------
`userId` | number
`rating` | number
`title` | string
`comment` | string
`isVerified` | boolean

## Example

```typescript
import type { ReviewCreate } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "rating": null,
  "title": null,
  "comment": null,
  "isVerified": null,
} satisfies ReviewCreate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewCreate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


