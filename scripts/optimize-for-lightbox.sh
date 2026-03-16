#!/bin/bash

PUBLIC_DIR="public"
TEMP_DIR="/tmp/lightbox_optimization"

LIGHTBOX_WIDTH=1200
LIGHTBOX_HEIGHT=800

mkdir -p "$TEMP_DIR"

echo "🖼️  Inizio ottimizzazione immagini per lightbox..."
echo "📐 Risoluzione target: ${LIGHTBOX_WIDTH}x${LIGHTBOX_HEIGHT}"

total_files=0
processed_files=0
errors=0

find "$PUBLIC_DIR" -name "*.webp" -type f | while read -r file; do
    total_files=$((total_files + 1))
    
    dimensions=$(identify "$file" 2>/dev/null | awk '{print $3}')
    if [ $? -ne 0 ]; then
        echo "❌ Errore leggendo: $file"
        errors=$((errors + 1))
        continue
    fi
    
    width=$(echo "$dimensions" | cut -d'x' -f1)
    height=$(echo "$dimensions" | cut -d'x' -f2)
    
    dir=$(dirname "$file")
    filename=$(basename "$file" .webp)
    output_file="${dir}/${filename}_lightbox.webp"
    
    if [ -f "$output_file" ]; then
        echo "⏭️  Saltando (già esistente): $output_file"
        continue
    fi
    
    if [ "$width" -gt "$LIGHTBOX_WIDTH" ] || [ "$height" -gt "$LIGHTBOX_HEIGHT" ]; then
        echo "🔄 Ridimensionando: $file (${width}x${height})"
        
        convert "$file" \
            -resize "${LIGHTBOX_WIDTH}x${LIGHTBOX_HEIGHT}>" \
            -quality 90 \
            -define webp:lossless=false \
            -define webp:method=6 \
            -define webp:alpha-quality=90 \
            -unsharp 0x0.5+0.5+0.008 \
            "$output_file"
        
        if [ $? -eq 0 ]; then
            original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
            new_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
            
            reduction=$((100 - (new_size * 100 / original_size)))
            
            echo "✅ Creato: $output_file (riduzione ${reduction}%)"
            processed_files=$((processed_files + 1))
        else
            echo "❌ Errore elaborando: $file"
            errors=$((errors + 1))
        fi
    else
        echo "⏭️  Non necessario: $file (già ottimale)"
    fi
done

echo ""
echo "📊 Resoconto ottimizzazione:"
echo "   📁 File totali trovati: $total_files"
echo "   ✅ File processati: $processed_files"  
echo "   ❌ Errori: $errors"

rm -rf "$TEMP_DIR"

echo "🎉 Ottimizzazione completata!"
