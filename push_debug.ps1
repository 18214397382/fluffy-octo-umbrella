cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add Dockerfile api/index.mjs
git commit -m "Fix: add debug output to Dockerfile and index.mjs"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git push origin master
