import assert from "node:assert/strict";
import test from "node:test";
import connection from "./agentrouter.ts";

test("discovery and receipts are free to read; spending needs approval with or without a ceiling", () => {
  const decide = (toolName, toolInput) => connection.approval({ toolName, toolInput });
  for (const tool of ["find_tools", "describe_tool", "get_run"]) {
    assert.equal(decide(`agentrouter__${tool}`), "not-applicable");
  }
  for (const tool of ["invoke_tool", "agentrouter__invoke_tool"]) {
    assert.equal(decide(tool, {}), "user-approval");
    assert.equal(decide(tool, { max_cost_usd: "0.05" }), "user-approval");
  }
});
