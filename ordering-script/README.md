## 功能

> 根据 `crontab` 中的时间配置，运行脚本。调用节假日接口，判断今天是否应该订餐，同时排除了无福利日。订餐成功后，会在浏览器中打开订餐成功的结果页面

> 现在设置的每天 13:10 和 15:10 两次订餐，保险点，反正后端去重了。

## 限制

1、适用于OS X 或者Linux系统

2、电脑必须开机，脚本才能运行

## 使用方法

### 1 克隆项目 安装

```
yarn install

```

### 2 添加`crontab`定时任务

使用命令

```
crontab -e
```

添加下面的语句

```
10 13,15 * * * /usr/local/bin/node /Users/DuSong/Helijia/ordering/index.js

```
上面语句中的`/Users/DuSong/Helijia/ordering/` 请相应更换代码所在的文件夹，可以使用 `pwd` 查看文件夹路径

使用以下命令确认，是否添加成功

```
crontab -l
```

### 3 修改订餐名单

编辑 `config.js` 即可。


### 参数解释

```
10 13,15 * * * /usr/local/bin/node /Users/DuSong/Helijia/ordering/index.js

```

分钟、小时、日、月、周 命令 文件路径

空格分割各项参数

逗号添加多个参数，比如 `13,15` 表示13时 15时 俩个时间

`*`表示所有

上面的命令：

每周每月每天的13：10和15：10 用node执行文件
