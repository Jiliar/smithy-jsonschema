// smithy-typescript generated code
import {
  ClientServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ClientServiceClient";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteClientInput } from "../models/models_0";
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link DeleteClientCommand}.
 */
export interface DeleteClientCommandInput extends DeleteClientInput {}
/**
 * @public
 *
 * The output of {@link DeleteClientCommand}.
 */
export interface DeleteClientCommandOutput extends __MetadataBearer {}

/**
 * @public
 *
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ClientServiceClient, DeleteClientCommand } from "client-sdk"; // ES Modules import
 * // const { ClientServiceClient, DeleteClientCommand } = require("client-sdk"); // CommonJS import
 * const client = new ClientServiceClient(config);
 * const input = { // DeleteClientInput
 *   id: Number("int"), // required
 * };
 * const command = new DeleteClientCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param DeleteClientCommandInput - {@link DeleteClientCommandInput}
 * @returns {@link DeleteClientCommandOutput}
 * @see {@link DeleteClientCommandInput} for command's `input` shape.
 * @see {@link DeleteClientCommandOutput} for command's `response` shape.
 * @see {@link ClientServiceClientResolvedConfig | config} for ClientServiceClient's `config` shape.
 *
 * @throws {@link ClientServiceServiceException}
 * <p>Base exception class for all service exceptions from ClientService service.</p>
 *
 *
 */
export class DeleteClientCommand extends $Command.classBuilder<DeleteClientCommandInput, DeleteClientCommandOutput, ClientServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>()
  .ep(commonParams)
      .m(function (this: any, Command: any, cs: any, config: ClientServiceClientResolvedConfig, o: any) {
          return [

  getSerdePlugin(config, this.serialize, this.deserialize),
  getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
      ];
  })
  .s("ClientService", "DeleteClient", {

  })
  .n("ClientServiceClient", "DeleteClientCommand")
  .f(void 0, void 0)
  .ser(() => { throw new Error("No supported protocol was found"); })
  .de(() => { throw new Error("No supported protocol was found"); })
.build() {
/** @internal type navigation helper, not in runtime. */
declare protected static __types: {
  api: {
      input: DeleteClientInput;
      output: {};
  };
  sdk: {
      input: DeleteClientCommandInput;
      output: DeleteClientCommandOutput;
  };
};
}
