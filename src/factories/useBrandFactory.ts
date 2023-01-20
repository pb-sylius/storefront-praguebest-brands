import { UseBrand, UseBrandFactoryParams, UseBrandErrors } from "../types";
import { Ref, computed } from '@nuxtjs/composition-api';
import { PlatformApi, sharedRef, Logger, configureFactoryParams } from '@vue-storefront/core';

export function useBrandFactory<BRANDS, BRAND_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseBrandFactoryParams<BRANDS, BRAND_SEARCH_PARAMS, API>
) {
  return function useBrand(id: string): UseBrand<BRANDS, BRAND_SEARCH_PARAMS, API> {
    const brands: Ref<BRANDS> = sharedRef([], `useBrands-brands-${id}`);
    const loading = sharedRef(false, `useBrands-loading-${id}`);
    const error: Ref<UseBrandErrors> = sharedRef({
      search: null
    }, `useBrand-error-${id}`);

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: brands, alias: 'currentBrands', loading, error }
    );

    const search = async (searchParams) => {
      Logger.debug(`useBrand/${id}/search`, searchParams);

      try {
        loading.value = true;
        brands.value = await _factoryParams.brandSearch(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useBrand/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    const all = async (searchParams) => {
      Logger.debug(`useBrand/${id}/search`, searchParams);

      try {
        loading.value = true;
        brands.value = await _factoryParams.brandAll(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useBrand/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    const one = async (searchParams) => {
      Logger.debug(`useBrand/${id}/search`, searchParams);

      try {
        loading.value = true;
        brands.value = await _factoryParams.brandOne(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useBrand/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      all,
      one,
      brands: computed(() => brands.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
