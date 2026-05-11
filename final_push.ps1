﻿cd "d:\Backup\Pictures\fluffy-octo-umbrella"

Write-Host "1. Committing only Home.tsx changes..."
git commit -m "Fix video upload handling"

Write-Host ""
Write-Host "2. Pushing to GitHub with token via environment..."
$token = "$env:GITHUB_TOKEN"
$env:GITHUB_TOKEN = $token
git remote set-url origin "https://github.com/18214397382/fluffy-octo-umbrella.git"
git push origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=================="
    Write-Host "Push successful!"
    Write-Host "Railway will auto-deploy."
    Write-Host "Check: https://fluffy-octo-umbrella-production.up.railway.app"
    Write-Host "=================="
} else {
    Write-Host ""
    Write-Host "Push failed."
}
