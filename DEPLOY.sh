#!/bin/bash
cd "$(dirname "$0")"
rm -rf .git
git init
git branch -M main
git add -A
git commit -m "EFG — local videos fix"
git remote add origin https://github.com/gregorydgoyins/brandnewfunk.git
git push --force origin main
echo "Done."
