import { type SchemaTypeDefinition } from 'sanity';
import herosec from "../schemaTypes/homeherosec";
import HomeSection1 from './Section1-Homefeaturedprod';
import HomeSection2 from './Section2-hometopcateg';
import HomeSection3 from './Section3-Homehotcateg';
import HomeSection4 from './Section4-HomeOurProdGrid';

import carousel from './ShopCarousel';
import chairsCollection from './ShopChairsCollection';

import ProductSec1 from './ProductAllprodTopSec';
import ProductSec2 from './ProductNewsLetterSec';

import Singleproductpage from './SingleProductPage';

import aboutus from './About';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [  herosec,
    HomeSection1,
    HomeSection2,
    HomeSection3,
    HomeSection4,

    carousel,
    chairsCollection,

    ProductSec1,
    ProductSec2,

    Singleproductpage,

    aboutus

        ]

}
