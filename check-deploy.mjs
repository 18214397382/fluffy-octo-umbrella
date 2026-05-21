const TOKEN = '72a43271-676c-42dc-b26e-1ad9f73ad692';
const SERVICE_ID = '07a7d106-c18d-4b39-bc96-8df3a0d826b6';
const ENV_ID = '0e08f177-7ed5-4de2-8724-45ca5486257b';

const headers = { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const gql = (q) => fetch('https://backboard.railway.app/graphql/v2', { method: 'POST', headers, body: JSON.stringify({ query: q }) }).then(r => r.json());

// 先获取所有环境
const r0 = await gql(`{
  project(id: "pacific-intuition") {
    environments { id name }
  }
}`);
console.log('Environments:', JSON.stringify(r0.data?.project?.environments, null, 2));

// 获取部署配置
const r1 = await gql(`{
  service(id: "${SERVICE_ID}") {
    source { ... on GitHubSource { repo branch } ... on DockerSource { image } ... on RepoSettings { repo branch } }
    deployments(last: 5) { edges { node { id status createdAt meta { commitHash commitMessage } } } }
  }
}`);
console.log('Service:', JSON.stringify(r1.data?.service, null, 2));