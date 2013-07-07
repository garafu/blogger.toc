@echo off

rem Change current execution directory.
cd /d "%~dp0"


rem Set environment arguments
set PATH=%PATH%;C:\Python27
set PATH=%PATH%;C:\Program Files\Java\jre7\bin
set PATH=%PATH%;C:\Program Files (x86)\Java\jre7\bin

set CLOSUREDEPSWRITERPY=.\lib\closure-library\closure\bin\build\depswriter.py
set CLOSURECOMPILERJAR=.\lib\closure-compiler\compiler.jar
set CLOSURE_LIBRARY_DIR=.\lib\closure-library\closure\goog
set CLOSERU_LIBRARY_THIRD_DIR=.\lib\closure-library\third_party\closure\goog
set SOURCE_CODE_DIR=.\src
set MAIN_CLASS_NAME=garafu.blogger.TOC
set OUTPUT_FILE=.\src\deps.js



%CLOSUREDEPSWRITERPY% ^
    --root_with_prefix="src ../../../../src" ^
    > %OUTPUT_FILE%


