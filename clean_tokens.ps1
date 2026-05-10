cd d:\Backup\Pictures\fluffy-octo-umbrella

# Remove tokens from all the push scripts
$files = Get-ChildItem -Filter "push_*.ps1" | Where-Object { $_.Name -ne "push-to-github.bat" }
$files += Get-ChildItem -Filter "final_push.ps1"
$files += Get-ChildItem -Filter "fix_commit*.ps1"

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    # Replace any GITHUB token patterns
    $content = $content -replace 'gh[p_]_[A-Za-z0-9_]{10,}', 'YOUR_TOKEN'
    $content = $content -replace '\$token = ".*?"', '$token = "$env:GITHUB_TOKEN"'
    Set-Content $f.FullName $content -Encoding UTF8
    Write-Host "Cleaned: $($f.Name)"
}

Write-Host "Done cleaning tokens from scripts"