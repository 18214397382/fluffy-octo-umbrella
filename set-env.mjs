const TOKEN = '72a43271-676c-42dc-b26e-1ad9f73ad692';
const SERVICE_ID = '07a7d106-c18d-4b39-bc96-8df3a0d826b6';
const ENV_ID = '0e08f177-7ed5-4de2-8724-45ca5486257b';
const PROJECT_ID = 'ea87ec3a-2912-4b3d-bcb8-00cdbf13adc0';
const NVAPI_KEY = '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';

const headers = { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const gql = (q) => fetch('https://backboard.railway.app/graphql/v2', { method: 'POST', headers, body: JSON.stringify({ query: q }) }).then(r => r.json());

async function main() {
  const result = await gql(`mutation {
    variableCollectionUpsert(input: {
      environmentId: "${ENV_ID}",
      projectId: "${PROJECT_ID}",
      serviceId: "${SERVICE_ID}",
      replace: true,
      variables: [{ name: "NVAPI_KEY", value: "${NVAPI_KEY}" }]
    })
  }`);
  console.log('结果:', JSON.stringify(result, null, 2));
}

main().catch(console.error);