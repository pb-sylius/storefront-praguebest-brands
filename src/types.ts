import {
  PlatformApi,
  ComputedProperty,
  Composable,
  ComposableFunctionArgs,
  Context,
  CustomQuery,
  FactoryParams,
  AgnosticPrice
} from "@vue-storefront/core";
import { Product } from '@realtainment/sylius-api/src/types';

export interface UseBrandErrors {
  search: Error;
}

export interface BrandSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  id?: string;
  [x: string]: any;
}

export interface UseBrand<BRANDS, BRAND_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  brands: ComputedProperty<BRANDS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseBrandErrors>;
  search(params: ComposableFunctionArgs<BRAND_SEARCH_PARAMS>): Promise<void>;
  one(params: ComposableFunctionArgs<BRAND_SEARCH_PARAMS>): Promise<void>;
  all(params: ComposableFunctionArgs<BRAND_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}

export interface UseBrandFactoryParams<BRANDS, BRAND_SEARCH_PARAMS extends BrandSearchParams, API extends PlatformApi = any> extends FactoryParams<API> {
  brandsSearch: (context: Context, params: BRAND_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<BRANDS>;
  brandsAll: (context: Context, params: BRAND_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<BRANDS>;
  brandsOne: (context: Context, params: BRAND_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<BRANDS>;
}

export type Brand = Record<string, unknown>;

export type BrandResponse = {
  data: Brand[];
  total: number;
};

export interface BrandGetters<BRAND> {
  getName: (brand: BRAND) => string;
  getSlug: (brand: BRAND) => string;
  getCoverImage: (brand: BRAND) => string;
  getId: (brand: BRAND) => string;
  getProducts: (brand: BRAND) => Product[];
  getProductsPagination: (brand: BRAND, activePage: number) => any;
  getProductPrice: (product: any) => AgnosticPrice,
  getProductImage: (product: any) => string;
  [getterName: string]: any;
}
