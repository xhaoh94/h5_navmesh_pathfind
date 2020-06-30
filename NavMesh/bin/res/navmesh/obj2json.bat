@echo off
set nowPath=%cd%
echo nowPath=%nowPath%

set objPath=%nowPath%\obj
echo objPath=%objPath%

set jsonPath=%nowPath%\json
echo jsonPath=%jsonPath%

set pyPath=%nowPath%\convert_obj_three.py
echo pyPath=%pyPath%

if exist "%jsonPath%" (    
    for /f "delims=" %%i in ('dir /b "%jsonPath%\*.json"') do (
        echo del json %%i
        del "%jsonPath%\%%i"
    )
) else (
    md "%jsonPath%"
)

for /f "delims=" %%i in ('dir /b "%objPath%\*.obj"') do  (  
    python "%pyPath%" -i "%objPath%\%%i" -o "%jsonPath%\%%~ni.json"    
)

pause