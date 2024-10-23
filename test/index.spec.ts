// test/index.spec.ts
import { createExecutionContext, env, waitOnExecutionContext } from 'cloudflare:test';
import { expect, it, vi } from 'vitest';
import client from '../src/client';
import worker from '../src/index';

vi.mock('../src/client');

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

it('fetch: unit', async () => {
	const expected = { hello: 'world' };
	vi.mocked(client.get).mockResolvedValue(Response.json(expected));
	const request = new IncomingRequest('http://example.com');
	const ctx = createExecutionContext();

	const response = await worker.fetch(request, env, ctx);
	await waitOnExecutionContext(ctx);

	expect(await response.json()).toEqual(expected);
});
