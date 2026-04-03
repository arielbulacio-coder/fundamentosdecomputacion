function Fix-File {
    param($Path, $Keyword, $Title, $OriginalEnd)
    $Content = Get-Content $Path -Raw
    # Remove any existing LockedContent tags added previously if they are broken
    $Content = $Content -replace "import LockedContent from '../components/LockedContent';\s*", ""
    $Content = "import LockedContent from '../components/LockedContent';`n" + $Content
    
    # Simple wrap based on known return start/end
    if ($Path -like "*Generaciones.jsx") {
        # Generaciones has a complex structure, let's be careful
    }
}

# Actually, I'll just manually fix each file with write_to_file completely. It's safer.
