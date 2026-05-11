﻿﻿﻿﻿@echo off
cd /d "%~dp0"
echo 姝ｅ湪璁剧疆浠撳簱鍦板潃...
echo.
echo 璇风‘淇濆凡璁剧疆 GITHUB_TOKEN 鐜鍙橀噺
echo.
echo 姝ｅ湪鎺ㄩ€佷唬鐮佸埌 GitHub...
git push origin master
if %ERRORLEVEL% EQU 0 (
    echo.
    echo 鎺ㄩ€佹垚鍔燂紒Railway 灏嗚嚜鍔ㄩ儴缃层€?    echo 璁块棶鍦板潃: https://fluffy-octo-umbrella-production.up.railway.app
) else (
    echo.
    echo 鎺ㄩ€佸け璐ワ紝璇锋鏌ョ綉缁滆繛鎺ュ悗閲嶈瘯銆?)
pause
