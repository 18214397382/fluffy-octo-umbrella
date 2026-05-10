cd "d:\Backup\Pictures\fluffy-octo-umbrella"
node api/index.mjs &
sleep 3
curl -s http://localhost:4173/api/health
curl -s http://localhost:4173/api/ai-edit/models | head -c 200
pkill -f "node api/index.mjs"