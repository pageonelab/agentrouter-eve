# Connect Eve to AgentRouter

Use one AgentRouter sign-in per person in a multi-user Eve app. The connection exposes `find_tools`, `describe_tool`, `invoke_tool` and `get_run`. Each paid invocation requires a USD ceiling and Eve approval. The AgentRouter API enforces the ceiling.

## Install

1. Use Node 24 and an Eve project. From this integration's root, run `export eve_integration_dir="$PWD"`. In the same shell, switch to your Eve project and run the commands below. If the connection file already exists, compare it with the packaged version first.

   ```sh
   npm install @vercel/connect
   mkdir -p agent/connections
   cp -i "$eve_integration_dir/agentrouter.ts" agent/connections/agentrouter.ts
   ```

2. In the linked Vercel project, create a custom connector for AgentRouter's MCP URL. Select user OAuth if asked. Attach its ID to the project and environment where you will run Eve.

   ```sh
   vercel connect create https://mcp.agentrouter.to/ --name agentrouter
   vercel connect attach <connector-id> -e development
   ```

3. Set `AGENTROUTER_CONNECTOR_ID` to the returned connector ID in your shell for local build and dev. Use the same variable in Vercel's corresponding build and runtime environment. The ID identifies the connector. Vercel Connect handles each user's access token. For local authenticated use, link the project and pull its development environment with the Vercel CLI.
4. Run `eve build`, then `eve dev`. In an authenticated Eve conversation ask “Use AgentRouter to describe dataforseo.serp_google_organic. Show the inputs and current price. Stop before invoking.” Complete the browser sign-in as the caller and check that Eve returns the provider's terms.
5. To try a paid run, ask for a single US English desktop search for “frontend hosting,” with an explicit per-call ceiling you accept. Review the tool ID, inputs and USD cap in the approval request. The returned receipt identifies the run and charge. Use `get_run` for a pending result.

When using the [Marketing Team recipe](marketing-team.md), install the connection on the SEO specialist. For a local policy regression check, copy `approval.test.mjs` beside a copy of `agentrouter.ts` outside Eve's auto-discovered connection directory in a project with Eve and Vercel Connect installed. Run `AGENTROUTER_CONNECTOR_ID=local-test node --test approval.test.mjs`. This check uses no account.

[Vercel Connect CLI](https://vercel.com/docs/cli/connect) · [AgentRouter sign-in and MCP tools](https://docs.agentrouter.to/integrations/mcp?utm_source=eve&utm_medium=integration)
