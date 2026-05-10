cd "d:\Backup\Pictures\fluffy-octo-umbrella"

Write-Host "Checking recent commits with files..."
git log --oneline -5
Write-Host ""

Write-Host "Checking what files were in the problematic commit..."
git show 906ec5c --stat
Write-Host ""

Write-Host "The issue is commit 906ec5c contains the GitHub token in push-to-github.bat"
Write-Host "We need to either:"
Write-Host "1. Remove the file from the commit"
Write-Host "2. Amend the commit to remove the secret"
Write-Host ""
Write-Host "Let's try to amend the commit by removing the file..."

git reset --soft HEAD~1
git status
