/*
 * @Author: xiangshangzhi
 * @Date: 2023-12-20 10:32:33
 * @FilePath: \nestProj\src\ormconfig.ts
 * @Description: 数据库连接的配置文件
 */
export const config = {
  type: 'mysql', //数据库类型
  host: '8.140.248.120', //host
  port: 3306,
  username: 'root', //账号
  password: 'xsz123456', //密码
  database: 'lorentz', //库名
  // entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  // entities: [User, Photo],
  synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库，实体类如果定义好了设置为 false 不然会导致实体的强替换，清空修改过的属性列中的数据
  autoLoadEntities: true,
} as const;
