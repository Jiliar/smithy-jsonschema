// smithy-typescript generated code
import { Sha256 } from "@aws-crypto/sha256-browser";
import {
  FetchHttpHandler as RequestHandler,
  streamCollector,
} from "@smithy/fetch-http-handler";
import { calculateBodyLength } from "@smithy/util-body-length-browser";
import {
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_RETRY_MODE,
} from "@smithy/util-retry";
import { ClientServiceClientConfig } from "./ClientServiceClient";
import { getRuntimeConfig as getSharedRuntimeConfig } from "./runtimeConfig.shared";
import { loadConfigsForDefaultMode } from "@smithy/smithy-client";
import { resolveDefaultsModeConfig } from "@smithy/util-defaults-mode-browser";

/**
 * @internal
 */
export const getRuntimeConfig = (config: ClientServiceClientConfig) => {
  const defaultsMode = resolveDefaultsModeConfig(config);
  const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
  const clientSharedValues = getSharedRuntimeConfig(config);
  return {
    ...clientSharedValues,
    ...config,
    runtime: "browser",
    defaultsMode,
    bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
    maxAttempts: config?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS,
    requestHandler: RequestHandler.create(config?.requestHandler ?? defaultConfigProvider),
    retryMode: config?.retryMode ?? (async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE),
    sha256: config?.sha256 ?? Sha256,
    streamCollector: config?.streamCollector ?? streamCollector,
  };
};
