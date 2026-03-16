#!/bin/bash

# Script leggero per ottimizzare rapidamente le immagini più pesanti
echo "🚀 Ottimizzazione rapida immagini..."

cd "$(dirname "$0")/.." || exit

# Funzione per ottimizzare una directory
quick_optimize() {
    local dir="$1"
    local max_width="$2"
    local quality="$3"
    
    echo "📁 Ottimizzando: $dir"
    
    if [ ! -d "$dir" ]; then
        echo "❌ Directory $dir non trovata"
        return
    fi
    
    # Conta e processa le immagini
    find "$dir" -name "*.webp" -exec sh -c '
        img="$1"
        size=$(identify "$img" | cut -d" " -f3 | cut -dx -f1)
        if [ "$size" -gt 1600 ]; then
            echo "⚡ Ottimizzando $(basename "$img") (${size}px)"
            convert "$img" -resize "'"$max_width"'x'"$max_width"'>" -quality '"$quality"' -strip "$img"
        fi
    ' _ {} \;
    
    echo "✅ $dir completata"
}

# Ottimizza le directory più importanti per il lightbox
quick_optimize "public/CasaBarranu" 1920 85
quick_optimize "public/CasaCorda" 1920 85
quick_optimize "public/CasaDalessio" 1920 85
quick_optimize "public/CasaGuicciardi" 1920 85
quick_optimize "public/CasaPiras" 1920 85
quick_optimize "public/CasaVincis" 1920 85
quick_optimize "public/Vanchiglia" 1920 85
quick_optimize "public/CorsoVittorioEmanuele_II" 1920 85
quick_optimize "public/AMS" 1920 85
quick_optimize "public/Glisbo" 1920 85
quick_optimize "public/EdificioCommendatore" 1920 85

# Directory per homepage (immagini più piccole)
quick_optimize "public/Home" 1200 80

echo ""
echo "🎉 Ottimizzazione rapida completata!"
echo "📊 Le immagini sono state ridotte per migliorare le prestazioni del lightbox"
