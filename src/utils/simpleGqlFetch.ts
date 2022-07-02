import { print, ASTNode } from 'graphql';
import fetch from 'cross-fetch';
import config from '../config';

type GqlError = { message: string, extensions: { code: string } };
type GqlResponse<T> = { errors?: GqlError[], data: Nullable<T> }
export async function simpleGqlFetch<T>(
  query: ASTNode,
  variables?: Optional<Record<string, any>>
): Promise<GqlResponse<T>> {
  const resp = await fetch(config.app.graphql, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });
  return resp.json();
}
