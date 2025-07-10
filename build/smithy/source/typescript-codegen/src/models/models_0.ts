// smithy-typescript generated code
/**
 * @public
 */
export interface Client {
  id: number | undefined;
  current_age?: number | undefined;
  retirement_age?: number | undefined;
  birth_year?: number | undefined;
  birth_month?: number | undefined;
  gender?: string | undefined;
  address?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  per_capita_income?: number | undefined;
  yearly_income?: number | undefined;
  total_debt?: number | undefined;
  credit_score?: number | undefined;
  num_credit_cards?: number | undefined;
}

/**
 * @public
 */
export interface CreateClientInput {
  current_age?: number | undefined;
  retirement_age?: number | undefined;
  birth_year?: number | undefined;
  birth_month?: number | undefined;
  gender?: string | undefined;
  address?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  per_capita_income?: number | undefined;
  yearly_income?: number | undefined;
  total_debt?: number | undefined;
  credit_score?: number | undefined;
  num_credit_cards?: number | undefined;
}

/**
 * @public
 */
export interface DeleteClientInput {
  id: number | undefined;
}

/**
 * @public
 */
export interface GetClientInput {
  id: number | undefined;
}

/**
 * @public
 */
export interface ListClientsOutput {
  clients?: (Client)[] | undefined;
}

/**
 * @public
 */
export interface UpdateClientInput {
  id: number | undefined;
  current_age?: number | undefined;
  retirement_age?: number | undefined;
  birth_year?: number | undefined;
  birth_month?: number | undefined;
  gender?: string | undefined;
  address?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  per_capita_income?: number | undefined;
  yearly_income?: number | undefined;
  total_debt?: number | undefined;
  credit_score?: number | undefined;
  num_credit_cards?: number | undefined;
}
