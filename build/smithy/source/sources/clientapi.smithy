$version: "2"
namespace clientapi

use alloy#simpleRestJson
use aws.protocols#restJson1
use smithy.api#String
use smithy.api#Integer
use smithy.api#Double
use smithy.api#Unit

@simpleRestJson // This trait is used to indicate that the service uses a simple REST JSON protocol. [Purpose of testing]
@restJson1 // This trait is used to indicate that the service uses the AWS REST JSON protocol. [Purpose of testing]
service ClientService {
  version: "1.0",
  operations: [GetClient, CreateClient, UpdateClient, DeleteClient, ListClients]
}

@http(method: "GET", uri: "/clients/{id}")
@readonly
operation GetClient {
  input: GetClientInput,
  output: Client
}

@http(method: "POST", uri: "/clients", code: 201)
operation CreateClient {
  input: CreateClientInput,
  output: Client
}

@idempotent
@http(method: "PUT", uri: "/clients/{id}")
operation UpdateClient {
  input: UpdateClientInput,
  output: Client
}

@idempotent
@http(method: "DELETE", uri: "/clients/{id}", code: 204)
operation DeleteClient {
  input: DeleteClientInput,
  output: Unit
}

@http(method: "GET", uri: "/clients")
@readonly
operation ListClients {
  output: ListClientsOutput
}

structure GetClientInput {
  @required
  @httpLabel
  id: Integer
}

structure CreateClientInput {
  current_age: Integer,
  retirement_age: Integer,
  birth_year: Integer,
  birth_month: Integer,
  gender: String,
  address: String,
  latitude: Double,
  longitude: Double,
  per_capita_income: Double,
  yearly_income: Double,
  total_debt: Double,
  credit_score: Integer,
  num_credit_cards: Integer
}

structure UpdateClientInput {
  @required
  @httpLabel
  id: Integer,
  current_age: Integer,
  retirement_age: Integer,
  birth_year: Integer,
  birth_month: Integer,
  gender: String,
  address: String,
  latitude: Double,
  longitude: Double,
  per_capita_income: Double,
  yearly_income: Double,
  total_debt: Double,
  credit_score: Integer,
  num_credit_cards: Integer
}

structure DeleteClientInput {
  @required
  @httpLabel
  id: Integer
}

structure Client {
  @required
  id: Integer,
  current_age: Integer,
  retirement_age: Integer,
  birth_year: Integer,
  birth_month: Integer,
  gender: String,
  address: String,
  latitude: Double,
  longitude: Double,
  per_capita_income: Double,
  yearly_income: Double,
  total_debt: Double,
  credit_score: Integer,
  num_credit_cards: Integer
}

list ClientList {
  member: Client
}

structure ListClientsOutput {
  clients: ClientList
}
