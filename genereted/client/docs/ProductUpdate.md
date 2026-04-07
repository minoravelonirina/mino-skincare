
# ProductUpdate


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`price` | number
`compareAtPrice` | number
`costPrice` | number
`stock` | number
`isActive` | boolean
`isFeatured` | boolean
`isOnSale` | boolean
`weight` | number
`dimensions` | string
`tags` | Array&lt;string&gt;
`images` | Array&lt;string&gt;
`skinType` | string
`ingredients` | string
`usage` | string
`benefits` | string
`categoryId` | number
`brandId` | number

## Example

```typescript
import type { ProductUpdate } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "price": null,
  "compareAtPrice": null,
  "costPrice": null,
  "stock": null,
  "isActive": null,
  "isFeatured": null,
  "isOnSale": null,
  "weight": null,
  "dimensions": null,
  "tags": null,
  "images": null,
  "skinType": null,
  "ingredients": null,
  "usage": null,
  "benefits": null,
  "categoryId": null,
  "brandId": null,
} satisfies ProductUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


