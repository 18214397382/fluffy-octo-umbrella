$token = $env:GITHUB_TOKEN
if (-not $token) {
    Write-Host "Error: GITHUB_TOKEN environment variable not set"
    Write-Host "Please set your GitHub token: $env:GITHUB_TOKEN='your_token'"
    exit 1
}

cd "d:\Backup\Pictures\fluffy-octo-umbrella"

Write-Host "Setting up remote with token..."
git remote set-url origin "https://$token@github.com/18214397382/fluffy-octo-umbrella.git"

Write-Host "Pushing to GitHub..."
git push origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Push successful! Railway should auto-deploy."
    Write-Host "Check status at: https://railway.app/project/ea87ec3a-2912-4b3d-bcb8-00cdbf13adc0"
} else {
    Write-Host ""
    Write-Host "Push failed. Check your network connection."
}