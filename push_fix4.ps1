﻿cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add package.json railway.json
git commit -m "Fix: use npm start with pre-build"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git push origin master
