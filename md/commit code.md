[[_TOC_]]
[toc]

## 拉取代码
  - `git pull`
## 提交代码
可以执行以下命令：（仅供参考）（更多命令参考[git usage introduce.md](./commit%20code.md)）
- `git add.`
- `git commit -am"xxx"` 或 `git commit -am'xxx'` 或 `git commit -am 'xxx'` 或 `git commit -am "xxx"`
  - 其中的xxx表示提交的备注信息
  - TODO: xxx的格式后续会有规范
- `git push`
  - 默认分支下，执行`git push`即可
  - 若有分支，则执行`git push -u <remote> <branch>`。其中，remote是远程仓库在本地的别名，一般只有一个远程仓库，origin不需要改变；branch是分支名，一般提交到主干分支master，若branch在远端仓库不存在则会创建此分支。例子：`git push -u origin master`.

### 提交代码规范
  TODO: