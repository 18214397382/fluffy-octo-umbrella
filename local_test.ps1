cd "d:\Backup\Pictures\fluffy-octo-umbrella"
$process = Start-Process -FilePath "node" -ArgumentList "api/index.mjs" -NoNewWindow -PassThru
Start-Sleep -Seconds 3
try {
    $health = Invoke-WebRequest -Uri "http://localhost:4173/api/health" -UseBasicParsing -TimeoutSec 5
    Write-Host "Health:" $health.Content
} catch {
    Write-Host "Health Error:" $_.Exception.Message
}
try {
    $models = Invoke-WebRequest -Uri "http://localhost:4173/api/ai-edit/models" -UseBasicParsing -TimeoutSec 5
    Write-Host "Models:" $models.Content.Substring(0, [Math]::Min(200, $models.Content.Length))
} catch {
    Write-Host "Models Error:" $_.Exception.Message
}
Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue