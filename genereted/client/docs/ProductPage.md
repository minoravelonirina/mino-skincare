
# ProductPage


## Properties

Name | Type
------------ | -------------
`items` | [Array&lt;Product&gt;](Product.md)
`page` | number
`limit` | number
`totalItems` | number
`totalPages` | number
`hasNextPage` | boolean
`hasPreviousPage` | boolean

## Example

```typescript
import type { ProductPage } from ''

// TODO: Update the object below with actual values
const example = {
  "items": null,
  "page": null,
  "limit": null,
  "totalItems": null,
  "totalPages": null,
  "hasNextPage": null,
  "hasPreviousPage": null,
} satisfies ProductPage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductPage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


