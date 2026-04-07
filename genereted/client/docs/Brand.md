
# Brand


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`description` | string
`logo` | string
`website` | string
`createdAt` | Date

## Example

```typescript
import type { Brand } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "logo": null,
  "website": null,
  "createdAt": null,
} satisfies Brand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Brand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


