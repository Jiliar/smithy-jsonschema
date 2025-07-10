// smithy-typescript generated code
import {
  ClientServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ClientServiceClient";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListClientsOutput } from "../models/models_0";
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
 * The input for {@link ListClientsCommand}.
 */
export interface ListClientsCommandInput {}
/**
 * @public
 *
 * The output of {@link ListClientsCommand}.
 */
export interface ListClientsCommandOutput extends ListClientsOutput, __MetadataBearer {}

/**
 * @public
 *
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ClientServiceClient, ListClientsCommand } from "client-sdk"; // ES Modules import
 * // const { ClientServiceClient, ListClientsCommand } = require("client-sdk"); // CommonJS import
 * const client = new ClientServiceClient(config);
 * const input = {};
 * const command = new ListClientsCommand(input);
 * const response = await client.send(command);
 * // { // ListClientsOutput
 * //   clients: [ // ClientList
 * //     { // Client
 * //       id: Number("int"), // required
 * //       current_age: Number("int"),
 * //       retirement_age: Number("int"),
 * //       birth_year: Number("int"),
 * //       birth_month: Number("int"),
 * //       gender: "STRING_VALUE",
 * //       address: "STRING_VALUE",
 * //       latitude: Number("double"),
 * //       longitude: Number("double"),
 * //       per_capita_income: Number("double"),
 * //       yearly_income: Number("double"),
 * //       total_debt: Number("double"),
 * //       credit_score: Number("int"),
 * //       num_credit_cards: Number("int"),
 * //     },
 * //   ],
 * // };
 *
 * ```
 *
 * @param ListClientsCommandInput - {@link ListClientsCommandInput}
 * @returns {@link ListClientsCommandOutput}
 * @see {@link ListClientsCommandInput} for command's `input` shape.
 * @see {@link ListClientsCommandOutput} for command's `response` shape.
 * @see {@link ClientServiceClientResolvedConfig | config} for ClientServiceClient's `config` shape.
 *
 * @throws {@link ClientServiceServiceException}
 * <p>Base exception class for all service exceptions from ClientService service.</p>
 *
 *
 */
export class ListClientsCommand extends $Command.classBuilder<ListClientsCommandInput, ListClientsCommandOutput, ClientServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>()
  .ep(commonParams)
      .m(function (this: any, Command: any, cs: any, config: ClientServiceClientResolvedConfig, o: any) {
          return [

  getSerdePlugin(config, this.serialize, this.deserialize),
  getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
      ];
  })
  .s("ClientService", "ListClients", {

  })
  .n("ClientServiceClient", "ListClientsCommand")
  .f(void 0, void 0)
  .ser(() => { throw new Error("No supported protocol was found"); })
  .de(() => { throw new Error("No supported protocol was found"); })
.build() {
/** @internal type navigation helper, not in runtime. */
declare protected static __types: {
  api: {
      input: {};
      output: ListClientsOutput;
  };
  sdk: {
      input: ListClientsCommandInput;
      output: ListClientsCommandOutput;
  };
};
}
