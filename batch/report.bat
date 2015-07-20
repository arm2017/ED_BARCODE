@echo off
echo start.....
REM params input
echo P1=%1
echo P2=%2
REM jre path to run java report
set jrePath=C:\Program Files\Java\jre1.8.0_45\bin
echo Path jre : %jrePath%
REM goto dir java.exe
cd %jrePath%
echo java -jar %1 %2
REM java -jar %1 %2
echo end.......