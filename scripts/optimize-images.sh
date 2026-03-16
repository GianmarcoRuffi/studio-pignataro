#!/bin/bash

# Script per ottimizzare le immagini riducendo dimensioni e qualità per il web
echo "🖼️ Ottimizzando immagini per il web..."

# Funzione per ottimizzare una directory di immagini
optimize_directory() {
    local dir="$1"
    local max_width="$2"
    local quality="$3"
    
    echo "📁 Ottimizzando directory: $dir"
    
    if [ ! -d "$dir" ]; then
        echo "❌ Directory $dir non trovata"
        return
    fi
    
    # Conta le immagini da processare
    local total_images=$(find "$dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | wc -l)
    local current=0
    
    # Processa ogni immagine
    find "$dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | while read -r img; do
        current=$((current + 1))
        echo "⚡ [$current/$total_images] $(basename "$img")"
        
        # Crea backup se non esiste
        if [ ! -f "${img}.backup" ]; then
            cp "$img" "${img}.backup"
        fi
        
        # Ottimizza l'immagine con ImageMagick
        if command -v magick >/dev/null 2>&1; then
            magick "$img" -resize "${max_width}x${max_width}>" -quality "$quality" -strip "$img"
        elif command -v convert >/dev/null 2>&1; then
            convert "$img" -resize "${max_width}x${max_width}>" -quality "$quality" -strip "$img"
        else
            echo "⚠️  ImageMagick non trovato. Installalo con: sudo apt-get install imagemagick"
            return 1
        fi
    done
    
    echo "✅ Directory $dir ottimizzata"
}

# Vai alla directory del progetto
cd "$(dirname "$0")/.." || exit

# Ottimizza le directory delle gallery dei progetti
# Immagini per lightbox: max 1920px larghezza, qualità 85%
echo "🎯 Ottimizzando immagini delle gallery..."

optimize_directory "public/CasaBarranu" 1920 85
optimize_directory "public/CasaCorda" 1920 85  
optimize_directory "public/CasaDalessio" 1920 85
optimize_directory "public/CasaGuicciardi" 1920 85
optimize_directory "public/CasaPiras" 1920 85
optimize_directory "public/CasaVincis" 1920 85
optimize_directory "public/CorsoVittorioEmanuele_II" 1920 85
optimize_directory "public/EdificioCommendatore" 1920 85
optimize_directory "public/Glisbo" 1920 85
optimize_directory "public/TangexCorp" 1920 85
optimize_directory "public/Vanchiglia" 1920 85
optimize_directory "public/ViaAdaNegri" 1920 85
optimize_directory "public/ViaVenturoli" 1920 85

# Ottimizza le immagini dell'homepage (più piccole)
echo "🏠 Ottimizzando immagini homepage..."
optimize_directory "public/Home" 1200 80

# Ottimizza le immagini delle pubblicazioni
echo "📚 Ottimizzando immagini pubblicazioni..."
optimize_directory "public/Pubblicazioni" 800 85

echo ""
echo "🎉 Ottimizzazione completata!"
echo "💡 Le immagini originali sono salvate come backup (.backup)"
echo "🔄 Per ripristinare: find public -name '*.backup' -exec sh -c 'mv \"$1\" \"${1%.backup}\"' _ {} \;"
