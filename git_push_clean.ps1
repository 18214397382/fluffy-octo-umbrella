$token = "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"

cd "d:\Backup\Pictures\fluffy-octo-umbrella"

Write-Host "Modifying remote to remove token from file..."
$remoteUrl = git remote get-url origin
Write-Host "Current remote: $remoteUrl"

Write-Host ""
Write-Host "Setting new remote without token..."
git remote set-url origin "https://github.com/18214397382/fluffy-octo-umbrella.git"

Write-Host ""
Write-Host "Pushing with token via environment..."
$env:GITHUB_TOKEN = $token
git push origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Push successful!"
} else {
    Write-Host ""
    Write-Host "Push failed."
    git remote set-url origin "https://$token@github.com/18214397382/fluffy-octo-umbrella.git"
}