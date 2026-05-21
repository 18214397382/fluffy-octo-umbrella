const TOKEN = '72a43271-676c-42dc-b26e-1ad9f73ad692';
const SERVICE_ID = '07a7d106-c18d-4b39-bc96-8df3a0d826b6';
const ENV_ID = '0e08f177-7ed5-4de2-8724-45ca5486257b';

const r = await fetch('https://backboard.railway.app/graphql/v2', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `mutation { serviceInstanceDeployV2(serviceId: "${SERVICE_ID}", environmentId: "${ENV_ID}") }`
  })
}).then(r => r.json());

console.log(JSON.stringify(r, null, 2));