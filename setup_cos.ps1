$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer 72a43271-676c-42dc-b26e-1ad9f73ad692"
}

$body = @"
{
    "query": "{ user { projects { nodes { id name } } } }"
}
"@

try {
    $response = Invoke-WebRequest -Uri "https://backboard.railway.app/graphql/v2" -Method POST -Headers $headers -Body $body
    Write-Host "查询结果: " $response.Content
} catch {
    Write-Host "错误: " $_.Exception.Message
    Write-Host "响应内容: " $_.ErrorDetails.Message
}
