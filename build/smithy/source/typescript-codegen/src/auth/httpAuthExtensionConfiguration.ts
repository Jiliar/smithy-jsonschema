// smithy-typescript generated code
import { ClientServiceHttpAuthSchemeProvider } from "./httpAuthSchemeProvider";
import { HttpAuthScheme } from "@smithy/types";

/**
 * @internal
 */
export interface HttpAuthExtensionConfiguration {
  setHttpAuthScheme(httpAuthScheme: HttpAuthScheme): void;
  httpAuthSchemes(): HttpAuthScheme[];
  setHttpAuthSchemeProvider(httpAuthSchemeProvider: ClientServiceHttpAuthSchemeProvider): void;
  httpAuthSchemeProvider(): ClientServiceHttpAuthSchemeProvider;
}

/**
 * @internal
 */
export type HttpAuthRuntimeConfig = Partial<{
  httpAuthSchemes: HttpAuthScheme[];
  httpAuthSchemeProvider: ClientServiceHttpAuthSchemeProvider;
}>;

/**
 * @internal
 */
export const getHttpAuthExtensionConfiguration = (runtimeConfig: HttpAuthRuntimeConfig): HttpAuthExtensionConfiguration => {
  let _httpAuthSchemes = runtimeConfig.httpAuthSchemes!;
  let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider!;
  return {
    setHttpAuthScheme(httpAuthScheme: HttpAuthScheme): void {
      const index = _httpAuthSchemes.findIndex(scheme => scheme.schemeId === httpAuthScheme.schemeId);
      if (index === -1) {
        _httpAuthSchemes.push(httpAuthScheme);
      } else {
        _httpAuthSchemes.splice(index, 1, httpAuthScheme);
      }
    },
    httpAuthSchemes(): HttpAuthScheme[] {
      return _httpAuthSchemes;
    },
    setHttpAuthSchemeProvider(httpAuthSchemeProvider: ClientServiceHttpAuthSchemeProvider): void {
      _httpAuthSchemeProvider = httpAuthSchemeProvider;
    },
    httpAuthSchemeProvider(): ClientServiceHttpAuthSchemeProvider {
      return _httpAuthSchemeProvider;
    },
  }
};

/**
 * @internal
 */
export const resolveHttpAuthRuntimeConfig = (config: HttpAuthExtensionConfiguration): HttpAuthRuntimeConfig => {
  return {
    httpAuthSchemes: config.httpAuthSchemes(),
    httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
  };
};
