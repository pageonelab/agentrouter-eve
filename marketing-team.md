# Add a competitor brief to the Eve Marketing Team

The SEO specialist already reviews webpages. This recipe answers two questions a page review alone cannot settle. Where did each domain appear for the same Google query in a specific market? Which public Reddit posts mentioned each brand during the last seven days? The specialist returns source links and the cost of collecting them.

## Install in the template

From this integration's root, run `export eve_integration_dir="$PWD"`. In the same shell, switch to the [Marketing Team template](https://github.com/vercel-labs/marketing-team-eve-template) and follow the connector and environment setup in steps 2 and 3 of the [Eve guide](README.md). The template already includes Vercel Connect. Install both files on the SEO specialist:

```sh
seo_dir=agent/subagents/seo
mkdir -p "$seo_dir/connections" "$seo_dir/skills/competitor-brief"
cp -i "$eve_integration_dir/agentrouter.ts" "$seo_dir/connections/agentrouter.ts"
cp -i "$eve_integration_dir/skills/competitor-brief/SKILL.md" "$seo_dir/skills/competitor-brief/SKILL.md"
```

Add this line to the SEO specialist's `instructions.md` under “Ground the work before you diagnose”:

> For a weekly competitor brief, load `competitor-brief`. Use provider results for rank and discussion evidence. Identify the query, market, source and retrieval time.

Use `eve build --skip-sandbox-prewarm` for a local build without Vercel project credentials. Use `eve build` with the linked project's credentials to prepare its hosted sandboxes. In an authenticated conversation, ask the team lead:

> Send this to the SEO specialist. Compare Vercel (vercel.com) and Netlify (netlify.com) for “frontend hosting” on US desktop in English. Include Reddit posts from the last seven days. Show the maximum cost of the three calls and wait for my approval. My total budget is $0.10.

The budget is an example. The first request buys one search snapshot for both domains. Each brand gets one page of Reddit results. A second week can use the saved first brief to calculate changes. For a worked example of the Google step with a recorded charge, see [how to compare search rankings and keyword volume](https://www.agentrouter.to/tutorial/check-search-rankings-and-volume?utm_source=eve&utm_medium=integration).

## Example output shape

This is an illustrative baseline using fictional brands. It contains no measured ranks or billable receipts.

| Brand | Google US desktop, “frontend hosting” | Reddit, previous 7 days |
| --- | --- | --- |
| Northstar Hosting | Example rank 4, link the exact landing page here | One qualifying post, link the permalink and date here |
| Juniper Hosting | Not seen in the organic sample at depth 10 | No verified match on the returned page |

A real brief gives the observation time, links each finding, and lists each run ID and settled USD charge. Cite the post when proposing an action. If a first page has no usable mentions, say so and keep its receipt.
