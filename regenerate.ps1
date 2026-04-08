# ============================================================
#  regenerate.ps1 — Régénération automatique OpenAPI + Prisma
# ============================================================

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   REGENERATION OPENAPI + PRISMA" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# ---------- CONFIGURATION ----------
$OPENAPI_FILE = "docs/openapi.yaml"   # Chemin vers ton fichier OpenAPI
$CLIENT_DIR   = "client"              # Dossier client généré
$SERVER_DIR   = "server"              # Dossier server généré
# -----------------------------------


# 1. Vérification que le fichier OpenAPI existe
Write-Host "[1/5] Vérification du fichier OpenAPI..." -ForegroundColor Yellow
if (-Not (Test-Path $OPENAPI_FILE)) {
    Write-Host "ERREUR : Le fichier '$OPENAPI_FILE' est introuvable." -ForegroundColor Red
    Write-Host "Vérifie que le fichier existe dans docs/openapi.yaml" -ForegroundColor Red
    exit 1
}
Write-Host "      OK : $OPENAPI_FILE trouvé." -ForegroundColor Green


# 2. Suppression des anciens dossiers générés
Write-Host ""
Write-Host "[2/5] Suppression des anciens dossiers générés..." -ForegroundColor Yellow

if (Test-Path $CLIENT_DIR) {
    Remove-Item -Recurse -Force $CLIENT_DIR
    Write-Host "      OK : $CLIENT_DIR supprimé." -ForegroundColor Green
} else {
    Write-Host "      INFO : $CLIENT_DIR n'existait pas, on continue." -ForegroundColor Gray
}

if (Test-Path $SERVER_DIR) {
    Remove-Item -Recurse -Force $SERVER_DIR
    Write-Host "      OK : $SERVER_DIR supprimé." -ForegroundColor Green
} else {
    Write-Host "      INFO : $SERVER_DIR n'existait pas, on continue." -ForegroundColor Gray
}


# 3. Régénération du client (typescript-fetch)
Write-Host ""
Write-Host "[3/5] Génération du client (typescript-fetch)..." -ForegroundColor Yellow
npx @openapitools/openapi-generator-cli generate `
    -g typescript-fetch `
    -i $OPENAPI_FILE `
    -o $CLIENT_DIR `
    --additional-properties=typescriptThreePlus=true,supportsES6=true

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR : La génération du client a échoué." -ForegroundColor Red
    exit 1
}
Write-Host "      OK : Client généré dans /$CLIENT_DIR" -ForegroundColor Green


# 4. Régénération du server (nodejs-express-server)
Write-Host ""
Write-Host "[4/5] Génération du server (nodejs-express-server)..." -ForegroundColor Yellow
npx @openapitools/openapi-generator-cli generate `
    -g nodejs-express-server `
    -i $OPENAPI_FILE `
    -o $SERVER_DIR `
    --additional-properties=usePromises=true,typescriptThreePlus=true

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR : La génération du server a échoué." -ForegroundColor Red
    exit 1
}
Write-Host "      OK : Server généré dans /$SERVER_DIR" -ForegroundColor Green


# 5. Régénération du client Prisma
Write-Host ""
Write-Host "[5/5] Régénération du client Prisma..." -ForegroundColor Yellow
pnpm db:generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR : prisma db:generate a échoué." -ForegroundColor Red
    exit 1
}
Write-Host "      OK : Client Prisma régénéré." -ForegroundColor Green


# ---------- RÉSUMÉ FINAL ----------
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   REGENERATION TERMINÉE AVEC SUCCÈS" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  OpenAPI source  → $OPENAPI_FILE" -ForegroundColor White
Write-Host "  Client OpenAPI  → /$CLIENT_DIR" -ForegroundColor White
Write-Host "  Server OpenAPI  → /$SERVER_DIR" -ForegroundColor White
Write-Host "  Prisma Client   → node_modules/.prisma/client" -ForegroundColor White
Write-Host ""
