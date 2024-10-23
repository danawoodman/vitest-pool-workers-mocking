import client from './client';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const resp = await client.get('https://example.com');
		const json = await resp.json();
		return Response.json(json);
	},
} satisfies ExportedHandler<Env>;
