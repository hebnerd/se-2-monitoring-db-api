@echo off
Setlocal EnableDelayedExpansion
  for /f "usebackq" %%b in (`type server.js ^| find "" /v /c`) do (
    echo LOC for "server.js" is %%b. > LOCServer.txt
    )
  )