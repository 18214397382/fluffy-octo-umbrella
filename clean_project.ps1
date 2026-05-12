$env:RAILWAY_TOKEN = "72a43271-676c-42dc-b26e-1ad9f73ad692"

# 删除可能导致静态站点检测的文件
Remove-Item -Path "d:\Backup\Pictures\fluffy-octo-umbrella\frontend\index.template.html" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "d:\Backup\Pictures\fluffy-octo-umbrella\frontend" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Cleaned up frontend files"

Set-Location "d:\Backup\Pictures\fluffy-octo-umbrella"

# 显示当前目录结构
Get-ChildItem -Recurse | Select-Object FullName