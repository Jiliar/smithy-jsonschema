// smithy-typescript generated code
import {
  ClientServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ClientServiceClient";
import { commonParams } from "../endpoint/EndpointParameters";
import {
  Client,
  CreateClientInput,
} from "../models/models_0";
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
 * The input for {@link CreateClientCommand}.
 */
export interface CreateClientCommandInput extends CreateClientInput {}
/**
 * @public
 *
 * The output of {@link CreateClientCommand}.
 */
export interface CreateClientCommandOutput extends Client, __MetadataBearer {}

/**
 * @public
 *
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ClientServiceClient, CreateClientCommand } from "client-sdk"; // ES Modules import
 * // const { ClientServiceClient, CreateClientCommand } = require("client-sdk"); // CommonJS import
 * const client = new ClientServiceClient(config);
 * const input = { // CreateClientInput
 *   current_age: Number("int"),
 *   retirement_age: Number("int"),
 *   birth_year: Number("int"),
 *   birth_month: Number("int"),
 *   gender: "STRING_VALUE",
 *   address: "STRING_VALUE",
 *   latitude: Number("double"),
 *   longitude: Number("double"),
 *   per_capita_income: Number("double"),
 *   yearly_income: Number("double"),
 *   total_debt: Number("double"),
 *   credit_score: Number("int"),
 *   num_credit_cards: Number("int"),
 * };
 * const command = new CreateClientCommand(input);
 * const response = await client.send(command);
 * // { // Client
 * //   id: Number("int"), // required
 * //   current_age: Number("int"),
 * //   retirement_age: Number("int"),
 * //   birth_year: Number("int"),
 * //   birth_month: Number("int"),
 * //   gender: "STRING_VALUE",
 * //   address: "STRING_VALUE",
 * //   latitude: Number("double"),
 * //   longitude: Number("double"),
 * //   per_capita_income: Number("double"),
 * //   yearly_income: Number("double"),
 * //   total_debt: Number("double"),
 * //   credit_score: Number("int"),
 * //   num_credit_cards: Number("int"),
 * // };
 *
 * ```
 *
 * @param CreateClientCommandInput - {@link CreateClientCommandInput}
 * @returns {@link CreateClientCommandOutput}
 * @see {@link CreateClientCommandInput} for command's `input` shape.
 * @see {@link CreateClientCommandOutput} for command's `response` shape.
 * @see {@link ClientServiceClientResolvedConfig | config} for ClientServiceClient's `config` shape.
 *
 * @throws {@link ClientServiceServiceException}
 * <p>Base exception class for all service exceptions from ClientService service.</p>
 *
 *
 */
export class CreateClientCommand extends $Command.classBuilder<CreateClientCommandInput, CreateClientCommandOutput, ClientServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>()
  .ep(commonParams)
      .m(function (this: any, Command: any, cs: any, config: ClientServiceClientResolvedConfig, o: any) {
          return [

  getSerdePlugin(config, this.serialize, this.deserialize),
  getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
      ];
  })
  .s("ClientService", "CreateClient", {

  })
  .n("ClientServiceClient", "CreateClientCommand")
  .f(void 0, void 0)
  .ser(() => { throw new Error("No supported protocol was found"); })
  .de(() => { throw new Error("No supported protocol was found"); })
.build() {
/** @internal type navigation helper, not in runtime. */
declare protected static __types: {
  api: {
      input: CreateClientInput;
      output: Client;
  };
  sdk: {
      input: CreateClientCommandInput;
      output: CreateClientCommandOutput;
  };
};
}
