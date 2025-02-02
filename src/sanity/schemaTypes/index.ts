import { type SchemaTypeDefinition } from 'sanity';
import herosec from "../schemaTypes/homeherosec";


import Singleproductpage from './SingleProductPage';

import aboutus from './About';
import Faq from './Faq';

import { productSchema } from "./products";
import { categorySchema } from "./categories";
import order from './order';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [herosec,


    Singleproductpage,

    aboutus,

    Faq,

    productSchema,
    categorySchema,
    order,
  ]

}
