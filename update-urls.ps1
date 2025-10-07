# List of files that need updating
$files = @(
    "frontend\src\components\AdminTrekForm.jsx",
    "frontend\src\components\AllDestinations.jsx", 
    "frontend\src\components\BookingForm.jsx",
    "frontend\src\components\checkAuthLoader.js",
    "frontend\src\components\DestinationDetails.jsx",
    "frontend\src\components\Destinations.jsx",
    "frontend\src\components\EditTrekForm.jsx",
    "frontend\src\components\Profile.jsx",
    "frontend\src\components\SignInForm.jsx"
)

# Function to add import and replace URLs
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Add import if not already present
        if ($content -notmatch "getApiUrl") {
            # Find where to insert the import (after last import statement)
            $lines = Get-Content $file
            $lastImportIndex = -1
            
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($lines[$i] -match "^import ") {
                    $lastImportIndex = $i
                }
            }
            
            if ($lastImportIndex -ge 0) {
                $newLines = @()
                $newLines += $lines[0..$lastImportIndex]
                $newLines += "import { getApiUrl } from '../config/config.js';"
                $newLines += $lines[($lastImportIndex + 1)..($lines.Count - 1)]
                $newLines | Set-Content $file
            }
        }
        
        # Replace localhost URLs
        $updatedContent = Get-Content $file -Raw
        $updatedContent = $updatedContent -replace 'http://localhost:5001', 'getApiUrl("")'
        $updatedContent = $updatedContent -replace '"http://localhost:5001([^"]*)"', 'getApiUrl("$1")'
        $updatedContent = $updatedContent -replace "'http://localhost:5001([^']*)'"", 'getApiUrl("$1")'
        $updatedContent = $updatedContent -replace "`"http://localhost:5001([^`"]*)`"", 'getApiUrl("$1")'
        
        Set-Content $file $updatedContent
        Write-Host "Updated: $file"
    }
}

Write-Host "All files updated successfully!"