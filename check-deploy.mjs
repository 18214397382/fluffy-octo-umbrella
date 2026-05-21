const TOKEN = '72a43271-676c-42dc-b26e-1ad9f73ad692';
const SERVICE_ID = '07a7d106-c18d-4b39-bc96-8df3a0d826b6';
const ENV_ID = '0e08f177-7ed5-4de2-8724-45ca5486257b';

const headers = { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const gql = (q) => fetch('https://backboard.railway.app/graphql/v2', { method: 'POST', headers, body: JSON.stringify({ query: q }) }).then(r => r.json());

// 查看 serviceInstanceDeployV2 的参数
const r1 = await gql(`{
  __type(name: "ServiceInstanceDeployV2Input") {
    inputFields { name type { name kind } }
  }
}`);
console.log('Input schema:', JSON.stringify(r1, null, 2));

// 尝试使用 input 包裹
const r2 = await gql(`mutation {
  serviceInstanceDeployV2(input: {
    serviceId: "${SERVICE_ID}",
    environmentId: "${ENV_ID}",
    buildOnly: false,
    source: "REPO"
  })
}`);
console.log('Deploy result:', JSON.stringify(r2, null, 2));