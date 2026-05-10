cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add server.mjs railway.json
git commit -m "Fix: use node server.mjs instead of node ."
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git push origin master
