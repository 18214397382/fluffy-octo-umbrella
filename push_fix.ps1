﻿cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add api/index.mjs
git commit -m "Fix: consolidate api/index.mjs into standalone entry point"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git remote set-url origin "https://github.com/18214397382/fluffy-octo-umbrella.git"
git push origin master
