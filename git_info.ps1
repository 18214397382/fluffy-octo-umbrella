cd "d:\Backup\Pictures\fluffy-octo-umbrella"
Write-Host "Git status:"
git status --short
Write-Host ""
Write-Host "Last commit:"
git log -1 --oneline
Write-Host ""
Write-Host "Recent commits:"
git log --oneline -5