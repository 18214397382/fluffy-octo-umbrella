cd d:\Backup\Pictures\fluffy-octo-umbrella

Write-Host "=== Restructuring project ==="

# Create frontend directory
New-Item -ItemType Directory -Path frontend -Force | Out-Null

# Move frontend files
$items = @("src", "index.html", "vite.config.ts", "tsconfig.json", "tsconfig.app.json", "tsconfig.node.json", "public")
foreach ($item in $items) {
    if (Test-Path $item) {
        Move-Item -Path $item -Destination "frontend/$item" -Force
        Write-Host "Moved: $item"
    }
}

# Update package.json - keep only backend deps
$pkg = Get-Content package.json -Raw | ConvertFrom-Json
$backendDeps = @{
    "cors" = $pkg.dependencies.cors
    "express" = $pkg.dependencies.express
    "multer" = $pkg.dependencies.multer
    "dotenv" = $pkg.dependencies.dotenv
}
$pkg.dependencies = $backendDeps
$pkg.devDependencies = @{}
$pkg.scripts = @{
    "start" = "node api/index.mjs"
}
$pkg.main = "api/index.mjs"
$pkg.type = "module"
$pkg | ConvertTo-Json -Depth 10 | Set-Content package.json -Encoding UTF8
Write-Host "Updated package.json"

# Update railway.json
@'
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install"
  },
  "deploy": {
    "startCommand": "node api/index.mjs",
    "healthcheckPath": "/api/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
'@ | Set-Content railway.json -Encoding UTF8
Write-Host "Updated railway.json"

# Update .gitignore
@"
node_modules
.env
*.log
frontend/dist
frontend/node_modules
"@ | Set-Content .gitignore -Encoding UTF8
Write-Host "Updated .gitignore"

Write-Host "`nDone! Project is now backend-only for Railway."
Write-Host "Frontend code moved to ./frontend/"