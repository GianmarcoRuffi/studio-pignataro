#!/bin/bash

echo "🔄 Conversione references immagini da JPG/JPEG a WEBP..."

echo "📝 Aggiornamento file dati..."

find src/data -name "*.ts" -exec sed -i 's/\.jpg/.webp/gi' {} \;
find src/data -name "*.ts" -exec sed -i 's/\.jpeg/.webp/gi' {} \;
find src/data -name "*.ts" -exec sed -i 's/\.JPG/.webp/g' {} \;
find src/data -name "*.ts" -exec sed -i 's/\.JPEG/.webp/g' {} \;

echo "✅ Conversione completata!"
echo "📋 File aggiornati:"
echo "   - src/data/data.ts"
echo "   - src/data/bioData.ts" 
echo "   - src/data/contactsData.ts"
echo "   - src/data/pressesData.ts"

echo ""
echo "🔍 Verifica che i file WEBP esistano nelle cartelle public/"
echo "💡 Tip: Usa il comando 'find public -name \"*.jpg\" -o -name \"*.JPG\"' per trovare file ancora da convertire"
