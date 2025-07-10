// smithy-typescript generated code
import {
  ClientServiceClient,
  ClientServiceClientConfig,
} from "./ClientServiceClient";
import {
  CreateClientCommand,
  CreateClientCommandInput,
  CreateClientCommandOutput,
} from "./commands/CreateClientCommand";
import {
  DeleteClientCommand,
  DeleteClientCommandInput,
  DeleteClientCommandOutput,
} from "./commands/DeleteClientCommand";
import {
  GetClientCommand,
  GetClientCommandInput,
  GetClientCommandOutput,
} from "./commands/GetClientCommand";
import {
  ListClientsCommand,
  ListClientsCommandInput,
  ListClientsCommandOutput,
} from "./commands/ListClientsCommand";
import {
  UpdateClientCommand,
  UpdateClientCommandInput,
  UpdateClientCommandOutput,
} from "./commands/UpdateClientCommand";
import { createAggregatedClient } from "@smithy/smithy-client";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@smithy/types";

const commands = {
  CreateClientCommand,
  DeleteClientCommand,
  GetClientCommand,
  ListClientsCommand,
  UpdateClientCommand,
}

export interface ClientService {
  /**
   * @see {@link CreateClientCommand}
   */
  createClient(): Promise<CreateClientCommandOutput>;
  createClient(
    args: CreateClientCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateClientCommandOutput>;
  createClient(
    args: CreateClientCommandInput,
    cb: (err: any, data?: CreateClientCommandOutput) => void
  ): void;
  createClient(
    args: CreateClientCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateClientCommandOutput) => void
  ): void;

  /**
   * @see {@link DeleteClientCommand}
   */
  deleteClient(
    args: DeleteClientCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<DeleteClientCommandOutput>;
  deleteClient(
    args: DeleteClientCommandInput,
    cb: (err: any, data?: DeleteClientCommandOutput) => void
  ): void;
  deleteClient(
    args: DeleteClientCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteClientCommandOutput) => void
  ): void;

  /**
   * @see {@link GetClientCommand}
   */
  getClient(
    args: GetClientCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetClientCommandOutput>;
  getClient(
    args: GetClientCommandInput,
    cb: (err: any, data?: GetClientCommandOutput) => void
  ): void;
  getClient(
    args: GetClientCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetClientCommandOutput) => void
  ): void;

  /**
   * @see {@link ListClientsCommand}
   */
  listClients(): Promise<ListClientsCommandOutput>;
  listClients(
    args: ListClientsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ListClientsCommandOutput>;
  listClients(
    args: ListClientsCommandInput,
    cb: (err: any, data?: ListClientsCommandOutput) => void
  ): void;
  listClients(
    args: ListClientsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListClientsCommandOutput) => void
  ): void;

  /**
   * @see {@link UpdateClientCommand}
   */
  updateClient(
    args: UpdateClientCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UpdateClientCommandOutput>;
  updateClient(
    args: UpdateClientCommandInput,
    cb: (err: any, data?: UpdateClientCommandOutput) => void
  ): void;
  updateClient(
    args: UpdateClientCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateClientCommandOutput) => void
  ): void;

}

/**
 * @public
 */
export class ClientService extends ClientServiceClient implements ClientService {}
createAggregatedClient(commands, ClientService);
