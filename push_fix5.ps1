cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add server.mjs package.json railway.json
git commit -m "Fix: add root server.mjs to force Node.js detection"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git remote set-url origin "https://github.com/18214397382/fluffy-octo-umbrella.git"
git push origin master
