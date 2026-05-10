cd d:\Backup\Pictures\fluffy-octo-umbrella
git add -A
git commit -m "Restructure: move frontend to subdir, pure backend for Railway"
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git push origin master
