# Servidor local simples para visualizar o site (pasta "site") no navegador.
# Uso: clique com o botao direito > "Executar com o PowerShell", ou rode:
#   powershell -ExecutionPolicy Bypass -File servidor-local.ps1
# Depois abra http://localhost:8080 no navegador. Feche a janela para parar.
param([int]$Port = 8080)

$root = Join-Path $PSScriptRoot 'site'
$types = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='text/javascript'; '.json'='application/json'
  '.webmanifest'='application/manifest+json'; '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'
  '.png'='image/png'; '.jpg'='image/jpeg'; '.webp'='image/webp'; '.svg'='image/svg+xml'; '.ico'='image/x-icon'
  '.woff2'='font/woff2'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Site rodando em http://localhost:$Port  (Ctrl+C para parar)"
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    try {
      $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
      if ($path -eq '') { $path = 'index.html' }
      $file = [IO.Path]::GetFullPath((Join-Path $root $path))
      [byte[]]$bytes = $null
      if ($ctx.Request.HttpMethod -eq 'POST') {
        $bytes = [Text.Encoding]::UTF8.GetBytes('ok'); $res.StatusCode = 200
      } elseif ($file.StartsWith($root) -and (Test-Path -LiteralPath $file -PathType Leaf)) {
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $res.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
        $bytes = [IO.File]::ReadAllBytes($file)
        $res.StatusCode = 200
      } else {
        $bytes = [Text.Encoding]::UTF8.GetBytes('404 - nao encontrado')
        $res.StatusCode = 404
      }
      $res.ContentLength64 = $bytes.Length
      if ($ctx.Request.HttpMethod -ne 'HEAD') { $res.OutputStream.Write($bytes, 0, $bytes.Length) }
    } catch {
      Write-Host "Erro em $($ctx.Request.Url): $($_.Exception.Message)"
    } finally {
      try { $res.Close() } catch {}
    }
  }
} finally { $listener.Stop() }
