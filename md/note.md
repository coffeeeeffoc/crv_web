[[_TOC_]]
[toc]
## 查看进程端口-杀死进程
- `netstat -ano` 查找所有运行的端口
- `netstat -aon|findstr 3015`  查看被占用端口对应的 PID
- `tasklist|findstr 9088`  查看指定 PID 的进程
- `taskkill /T /F /PID 9088`  强制（/F参数）杀死 pid 为 9088 的所有进程包括子进程（/T参数）
- `taskkill -t -f -pid 9088`  强制（-f参数）杀死 pid 为 9088 的所有进程包括子进程（-t参数）
- 本工程已安装kill-port库，可以用来杀死指定端口的进程
- 
