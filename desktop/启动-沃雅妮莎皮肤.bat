@echo off
chcp 65001 >nul
rem 启动 原神 沃雅妮莎 桌面桌宠（透明置顶悬浮窗）
rem 用 start 脱离调用方的 Job 对象，否则宿主进程结束时桌宠会被一起回收
start "" powershell.exe -NoProfile -WindowStyle Hidden -STA -ExecutionPolicy Bypass -File "%~dp0沃雅妮莎皮肤.ps1"
