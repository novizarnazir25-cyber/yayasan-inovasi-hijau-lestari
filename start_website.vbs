Set WshShell = CreateObject("WScript.Shell")

' Jalankan server di background jika belum berjalan
cmd = "powershell -NoProfile -WindowStyle Hidden -Command ""if (-not (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue)) { Start-Process -FilePath 'node' -ArgumentList 'server.js' -WorkingDirectory 'C:\Users\ASUS\Desktop\BAHAN PPT\yayasan-inovasi-hijau-lestari' -WindowStyle Hidden }"""
WshShell.Run cmd, 0, True

' Buka website di browser default
WshShell.Run "http://localhost:3000"
