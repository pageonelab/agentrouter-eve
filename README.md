# Connect Eve to AgentRouter

Use one AgentRouter sign-in per person in a multi-user Eve app. The connection exposes `find_tools`, `describe_tool`, `invoke_tool` and `get_run`. Each paid invocation requires Eve approval. AgentRouter bills actual usage and honors any explicit USD ceiling.

Browse the [AgentRouter tool catalog](https://www.agentrouter.to/tools?utm_source=eve&utm_medium=integration) to choose a provider and see what a call costs before connecting your Eve app.

## Install

1. Use Node 24 and an Eve project. From this integration's root, run `export eve_integration_dir="$PWD"`. In the same shell, switch to your Eve project and run the commands below. If the connection file already exists, compare it with the packaged version first.

   ```sh
   npm install @vercel/connect
   mkdir -p agent/connections
   cp -i "$eve_integration_dir/agentrouter.ts" agent/connections/agentrouter.ts
   ```

2. In the linked Vercel project, create a custom connector for AgentRouter's MCP URL. Select user OAuth if asked.

   ```sh
   vercel connect create https://mcp.agentrouter.to/ --name agentrouter
   ```

3. Paste the returned connector ID at the prompt below to attach it to development and make it available to local builds. Set the same variable in the Vercel build and runtime environments where you deploy. For authenticated local use, pull the linked project's development environment with the Vercel CLI. Vercel Connect handles each user's access token.

   ```sh
   printf 'Vercel connector ID: '
   read -r AGENTROUTER_CONNECTOR_ID
   export AGENTROUTER_CONNECTOR_ID
   vercel connect attach "$AGENTROUTER_CONNECTOR_ID" -e development
   ```
4. Run `eve build`, then `eve dev`. In an authenticated Eve conversation ask “Use AgentRouter to describe dataforseo.serp_google_organic. Show the inputs and current price. Stop before invoking.” Complete the browser sign-in as the caller and check that Eve returns the provider's terms.
5. To try a paid run, ask for a single US English desktop search for “frontend hosting,” with an optional per-call ceiling. Review the tool ID, inputs and USD cap in the approval request. The returned receipt identifies the run and charge. Use `get_run` for a pending result.

When using the [Marketing Team recipe](marketing-team.md), install the connection on the SEO specialist. For a local policy regression check, copy `approval.test.mjs` beside a copy of `agentrouter.ts` outside Eve's auto-discovered connection directory in a project with Eve and Vercel Connect installed. Run `AGENTROUTER_CONNECTOR_ID=local-test node --test approval.test.mjs`. This check uses no account.

[Vercel Connect CLI](https://vercel.com/docs/cli/connect) · [AgentRouter sign-in and MCP tools](https://docs.agentrouter.to/integrations/mcp?utm_source=eve&utm_medium=integration)
