const TOKEN = '72a43271-676c-42dc-b26e-1ad9f73ad692';
const SERVICE_ID = '07a7d106-c18d-4b39-bc96-8df3a0d826b6';
const ENV_ID = '0e08f177-7ed5-4de2-8724-45ca5486257b';

const headers = { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' };

// 1. 先查看最新的部署
const r1 = await fetch('https://backboard.railway.app/graphql/v2', {
  method: 'POST', headers,
  body: JSON.stringify({ query: `{ service(id: "${SERVICE_ID}") { deployments(last: 3) { edges { node { id status } } } } }` })
}).then(r => r.json());
console.log('Deployments:', JSON.stringify(r1.data?.service?.deployments?.edges?.map(e => ({id: e.node.id, status: e.node.status})), null, 2));

// 2. 触发新部署
const r2 = await fetch('https://backboard.railway.app/graphql/v2', {
  method: 'POST', headers,
  body: JSON.stringify({ query: `mutation { serviceInstanceDeployV2(serviceId: "${SERVICE_ID}", environmentId: "${ENV_ID}") }` })
}).then(r => r.json());
console.log('New deploy:', JSON.stringify(r2, null, 2));