﻿cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add railway.json
git rm --cached Dockerfile
git commit -m "Fix: hide dist during build to force Node.js start"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git push origin master
