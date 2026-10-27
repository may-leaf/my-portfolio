p = "src/app/layout.js"
s = [System.IO.File]::ReadAllText(p)
old = "import \`"./globals.css\`";"
new = "import \`"./globals.css\`";`r`nimport PageTransition from \`"@/components/PageTransition\`";"
if ($s -notmatch "PageTransition") {
  $s = $s.Replace($old, $new)
  [System.IO.File]::WriteAllText(p, $s)
  "done"
} else {
  "skip"
}