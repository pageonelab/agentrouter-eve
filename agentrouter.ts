import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

const connectorId = process.env.AGENTROUTER_CONNECTOR_ID;
if (!connectorId) {
  throw new Error(
    "Set AGENTROUTER_CONNECTOR_ID to the Vercel Connect connector ID."
  );
}

const readTools = ["find_tools", "describe_tool", "get_run"];

export default defineMcpClientConnection({
  approval: ({ toolName }) => {
    if (readTools.includes(toolName.split("__").pop() ?? toolName)) {
      return "not-applicable";
    }
    return "user-approval";
  },
  auth: connect({
    connector: connectorId,
    principalType: "user",
    tokenParams: { scopes: ["read", "invoke"] },
  }),
  description:
    "Discover provider tools, check current prices, run an approved task from the caller's AgentRouter wallet, and retrieve the result and charge.",
  tools: { allow: [...readTools, "invoke_tool"] },
  url: "https://mcp.agentrouter.to/",
});
