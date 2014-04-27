@echo off

rem Change current execution directory.
cd /d "%~dp0"


rem Set environment arguments
set PATH=%PATH%;C:\Python27
set PATH=%PATH%;C:\Program Files\Java\jre7\bin
set PATH=%PATH%;C:\Program Files (x86)\Java\jre7\bin

set CLOSUREBUILDERPY=.\lib\closure-library\closure\bin\build\closurebuilder.py
set CLOSURECOMPILERJAR=.\lib\closure-compiler\compiler.jar
set CLOSURE_LIBRARY_DIR=.\lib\closure-library\closure\goog
set CLOSERU_LIBRARY_THIRD_DIR=.\lib\closure-library\third_party\closure\goog
set SOURCE_CODE_DIR=.\src
set MAIN_CLASS_NAME=garafu.blogger.toc.Main
set CONTRACT_JS=%SOURCE_CODE_DIR%\blogger\toc\contract.js
set OUTPUT_FILE=.\build\blogger.toc.min.js


%CLOSUREBUILDERPY% ^
    --root=%CLOSURE_LIBRARY_DIR% ^
    --root=%SOURCE_CODE_DIR% ^
    --namespace=%MAIN_CLASS_NAME% ^
    --output_mode=compiled ^
    --compiler_jar=%CLOSURECOMPILERJAR% ^
    --compiler_flags="--output_wrapper=\"/** Copyright (c) 2013 akinari tsugo */%%output%%\"" ^
    --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
    --compiler_flags="--externs=%CONTRACT_JS%" ^
    --compiler_flags="--js_output_file=%OUTPUT_FILE%"

rem for debug options.
rem    --compiler_flags="--compilation_level=WHITESPACE_ONLY" ^
rem    --compiler_flags="--formatting=pretty_print" ^

rem    --root=%CLOSERU_LIBRARY_THIRD_DIR% ^
rem    --compiler_flags="--formatting=print_input_delimiter" ^
rem    --compiler_flags="--create_name_map_files=true" ^
rem    --compiler_flags="--formatting=pretty_print" ^

