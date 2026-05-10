cd "d:\Backup\Pictures\fluffy-octo-umbrella"
Write-Host "=== Git log ==="
git log --oneline -10
Write-Host ""
Write-Host "=== Branch ==="
git branch -a
Write-Host ""
Write-Host "=== Status ==="
git status
Write-Host ""
Write-Host "=== Remote ==="
git remote -v
Write-Host ""
Write-Host "=== Current branch commits ahead/behind ==="
git rev-list --count origin/master..HEAD
Write-Host "commits ahead of origin/master"