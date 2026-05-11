﻿cd "d:\Backup\Pictures\fluffy-octo-umbrella"
git add railway.json
git commit -m "Fix: force Node.js mode by ensuring dist is removed"
git push origin master

# Keep trying if fails
if ($LASTEXITCODE -ne 0) {
    Start-Sleep 10
    git push origin master
}
