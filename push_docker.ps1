﻿cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add Dockerfile railway.json
git commit -m "Fix: use Dockerfile to ensure Node.js server starts properly"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git remote set-url origin "https://github.com/18214397382/fluffy-octo-umbrella.git"
git push origin master
